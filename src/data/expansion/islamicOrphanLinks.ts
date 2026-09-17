import type { PolityCulturalLink } from "../../types";

/** Geographic production is distinct from a documented court commission. */
export const ISLAMIC_ORPHAN_LINKS: PolityCulturalLink[] = [
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "great-mosque-of-samarra",
    relationship: "commissioned",
    start: 848,
    end: 852,
    note: "Al-Mutawakkil commissioned the congregational mosque at the Abbasid capital of Samarra. Its spiral minaret belongs to the ninth-century imperial building programme.",
    confidence: "high",
    // UNESCO identifies the Abbasid capital and ninth-century Great Mosque:
    // https://whc.unesco.org/en/list/276
    // Aga Khan/MIT teaching bibliography dates the building to 848–852:
    // https://s3.us-east-1.amazonaws.com/media.archnet.org/system/publications/contents/2704/original/DPC0001.PDF
  },
  {
    polityId: "fatimid-caliphate",
    culturalWorkId: "book-of-optics",
    relationship: "produced",
    start: 1021,
    end: 1021,
    note: "Ibn al-Haytham's optical research belongs to his work in Fatimid-era Cairo. The conventional completion date is approximate; this association does not imply that the caliph commissioned the treatise.",
    confidence: "medium",
    // University biography establishes his scientific activity in Cairo:
    // https://mathshistory.st-andrews.ac.uk/Biographies/Al-Haytham/
    // Historical review dates composition to 1011–1021:
    // https://pmc.ncbi.nlm.nih.gov/articles/PMC6074172/
  },
];
