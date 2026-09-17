import type { CulturalWork, PolityCulturalLink } from "../../types";

/** Chronicle dates are qualified: neither monument is treated as a one-year build. */
export const AYUTTHAYA_WORKS: CulturalWork[] = [
  {
    id: "ayutthaya-wat-ratchaburana-prang",
    title: "Wat Ratchaburana's principal prang",
    creator: null,
    attribution: "Ayutthayan builders under Borommarachathirat II",
    domain: "arts",
    discipline: "architecture",
    subForm: "Buddhist temple tower",
    yearStart: 1424,
    yearApprox: true,
    civilizationId: "southeast_asia_mainland",
    description: "This early Ayutthayan temple tower combines laterite and brick construction with stucco decoration. Its design preserves architectural connections with Lopburi while developing a distinctive Ayutthayan form. The Luang Prasert chronicle dates the foundation to 1424; other chronicles give 1418, so the displayed year is a conventional foundation date rather than a certain completion date.",
    sourceLink: "https://seaarts.sac.or.th/artwork/28?lang=en",
    license: "Historical facts; original summary",
    dataSource: "Princess Maha Chakri Sirindhorn Anthropology Centre, The Principal Prang of Wat Ratchaburana, Rungroj Thamrungraeng (2015): construction, chronicle variants, and early Ayutthaya stylistic context.",
  },
  {
    id: "ayutthaya-wat-chaiwatthanaram",
    title: "Wat Chaiwatthanaram",
    creator: null,
    attribution: "Ayutthayan builders; traditionally associated with King Prasat Thong",
    domain: "arts",
    discipline: "architecture",
    subForm: "Buddhist temple complex",
    yearStart: 1630,
    yearApprox: true,
    civilizationId: "southeast_asia_mainland",
    description: "A central prang, four subsidiary towers, galleries, and eight chapels organize this monumental Ayutthayan temple. Its arrangement has been interpreted through Buddhist cosmology, with the central tower evoking Mount Meru. Chronicles associate construction with Prasat Thong in 1630, but research has proposed an earlier beginning; the displayed date follows the conventional chronology, not a settled date for every structure.",
    sourceLink: "https://seaarts.sac.or.th/artwork/34?lang=en",
    license: "Historical facts; original summary",
    dataSource: "Princess Maha Chakri Sirindhorn Anthropology Centre, Wat Chaiwatthanaram (2015); Kirdsiri, Buranaut and Janyaem, Wat Chaiwatthanaram: a new assessment of its configuration and dating (2021), https://doi.org/10.14456/hasss.2021.7.",
  },
];

export const AYUTTHAYA_LINKS: PolityCulturalLink[] = [
  {
    polityId: "ayutthaya-kingdom-siam",
    culturalWorkId: "ayutthaya-wat-ratchaburana-prang",
    relationship: "commissioned",
    start: 1424,
    end: 1424,
    note: "A royal foundation attributed to Borommarachathirat II. The date follows the Luang Prasert chronicle; surviving chronicles disagree on the year.",
    confidence: "medium",
  },
  {
    polityId: "ayutthaya-kingdom-siam",
    culturalWorkId: "ayutthaya-wat-chaiwatthanaram",
    relationship: "commissioned",
    start: 1630,
    end: 1630,
    note: "Ayutthayan royal temple associated with Prasat Thong. The conventional 1630 attribution is retained with a dating caveat; modern restoration is not counted as original construction.",
    confidence: "medium",
  },
];
