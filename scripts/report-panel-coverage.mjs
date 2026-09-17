// Reports historical-map and modern-endpoint coverage, sorted by the number of
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
const subjects = {
  architecture: (work) => work.discipline === "architecture",
  art: (work) => work.domain === "arts" && !["architecture", "music-performance"].includes(work.discipline),
  music: (work) => work.discipline === "music-performance",
  philosophy: (work) => work.domain === "philosophy",
  stem: (work) => work.domain === "stem",
};
const subjectCounts = Object.fromEntries(Object.keys(subjects).map((key) => [key, { visible: 0, production: 0 }]));
const subjectGaps = new Map();
let allSubjects = 0;
const available = JSON.parse(fs.readFileSync(path.join(mapDir, "index.json"), "utf8"))
  .slices.filter((slice) => slice.featureCount > 0).sort((a, b) => a.year - b.year);
// Match the UI's held-snapshot selection, including the snapshot held at
// the timeline's opening year even if its source date is earlier.
const initial = available.filter((slice) => slice.year <= TIMELINE_MIN_YEAR).at(-1) ?? available[0];
const reachable = available.filter((slice) => slice === initial ||
  (slice.year > TIMELINE_MIN_YEAR && slice.year <= TIMELINE_MAX_YEAR));
let bceOccurrences = 0;
let modernOccurrences = 0;
const auditLayers = reachable.map(({ key, year }) => ({
  file: path.join(mapDir, `${key}.geojson`), snapshotYear: year, selectedYear: year,
}));
// The UI uses the present-day layer after the last historical snapshot.
// Audit it at the displayed endpoint, retaining null for profile lookup but
// the selected timeline year for achievement visibility, as InfoPanel does.
if (TIMELINE_MAX_YEAR > available.at(-1).year) {
  auditLayers.push({ file: "public/data/world.geojson", snapshotYear: null, selectedYear: TIMELINE_MAX_YEAR });
}

for (const { file, snapshotYear, selectedYear: year } of auditLayers) {
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const feature of parsed.features ?? []) {
    const name = snapshotYear === null ? feature.properties?.name : feature.properties?.NAME;
    if (!name) continue;
    total++;
    if (year < 0) bceOccurrences++;
    if (snapshotYear === null) modernOccurrences++;
    const entity = findPoliticalEntity(name, snapshotYear);
    if (entity) {
      curated++;
      const works = culturalWorksForPolity(entity.id, year);
      const missing = [];
      for (const [subject, matches] of Object.entries(subjects)) {
        const relevant = works.filter(({ work }) => matches(work));
        if (relevant.length) subjectCounts[subject].visible++;
        else missing.push(subject);
        if (relevant.some(({ link }) => link.relationship !== "transmitted")) subjectCounts[subject].production++;
      }
      if (!missing.length) allSubjects++;
      // Keep dates separate: a later achievement cannot fill an earlier gap.
      if (missing.length) subjectGaps.set(`${entity.id}/${year}`, { id: entity.id, year, missing });
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
console.log(`Modern endpoint audited: ${TIMELINE_MAX_YEAR}; modern feature occurrences: ${modernOccurrences}`);
console.log("Context cards provide background only; they are not completed achievement curation. Counts describe map snapshot occurrences, not every year or every subject domain.");
console.log("\nSubject coverage (feature occurrences; art includes literature):");
for (const [subject, counts] of Object.entries(subjectCounts)) {
  console.log(`${subject}: ${counts.visible}/${total} visible; ${counts.production}/${total} production or patronage`);
}
console.log(`Occurrences with all five subject categories represented: ${allSubjects}/${total}`);
console.log("Subject gaps are research tasks, not permission to invent achievements. Even five represented categories do not prove completeness or source quality.");
// Keep repeated progress audits readable without dropping the exhaustive
// research backlog from the default report.
if (process.argv.includes("--summary")) process.exit(0);
console.log("\nprofile\tyear\tmissing subjects");
for (const gap of [...subjectGaps.values()].sort((a, b) => b.missing.length - a.missing.length || a.id.localeCompare(b.id) || a.year - b.year)) {
  console.log(`${gap.id}\t${gap.year}\t${gap.missing.join(",")}`);
}
console.log("\ncount\tprofile missing visible works\tsnapshot years");
for (const [id, entry] of [...profileGaps.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))) {
  console.log(`${entry.count}\t${id}\t${[...entry.years].sort((a, b) => a - b).join(",")}`);
}
console.log("\ncount\tlabel\tsnapshot years");
for (const [label, entry] of [...fallback.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))) {
  console.log(`${entry.count}\t${label}\t${[...entry.years].sort((a, b) => a - b).join(",")}`);
}
