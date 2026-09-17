import type { CulturalWork, PolityCulturalLink } from "../../types";

export const JOSEON_PHILOSOPHY_WORKS: CulturalWork[] = [
  {
    id: "yi-hwang-ten-diagrams-sage-learning",
    title: "Ten Diagrams on Sage Learning",
    titleOriginal: "聖學十圖 (Seonghak sipdo)",
    creator: "Yi Hwang (Toegye)",
    domain: "philosophy",
    discipline: "philosophy",
    subForm: "Neo-Confucian diagrams and commentary",
    yearStart: 1568,
    yearApprox: false,
    civilizationId: "korea_historical",
    description: "Yi Hwang prepared this guide for the young King Seonjo in 1568 as a substitute for continued personal instruction. Ten diagram-centred chapters combine inherited Neo-Confucian texts with his explanations, connecting cosmology and ethics to the daily practice of self-cultivation. Designed for a book or folding screen, it encouraged repeated reflection rather than presenting ten newly invented doctrines.",
    sourceLink: "https://faculty.washington.edu/mkalton/Ten%20Diagrams.htm",
    license: "Historical facts; original summary",
    dataSource: "Michael C. Kalton, To Become a Sage (Columbia University Press, 1988), author-hosted University of Washington web edition, Ten Diagrams on Sage Learning: composition in 1568 for King Seonjo, chapter structure, book/screen format, and self-cultivation. Sources and Arrangement of the Ten Diagrams documents inherited materials and Yi Hwang's contributions.",
  },
];

export const JOSEON_PHILOSOPHY_LINKS: PolityCulturalLink[] = [
  {
    polityId: "joseon-dynasty-korea",
    culturalWorkId: "yi-hwang-ten-diagrams-sage-learning",
    relationship: "produced",
    start: 1568,
    end: 1568,
    note: "Written by the Joseon scholar Yi Hwang for King Seonjo's instruction. The association records its composition and royal audience, not an independently documented royal commission or the origin of Neo-Confucianism.",
    confidence: "high",
  },
];
