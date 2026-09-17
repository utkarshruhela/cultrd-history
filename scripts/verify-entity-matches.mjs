// Cross-checks src/data/politicalEntities.ts against the REAL map data
// (public/data/historical/*.geojson + world.geojson), which
// validate-political-entities.mjs cannot do (it only looks at the dataset
// in isolation). Two failure modes this catches that TypeScript and the
// other validator can't:
//   1. A hallucinated/misspelled nameAlias that never appears in the actual
//      map data -- the entity would simply never match any click, silently.
//   2. A real occurrence of an alias in some slice year that
//      findPoliticalEntity's period+buffer gating fails to match (or worse,
//      matches to the WRONG entity) -- catches both under-coverage and
//      cross-era bleed between two entities that happen to reuse a name
//      (the Mali-empire-vs-modern-Mali-country shape of bug).
// Run after adding/editing entities, before committing.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

execSync(
  `npx tsc --module commonjs --target es2020 --outDir /tmp/pe-verify --ignoreConfig src/data/politicalEntities.ts src/types.ts`,
  { stdio: "inherit" },
);
const { POLITICAL_ENTITIES, findPoliticalEntity } = await import("/tmp/pe-verify/data/politicalEntities.js");

const dir = "public/data/historical";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".geojson"));

// name -> Set of years it actually appears in (across all slices)
const occurrences = new Map();
for (const f of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch {
    continue;
  }
  if (!Array.isArray(data.features)) continue;
  const key = f.replace(".geojson", "");
  const year = key.startsWith("bc") ? -Number(key.slice(2)) : Number(key);
  for (const feat of data.features) {
    const n = feat.properties?.NAME;
    if (!n) continue;
    if (!occurrences.has(n)) occurrences.set(n, new Set());
    occurrences.get(n).add(year);
  }
}
// modern map counts as "now" for findPoliticalEntity's purposes
const MODERN_YEAR = new Date().getFullYear();

let ok = true;
let totalAliases = 0;
let profileScopedOccurrences = 0;
let rawOccurrences = 0;
let matchedRawOccurrences = 0;

for (const entity of POLITICAL_ENTITIES) {
  for (const alias of entity.nameAliases) {
    totalAliases++;
    const years = occurrences.get(alias);
    if (!years) {
      console.error(`"${entity.id}": alias "${alias}" does not appear ANYWHERE in the real map data (hallucinated or misspelled?).`);
      ok = false;
      continue;
    }
    for (const year of [...years].sort((a, b) => a - b)) {
      // A single map label can legitimately name several different polities
      // over centuries. Test this profile only where its own date scope says
      // it should apply; a global pass below measures every actual fallback.
      if (year < entity.periodStart || year > entity.periodEnd) continue;
      profileScopedOccurrences++;
      const match = findPoliticalEntity(alias, year);
      if (!match) {
        console.error(`"${entity.id}": alias "${alias}" appears at in-scope year ${year} but falls back to the sparse panel.`);
        ok = false;
      } else if (match.id !== entity.id) {
        console.error(`"${entity.id}": alias "${alias}" at year ${year} resolves to a DIFFERENT entity "${match.id}" instead -- alias claimed by both.`);
        ok = false;
      }
    }
  }
}

// This deliberately separate pass is the honest coverage metric: it counts
// every actual map occurrence, not just records already represented by an
// alias. A non-zero number is expected while curation is incomplete, so it is
// reported rather than converted into a false test failure.
for (const [name, years] of occurrences) {
  for (const year of years) {
    rawOccurrences++;
    if (findPoliticalEntity(name, year)) matchedRawOccurrences++;
  }
}

// Also check the modern map (world.geojson) doesn't accidentally light up
// a pilot entity that's actually defunct (periodEnd set too permissively,
// or a name collision with a current country). A small allowlist covers
// entities that are genuinely still the ruling power today -- e.g. Bhutan's
// Wangchuck dynasty, modeled with periodEnd: 2100 as a "no end yet"
// convention -- where a modern-map match is the CORRECT, intended result,
// not a bug.
const EXPECTED_STILL_ONGOING = new Set([
  "kingdom-of-bhutan-wangchuck-dynasty",
  "kingdom-of-sweden-continuity",
  "kingdom-of-denmark-continuity",
  "kingdom-of-morocco-continuity",
  "sultanate-of-brunei-continuity",
  "united-states-of-america",
  "kingdom-of-tonga",
  "grand-duchy-of-luxembourg",
  "hong-kong-colonial-and-sar",
  "fiji-colony-and-independent-state",
  "al-busaid-sultanate-oman",
  "portugal-restored-and-modern",
  "modern-french-republic",
]);
const world = JSON.parse(fs.readFileSync("public/data/world.geojson", "utf8"));
for (const feat of world.features) {
  const n = feat.properties?.name;
  if (!n) continue;
  const match = findPoliticalEntity(n, null);
  if (match && !EXPECTED_STILL_ONGOING.has(match.id)) {
    console.error(`"${match.id}": alias "${n}" incorrectly matches the MODERN map (periodEnd too permissive, or a genuine name collision with a current country).`);
    ok = false;
  }
}

console.log(`\n${POLITICAL_ENTITIES.length} entities, ${totalAliases} aliases.`);
console.log(`${profileScopedOccurrences} in-scope profile occurrences verified.`);
console.log(`${matchedRawOccurrences}/${rawOccurrences} real map name/slice occurrences have a curated profile; ${rawOccurrences - matchedRawOccurrences} still use the honest map-record fallback.`);

if (!ok) {
  console.error("\nVerification FAILED.");
  process.exit(1);
}
console.log("\nVerification passed.");
