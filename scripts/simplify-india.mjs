// Produces public/data/india-simplified.geojson: India's full official
// extent (Survey of India boundary, via datameet/maps composite -- includes
// all of Jammu & Kashmir, Aksai Chin, PoK/Gilgit-Baltistan, and the
// Shaksgam Valley), simplified for the browser.
//
// IMPORTANT: this simplification runs on India's geometry IN ISOLATION,
// never in the same mapshaper pass as any other country. Earlier versions
// of this pipeline merged India into the full world file and simplified
// everything together in one pass -- and mapshaper's automatic topology
// repair, encountering India's boundary overlapping China's competing
// claim over the same territory, "resolved" that self-intersection by
// silently chopping off the entire Aksai Chin salient (verified: the
// merged/co-simplified output cut off at ~78.9°E where the source data
// actually extends to ~80.4°E). Simplifying India alone -- with no other
// country's polygon in the same run to intersect against -- avoids this
// entirely; verified the isolated output preserves the full ~80.4°E
// extent at every simplification level tested, including this one.
//
// scripts/merge-india.mjs (modern map) and scripts/process-historical.mjs
// (post-1947 historical slices) both consume this file's output rather
// than re-deriving it, so there is exactly one place this can go wrong.
import fs from "node:fs";
import { execSync } from "node:child_process";

const INDIA_COMPOSITE_PATH = process.argv[2] || "/tmp/india-src/india-composite.geojson";
const OUT_PATH = "./public/data/india-simplified.geojson";
const TMP_PATH = "/tmp/india-simplify-isolated.geojson";

execSync(
  `npx mapshaper "${INDIA_COMPOSITE_PATH}" -simplify dp 20% keep-shapes -clean -o "${TMP_PATH}" format=geojson precision=0.0001`,
  { stdio: "inherit" },
);

const raw = JSON.parse(fs.readFileSync(TMP_PATH, "utf8"));
const geometry = raw.type === "FeatureCollection" ? raw.features[0].geometry : raw.type === "GeometryCollection" ? raw.geometries[0] : raw;

const feature = {
  type: "Feature",
  properties: {
    name: "India",
    "ISO3166-1-Alpha-3": "IND",
    "ISO3166-1-Alpha-2": "IN",
    source: "Survey of India (via datameet/maps composite), CC-0 -- simplified in isolation, see script header comment",
  },
  geometry,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(feature));
console.log(`Wrote ${OUT_PATH} (${(fs.statSync(OUT_PATH).size / 1024).toFixed(0)}KB)`);

// Sanity check: verify the Aksai Chin salient (should reach ~80.4°E) survived.
let maxLonInAksaiChinBbox = -999;
function walk(coords, depth) {
  if (depth === 0) {
    const [lon, lat] = coords;
    if (lon >= 77.5 && lon <= 82 && lat >= 33.5 && lat <= 36) maxLonInAksaiChinBbox = Math.max(maxLonInAksaiChinBbox, lon);
  } else {
    for (const c of coords) walk(c, depth - 1);
  }
}
walk(geometry.coordinates, geometry.type === "MultiPolygon" ? 3 : 2);
console.log(`Sanity check: max longitude in Aksai Chin area = ${maxLonInAksaiChinBbox.toFixed(2)}°E (expect ~80.4°E)`);
if (maxLonInAksaiChinBbox < 80) {
  console.error("WARNING: Aksai Chin extent looks truncated -- do not ship this file. Investigate before proceeding.");
  process.exit(1);
}
