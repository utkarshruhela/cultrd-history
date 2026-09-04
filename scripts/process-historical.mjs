// Processes the aourednik/historical-basemaps time-slice GeoJSON files into
// what the app ships: one trimmed/filtered/simplified file per time slice
// under public/data/historical/, plus an index.json the app uses to pick
// the right slice for a given timeline year.
//
// Source repo (not vendored here -- too large): clone it separately and
// point SOURCE_DIR at its geojson/ folder. See README "Data roadmap".
//
//   git clone --depth 1 https://github.com/aourednik/historical-basemaps.git
//
// For India's boundary: for the post-independence slices (1960 onward, once
// "India" as an entity ~= the modern state), we swap in the same full
// official-extent geometry used for the modern basemap (see merge-india.mjs
// / simplify-india.mjs) instead of the source dataset's shape, for the same
// reason: J&K in full + Aksai Chin, per the Survey of India. Earlier "India"
// labels (British Raj era, 1783-1945) are a different historical entity
// (undivided India, no partition) and are left as the source dataset drew
// them -- overriding those with the modern shape would misrepresent
// history, not fix a political-sensitivity issue.
//
// Critically, India is EXCLUDED from each slice's own mapshaper simplify
// pass and spliced in afterwards from the pre-simplified, isolation-
// processed public/data/india-simplified.geojson (see that script's header
// comment for why: co-simplifying India against a slice's China-equivalent
// entity causes mapshaper's topology repair to silently chop off Aksai
// Chin, the same bug this had for the modern map before it was fixed).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const SOURCE_DIR = process.argv[2] || "/root/historical-basemaps/geojson";
const OUT_DIR = "./public/data/historical";
const TMP_DIR = "/tmp/historical-intermediate";
const INDIA_OVERRIDE_YEARS = new Set([1960, 1994, 2000, 2010]);
const INDIA_SIMPLIFIED_PATH = "./public/data/india-simplified.geojson";

const EXCLUDE = new Set(
  JSON.parse(fs.readFileSync("./scripts/nonLiterateExclusions.json", "utf8")).map((n) =>
    n.toLowerCase().trim(),
  ),
);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

if (!fs.existsSync(INDIA_SIMPLIFIED_PATH)) {
  console.error(`${INDIA_SIMPLIFIED_PATH} not found -- run: node scripts/simplify-india.mjs <path-to-india-composite.geojson>`);
  process.exit(1);
}
const indiaSimplified = JSON.parse(fs.readFileSync(INDIA_SIMPLIFIED_PATH, "utf8"));
function indiaOverrideFeature() {
  return {
    type: "Feature",
    properties: {
      NAME: "India",
      SUBJECTO: "India",
      PARTOF: "India",
      BORDERPRECISION: 3,
      LINK: null,
    },
    geometry: indiaSimplified.geometry,
  };
}

function yearFromFilename(fn) {
  // world_bc4000.geojson -> -4000 ; world_1960.geojson -> 1960
  const m = fn.match(/^world_(bc)?(\d+)\.geojson$/);
  if (!m) return null;
  const n = parseInt(m[2], 10);
  return m[1] ? -n : n;
}

function outKeyFromYear(year) {
  return year < 0 ? `bc${-year}` : `${year}`;
}

// A handful of names in the upstream source files contain a mis-encoded
// byte (already-corrupted to U+FFFD by the time Node reads the file as
// UTF-8, in world_1100.geojson and world_bc323.geojson) -- known, verified
// corrections rather than a blind strip/replace.
const ENCODING_FIXES = {
  "Teotihuac�n": "Teotihuacán",
  "Monte Alb�n": "Monte Albán",
  "Arag�n": "Aragón",
};
function fixEncoding(value) {
  if (typeof value !== "string") return value;
  return ENCODING_FIXES[value] ?? value;
}

const files = fs.readdirSync(SOURCE_DIR).filter((f) => /^world_(bc)?\d+\.geojson$/.test(f));
console.log(`Found ${files.length} time-slice files in ${SOURCE_DIR}`);

const indexEntries = [];
let totalIn = 0;
let totalOut = 0;

for (const fn of files.sort()) {
  const year = yearFromFilename(fn);
  if (year === null) continue;
  const raw = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, fn), "utf8"));
  totalIn += raw.features.length;

  let kept = raw.features.filter((f) => {
    const name = (f.properties?.NAME ?? "").toString().toLowerCase().trim();
    if (!name || name === "none") return false;
    return !EXCLUDE.has(name);
  });

  const overrideIndia = INDIA_OVERRIDE_YEARS.has(year);
  if (overrideIndia) {
    // Drop the source's own India feature entirely -- it never goes into
    // this slice's mapshaper pass. The replacement is spliced in after
    // simplification, below.
    kept = kept.filter((f) => (f.properties?.NAME ?? "").toString().trim().toLowerCase() !== "india");
  }

  totalOut += kept.length;

  const trimmed = {
    type: "FeatureCollection",
    features: kept.map((f) => ({
      type: "Feature",
      properties: {
        NAME: fixEncoding(f.properties?.NAME ?? null),
        SUBJECTO: fixEncoding(f.properties?.SUBJECTO ?? f.properties?.NAME ?? null),
        PARTOF: fixEncoding(f.properties?.PARTOF ?? null),
        BORDERPRECISION: f.properties?.BORDERPRECISION ?? null,
        LINK: f.properties?.weblnks ?? f.properties?.wikipedia ?? null,
      },
      geometry: f.geometry,
    })),
  };

  const key = outKeyFromYear(year);
  const tmpPath = path.join(TMP_DIR, `${key}.geojson`);
  fs.writeFileSync(tmpPath, JSON.stringify(trimmed));
  indexEntries.push({ year, key, featureCount: trimmed.features.length + (overrideIndia ? 1 : 0), overrideIndia });
}

console.log(`Features in: ${totalIn}, kept after written-history filter: ${totalOut}`);

// Simplify every intermediate file in one mapshaper invocation per file
// (keep-shapes to avoid vanishing small/island polities), then splice in
// the pre-simplified India override -- AFTER simplification, so it's never
// in the same mapshaper pass as this slice's other features.
for (const entry of indexEntries) {
  const inPath = path.join(TMP_DIR, `${entry.key}.geojson`);
  const outPath = path.join(OUT_DIR, `${entry.key}.geojson`);
  execSync(
    `npx mapshaper "${inPath}" -simplify dp 12% keep-shapes -clean -o "${outPath}" format=geojson precision=0.0001`,
    { stdio: "inherit" },
  );
  if (entry.overrideIndia) {
    const simplified = JSON.parse(fs.readFileSync(outPath, "utf8"));
    simplified.features.push(indiaOverrideFeature());
    fs.writeFileSync(outPath, JSON.stringify(simplified));
  }
  entry.bytes = fs.statSync(outPath).size;
}

indexEntries.sort((a, b) => a.year - b.year);
fs.writeFileSync(
  path.join(OUT_DIR, "index.json"),
  JSON.stringify({ slices: indexEntries.map(({ year, key, featureCount, bytes }) => ({ year, key, featureCount, bytes })) }, null, 2),
);

const totalBytes = indexEntries.reduce((s, e) => s + e.bytes, 0);
console.log(`Wrote ${indexEntries.length} slices to ${OUT_DIR}, total ${(totalBytes / 1024 / 1024).toFixed(1)}MB`);
