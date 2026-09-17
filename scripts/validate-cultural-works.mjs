// Sanity-checks src/data/culturalWorks.ts: every work references a real
// civilization, ids are unique, required fields are present, and
// domain/discipline pairs are internally consistent. Run after editing that
// file, before committing -- catches typos/broken references that
// TypeScript's structural typing won't (civilizationId, and the
// domain<->discipline relationship, are just strings from tsc's point of
// view -- it won't stop "domain: stem, discipline: literature").
import { execSync } from "node:child_process";
import fs from "node:fs";

const DISCIPLINES_BY_DOMAIN = {
  arts: ["literature", "visual-art", "architecture", "music-performance"],
  philosophy: ["philosophy", "religion-theology", "political-legal-thought"],
  stem: ["mathematics", "astronomy-physics", "medicine-biology", "engineering-invention"],
};

const tsSource = fs.readFileSync("./src/data/culturalWorks.ts", "utf8");

// Cheap approach: shell out to a tiny esbuild-free extraction via node's
// --experimental-strip-types would be nicer, but to keep this dependency-free
// we just re-require via ts-node-less transpile using the TypeScript compiler
// already in node_modules.
execSync(
  `npx tsc --module commonjs --target es2020 --outDir /tmp/cw-check --ignoreConfig src/data/culturalWorks.ts src/types.ts`,
  { stdio: "inherit" },
);
const { CIVILIZATIONS, CULTURAL_WORKS } = await import("/tmp/cw-check/data/culturalWorks.js");

let ok = true;
const civIds = new Set(CIVILIZATIONS.map((c) => c.id));
if (civIds.size !== CIVILIZATIONS.length) {
  console.error("Duplicate CivilizationRegion id detected.");
  ok = false;
}

const workIds = new Set();
for (const w of CULTURAL_WORKS) {
  if (workIds.has(w.id)) {
    console.error(`Duplicate CulturalWork id: ${w.id}`);
    ok = false;
  }
  workIds.add(w.id);

  if (!civIds.has(w.civilizationId)) {
    console.error(`"${w.id}" references unknown civilizationId "${w.civilizationId}"`);
    ok = false;
  }

  const civ = CIVILIZATIONS.find((c) => c.id === w.civilizationId);
  if (civ) {
    const y = w.yearStart;
    if (y < civ.yearStart - 100 || y > civ.yearEnd + 100) {
      console.warn(
        `"${w.id}" (${y}) is well outside "${civ.label}"'s span (${civ.yearStart}..${civ.yearEnd}) -- double check.`,
      );
    }
  }

  if (!w.title || !w.description || !w.license || !w.dataSource) {
    console.error(`"${w.id}" is missing a required field (title/description/license/dataSource).`);
    ok = false;
  }

  if (!w.domain || !DISCIPLINES_BY_DOMAIN[w.domain]) {
    console.error(`"${w.id}" has an unknown domain "${w.domain}".`);
    ok = false;
  } else if (!DISCIPLINES_BY_DOMAIN[w.domain].includes(w.discipline)) {
    console.error(`"${w.id}" has discipline "${w.discipline}" which doesn't belong to domain "${w.domain}".`);
    ok = false;
  }
}

const perCiv = {};
const perDomain = {};
for (const w of CULTURAL_WORKS) {
  perCiv[w.civilizationId] = (perCiv[w.civilizationId] ?? 0) + 1;
  perDomain[w.domain] = (perDomain[w.domain] ?? 0) + 1;
}
console.log(`${CIVILIZATIONS.length} civilizations, ${CULTURAL_WORKS.length} works.`);
for (const c of CIVILIZATIONS) {
  console.log(`  ${(perCiv[c.id] ?? 0).toString().padStart(2)}  ${c.label}`);
  if (!perCiv[c.id]) {
    console.error(`"${c.label}" has zero works.`);
    ok = false;
  }
}
console.log("\nBy domain:");
for (const domain of Object.keys(DISCIPLINES_BY_DOMAIN)) {
  console.log(`  ${(perDomain[domain] ?? 0).toString().padStart(2)}  ${domain}`);
}

if (!ok) {
  console.error("\nValidation FAILED.");
  process.exit(1);
}
console.log("\nValidation passed.");
