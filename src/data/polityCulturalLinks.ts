import { CULTURAL_WORKS } from "./culturalWorks";
import { GLOBAL_CULTURAL_LINKS } from "./expansion/globalLinks";
import { ANCIENT_MEDITERRANEAN_LINKS } from "./expansion/ancientMediterranean";
import { HIGH_FREQUENCY_CULTURAL_LINKS } from "./expansion/highFrequencyCulture";
import { MESOPOTAMIA_CULTURAL_LINKS } from "./expansion/mesopotamiaLinks";
import { CLASSICAL_CULTURAL_LINKS } from "./expansion/classicalLinks";
import type { PolityCulturalLink } from "../types";

/**
 * Explicit links make the sidebar's "made under this polity" claim
 * inspectable. Keep this deliberately narrow: an absence is rendered as an
 * honest empty state rather than inferred from a broad civilisation tag.
 */
export const POLITY_CULTURAL_LINKS: PolityCulturalLink[] = [
  { polityId: "khmer-empire", culturalWorkId: "bayon-faces", relationship: "commissioned", start: 1181, end: 1220, note: "Bayon's construction belongs to Jayavarman VII's Angkorian building programme. The approximate span describes the late twelfth- and early thirteenth-century temple, not a securely dated carving of every face.", confidence: "high" },
  { polityId: "khmer-empire-map-cambodia", culturalWorkId: "bayon-faces", relationship: "commissioned", start: 1181, end: 1220, note: "The Cambodia map label denotes Angkorian rule in this profile; Jayavarman VII's Bayon belongs to the same Khmer polity, not the modern Cambodian state.", confidence: "high" },
  { polityId: "imperial-japan-yamato-heian", culturalWorkId: "pillow-book", relationship: "produced", start: 1002, end: 1002, note: "Sei Shonagon's observations belong to Heian imperial court life; the approximate date is not evidence of a royal commission.", confidence: "high" },
  { polityId: "japan-shogunate-era", culturalWorkId: "great-wave-off-kanagawa", relationship: "produced", start: 1830, end: 1832, note: "Hokusai's commercial woodblock print was produced during Tokugawa rule. This dates its artistic production, not sponsorship by the shogun.", confidence: "high" },
  { polityId: "qin-dynasty-221-206bce", culturalWorkId: "terracotta-army", relationship: "commissioned", start: -210, end: -210, note: "The funerary army belongs to Qin Shi Huang's mausoleum. The approximate date marks his burial; work on the larger complex began before imperial unification.", confidence: "high" },
  { polityId: "han-dynasty-206bce-220ce", culturalWorkId: "zhang-heng-seismoscope", relationship: "produced", start: 132, end: 132, note: "Zhang Heng's instrument belongs to the Eastern Han period; its mechanism is known through descriptions and later reconstructions.", confidence: "high" },
  { polityId: "han-dynasty-206bce-220ce", culturalWorkId: "cai-lun-papermaking", relationship: "produced", start: 105, end: 105, note: "Cai Lun's recorded presentation of improved paper took place at the Eastern Han court; earlier archaeological paper prevents treating him as its sole inventor.", confidence: "high" },
  { polityId: "ancient-egypt", culturalWorkId: "great-pyramid-giza", relationship: "commissioned", start: -2560, end: -2560, note: "Khufu's royal pyramid belongs to the Fourth Dynasty of Egypt's Old Kingdom; the displayed date is approximate.", confidence: "high" },
  { polityId: "ancient-egypt", culturalWorkId: "bust-of-nefertiti", relationship: "produced", start: -1340, end: -1340, note: "The painted royal portrait was made in the Amarna period and recovered from Thutmose's workshop; attribution to the individual sculptor is not certain.", confidence: "high" },
  { polityId: "ancient-egypt", culturalWorkId: "rhind-papyrus", relationship: "produced", start: -1550, end: -1550, note: "Ahmose copied this mathematical text under the Hyksos king Apophis. This link uses the atlas's broad ancient-Egypt profile, not a claim of unified native rule or royal commission.", confidence: "high" },
  { polityId: "mughal-empire", culturalWorkId: "humayuns-tomb", relationship: "patronised", start: 1560, end: 1570, note: "The garden-tomb was constructed under Akbar's patronage during the 1560s; the dates are approximate.", confidence: "high" },
  { polityId: "mughal-empire", culturalWorkId: "fatehpur-sikri", relationship: "commissioned", start: 1571, end: 1585, note: "Akbar commissioned the planned city and used it as his capital; the range includes construction and its period as the imperial seat.", confidence: "high" },
  {
    polityId: "timurid-empire",
    culturalWorkId: "ulugh-beg-observatory",
    relationship: "patronised",
    start: 1420,
    end: 1449,
    note: "The astronomer-ruler Ulugh Beg sponsored Samarkand's observatory and its scholarly programme.",
    confidence: "high",
  },
  ...GLOBAL_CULTURAL_LINKS,
  ...MESOPOTAMIA_CULTURAL_LINKS,
  ...CLASSICAL_CULTURAL_LINKS,
  ...ANCIENT_MEDITERRANEAN_LINKS,
  ...HIGH_FREQUENCY_CULTURAL_LINKS,
  {
    polityId: "ancient-egypt",
    culturalWorkId: "instruction-of-ptahhotep",
    relationship: "produced",
    start: -2400,
    end: -1800,
    note: "This Egyptian wisdom text frames ethical and administrative counsel through the voice of a vizier.",
    confidence: "medium",
  },
  {
    polityId: "ancient-greek-city-states",
    culturalWorkId: "parthenon",
    relationship: "commissioned",
    start: -447,
    end: -432,
    note: "Athens commissioned the Parthenon during the fifth-century BCE rebuilding of the Acropolis.",
    confidence: "high",
  },
  {
    polityId: "ancient-greek-city-states",
    culturalWorkId: "platos-republic",
    relationship: "produced",
    start: -380,
    end: -380,
    note: "Plato composed this inquiry into justice and political order in the fourth-century BCE Greek world.",
    confidence: "high",
  },
  {
    polityId: "roman-republic",
    culturalWorkId: "cicero-de-re-publica",
    relationship: "produced",
    start: -54,
    end: -51,
    note: "Cicero wrote this political dialogue amid the Roman Republic's final decades.",
    confidence: "high",
  },
  {
    polityId: "roman-empire",
    culturalWorkId: "meditations",
    relationship: "produced",
    start: 170,
    end: 180,
    note: "Marcus Aurelius composed these Stoic reflections while ruling the Roman Empire.",
    confidence: "high",
  },
  {
    polityId: "roman-empire",
    culturalWorkId: "colosseum",
    relationship: "commissioned",
    start: 70,
    end: 80,
    note: "The Flavian emperors built Rome's amphitheatre as an imperial public monument.",
    confidence: "high",
  },
  {
    polityId: "mauryan-empire",
    culturalWorkId: "great-stupa-sanchi",
    relationship: "commissioned",
    start: -268,
    end: -232,
    note: "The monument's core is traditionally attributed to Ashoka's Mauryan patronage; later additions are distinct phases.",
    confidence: "medium",
  },
  {
    polityId: "kushan-empire",
    culturalWorkId: "arthashastra",
    relationship: "transmitted",
    start: 30,
    end: 300,
    note: "The received treatise was compiled and transmitted in the early Common Era; this is a contextual, not patronage, link.",
    confidence: "medium",
  },
  {
    polityId: "gupta-empire",
    culturalWorkId: "aryabhatiya",
    relationship: "produced",
    start: 499,
    end: 499,
    note: "Aryabhata's mathematical and astronomical treatise belongs to the classical Indian scholarly world of the Gupta period.",
    confidence: "medium",
  },
  {
    polityId: "tang-empire",
    culturalWorkId: "analects",
    relationship: "transmitted",
    start: 618,
    end: 907,
    note: "Confucian learning remained central to Tang statecraft and education; this link records transmission, not Tang authorship.",
    confidence: "high",
  },
  {
    polityId: "qin-dynasty-221-206bce",
    culturalWorkId: "dao-de-jing",
    relationship: "transmitted",
    start: -221,
    end: -206,
    note: "The text circulated in the early imperial Chinese world; this records transmission rather than Qin commissioning.",
    confidence: "medium",
  },
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "al-jabr",
    relationship: "produced",
    start: 820,
    end: 850,
    note: "Al-Khwarizmi composed this foundational algebraic treatise in the Abbasid scholarly milieu.",
    confidence: "high",
  },
  {
    polityId: "abbasid-caliphate",
    culturalWorkId: "al-farabi-virtuous-city",
    relationship: "produced",
    start: 942,
    end: 942,
    note: "Al-Farabi's political philosophy emerged within the wider Abbasid-era intellectual world.",
    confidence: "medium",
  },
  {
    polityId: "khmer-empire",
    culturalWorkId: "angkor-wat",
    relationship: "commissioned",
    start: 1113,
    end: 1150,
    note: "Suryavarman II commissioned Angkor Wat as a state temple at the Khmer capital.",
    confidence: "high",
  },
  {
    polityId: "khmer-empire",
    culturalWorkId: "angkor-hydraulic-engineering",
    relationship: "produced",
    start: 802,
    end: 1431,
    note: "The capital's reservoirs, canals, and embankments were built and maintained across the Khmer imperial period.",
    confidence: "medium",
  },
  {
    polityId: "mali-empire",
    culturalWorkId: "timbuktu-manuscripts-stem",
    relationship: "transmitted",
    start: 1325,
    end: 1591,
    note: "Timbuktu's manuscript culture developed through trans-Saharan scholarly exchange during Mali and its successors.",
    confidence: "medium",
  },
  {
    polityId: "mali-empire",
    culturalWorkId: "manden-charter",
    relationship: "transmitted",
    start: 1220,
    end: 1240,
    note: "The charter is associated in oral tradition with the Mali founding era; this link preserves that association with an approximate range.",
    confidence: "medium",
  },
  {
    polityId: "medieval-kingdom-of-england",
    culturalWorkId: "magna-carta",
    relationship: "produced",
    start: 1215,
    end: 1215,
    note: "The 1215 charter was issued within the medieval Kingdom of England.",
    confidence: "high",
  },
  {
    polityId: "maya-city-states",
    culturalWorkId: "maya-numeral-system",
    relationship: "produced",
    start: 250,
    end: 900,
    note: "Maya courts used positional numeration in inscriptions and calendrical record-keeping during the Classic period.",
    confidence: "high",
  },
  {
    polityId: "aztec-empire",
    culturalWorkId: "chinampa-agriculture",
    relationship: "produced",
    start: 1325,
    end: 1521,
    note: "Chinampa cultivation sustained the densely populated island capital and its surrounding lake basin.",
    confidence: "high",
  },
  {
    polityId: "kingdom-of-great-zimbabwe",
    culturalWorkId: "great-zimbabwe-monument",
    relationship: "produced",
    start: 1100,
    end: 1450,
    note: "Great Zimbabwe's stone-built complexes were constructed during the kingdom's period of florescence.",
    confidence: "high",
  },
  {
    polityId: "qutb-shahi-sultanate",
    culturalWorkId: "golconda-fort",
    relationship: "produced",
    start: 1518,
    end: 1687,
    note: "Expanded as the Qutb Shahi capital, combining fortification, water-management, and courtly architecture.",
    confidence: "high",
  },
  {
    polityId: "qutb-shahi-sultanate",
    culturalWorkId: "charminar",
    relationship: "commissioned",
    start: 1591,
    end: 1591,
    note: "Muhammad Quli Qutb Shah commissioned Hyderabad's ceremonial centre in 1591.",
    confidence: "high",
  },
  {
    polityId: "qutb-shahi-sultanate",
    culturalWorkId: "deccani-miniature-painting",
    relationship: "patronised",
    start: 1550,
    end: 1687,
    note: "Golconda was one of the Deccan courts where a distinct miniature-painting school developed.",
    confidence: "high",
  },
  {
    polityId: "mughal-empire",
    culturalWorkId: "baburnama",
    relationship: "patronised",
    start: 1589,
    end: 1593,
    note: "This record describes Akbar's Persian translation and illustrated manuscript, made decades after Babur's original memoir.",
    confidence: "high",
  },
  {
    polityId: "mughal-empire",
    culturalWorkId: "mughal-miniature-painting",
    relationship: "patronised",
    start: 1560,
    end: 1600,
    note: "Imperial ateliers developed a durable painting tradition through Persianate and South Asian exchange.",
    confidence: "high",
  },
];

const WORK_BY_ID = new Map(CULTURAL_WORKS.map((work) => [work.id, work]));

export function culturalWorksForPolity(polityId: string, year: number | null) {
  return POLITY_CULTURAL_LINKS.flatMap((link) => {
    if (link.polityId !== polityId) return [];
    // Achievements remain relevant after completion while the polity is
    // selected; filtering out a completed observatory or building made the
    // panel misleadingly empty in later snapshots. Future achievements stay
    // hidden until their start date.
    if (year !== null && year < link.start) return [];
    const work = WORK_BY_ID.get(link.culturalWorkId);
    // A link must never reveal an object before the object's own date,
    // even if the association was accidentally assigned an earlier start.
    if (work && year !== null && year < work.yearStart) return [];
    return work ? [{ link, work }] : [];
  });
}
