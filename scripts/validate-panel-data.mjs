// Validates the curated layers that power the right panel. Raw map names are
// deliberately broader than this collection; this script instead prevents
// silent broken joins between a curated polity and its cultural records.
import { execSync } from "node:child_process";

execSync(
  "npx tsc --module commonjs --target es2020 --outDir /tmp/panel-data-check --ignoreConfig src/data/culturalWorks.ts src/data/politicalEntities.ts src/data/polityCulturalLinks.ts src/types.ts",
  { stdio: "inherit" },
);

const { CULTURAL_WORKS } = await import("/tmp/panel-data-check/data/culturalWorks.js");
const { POLITICAL_ENTITIES } = await import("/tmp/panel-data-check/data/politicalEntities.js");
const { POLITY_CULTURAL_LINKS } = await import("/tmp/panel-data-check/data/polityCulturalLinks.js");

const polities = new Set(POLITICAL_ENTITIES.map((entity) => entity.id));
const works = new Set(CULTURAL_WORKS.map((work) => work.id));
let ok = true;

for (const link of POLITY_CULTURAL_LINKS) {
  if (!polities.has(link.polityId)) {
    console.error(`Unknown polityId: ${link.polityId}`);
    ok = false;
  }
  if (!works.has(link.culturalWorkId)) {
    console.error(`Unknown culturalWorkId: ${link.culturalWorkId}`);
    ok = false;
  }
  if (link.start > link.end || !link.note) {
    console.error(`Invalid period or empty note for ${link.polityId} -> ${link.culturalWorkId}`);
    ok = false;
  }
}

// This is a coverage guard, not a claim that every polity is fully curated.
// It prevents a future edit from accidentally leaving an era of the product's
// displayed timeline with no curated achievement at all.
const eras = [
  [-3400, -2500, "early writing states"],
  [-2500, -1500, "Bronze Age"],
  [-1500, -500, "early classical"],
  [-500, 0, "classical"],
  [0, 500, "late classical"],
  [500, 1000, "early medieval"],
  [1000, 1500, "high medieval"],
  [1500, 1800, "early modern"],
  [1800, 1950, "industrial modern"],
  [1950, 2026, "contemporary"],
];
console.log("\nTimeline coverage:");
for (const [start, end, label] of eras) {
  const count = CULTURAL_WORKS.filter((work) => {
    const workEnd = work.yearEnd ?? work.yearStart;
    return work.yearStart <= end && workEnd >= start;
  }).length;
  console.log(`  ${label}: ${count} works`);
  if (count === 0) {
    console.error(`No curated works cover the ${label} era.`);
    ok = false;
  }
}

console.log(`${POLITICAL_ENTITIES.length} curated polities, ${CULTURAL_WORKS.length} cultural works, ${POLITY_CULTURAL_LINKS.length} panel links.`);
if (!ok) process.exit(1);
console.log("Panel-data validation passed.");
