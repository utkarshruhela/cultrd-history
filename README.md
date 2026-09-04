# CULTRD HISTORY

*(working title; the codebase/directory is still named `history-portal` — a fuller rename can
follow once the cultural-works layer below is wired into the UI.)*

An interactive history portal: a clickable world map + a scrollable timeline (4000 BCE → 2026)
showing who ruled what, where, at any point in time — and, in progress, what literature, art, and
architecture the world was producing at the same time. See "CULTRD HISTORY: cultural works" below
for the new layer.

## What's in this version

- **Interactive world map.** Click any region to see who ruled it; hover for a name tooltip.
  Color is per *ruling power* (the `SUBJECTO` field — see "How the map picks a year" below), so
  e.g. every territory belonging to the British Empire gets the same color wherever it is, even
  across different time slices.
- **Real historical boundaries**, from ~4000 BCE through 2010, sourced from
  [`aourednik/historical-basemaps`](https://github.com/aourednik/historical-basemaps) (53 discrete
  year-snapshots) — see "Data sources" below for what was filtered out and why, and its license
  implications.
- **Modern political map** for 2011–2026 (no snapshot needed that recently), built from
  `datasets/geo-countries` (public domain).
- **India is rendered at its full official extent everywhere it appears as a named entity** — all
  of Jammu & Kashmir, plus Aksai Chin — per the Survey of India boundary, via the `datameet/maps`
  composite dataset (CC-0). This override is applied to the modern map and to every
  post-independence historical slice (1960, 1994, 2000, 2010). Pre-1947 "India" (British Raj-era
  slices) is left as the source dataset drew it, since that's a genuinely different historical
  entity (undivided India, spanning today's Pakistan and Bangladesh too) — overriding it with the
  modern shape would misrepresent history rather than fix a political-sensitivity issue.
- **Written-history-only filtering.** Prehistoric/archaeological entries (hunter-gatherer groups,
  named archaeological "cultures" with no attested writing, broad ethnic-group placeholder labels)
  are filtered out — see "Data sources" for exactly how and its limits. Scrub back to ~4000 BCE and
  only Mesopotamia/Egypt/the Indus Valley/the Aegean are lit; the rest of the world is dark because
  the underlying dataset has no political/cultural entity there yet, not because of extra logic on
  our end.
- **Scrollable/draggable timeline**, 4000 BCE → 2026 CE. Drag the handle, scroll/wheel to scrub, or
  use arrow keys. Releasing a drag near a known event snaps to it exactly; clicking an event tick
  jumps straight to it. (The event list itself — `timelineEvents.ts` — is still a small,
  illustrative ~35-entry sample, not a comprehensive one.)
- **Info panel**: click a region to see who ruled it, what it's part of, and the source's border
  confidence (approximate / moderate / precise), plus a Wikipedia link when the source dataset has
  one.

## How the map picks a year

The historical dataset is 53 discrete snapshots (e.g. 1900, 1914, 1920, ...), not continuous data.
For a scrubbed year that falls between two snapshots, the map shows the **most recent snapshot at
or before** that year — i.e. "hold the last known state until the next known one." A small note
appears in the header ("showing boundaries as of ...") whenever the displayed boundaries aren't
exactly the scrubbed year. Past 2010 (the last historical slice), the map switches to the modern
political map automatically.

## Stack

- Vite + React + TypeScript
- Leaflet / react-leaflet for the map (no tile provider — we draw our own polygons only, since a
  modern street/political tile layer would be thematically wrong for a historical map)
- Plain CSS (no framework) — dark "atlas" theme

## Running it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Project layout

```
src/
  components/
    WorldMap.tsx        map: picks/loads the right layer for the year, imperative Leaflet, coloring
    Timeline.tsx         scrollable/draggable timeline with event-snapping
    InfoPanel.tsx         right-hand panel for the selected region
  hooks/
    useHistoricalData.ts  picks the active time slice for a year, lazy-loads + caches it
  lib/
    color.ts               deterministic name -> color (same ruler = same color everywhere)
  data/
    timelineEvents.ts       sample events for the timeline snap mechanic (still illustrative)
  types.ts
public/
  data/
    world.geojson          modern basemap (India overridden with full extent)
    historical/
      <slice>.geojson       one file per historical-basemaps time slice (lazy-loaded)
      index.json             which slices exist, in what order
scripts/
  merge-india.mjs             regenerates world.geojson from source data (see below)
  process-historical.mjs      regenerates public/data/historical/ from a historical-basemaps clone
  nonLiterateExclusions.json  the written-history-only blocklist (see "Data sources")
```

## Data sources

**Modern world basemap + India's boundary**: `datasets/geo-countries` (Natural Earth-derived,
public domain) for every country except India, which is swapped for
[`datameet/maps`](https://github.com/datameet/maps) `Country/india-composite.geojson` — described
by that project as matching "the official boundary of India as per the Survey of India," and
including Jammu & Kashmir, Aksai Chin, Pakistan-occupied Kashmir/Gilgit-Baltistan, and the Shaksgam
Valley. License: CC-0 (public domain). `scripts/merge-india.mjs` does the swap and `mapshaper`
simplifies the result to a ~1.5MB `public/data/world.geojson`.

**Historical boundaries**: [`aourednik/historical-basemaps`](https://github.com/aourednik/historical-basemaps),
53 GeoJSON snapshots from 123,000 BCE to 2010 CE, each feature carrying `NAME` (the specific
polity/entity), `SUBJECTO` (who it's subject to — the sovereign/colonial power; equals `NAME` when
independent), `PARTOF`, and `BORDERPRECISION` (1–3 confidence). **License: GPL-3.0.** The project's
own README describes it as "work in progress" — treat any given entry as a starting point, not a
citation. `scripts/process-historical.mjs` (needs a local clone of that repo — see the script's
header comment) filters, trims, and simplifies it into `public/data/historical/`.

> **Licensing note**: because the historical boundary *data* is GPL-3.0, `public/data/historical/`
> is a derivative of GPL-3.0 material. That has implications if this project is ever distributed
> or monetized beyond a personal side project — worth getting real advice on before that happens,
> rather than assuming the rest of the (otherwise unlicensed) code can be treated independently
> from the data it ships.

**Written-history-only filtering**: `scripts/nonLiterateExclusions.json` is a ~160-name blocklist
applied by `NAME` (case-insensitive) when processing the historical slices. It combines (a)
pattern rules — anything matching `hunter`, `gather`, `forag`, `nomad`, `pastoral`, `aboriginal`,
`tribe`, `culture`, `herder`, `fisher`, `farmer`, or `peoples` — plus explicit broad
ethnic/ethnolinguistic placeholder labels (e.g. "Bantu", "Dravidians", "Semites") that represent a
whole population rather than a specific literate polity, with (b) a **manual, entity-by-entity
review of every one of the ~71 names first appearing before 700 BCE** (i.e. everything relevant to
the "who has written history at all yet" question), each individually judged for whether it
represents an attested writing tradition. Entities first appearing after 700 BCE rely on the
pattern rules alone — by that period the dataset is overwhelmingly named kingdoms/states/empires,
so the miss rate should be low, but it has **not** been manually audited the way the earliest
entries were. A few judgment calls worth knowing about: the Indus Valley Civilization and Minoan
Crete are *kept* despite their scripts being undeciphered (both are near-universally treated as
early literate/proto-literate civilizations in popular history); Vedic-era India, the legendary Xia
dynasty, and the Norte Chico/Caral civilization are *excluded* since their traditions were oral,
semi-legendary, or non-script (quipu) respectively by current mainstream scholarly consensus. These
are all defensible-but-arguable calls, not settled fact — see "Data roadmap" for tightening this
up.

## CULTRD HISTORY: cultural works

A new layer, in progress, covering what literature, visual art, and architecture each
civilization/tradition produced — not yet wired into the map UI, but the schema and a pilot
dataset are built and validated.

- **Schema**: `CivilizationRegion` and `CulturalWork`, in `src/types.ts`. A cultural work is tagged
  to a *civilization/tradition* (`civilizationId`), not to the exact political entity the map uses
  — a poet's career or an artistic tradition typically outlives any one ruler, so forcing every
  work onto one `SUBJECTO` would misrepresent it. Each `CivilizationRegion` gets one representative
  lat/lon for map placement (not a precise findspot) and a rough active date span.
- **Per-work licensing**: unlike the boundary data (one dataset, one license), cultural material
  comes from many sources with different terms per item — `license` and `dataSource` are tracked
  on every single record, not once for the whole file. Learned this the hard way from the
  historical-basemaps GPL-3.0 surprise above; not repeating it here.
- **Pilot dataset**: `src/data/culturalWorks.ts` — 49 hand-curated works across 17 civilizations/
  traditions (Mesopotamia, Egypt, Greece, Rome, Vedic/Classical India, Imperial China, the Islamic
  Golden Age, the Maya, the Aztec, the Kingdom of Zimbabwe, Ife/Yoruba, the Mali Empire, Aksum/
  medieval Ethiopia, medieval/Renaissance Europe, classical/feudal Japan, the Khmer Empire, and
  classical Java), deliberately balanced rather than weighted toward whichever tradition has the
  easiest English-language sources. Candidate sources for scaling this up past the pilot: Wikidata
  (SPARQL) as a cross-referencing backbone, Perseus Digital Library and the Chinese Text Project for
  classical texts, Project Gutenberg/Internet Archive for full text, and the Met/Smithsonian/
  Europeana/Wikimedia Commons open-access APIs plus the Getty Vocabularies for visual art.
- **Validation**: `node scripts/validate-cultural-works.mjs` — checks every `civilizationId`
  resolves, ids are unique, required fields are present, and flags any work whose date falls well
  outside its civilization's span. Run it after editing the dataset, before committing.
- **Next step**: wire this into the app as a new panel/layer keyed by (scrubbed year, civilization
  tag) — see `claude/history-portal-plan.md` in the project notes for the fuller plan.

## Data roadmap

1. **Extend the manual written-history review past 700 BCE.** Right now only the pre-700-BCE
   entities got individual scrutiny; the keyword/explicit-list rules alone are almost certainly
   missing some later non-literate entries (e.g. a colonized-but-still-indigenous region between
   two snapshots) and may be over- or under-inclusive in edge cases.
2. **Expand `timelineEvents.ts`** well beyond the ~35 sample events.
3. **Consider a non-linear timeline scale** — right now it's linear across 6,026 years, so a whole
   post-1900 century occupies only ~1.6% of the timeline's width. Fine for the "scrub to an era"
   use case, cramped for picking a specific recent year by dragging (clicking a nearby timeline
   event, or using arrow keys, both still work precisely).
4. Consider state/province-level India boundaries (`udit-001/india-maps-data`) if the project ever
   wants sub-national detail for India specifically.
5. Resolve the GPL-3.0 data-licensing question above before this goes beyond a personal project.

## Known limitations

- Historical-basemaps' own author flags it as "work in progress" — some entries, dates, or borders
  will be wrong or oversimplified. This is a starting point for exploring history, not a citable
  source.
- Country/entity borders are simplified (12% Douglas-Peucker for historical slices, 8% for the
  modern map) for file size/performance — fine at world/regional zoom, rough if you zoom in past
  that.
- The timeline is a *linear* year scale (see "Data roadmap" #3).
- Within a historical slice, boundaries are frozen at that snapshot's year — there's no
  interpolation between snapshots, so a war or succession that happened *between* two snapshot
  years won't show up until the next one.
