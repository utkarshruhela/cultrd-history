import type { CulturalWork, PolityCulturalLink } from "../../types";

export const ABBASID_MUSIC_WORKS: CulturalWork[] = [
  {
    id: "kitab-al-aghani-musical-anthology",
    title: "Book of Songs (Kitab al-Aghani)",
    creator: "Abu al-Faraj al-Isfahani, compiler",
    domain: "arts",
    discipline: "music-performance",
    subForm: "song anthology and histories of poets and musicians",
    yearStart: 967,
    yearApprox: true,
    civilizationId: "islamic_golden_age",
    description: "This tenth-century anthology preserves song texts alongside accounts of poets, singers, and courtly musical life. Its organizing nucleus was a selection of 100 songs associated with Harun al-Rashid, but its material extends far beyond that court and includes much earlier traditions. The approximate timeline date uses the compiler's conventional death year as a conservative marker, not a known publication date or the origin of the songs.",
    sourceLink: "https://www.iranicaonline.org/articles/ketab-al-agani/",
    license: "Historical facts; original summary",
    dataSource: "Kamal Abu-Deeb, Encyclopaedia Iranica, Aghani, Ketab al- (1984, updated 2018): authorship, conventional 897–967 lifespan, hundred-song nucleus, and court histories. Library of Congress, The Book of Songs, item 2021666165: tenth-century compiler and Baghdad/Aleppo context.",
  },
];

export const ABBASID_MUSIC_LINKS: PolityCulturalLink[] = [
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "kitab-al-aghani-musical-anthology",
    relationship: "transmitted",
    start: 967,
    end: 967,
    note: "Preserves Abbasid court-song traditions in a tenth-century anthology. This is a retrospective transmission link, not a claim of caliphal commission, exclusive Abbasid authorship, or direct Abbasid rule over every place represented.",
    confidence: "high",
  },
];
