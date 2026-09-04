import type { PoliticalEntityProfile } from "../types";

// A curated pilot of political-entity profiles for the map's info panel --
// see types.ts's "Political entity profiles" section for the full rationale.
// Picked for a mix of region/era (South/Southeast/East/Central/West Asia,
// the Mediterranean, West Africa, Mesoamerica, the Andes) rather than a
// Western-first or India-heavy set, following the same balanced-pilot
// approach as CIVILIZATIONS/CULTURAL_WORKS. Ruler names and reign years were
// individually checked against Wikipedia and standard reference works
// (see each entry's dataSource) rather than written from memory alone --
// this app has already had one high-stakes accuracy incident (the India
// boundary), so the same care applies here even though the stakes of a
// wrong regnal date are lower.
//
// Deliberately NOT exhaustive: 17 entities out of the ~2,450 distinct NAME
// values across the historical-basemaps slices. Everything not in this list
// falls back to the existing sparse info panel (see
// src/components/InfoPanel.tsx) -- no regression, just progressive
// enrichment as more entities get the same treatment in later passes.
export const POLITICAL_ENTITIES: PoliticalEntityProfile[] = [
  {
    id: "mughal-empire",
    nameAliases: ["Mughal Empire"],
    kind: "empire",
    periodStart: 1526,
    periodEnd: 1857,
    periodApprox: false,
    description:
      "Founded by Babur after his victory at the First Battle of Panipat, the Mughal Empire went on to control most of the Indian subcontinent at its height under Akbar and Aurangzeb, blending Persianate court culture with local traditions -- the Taj Mahal and Red Fort date from this period. Power fragmented sharply after Aurangzeb's death in 1707; the last emperor, Bahadur Shah II, was a British pensioner in all but name before being deposed and exiled following the 1857 rebellion.",
    rulers: [
      { name: "Babur", reignStart: 1526, reignEnd: 1530, note: "Founder; won the First Battle of Panipat" },
      { name: "Humayun", reignStart: 1530, reignEnd: 1556, reignApprox: true, note: "Briefly lost the throne (1540-1555) to the Suri dynasty, then reclaimed it" },
      { name: "Akbar", reignStart: 1556, reignEnd: 1605, note: "Greatly expanded and consolidated the empire; religious tolerance policy" },
      { name: "Jahangir", reignStart: 1605, reignEnd: 1627 },
      { name: "Shah Jahan", reignStart: 1628, reignEnd: 1658, note: "Commissioned the Taj Mahal" },
      { name: "Aurangzeb", reignStart: 1658, reignEnd: 1707, note: "Greatest territorial extent; empire fragmented rapidly after his death" },
      { name: "Bahadur Shah II", reignStart: 1837, reignEnd: 1857, note: "Last Mughal emperor; deposed and exiled after the 1857 rebellion" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Mughal Empire and individual emperor articles); cross-checked reign years against standard reference timelines",
  },
  {
    id: "ottoman-empire",
    nameAliases: ["Ottoman Empire", "Ottoman Sultanate"],
    kind: "empire",
    periodStart: 1299,
    periodEnd: 1922,
    periodApprox: true,
    description:
      "A beylik founded by Osman I in northwestern Anatolia grew, over six centuries, into an empire spanning southeastern Europe, western Asia, and North Africa. Mehmed II's capture of Constantinople in 1453 ended the Byzantine Empire and gave the Ottomans their long-term capital; Suleiman the Magnificent's reign (1520-1566) is generally considered the peak of Ottoman power, wealth, and culture. Territorial and institutional decline followed over the 18th-19th centuries; the sultanate was formally abolished in 1922, and the caliphate two years later, as the Republic of Turkey was founded.",
    rulers: [
      { name: "Osman I", reignStart: 1299, reignEnd: 1323, reignApprox: true, note: "Founder of the dynasty" },
      { name: "Mehmed II \"the Conqueror\"", reignStart: 1451, reignEnd: 1481, note: "Captured Constantinople in 1453" },
      { name: "Selim I", reignStart: 1512, reignEnd: 1520, note: "Conquered the Mamluk Sultanate; empire gained Egypt and the Levant" },
      { name: "Suleiman I \"the Magnificent\"", reignStart: 1520, reignEnd: 1566, note: "Widely considered the empire's peak" },
      { name: "Mehmed VI", reignStart: 1918, reignEnd: 1922, note: "Last sultan; sultanate abolished by the Grand National Assembly" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Ottoman Empire and List of Ottoman sultans); Inside Out In Istanbul sultan-list reference",
  },
  {
    id: "roman-empire",
    nameAliases: ["Roman Empire"],
    kind: "empire",
    periodStart: -27,
    periodEnd: 476,
    periodApprox: false,
    description:
      "Established when Octavian (Augustus) became sole ruler after the fall of the Republic, the Roman Empire at its height under Trajan controlled territory from Britain to Mesopotamia. Constantine I legalized Christianity and founded Constantinople as a new eastern capital in the early 4th century, splitting administration between west and east. The Western Roman Empire collapsed in 476 CE when the last emperor was deposed; its eastern half continued for another millennium as what's now usually called the Byzantine Empire.",
    rulers: [
      { name: "Augustus", reignStart: -27, reignEnd: 14, note: "First emperor" },
      { name: "Trajan", reignStart: 98, reignEnd: 117, note: "Empire at its greatest territorial extent" },
      { name: "Constantine I", reignStart: 306, reignEnd: 337, note: "Legalized Christianity; founded Constantinople" },
      { name: "Theodosius I", reignStart: 379, reignEnd: 395, note: "Last emperor to rule a united Roman Empire" },
      { name: "Romulus Augustulus", reignStart: 475, reignEnd: 476, note: "Last Western Roman emperor, deposed by Odoacer" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Roman Empire and individual emperor articles); general classical-history reference consensus",
  },
  {
    id: "byzantine-empire",
    nameAliases: ["Byzantine Empire"],
    kind: "empire",
    periodStart: 330,
    periodEnd: 1453,
    periodApprox: false,
    description:
      "The Greek-speaking continuation of the Roman Empire, centered on Constantinople (founded by Constantine I in 330 CE) after the western half collapsed. Justinian I briefly reconquered much of the former western Mediterranean and commissioned the Hagia Sophia; Basil II's reign around the turn of the first millennium marked the empire's medieval peak. Centuries of slow contraction, accelerated by the Fourth Crusade's 1204 sack of Constantinople, ended when the city fell to Ottoman forces in 1453, with Constantine XI dying in its defense.",
    rulers: [
      { name: "Constantine I", reignStart: 330, reignEnd: 337, note: "Founded Constantinople as the new capital" },
      { name: "Justinian I", reignStart: 527, reignEnd: 565, note: "Reconquests; built the Hagia Sophia; codified Roman law" },
      { name: "Basil II", reignStart: 976, reignEnd: 1025, note: "Height of medieval Byzantine military and territorial power" },
      { name: "Constantine XI Palaiologos", reignStart: 1449, reignEnd: 1453, note: "Last emperor; died defending Constantinople" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Byzantine Empire and individual emperor articles)",
  },
  {
    id: "achaemenid-empire",
    nameAliases: ["Achaemenid Empire"],
    kind: "empire",
    periodStart: -550,
    periodEnd: -330,
    periodApprox: false,
    description:
      "Founded by Cyrus the Great, the first Persian Empire grew to become history's largest empire by land area up to that point, stretching from the Balkans to the Indus Valley. It pioneered large-scale imperial administration -- satrapies, a postal system (the Royal Road), and religious tolerance for conquered peoples, notably freeing the Jewish population of Babylon. Alexander the Great's conquests ended the empire, with the last king, Darius III, defeated and killed in 330 BCE.",
    rulers: [
      { name: "Cyrus the Great", reignStart: -559, reignEnd: -530, note: "Founder" },
      { name: "Darius I", reignStart: -522, reignEnd: -486, note: "Administrative reforms; built Persepolis" },
      { name: "Xerxes I", reignStart: -486, reignEnd: -465, note: "Led the second Persian invasion of Greece" },
      { name: "Darius III", reignStart: -336, reignEnd: -330, note: "Last king; defeated by Alexander the Great" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Achaemenid Empire and individual king articles); Britannica Achaemenid Empire overview",
  },
  {
    id: "mauryan-empire",
    nameAliases: ["Mauryan Empire"],
    kind: "empire",
    periodStart: -321,
    periodEnd: -185,
    periodApprox: true,
    description:
      "The first empire to unify most of the Indian subcontinent, founded by Chandragupta Maurya after he overthrew the Nanda dynasty. His grandson Ashoka expanded it to its greatest extent, then -- after witnessing the bloodshed of his Kalinga campaign -- converted to Buddhism and had edicts promoting nonviolence and welfare carved on pillars and rocks across the empire, some of which still stand. The empire declined after Ashoka's death and was overthrown by the Shunga dynasty around 185 BCE.",
    rulers: [
      { name: "Chandragupta Maurya", reignStart: -321, reignEnd: -297, reignApprox: true, note: "Founder" },
      { name: "Bindusara", reignStart: -297, reignEnd: -273, reignApprox: true },
      { name: "Ashoka", reignStart: -268, reignEnd: -232, note: "Converted to Buddhism after the Kalinga war; edicts on nonviolence" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Maurya Empire and individual ruler articles); World History Encyclopedia Mauryan timeline",
  },
  {
    id: "gupta-empire",
    nameAliases: ["Gupta Empire"],
    kind: "empire",
    periodStart: 320,
    periodEnd: 550,
    periodApprox: true,
    description:
      "Often called a golden age of classical Indian civilization, the Gupta Empire saw major advances in mathematics (the concept of zero as a placeholder, decimal notation), astronomy, and Sanskrit literature and drama under royal patronage. Chandragupta II's reign is particularly associated with this flourishing. The empire fragmented under pressure from Hunnic (Hephthalite) invasions in the 6th century.",
    rulers: [
      { name: "Chandragupta I", reignStart: 320, reignEnd: 335, reignApprox: true, note: "Founder" },
      { name: "Samudragupta", reignStart: 335, reignEnd: 375, reignApprox: true, note: "Extensive military campaigns and expansion" },
      { name: "Chandragupta II \"Vikramaditya\"", reignStart: 375, reignEnd: 415, reignApprox: true, note: "Widely considered the empire's cultural peak" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Gupta Empire and individual ruler articles)",
  },
  {
    id: "vijayanagara-empire",
    nameAliases: ["Vijayanagara"],
    kind: "empire",
    periodStart: 1336,
    periodEnd: 1646,
    periodApprox: false,
    description:
      "Founded by brothers Harihara I and Bukka Raya I as a bulwark against the Delhi Sultanate's expansion into South India, Vijayanagara became one of the subcontinent's most powerful Hindu empires, its capital (near modern Hampi) famed by foreign travelers for its wealth. Krishnadevaraya's reign is considered its golden age. A coalition of Deccan sultanates decisively defeated Vijayanagara at the Battle of Talikota in 1565, after which the empire never recovered its former power, persisting in reduced form until 1646.",
    rulers: [
      { name: "Harihara I", reignStart: 1336, reignEnd: 1356, note: "Co-founder" },
      { name: "Bukka Raya I", reignStart: 1356, reignEnd: 1377, note: "Co-founder" },
      { name: "Krishnadevaraya", reignStart: 1509, reignEnd: 1529, note: "Widely considered the empire's golden age" },
      { name: "Sri Ranga III", reignStart: 1642, reignEnd: 1646, note: "Last ruler" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Vijayanagara Empire and individual ruler articles); Vajiram & Ravi UPSC reference notes",
  },
  {
    id: "maratha-confederacy",
    nameAliases: ["Maratha", "Maratha Confederacy"],
    kind: "confederacy",
    periodStart: 1674,
    periodEnd: 1818,
    periodApprox: false,
    description:
      "Founded by Shivaji, who carved a Maratha state out of Deccan territory and was crowned Chhatrapati (sovereign) in 1674, the Maratha state grew after his death into a confederacy of allied chiefs under the nominal leadership of hereditary Peshwas (prime ministers). At its height under Peshwa Bajirao I it controlled roughly a third of the Indian subcontinent. Defeat in the Third Anglo-Maratha War (1817-1818) ended Maratha power and left the British East India Company the dominant force in India.",
    rulers: [
      { name: "Shivaji", reignStart: 1674, reignEnd: 1680, note: "Founder; crowned Chhatrapati in 1674" },
      { name: "Balaji Vishwanath (Peshwa)", reignStart: 1713, reignEnd: 1720 },
      { name: "Bajirao I (Peshwa)", reignStart: 1720, reignEnd: 1740, note: "Rapid territorial expansion" },
      { name: "Balaji Baji Rao (Peshwa)", reignStart: 1740, reignEnd: 1761 },
      { name: "Madhavrao I (Peshwa)", reignStart: 1761, reignEnd: 1772, note: "Restored Maratha authority after the Third Battle of Panipat" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Maratha Empire and individual Peshwa articles); Vajiram & Ravi Peshwa reference notes",
  },
  {
    id: "tang-empire",
    nameAliases: ["Tang Empire"],
    kind: "dynasty",
    periodStart: 618,
    periodEnd: 907,
    periodApprox: false,
    description:
      "Following the short-lived Sui dynasty, the Tang is often regarded as a high point of pre-modern Chinese civilization -- cosmopolitan, prosperous, and culturally dominant across East Asia, with its capital Chang'an among the largest cities in the world. Wu Zetian, who rose from consort to reign in her own right, remains the only woman to have ruled China as emperor. The mid-dynasty An Lushan Rebellion (755-763) permanently weakened central authority, and the dynasty formally ended in 907 amid regional fragmentation.",
    rulers: [
      { name: "Emperor Gaozu", reignStart: 618, reignEnd: 626, note: "Founder" },
      { name: "Emperor Taizong", reignStart: 626, reignEnd: 649, note: "Height of early Tang power and administration" },
      { name: "Wu Zetian", reignStart: 690, reignEnd: 705, note: "Only woman to rule China as emperor in her own right" },
      { name: "Emperor Xuanzong", reignStart: 712, reignEnd: 756, note: "Cultural golden age, ended by the An Lushan Rebellion" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Tang dynasty and individual emperor articles)",
  },
  {
    id: "ming-empire",
    nameAliases: ["Ming Empire", "Ming Chinese Empire"],
    kind: "dynasty",
    periodStart: 1368,
    periodEnd: 1644,
    periodApprox: false,
    description:
      "Founded by the peasant-rebel-turned-emperor Zhu Yuanzhang (Hongwu) after driving out the Mongol Yuan dynasty, the Ming restored native Chinese rule and built much of what survives of the Great Wall and the Forbidden City. The Yongle Emperor sponsored Zheng He's famous treasure-fleet voyages across the Indian Ocean. The dynasty fell in 1644 when rebel forces took Beijing and the last Ming emperor hanged himself, shortly before the Manchu Qing dynasty took the throne.",
    rulers: [
      { name: "Hongwu Emperor", reignStart: 1368, reignEnd: 1398, note: "Founder" },
      { name: "Yongle Emperor", reignStart: 1402, reignEnd: 1424, note: "Built the Forbidden City; sponsored Zheng He's voyages" },
      { name: "Chongzhen Emperor", reignStart: 1627, reignEnd: 1644, note: "Last Ming emperor; died as rebels took Beijing" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Ming dynasty and individual emperor articles)",
  },
  {
    id: "abbasid-caliphate",
    nameAliases: ["Abbasid Caliphate"],
    kind: "caliphate",
    periodStart: 750,
    periodEnd: 1258,
    periodApprox: false,
    description:
      "Overthrowing the Umayyad Caliphate in 750, the Abbasids moved the caliphate's center of gravity to newly founded Baghdad, which became a leading center of trade and scholarship. Harun al-Rashid's reign (the backdrop for many tales in One Thousand and One Nights) and his son Al-Ma'mun's founding of the House of Wisdom mark the era's intellectual peak, translating and building on Greek, Persian, and Indian learning. Real political power fragmented into regional dynasties from the 10th century on, and the caliphate ended when the Mongols sacked Baghdad in 1258.",
    rulers: [
      { name: "As-Saffah", reignStart: 750, reignEnd: 754, note: "Founder" },
      { name: "Al-Mansur", reignStart: 754, reignEnd: 775, note: "Founded Baghdad as the new capital" },
      { name: "Harun al-Rashid", reignStart: 786, reignEnd: 809, note: "Height of Abbasid wealth and culture" },
      { name: "Al-Ma'mun", reignStart: 813, reignEnd: 833, note: "Founded the House of Wisdom" },
      { name: "Al-Musta'sim", reignStart: 1242, reignEnd: 1258, note: "Last Abbasid caliph in Baghdad; executed after the Mongol sack" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Abbasid Caliphate and individual caliph articles)",
  },
  {
    id: "chagatai-khanate",
    nameAliases: ["Chagatai Khanate"],
    kind: "khanate",
    periodStart: 1227,
    periodEnd: 1514,
    periodApprox: true,
    description:
      "One of the four khanates that split from the Mongol Empire, granted to Genghis Khan's second son Chagatai, covering much of Central Asia. Direct, unified Chagatayid rule broke down by the mid-14th century -- the western half fell under the sway of local emirs, most famously Timur (Tamerlane), who ruled through puppet khans rather than claiming the title himself, while an eastern remnant, Moghulistan, continued under Chagatayid khans for another century and a half before merging into the Yarkent Khanate around 1514.",
    rulers: [
      { name: "Chagatai Khan", reignStart: 1227, reignEnd: 1242, note: "Founder; second son of Genghis Khan" },
      { name: "Qazan Khan", reignStart: 1343, reignEnd: 1346, note: "His death effectively ended unified Chagatayid power in Transoxiana" },
      { name: "Tughlugh Timur", reignStart: 1347, reignEnd: 1363, note: "Khan of the eastern Chagatayid remnant, Moghulistan" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Chagatai Khanate and List of Chagatai khans)",
  },
  {
    id: "aztec-empire",
    nameAliases: ["Aztec Empire"],
    kind: "empire",
    periodStart: 1428,
    periodEnd: 1521,
    periodApprox: false,
    description:
      "Formed as the Triple Alliance of Tenochtitlan, Texcoco, and Tlacopan, dominated by the Mexica of Tenochtitlan, the Aztec Empire grew through tribute-extracting conquest to control much of central Mexico. Its capital Tenochtitlan, built on an island in Lake Texcoco, was among the largest cities in the world at the time of Spanish contact. Hernan Cortes, allied with rival indigenous states, conquered the empire in 1521 after the fall of Tenochtitlan.",
    rulers: [
      { name: "Itzcoatl", reignStart: 1427, reignEnd: 1440, note: "Founded the Triple Alliance" },
      { name: "Moctezuma I", reignStart: 1440, reignEnd: 1469 },
      { name: "Ahuitzotl", reignStart: 1486, reignEnd: 1502, note: "Empire's greatest territorial extent" },
      { name: "Moctezuma II", reignStart: 1502, reignEnd: 1520, note: "Ruled during the Spanish conquest" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Aztec Empire and individual tlatoani articles)",
  },
  {
    id: "inca-empire",
    nameAliases: ["Inca Empire"],
    kind: "empire",
    periodStart: 1438,
    periodEnd: 1533,
    periodApprox: false,
    description:
      "The largest pre-Columbian empire in the Americas, built rapidly from a small Andean kingdom by Pachacuti's conquests from 1438 on, and administered through an extensive road network and the quipu record-keeping system in the absence of a written script. A civil war between rival heirs Huascar and Atahualpa weakened the empire just before Francisco Pizarro's small Spanish force arrived; Atahualpa was captured and executed in 1533, effectively ending Inca sovereignty, though resistance continued from Vilcabamba until 1572.",
    rulers: [
      { name: "Pachacuti", reignStart: 1438, reignEnd: 1471, note: "Transformed a local kingdom into an empire" },
      { name: "Topa Inca Yupanqui", reignStart: 1471, reignEnd: 1493 },
      { name: "Huayna Capac", reignStart: 1493, reignEnd: 1527, reignApprox: true },
      { name: "Atahualpa", reignStart: 1532, reignEnd: 1533, note: "Last effectively sovereign Sapa Inca; captured and executed by Pizarro" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Inca Empire and individual Sapa Inca articles)",
  },
  {
    id: "khmer-empire",
    nameAliases: ["Khmer Empire"],
    kind: "empire",
    periodStart: 802,
    periodEnd: 1431,
    periodApprox: false,
    description:
      "Founded when Jayavarman II declared himself a universal monarch in 802 CE, the Khmer Empire came to dominate mainland Southeast Asia from its capital at Angkor. Suryavarman II built Angkor Wat, originally a Hindu temple, in the early 12th century; Jayavarman VII later built the Bayon and much of Angkor Thom, and expanded the empire to its largest extent while shifting state religion toward Mahayana Buddhism. Repeated Ayutthayan invasions culminated in the sack of Angkor in 1431, after which the capital was abandoned.",
    rulers: [
      { name: "Jayavarman II", reignStart: 802, reignEnd: 850, reignApprox: true, note: "Founder" },
      { name: "Suryavarman II", reignStart: 1113, reignEnd: 1150, reignApprox: true, note: "Built Angkor Wat" },
      { name: "Jayavarman VII", reignStart: 1181, reignEnd: 1218, note: "Built the Bayon and Angkor Thom; empire's greatest extent" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Khmer Empire and individual king articles); Britannica Jayavarman VII entry",
  },
  {
    id: "mali-empire",
    nameAliases: ["Mali"],
    kind: "empire",
    periodStart: 1235,
    periodEnd: 1670,
    periodApprox: true,
    description:
      "Founded by Sundiata Keita after he defeated the ruler of the Sosso Kingdom in 1235, the Mali Empire went on to control the trans-Saharan gold and salt trade, making it immensely wealthy. Mansa Musa's 1324 pilgrimage to Mecca, during which he reportedly gave away so much gold that it depressed prices in the cities he passed through, made the empire briefly famous across the Mediterranean and Middle East. Gradual fragmentation followed from the late 14th century; by the early 1600s Mali had broken into minor chiefdoms and no longer functioned as an empire.",
    rulers: [
      { name: "Sundiata Keita", reignStart: 1235, reignEnd: 1255, reignApprox: true, note: "Founder" },
      { name: "Mansa Musa", reignStart: 1312, reignEnd: 1337, reignApprox: true, note: "Famous 1324 pilgrimage to Mecca; empire's wealthiest period" },
    ],
    license: "Public domain (historical facts)",
    dataSource: "Wikipedia (Mali Empire, Sundiata Keita, Mansa Musa); South African History Online empire-of-Mali overview",
  },
];

/**
 * How far (in years) a click's active-slice year is allowed to fall outside
 * an entity's own [periodStart, periodEnd] and still count as a match.
 * Historical-basemaps snapshots are irregularly spaced and "hold" between
 * known years (see useHistoricalData's header comment), so a slice can
 * legitimately still be labelled with an entity's name a few decades past
 * its conventional end/before its conventional start. The one case this
 * buffer must NOT do is bridge a genuinely different, same-named entity --
 * e.g. "Mali" the medieval empire (periodEnd 1670) vs. the modern Republic
 * of Mali (post-1945 slices) are ~275 years apart, safely outside any
 * buffer this small.
 */
const MATCH_BUFFER_YEARS = 100;

/** Build once: exact NAME string -> profile. */
const BY_NAME = new Map<string, PoliticalEntityProfile>();
for (const entity of POLITICAL_ENTITIES) {
  for (const alias of entity.nameAliases) {
    BY_NAME.set(alias, entity);
  }
}

/**
 * Looks up a curated profile for a clicked map entity, if one exists for
 * this exact name and the active slice's year plausibly falls within (or
 * near) the entity's own historical span. `activeSliceYear` is null for the
 * modern map, treated as "now" for this check -- none of the pilot's
 * entities are still around, so the modern map correctly never matches.
 */
export function findPoliticalEntity(name: string | null, activeSliceYear: number | null): PoliticalEntityProfile | undefined {
  if (!name) return undefined;
  const entity = BY_NAME.get(name);
  if (!entity) return undefined;
  const effectiveYear = activeSliceYear ?? new Date().getFullYear();
  if (effectiveYear < entity.periodStart - MATCH_BUFFER_YEARS) return undefined;
  if (effectiveYear > entity.periodEnd + MATCH_BUFFER_YEARS) return undefined;
  return entity;
}
