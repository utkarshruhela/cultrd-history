// Shared types for the History Portal.
//
// Years use astronomical-ish plain integers: negative = BCE, positive = CE.
// e.g. -3200 means "3200 BCE", 1526 means "1526 CE". There is no year 0
// in this simplified scheme (we go ...,-2,-1,1,2,...) which is fine for a
// timeline UI at this resolution.

export interface TimelineEvent {
  year: number;
  label: string;
  /** Loose region tag, shown for context (not used for coloring). */
  region: string;
}

/**
 * Normalized per-feature properties for both the historical map layer
 * (aourednik/historical-basemaps, filtered/simplified -- see
 * scripts/process-historical.mjs) and the modern-day layer
 * (public/data/world.geojson), so the map/info panel can treat both the
 * same way.
 */
export interface EntityProps {
  /** The specific polity/entity occupying this area (e.g. "Bengal"). */
  NAME: string | null;
  /** Who it's ruled by/subject to (e.g. "British Empire"); equals NAME for an independent entity. Used for fill color. */
  SUBJECTO: string | null;
  PARTOF: string | null;
  /** 1 = approximate, 2 = moderate, 3 = precise/well-documented border. null for the modern layer (not applicable). */
  BORDERPRECISION: number | null;
  LINK: string | null;
}

export interface HistoricalSliceMeta {
  year: number;
  key: string;
  featureCount: number;
  bytes: number;
}

// --- Political entity profiles (richer sidebar content) ---
//
// The political map layer above (EntityProps) comes straight from
// historical-basemaps: just a NAME/SUBJECTO/PARTOF/BORDERPRECISION/LINK per
// polygon, per snapshot year -- enough to color and click the map, but no
// description, no sense of the entity's own span of existence, no rulers.
// PoliticalEntityProfile is a separate, hand-curated layer on top: a
// pilot batch of well-documented kingdoms/empires, matched to map clicks by
// exact NAME string (see lib/politicalEntities.ts's findPoliticalEntity).
// Only entities in this pilot get the richer sidebar; everything else keeps
// the existing sparse info panel -- no regression, progressive enrichment.
//
// Deliberately NOT tied 1:1 to CivilizationRegion above: a civilization
// (e.g. "Vedic & Classical India") is a loose, centuries-spanning cultural
// tradition; a PoliticalEntityProfile is one specific, dateable state within
// it (e.g. "Mughal Empire" or "Maratha Confederacy" both sit inside that
// same civilization's span but are distinct, sometimes-overlapping polities).

export type PoliticalEntityKind =
  | "empire"
  | "kingdom"
  | "dynasty"
  | "caliphate"
  | "khanate"
  | "confederacy"
  | "sultanate"
  | "republic"
  | "city-state"
  | "other";

export interface PoliticalRuler {
  name: string;
  reignStart: number;
  /** Omit for a ruler whose reign runs to the entity's own periodEnd (e.g. the state fell during/because of it). */
  reignEnd?: number;
  reignApprox?: boolean;
  /** Short one-line epithet/achievement, e.g. "Angkor Wat built during his reign". */
  note?: string;
}

export interface PoliticalEntityProfile {
  id: string;
  /**
   * Exact NAME string(s) as they appear in historical-basemaps features
   * (see public/data/historical/*.geojson) -- a clicked map entity is
   * matched to this profile by exact string equality against one of these,
   * gated by findPoliticalEntity's year check so a reused name (e.g. "Mali"
   * for both the medieval empire and the modern country) doesn't cross-match.
   */
  nameAliases: string[];
  kind: PoliticalEntityKind;
  /** The entity's own historical span -- shown as "Ruling period" and used (with a buffer) to gate name matching by year. */
  periodStart: number;
  periodEnd: number;
  periodApprox: boolean;
  /** Curated, 2-4 sentences -- not auto-generated. */
  description: string;
  /** Notable rulers, chronological, not exhaustive -- see each dataset entry's dataSource for what was consulted. */
  rulers: PoliticalRuler[];
  /** Per-record rights status, matching the CulturalWork convention. */
  license: string;
  /** Where this record was compiled from, for traceability. */
  dataSource: string;
}

/**
 * An honest sidebar treatment for a map label that denotes a people, region,
 * or loose historical category rather than a dateable sovereign polity.
 */
export interface MapLabelContext {
  nameAliases: string[];
  title: string;
  description: string;
  sourceLink: string;
  sourceLabel: string;
}

// --- CULTRD HISTORY: cultural works (arts / philosophy / STEM) ---
//
// This is a separate, looser-coupled layer from the political map above.
// Cultural works are tagged to a CivilizationRegion (a tradition/civilization,
// e.g. "Classical Greece" or "Mali Empire"), not to an exact political entity
// (SUBJECTO) or an exact set of coordinates -- a poet's or scholar's career
// or a tradition typically outlives any one ruler, and few individual works
// have a single precise findspot the way a modern GPS point would imply.
// Each CivilizationRegion instead gets one representative lat/lon for map
// placement and a rough active date span for timeline context.
//
// Schema decisions (see claude/history-portal-plan.md "CULTRD HISTORY pivot"
// for the fuller rationale):
//  - yearStart/yearEnd/yearApprox are explicit because most classical works
//    only have a date *range* or a scholarly "circa", never a precise year.
//  - license + dataSource are per-work, not per-dataset. Unlike the boundary
//    data (one source, one license), cultural material is pulled from many
//    sources with different terms per item -- learned from the GPL-3.0
//    surprise with historical-basemaps not to leave this for later.
//  - domain/discipline (added when the schema generalized beyond the
//    original arts-only pilot) are a two-level taxonomy: domain is the
//    broad bucket used for map toggles/pin coloring, discipline is the
//    specific field within it. civilizationId is unchanged and orthogonal
//    to both -- a work's domain/discipline doesn't depend on where/when it
//    was made.
//  - `form`/`CulturalForm` from the original arts-only pilot were renamed to
//    `discipline`/`Discipline` (the arts values are unchanged, just widened
//    to sit alongside philosophy's and STEM's) rather than kept as a
//    parallel field -- one taxonomy field, not two overlapping ones.
//  - attribution is a separate, optional field from creator: creator is who
//    is credited as author/maker of *this specific work* (may be null for
//    anonymous/collective works); attribution is an optional secondary note
//    for the intellectual tradition/school credited with the underlying
//    idea, which comes up much more often in STEM and philosophy (e.g. a
//    result credited to "the Pythagorean school" broadly, distinct from
//    whoever wrote it down) than in arts, where the named creator alone
//    usually suffices.

export type Domain = "arts" | "philosophy" | "stem";

export type ArtsDiscipline = "literature" | "visual-art" | "architecture" | "music-performance";
export type PhilosophyDiscipline = "philosophy" | "religion-theology" | "political-legal-thought";
export type StemDiscipline = "mathematics" | "astronomy-physics" | "medicine-biology" | "engineering-invention";
export type Discipline = ArtsDiscipline | PhilosophyDiscipline | StemDiscipline;

/** @deprecated use Discipline (ArtsDiscipline covers the same three values) -- kept only so old references don't silently break. */
export type CulturalForm = ArtsDiscipline;

export interface CivilizationRegion {
  /** Slug, referenced by CulturalWork.civilizationId. */
  id: string;
  /** Display name. */
  label: string;
  /** One-line note on how broad/loose this grouping is, shown in the UI so users don't mistake the pin for a precise findspot. */
  note: string;
  lat: number;
  lon: number;
  /** Rough active span for this tradition, for timeline context only -- not a precise boundary. */
  yearStart: number;
  yearEnd: number;
}

export interface CulturalWork {
  id: string;
  title: string;
  /** Title in the original language/script, where meaningfully different. */
  titleOriginal?: string;
  /** null = anonymous/collective/unknown authorship (common for oral epics, scripture, folk architecture, and some STEM results credited to a school rather than a person). */
  creator: string | string[] | null;
  /** Broad bucket -- drives the per-domain map toggle and pin color. */
  domain: Domain;
  /** Specific field within the domain. Must be one of the Discipline values that belongs to `domain` (arts<->ArtsDiscipline, etc.) -- see validate-cultural-works.mjs. */
  discipline: Discipline;
  /** Free-text sub-category, e.g. "epic poem", "fresco", "temple complex", "surgical treatise", "geometry treatise". */
  subForm: string;
  /** Optional: the school/tradition credited with the underlying idea, when that's a more meaningful attribution than (or in addition to) `creator`. See the header comment above for the creator/attribution distinction. */
  attribution?: string;
  yearStart: number;
  yearEnd?: number;
  /** True when yearStart/yearEnd represent scholarly estimate/consensus range rather than a documented date. */
  yearApprox: boolean;
  civilizationId: string;
  /** Curated, 2-4 sentences -- not auto-generated. */
  description: string;
  imageUrl?: string;
  sourceLink?: string;
  /** Per-work license/rights status (e.g. "Public domain", "CC0", "CC BY-SA 4.0 (photo); work itself PD"). */
  license: string;
  /** Where this record's metadata was compiled from, for traceability. */
  dataSource: string;
}

/**
 * A historically scoped connection between a map polity and a cultural work.
 *
 * This stays separate from `CulturalWork.civilizationId`: a cultural
 * tradition can span many states, while a particular court may have
 * commissioned, patronised, or transmitted a work for only part of that
 * tradition's life.
 */
export interface PolityCulturalLink {
  polityId: string;
  culturalWorkId: string;
  relationship: "commissioned" | "patronised" | "produced" | "transmitted";
  start: number;
  end: number;
  /** A short, panel-ready explanation of the connection. */
  note: string;
  /** Confidence in this polity/work association, distinct from map-border precision. */
  confidence: "high" | "medium";
}
