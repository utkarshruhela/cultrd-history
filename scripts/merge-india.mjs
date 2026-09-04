// Builds public/data/world.geojson: the modern world basemap with India
// swapped for its full-official-extent geometry.
//
// India's geometry is simplified separately (scripts/simplify-india.mjs)
// and spliced in AFTER the rest of the world is simplified -- never in
// the same mapshaper pass. See simplify-india.mjs's header comment for
// why: co-simplifying India with China's overlapping claim caused
// mapshaper's topology repair to silently chop off Aksai Chin.
import fs from "node:fs";
import { execSync } from "node:child_process";

const worldRawPath = "./public/data/world-raw.geojson";
const indiaSimplifiedPath = "./public/data/india-simplified.geojson";
const noIndiaTmpPath = "/tmp/world-no-india.geojson";
const noIndiaSimplifiedTmpPath = "/tmp/world-no-india-simplified.geojson";
const outPath = "./public/data/world.geojson";

if (!fs.existsSync(indiaSimplifiedPath)) {
  console.error(`${indiaSimplifiedPath} not found -- run: node scripts/simplify-india.mjs <path-to-india-composite.geojson>`);
  process.exit(1);
}

const worldRaw = JSON.parse(fs.readFileSync(worldRawPath, "utf8"));
const before = worldRaw.features.length;
worldRaw.features = worldRaw.features.filter((f) => {
  const p = f.properties || {};
  const name = (p.name || p.NAME || p.ADMIN || "").toString().toLowerCase();
  const iso3 = (p["ISO3166-1-Alpha-3"] || p.ISO_A3 || p.iso_a3 || "").toString().toUpperCase();
  return name !== "india" && iso3 !== "IND";
});
console.log(`Removed ${before - worldRaw.features.length} existing India feature(s) from world basemap.`);
fs.writeFileSync(noIndiaTmpPath, JSON.stringify(worldRaw));

execSync(
  `npx mapshaper "${noIndiaTmpPath}" -simplify dp 8% keep-shapes -clean -o "${noIndiaSimplifiedTmpPath}" format=geojson precision=0.0001`,
  { stdio: "inherit" },
);

const worldSimplified = JSON.parse(fs.readFileSync(noIndiaSimplifiedTmpPath, "utf8"));
const india = JSON.parse(fs.readFileSync(indiaSimplifiedPath, "utf8"));
worldSimplified.features.push(india);

fs.writeFileSync(outPath, JSON.stringify(worldSimplified));
console.log(`Wrote ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)}MB, ${worldSimplified.features.length} features)`);
