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
const { POLITY_CULTURAL_LINKS, culturalWorksForPolity } = await import("/tmp/panel-data-check/data/polityCulturalLinks.js");

const polities = new Set(POLITICAL_ENTITIES.map((entity) => entity.id));
const works = new Set(CULTURAL_WORKS.map((work) => work.id));
let ok = true;
const seenLinks = new Set();
const workById = new Map(CULTURAL_WORKS.map((work) => [work.id, work]));

for (const [label, records] of [["polity", POLITICAL_ENTITIES], ["work", CULTURAL_WORKS]]) {
  const ids = new Set();
  for (const record of records) {
    if (ids.has(record.id)) {
      console.error(`Duplicate ${label} ID: ${record.id}`);
      ok = false;
    }
    ids.add(record.id);
  }
}

for (const link of POLITY_CULTURAL_LINKS) {
  const key = `${link.polityId}/${link.culturalWorkId}`;
  if (seenLinks.has(key)) {
    console.error(`Duplicate panel association: ${key}`);
    ok = false;
  }
  seenLinks.add(key);
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
  const work = workById.get(link.culturalWorkId);
  if (work) {
    // Test actual panel selection, not just registry shape. Completed works
    // remain relevant, but neither a future link nor a future object may leak.
    const firstYear = Math.max(link.start, work.yearStart);
    const visible = (year) => culturalWorksForPolity(link.polityId, year)
      .some((entry) => entry.work.id === work.id);
    if (visible(firstYear - 1) || !visible(firstYear) || !visible(Math.max(firstYear, link.end) + 1)) {
      console.error(`Broken cultural visibility boundary: ${key}`);
      ok = false;
    }
    try {
      if (!["http:", "https:"].includes(new URL(work.sourceLink).protocol)) throw new Error();
    } catch {
      console.error(`Missing or malformed achievement title source: ${work.id}`);
      ok = false;
    }
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
