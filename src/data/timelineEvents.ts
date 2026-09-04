import type { TimelineEvent } from "../types";

// PLACEHOLDER event list for the timeline "snap to event" mechanic.
// This is a hand-picked, illustrative sample spanning world regions and
// eras -- it exists to prove out the UI, not as a vetted historical
// dataset. Phase 2 replaces/expands this from a sourced dataset (see
// README "Data roadmap").
export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: -3200, label: "Cuneiform script emerges in Sumer", region: "Mesopotamia" },
  { year: -3100, label: "Unification of Egypt under Narmer", region: "Egypt" },
  { year: -2600, label: "Indus Valley Civilization flourishes (script undeciphered)", region: "South Asia" },
  { year: -2334, label: "Sargon of Akkad founds the Akkadian Empire", region: "Mesopotamia" },
  { year: -1792, label: "Hammurabi's Code issued in Babylon", region: "Mesopotamia" },
  { year: -1600, label: "Shang dynasty begins in China", region: "East Asia" },
  { year: -1450, label: "Linear B script in use in Mycenaean Greece", region: "Aegean" },
  { year: -1200, label: "Late Bronze Age collapse begins", region: "Mediterranean" },
  { year: -776, label: "First recorded Olympic Games", region: "Greece" },
  { year: -753, label: "Traditional founding date of Rome", region: "Italy" },
  { year: -550, label: "Cyrus the Great founds the Achaemenid Empire", region: "Persia" },
  { year: -336, label: "Alexander the Great becomes king of Macedon", region: "Greece" },
  { year: -221, label: "Qin Shi Huang unifies China", region: "East Asia" },
  { year: -27, label: "Roman Empire begins under Augustus", region: "Italy" },
  { year: 100, label: "Han dynasty China near its height", region: "East Asia" },
  { year: 320, label: "Gupta Empire founded in India", region: "South Asia" },
  { year: 476, label: "Fall of the Western Roman Empire (traditional date)", region: "Italy" },
  { year: 622, label: "Hijra marks the start of the Islamic calendar", region: "Arabia" },
  { year: 711, label: "Umayyad conquest of Hispania begins", region: "Iberia" },
  { year: 793, label: "Viking Age begins (raid on Lindisfarne)", region: "Britain" },
  { year: 1066, label: "Norman Conquest of England", region: "Britain" },
  { year: 1206, label: "Mongol Empire founded by Genghis Khan", region: "Steppe" },
  { year: 1206, label: "Delhi Sultanate founded", region: "South Asia" },
  { year: 1300, label: "Ottoman Empire founded", region: "Anatolia" },
  { year: 1347, label: "Black Death reaches Europe", region: "Europe" },
  { year: 1453, label: "Fall of Constantinople to the Ottomans", region: "Anatolia" },
  { year: 1492, label: "Columbus reaches the Americas", region: "Americas" },
  { year: 1526, label: "Mughal Empire founded in India", region: "South Asia" },
  { year: 1600, label: "British East India Company chartered", region: "South Asia" },
  { year: 1789, label: "French Revolution begins", region: "Europe" },
  { year: 1857, label: "Indian Rebellion of 1857", region: "South Asia" },
  { year: 1912, label: "Qing dynasty falls, Republic of China founded", region: "East Asia" },
  { year: 1914, label: "World War I begins", region: "World" },
  { year: 1939, label: "World War II begins", region: "World" },
  { year: 1945, label: "United Nations founded", region: "World" },
  { year: 1947, label: "Independence and Partition of India and Pakistan", region: "South Asia" },
  { year: 1991, label: "Soviet Union dissolves", region: "World" },
  { year: 2026, label: "Present day", region: "World" },
];

export const TIMELINE_MIN_YEAR = -3200; // cuneiform emerges in Sumer -- start of written history, and of this timeline
export const TIMELINE_MAX_YEAR = 2026;
