// Builds /tmp/preview-bundle.js (window.__HISTORY_PORTAL_BUNDLE__ = {...})
// -- a size-budgeted subset of the full dataset (all of public/data/world.geojson,
// plus enough historical-basemaps slices to cover every sample timeline event
// and every India-override year, filled out with the smallest remaining
// slices up to a byte budget) -- then runs the singlefile preview build.
//
// This is ONLY for the published live-preview Artifact. The real app
// (npm run dev / build) always fetches the full 53-slice dataset from
// public/data/ normally; this script and vite.preview.config.ts don't
// affect that path at all.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const BUDGET_BYTES = 9.5 * 1024 * 1024;
const OVERRIDE_YEARS = new Set([1960, 1994, 2000, 2010]);
const EVENT_YEARS = [
  -3200, -3100, -2600, -2334, -1792, -1600, -1450, -1200, -776, -753, -550, -336, -221, -27, 100,
  320, 476, 622, 711, 793, 1066, 1206, 1300, 1347, 1453, 1492, 1526, 1600, 1789, 1857, 1912, 1914,
  1939, 1945, 1947, 1991,
];

const index = JSON.parse(fs.readFileSync("public/data/historical/index.json", "utf8"));
const allSlices = index.slices.filter((s) => s.featureCount > 0);

function nearestSliceYear(year) {
  let best = allSlices[0];
  for (const s of allSlices) {
    if (s.year <= year) best = s;
    else break;
  }
  return best.year;
}

const mustKeepYears = new Set([
  ...EVENT_YEARS.map(nearestSliceYear),
  ...OVERRIDE_YEARS,
  -4000,
  -3000,
  -2000,
]);

let kept = allSlices.filter((s) => mustKeepYears.has(s.year));
let bytes = kept.reduce((a, s) => a + s.bytes, 0);

const remaining = allSlices.filter((s) => !mustKeepYears.has(s.year)).sort((a, b) => a.bytes - b.bytes);
for (const s of remaining) {
  if (bytes + s.bytes > BUDGET_BYTES) continue;
  kept.push(s);
  bytes += s.bytes;
}
kept.sort((a, b) => a.year - b.year);

const world = JSON.parse(fs.readFileSync("public/data/world.geojson", "utf8"));
const trimmedIndex = { slices: kept };
const slices = {};
for (const s of kept) {
  slices[s.key] = JSON.parse(fs.readFileSync(path.join("public/data/historical", `${s.key}.geojson`), "utf8"));
}

const bundle = { world, index: trimmedIndex, slices };
const bundleJson = JSON.stringify(bundle);
fs.writeFileSync("/tmp/preview-bundle.js", `window.__HISTORY_PORTAL_BUNDLE__ = ${bundleJson};`);
console.log(
  `Preview bundle: ${kept.length}/${allSlices.length} slices, ${(bundleJson.length / 1024 / 1024).toFixed(2)}MB`,
);

execSync("npx vite build --config vite.preview.config.ts", { stdio: "inherit" });

const builtHtmlPath = "dist-preview/index.html";
const html = fs.readFileSync(builtHtmlPath, "utf8");

// Strip the outer <!doctype>/<html>/<head>/<body> wrapper -- the Artifact
// tool supplies its own skeleton and expects page CONTENT only.
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
const headInner = headMatch ? headMatch[1] : "";
const bodyInner = bodyMatch ? bodyMatch[1] : "";

// Keep only <title> and <style>/<script> from head (drop <meta charset>,
// <meta viewport> -- the Artifact skeleton already supplies those).
const keepFromHead = [...headInner.matchAll(/<title>[\s\S]*?<\/title>|<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>/g)]
  .map((m) => m[0])
  .join("\n");

const finalContent = `${keepFromHead}\n${bodyInner}`;
fs.writeFileSync("/tmp/artifact-content.html", finalContent);
console.log(`Wrote /tmp/artifact-content.html (${(finalContent.length / 1024 / 1024).toFixed(2)}MB)`);
