import type { PolityCulturalLink } from "../../types";

/** Museum-supported associations; archaeological findspots are not royal commissions. */
export const MESOPOTAMIA_CULTURAL_LINKS: PolityCulturalLink[] = [
  {
    polityId: "babylonia-mesopotamia",
    culturalWorkId: "code-of-hammurabi",
    relationship: "commissioned",
    start: -1750,
    end: -1750,
    note: "Hammurabi, king of Babylon, had these legal judgements inscribed around 1750 BCE. The stele is a royal presentation of justice, not a modern statutory code.",
    confidence: "high",
  },
  {
    polityId: "babylonia-mesopotamia",
    culturalWorkId: "ishtar-gate",
    relationship: "commissioned",
    start: -575,
    end: -562,
    note: "Nebuchadnezzar II's rebuilding of Babylon included this glazed-brick gate in the sixth century BCE; the displayed construction date is approximate.",
    confidence: "high",
  },
  {
    polityId: "ur-sumer-mesopotamia",
    culturalWorkId: "standard-of-ur",
    relationship: "produced",
    start: -2550,
    end: -2400,
    note: "An Early Dynastic artwork from an unidentified king's burial in Ur's Royal Cemetery. Its maker and original function are unknown; it predates the Third Dynasty of Ur.",
    confidence: "high",
  },
];
