// Reports actual historical-map name/slice coverage, sorted by the number of
// feature occurrences that still fall back to an uncatalogued map panel.
// This is deliberately a report, not a pass/fail gate: labels such as
// “Polynesians” are valid cultural-region contexts rather than missing states.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const outputDir = "/tmp/historyflow-panel-report";
execSync(
  `npx tsc --module commonjs --target es2020 --outDir ${outputDir} --ignoreConfig src/data/politicalEntities.ts src/data/mapLabelContexts.ts src/data/polityCulturalLinks.ts src/data/timelineEvents.ts src/types.ts`,
  { stdio: "inherit" },
);
const { findPoliticalEntity } = await import(`${outputDir}/data/politicalEntities.js`);
const { findMapLabelContext } = await import(`${outputDir}/data/mapLabelContexts.js`);
const { culturalWorksForPolity } = await import(`${outputDir}/data/polityCulturalLinks.js`);
const { TIMELINE_MIN_YEAR, TIMELINE_MAX_YEAR } = await import(`${outputDir}/data/timelineEvents.js`);

const mapDir = "public/data/historical";
const fallback = new Map();
let total = 0;
let curated = 0;
let contextualized = 0;
let withAchievements = 0;
let withCreation = 0;
const profileGaps = new Map();
const available = JSON.parse(fs.readFileSync(path.join(mapDir, "index.json"), "utf8"))
  .slices.filter((slice) => slice.featureCount > 0).sort((a, b) => a.year - b.year);
// Match the UI's held-snapshot selection, including the snapshot held at
// the timeline's opening year even if its source date is earlier.
const initial = available.filter((slice) => slice.year <= TIMELINE_MIN_YEAR).at(-1) ?? available[0];
const reachable = available.filter((slice) => slice === initial ||
  (slice.year > TIMELINE_MIN_YEAR && slice.year <= TIMELINE_MAX_YEAR));
let bceOccurrences = 0;

for (const { key, year } of reachable) {
  const file = `${key}.geojson`;
  const parsed = JSON.parse(fs.readFileSync(path.join(mapDir, file), "utf8"));
  for (const feature of parsed.features ?? []) {
    const name = feature.properties?.NAME;
    if (!name) continue;
    total++;
    if (year < 0) bceOccurrences++;
    const entity = findPoliticalEntity(name, year);
    if (entity) {
      curated++;
      const works = culturalWorksForPolity(entity.id, year);
      if (works.length) withAchievements++;
      if (works.some(({ link }) => link.relationship !== "transmitted")) withCreation++;
      if (!works.length) {
        const gap = profileGaps.get(entity.id) ?? { count: 0, years: new Set() };
        gap.count++;
        gap.years.add(year);
        profileGaps.set(entity.id, gap);
      }
      continue;
    }
    if (findMapLabelContext(name)) {
      contextualized++;
      continue;
    }
    const entry = fallback.get(name) ?? { count: 0, years: new Set() };
    entry.count++;
    entry.years.add(year);
    fallback.set(name, entry);
  }
}

console.log(`Political-profile occurrences: ${curated}/${total} (${Math.round((curated / total) * 100)}%)`);
console.log(`Sourced regional-context occurrences: ${contextualized}/${total} (${Math.round((contextualized / total) * 100)}%)`);
console.log(`Panels with a curated profile or context card: ${curated + contextualized}/${total} (${Math.round(((curated + contextualized) / total) * 100)}%)`);
console.log(`Still-generic fallback labels: ${fallback.size}`);
console.log(`Profile occurrences with a visible cultural work: ${withAchievements}/${total}`);
console.log(`Profile occurrences with production or patronage (beyond transmission): ${withCreation}/${total}`);
console.log(`Profile occurrences without a visible cultural work: ${curated - withAchievements}`);
console.log(`Historical snapshots audited: ${reachable.length}; BCE feature occurrences: ${bceOccurrences}`);
console.log("Context cards provide background only; they are not completed achievement curation. Counts describe map snapshot occurrences, not every year or every subject domain.");
console.log("\ncount\tprofile missing visible works\tsnapshot years");
for (const [id, entry] of [...profileGaps.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))) {
  console.log(`${entry.count}\t${id}\t${[...entry.years].sort((a, b) => a - b).join(",")}`);
}
console.log("\ncount\tlabel\tsnapshot years");
for (const [label, entry] of [...fallback.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))) {
  console.log(`${entry.count}\t${label}\t${[...entry.years].sort((a, b) => a - b).join(",")}`);
}
