import type { PolityCulturalLink } from "../../types";

/** Production links concern local makers, not an unsupported royal monopoly. */
export const AFRICAN_ORPHAN_LINKS: PolityCulturalLink[] = [
  // Bandama, Moffett, Thondhlana & Chirikure (2016), Archaeometry 58(S1).
  // https://doi.org/10.1111/arcm.12248
  // https://research-portal.uea.ac.uk/en/publications/the-production-distribution-and-consumption-of-metals-and-alloys-/
  {
    polityId: "kingdom-of-great-zimbabwe",
    culturalWorkId: "shona-iron-smelting",
    relationship: "produced",
    start: 1100,
    end: 1450,
    note: "Archaeological study identifies metalworking by residents in different parts of Great Zimbabwe, including household-level production. This approximate interval follows the urban kingdom's flourishing; it is not a date for the invention of iron smelting or evidence of an exclusively royal industry.",
    confidence: "medium",
  },
];
