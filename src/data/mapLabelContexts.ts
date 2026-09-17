import type { MapLabelContext } from "../types";

/** Context cards intentionally do not masquerade as political-entity profiles. */
export const MAP_LABEL_CONTEXTS: MapLabelContext[] = [
  {
    nameAliases: ["Polynesians"],
    title: "Polynesia: a cultural and linguistic region",
    description: "“Polynesians” describes peoples and island societies across a vast oceanic region, not one historical kingdom or empire. Political histories differ between Tonga, Sāmoa, Hawaiʻi, Tahiti, Aotearoa, and many other islands; map boundaries under this umbrella should therefore be read as broad cultural geography rather than sovereignty.",
    sourceLink: "https://www.nps.gov/npsa/learn/historyculture/people.htm",
    sourceLabel: "U.S. National Park Service, People of American Samoa",
  },
  {
    nameAliases: ["central Asian khanates"],
    title: "Central Asian khanates: a map category",
    description: "This label groups multiple changing states, including khanates and oasis polities with distinct dynasties, languages, trade networks, and dates. It is a cartographic shorthand, not a sovereign polity; a reliable political profile must identify the particular khanate and snapshot year.",
    sourceLink: "https://www.metmuseum.org/toah/hd/silk/hd_silk.htm",
    sourceLabel: "The Metropolitan Museum of Art, The Silk Road",
  },
  {
    nameAliases: ["Hainan"],
    title: "Hainan: an island region",
    description: "Hainan is a geographic island label, not the name of a single historical state. Its history has involved Indigenous Li communities, migration, maritime exchange, and changing relationships with mainland Chinese governments; a border label alone cannot identify one ruler or dynasty.",
    sourceLink: "https://www.britannica.com/place/Hainan",
    sourceLabel: "Encyclopaedia Britannica, Hainan",
  },
  {
    nameAliases: ["Thule"],
    title: "Thule: an archaeological culture",
    description: "Thule is an archaeological term for Inuit ancestral communities and traditions that spread across Arctic North America. It is not the name of a kingdom; its history is reconstructed from material culture, oral knowledge, environmental change, and relationships among Arctic peoples.",
    sourceLink: "https://naturalhistory.si.edu/education/teaching-resources/anthropology-and-social-studies/arctic-lands-and-peoples",
    sourceLabel: "Smithsonian National Museum of Natural History, Arctic Lands and Peoples",
  },
  {
    nameAliases: ["Athabaskan"],
    title: "Athabaskan: a language-family label",
    description: "Athabaskan is primarily a linguistic classification encompassing many distinct Indigenous peoples and languages across northern North America. It does not identify one state, one ruler, or a single shared territorial boundary, so the map label requires cultural rather than dynastic interpretation.",
    sourceLink: "https://www150.statcan.gc.ca/n1/pub/41-20-0002/412000022025003-eng.htm",
    sourceLabel: "Statistics Canada, Indigenous Language Families: Athabaskan languages",
  },
  {
    nameAliases: ["Shuar"],
    title: "Shuar: Indigenous communities of the Upper Amazon",
    description: "Shuar refers to Indigenous communities with their own social, linguistic, and territorial histories in the Upper Amazon. It is not a single centralized kingdom; a polygon carrying this label should not be read as a dynastic or modern national border.",
    sourceLink: "https://www.usfq.edu.ec/es/proyectos/tsantsas-museos-y-responsabilidad-social-una-propuesta-conjunta-y-participativa-con-la",
    sourceLabel: "Universidad San Francisco de Quito, Shuar collaborative research",
  },
];

const BY_NAME = new Map<string, MapLabelContext>();
for (const context of MAP_LABEL_CONTEXTS) {
  for (const alias of context.nameAliases) BY_NAME.set(alias, context);
}

export function findMapLabelContext(name: string | null): MapLabelContext | undefined {
  return name ? BY_NAME.get(name.trim()) : undefined;
}
