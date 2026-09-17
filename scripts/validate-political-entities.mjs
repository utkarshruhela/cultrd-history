// Sanity-checks src/data/politicalEntities.ts: ids and name aliases are
// unique, periods make sense, rulers are chronological and fall inside
// their entity's own period, required fields are present. Run after
// editing that file, before committing.
import { execSync } from "node:child_process";

execSync(
  `npx tsc --module commonjs --target es2020 --outDir /tmp/pe-check --ignoreConfig src/data/politicalEntities.ts src/types.ts`,
  { stdio: "inherit" },
);
const { POLITICAL_ENTITIES } = await import("/tmp/pe-check/data/politicalEntities.js");

let ok = true;
const ids = new Set();
const aliasOwner = new Map();

for (const e of POLITICAL_ENTITIES) {
  if (ids.has(e.id)) {
    console.error(`Duplicate PoliticalEntityProfile id: ${e.id}`);
    ok = false;
  }
  ids.add(e.id);

  if (!e.nameAliases || e.nameAliases.length === 0) {
    console.error(`"${e.id}" has no nameAliases -- it can never match a map click.`);
    ok = false;
  }
  for (const alias of e.nameAliases ?? []) {
    const owners = aliasOwner.get(alias) ?? [];
    for (const other of owners) {
      // Reused map labels are valid when their documented state periods do
      // not overlap. The runtime matcher prefers an exact interval before it
      // consults its coarse-snapshot buffer, so immediately adjacent
      // successor states remain unambiguous.
      const overlaps = e.periodStart <= other.periodEnd && other.periodStart <= e.periodEnd;
      if (overlaps) {
        console.error(`nameAlias "${alias}" has overlapping profiles "${other.id}" and "${e.id}".`);
        ok = false;
      }
    }
    owners.push(e);
    aliasOwner.set(alias, owners);
  }

  if (!e.description || !e.kind || !e.license || !e.dataSource) {
    console.error(`"${e.id}" is missing a required field (description/kind/license/dataSource).`);
    ok = false;
  }

  if (typeof e.periodStart !== "number" || typeof e.periodEnd !== "number" || e.periodStart >= e.periodEnd) {
    console.error(`"${e.id}" has an invalid period (${e.periodStart}..${e.periodEnd}) -- start must be before end.`);
    ok = false;
  }

  if (!e.rulers || e.rulers.length === 0) {
    console.warn(`"${e.id}" has no rulers listed.`);
  } else {
    let prevStart = -Infinity;
    for (const r of e.rulers) {
      if (!r.name || typeof r.reignStart !== "number") {
        console.error(`"${e.id}" has a ruler missing name/reignStart: ${JSON.stringify(r)}`);
        ok = false;
        continue;
      }
      if (r.reignEnd !== undefined && r.reignEnd < r.reignStart) {
        console.error(`"${e.id}"'s ruler "${r.name}" has reignEnd before reignStart.`);
        ok = false;
      }
      if (r.reignStart < prevStart) {
        console.warn(`"${e.id}"'s rulers are not in chronological order at "${r.name}" -- double check.`);
      }
      prevStart = r.reignStart;

      const BUFFER = 30; // founders sometimes predate the entity's "official" founding year slightly
      if (r.reignStart < e.periodStart - BUFFER || r.reignStart > e.periodEnd + BUFFER) {
        console.warn(
          `"${e.id}"'s ruler "${r.name}" (starts ${r.reignStart}) falls outside its entity's period (${e.periodStart}..${e.periodEnd}) -- double check.`,
        );
      }
    }
  }
}

console.log(`${POLITICAL_ENTITIES.length} political entity profiles.`);
const perKind = {};
for (const e of POLITICAL_ENTITIES) perKind[e.kind] = (perKind[e.kind] ?? 0) + 1;
console.log("By kind:");
for (const [kind, count] of Object.entries(perKind)) {
  console.log(`  ${count.toString().padStart(2)}  ${kind}`);
}

if (!ok) {
  console.error("\nValidation FAILED.");
  process.exit(1);
}
console.log("\nValidation passed.");
