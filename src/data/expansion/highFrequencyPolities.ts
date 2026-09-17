import type { PoliticalEntityProfile } from "../../types";

/**
 * First batch selected from the most frequently encountered uncurated map
 * labels. These are deliberately broad continuity profiles: they describe a
 * polity's long history without pretending each snapshot is a different
 * dynasty.
 */
export const HIGH_FREQUENCY_POLITIES: PoliticalEntityProfile[] = [
  {
    id: "kingdom-of-sweden-continuity",
    nameAliases: ["Sweden"],
    kind: "kingdom",
    periodStart: 970,
    periodEnd: 2026,
    periodApprox: true,
    description: "Sweden emerged as a more unified kingdom around the end of the first millennium and developed from a medieval Scandinavian monarchy into a Baltic power in the seventeenth century and a modern constitutional monarchy. This continuity profile is deliberately broad: the map's recurring label does not distinguish every constitutional and territorial phase.",
    rulers: [
      { name: "Olof Skötkonung", reignStart: 995, reignEnd: 1022, reignApprox: true, note: "Traditionally regarded as Sweden's first Christian king" },
      { name: "Gustav I Vasa", reignStart: 1523, reignEnd: 1560, note: "Rebuilt the kingdom after the Kalmar Union" },
      { name: "Gustavus Adolphus", reignStart: 1611, reignEnd: 1632, note: "Sweden became a major Baltic power" },
      { name: "Charles XII", reignStart: 1697, reignEnd: 1718, note: "Great Northern War era" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Encyclopaedia Britannica, Sweden",
  },
  {
    id: "kingdom-of-denmark-continuity",
    nameAliases: ["Denmark"],
    kind: "kingdom",
    periodStart: 958,
    periodEnd: 2026,
    periodApprox: true,
    description: "The Danish kingdom consolidated in the Viking Age and remained a Scandinavian monarchy through shifting unions, wars, colonial possessions, and constitutional change. The recurring map label compresses those phases into a single political continuity.",
    rulers: [
      { name: "Harald Bluetooth", reignStart: 958, reignEnd: 986, reignApprox: true, note: "Associated with Danish consolidation and Christianisation" },
      { name: "Margaret I", reignStart: 1387, reignEnd: 1412, note: "Architect of the Kalmar Union" },
      { name: "Christian IV", reignStart: 1588, reignEnd: 1648, note: "Major building and state-building patron" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Encyclopaedia Britannica, Denmark",
  },
  {
    id: "kingdom-of-morocco-continuity",
    nameAliases: ["Morocco"],
    kind: "kingdom",
    periodStart: 789,
    periodEnd: 2026,
    periodApprox: true,
    description: "Morocco has been ruled by successive dynasties since the Idrisid period, including Almoravid, Almohad, Marinid, Saʿdian, and Alaouite regimes. This continuity profile reflects the map's broad country-level label rather than claiming a single unchanged state across twelve centuries.",
    rulers: [
      { name: "Idris I", reignStart: 789, reignEnd: 791, note: "Founder of the Idrisid dynasty" },
      { name: "Yusuf ibn Tashfin", reignStart: 1061, reignEnd: 1106, note: "Almoravid ruler who expanded power across the western Maghreb" },
      { name: "Moulay Ismail", reignStart: 1672, reignEnd: 1727, note: "Alaouite sultan who consolidated central authority" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Encyclopaedia Britannica, Morocco",
  },
  {
    id: "sultanate-of-brunei-continuity",
    nameAliases: ["Brunei"],
    kind: "sultanate",
    periodStart: 1368,
    periodEnd: 2026,
    periodApprox: true,
    description: "Brunei developed as a Malay Muslim sultanate linked to Borneo and regional maritime trade. Its territorial reach and external relationships changed sharply over time, particularly during the era of European imperial expansion.",
    rulers: [
      { name: "Sultan Bolkiah", reignStart: 1485, reignEnd: 1524, note: "Associated with Brunei's sixteenth-century regional influence" },
      { name: "Sultan Hassan", reignStart: 1605, reignEnd: 1619, note: "Credited with major legal and administrative reforms in Bruneian tradition" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Encyclopaedia Britannica, Brunei",
  },
];
