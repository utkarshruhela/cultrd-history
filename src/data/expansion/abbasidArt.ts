import type { CulturalWork, PolityCulturalLink } from "../../types";

/** Museum-dated examples of Abbasid Iraqi ceramic design, not royal commissions. */
export const ABBASID_ART_WORKS: CulturalWork[] = [
  {
    id: "abbasid-ruby-luster-palmette-bowl",
    title: "Ruby-luster bowl with a palmette",
    creator: null,
    attribution: "Anonymous potters; attributed to Iraq",
    domain: "arts",
    discipline: "visual-art",
    subForm: "polychrome luster-painted earthenware",
    yearStart: 801,
    yearEnd: 900,
    yearApprox: true,
    civilizationId: "islamic_golden_age",
    description: "This ninth-century bowl combines reddish and gold-colored luster around a central palmette, illustrating the varied metallic surfaces achieved by early Abbasid ceramic workshops. The museum attributes it to Iraq; neither its maker nor a court patron is known. The dates represent the catalogued century, not a documented production year.",
    sourceLink: "https://www.metmuseum.org/art/collection/search/447463",
    license: "Historical facts; original summary",
    dataSource: "Metropolitan Museum of Art, Ruby Luster Bowl with Large Palmette, object 22.49.1: ninth century, attributed to Iraq.",
  },
  {
    id: "abbasid-green-splash-bowl",
    title: "Green-splashed bowl with a Kufic blessing",
    creator: null,
    attribution: "Anonymous Iraqi potters; probably Basra",
    domain: "arts",
    discipline: "visual-art",
    subForm: "glazed earthenware and calligraphic decoration",
    yearStart: 801,
    yearEnd: 900,
    yearApprox: true,
    civilizationId: "islamic_golden_age",
    description: "Iraqi potters adapted the appearance of imported Chinese ceramics in this white-glazed bowl, directing green streaks toward a blue Kufic inscription offering good wishes. The object shows how international trade informed local ceramic design and calligraphy. Its ninth-century date is approximate, and Basra is a probable rather than certain production site.",
    sourceLink: "https://www.metmuseum.org/art/collection/search/448539",
    license: "Historical facts; original summary",
    dataSource: "Metropolitan Museum of Art, Bowl with Green Splashes, object 30.112.46: ninth century, made in Iraq, probably Basra; found at Rayy in Iran.",
  },
];

export const ABBASID_ART_LINKS: PolityCulturalLink[] = [
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "abbasid-ruby-luster-palmette-bowl",
    relationship: "produced",
    start: 801,
    end: 900,
    note: "Attributed to ninth-century Iraq under Abbasid rule. This is a regional workshop association, not evidence of caliphal commissioning; the century-wide dates express uncertainty.",
    confidence: "medium",
  },
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "abbasid-green-splash-bowl",
    relationship: "produced",
    start: 801,
    end: 900,
    note: "Made in ninth-century Abbasid Iraq, probably Basra, and later found at Rayy. The link locates ceramic production without assigning authorship or patronage to the caliphate.",
    confidence: "high",
  },
];
