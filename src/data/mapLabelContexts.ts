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
  {
    nameAliases: ["Mossi States"],
    title: "Mossi states: a family of kingdoms",
    description: "“Mossi States” is a collective map label for several historically distinct Mossi kingdoms in the region of present-day Burkina Faso, rather than one sovereign state with one ruler list. Their political and artistic histories varied between courts such as Ouagadougou and Yatenga; a reliable dynasty card needs the particular kingdom and date.",
    sourceLink: "https://www.metmuseum.org/art/collection/search/314810",
    sourceLabel: "The Metropolitan Museum of Art, Mossi royal-court sculpture",
  },
  {
    nameAliases: ["Bantou"],
    title: "Bantu: a broad language-family map label",
    description: "This historical-map label refers broadly to Bantu-speaking peoples, not to a single kingdom, ethnicity, or ruler. Bantu languages are spoken across a vast area and their speakers have formed many different societies and states; the polygon should be read as a coarse cultural-linguistic category rather than sovereignty.",
    sourceLink: "https://www.metmuseum.org/toah/ht/06/afa.html",
    sourceLabel: "The Metropolitan Museum of Art, Eastern and Southern Africa, 500–1000",
  },
  {
    nameAliases: ["Islamic city-states"],
    title: "Islamic city-states: a regional shorthand",
    description: "This label compresses multiple independent or semi-independent urban polities into one polygon. Religious affiliation and trading connections did not make them a single state: accurate political context depends on the named city, dynasty, and snapshot year.",
    sourceLink: "https://www.metmuseum.org/toah/ht/06/afa.html",
    sourceLabel: "The Metropolitan Museum of Art, Eastern and Southern Africa, 500–1000",
  },
  {
    nameAliases: ["Anguilla"],
    title: "Anguilla: an island and British territory",
    description: "Anguilla is an island with a distinct local history, but the bare map label does not identify one continuous sovereign state. It became a separate British territory in 1980 after its earlier constitutional relationship with Saint Kitts and Nevis; applying that modern status to every older polygon would be misleading.",
    sourceLink: "https://www.gov.ai/service/about-anguilla/anguilla-history",
    sourceLabel: "Government of Anguilla, Anguilla History",
  },
  {
    nameAliases: ["Netherlands Antilles"],
    title: "Netherlands Antilles: a former constituent country",
    description: "The Netherlands Antilles was a constituent country of the Kingdom of the Netherlands from 1954 until it was dissolved in 2010. It was not a single continuous historical polity for all Caribbean snapshots; its former islands now have differing constitutional relationships with the Kingdom.",
    sourceLink: "https://treaties.un.org/pages/HistoricalInfo.aspx",
    sourceLabel: "United Nations Treaty Collection, historical constitutional information",
  },
  {
    nameAliases: ["Saint Barthelemy"],
    title: "Saint-Barthélemy: an island label",
    description: "Saint-Barthélemy is an island, not a historical independent country. Since 2007 it has had the status of a French overseas collectivity, but earlier map labels need to be interpreted through their changing French and regional administrative context rather than as the same polity across time.",
    sourceLink: "https://www.legifrance.gouv.fr/contenu/Media/files/autour-de-la-loi/guide-de-legistique/2025_10_06_fiche_3.6.6_saint-barthelemy.pdf",
    sourceLabel: "French Government legal-status guide, Saint-Barthélemy",
  },
  {
    nameAliases: ["Saint Martin"],
    title: "Saint Martin: a divided island",
    description: "Saint Martin is a geographically divided Caribbean island: its northern part is French Saint-Martin and its southern part is Sint Maarten in the Kingdom of the Netherlands. A bare island label cannot honestly be supplied with one ruler list or one sovereign history; the French collectivity dates from 2007.",
    sourceLink: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000465963",
    sourceLabel: "French law establishing the Collectivity of Saint-Martin",
  },
  {
    nameAliases: ["Guadeloupe"],
    title: "Guadeloupe: an archipelago and French overseas department",
    description: "Guadeloupe is an archipelago whose administrative scope has changed. It became a French overseas department in 1946; Saint-Barthélemy and French Saint-Martin ceased to fall within its departmental and regional framework in 2007. The map label should not be read as a single sovereign state across all periods.",
    sourceLink: "https://digitallibrary.un.org/record/368845/files/CERD_C_337_Add.5-EN.pdf",
    sourceLabel: "United Nations documentation on French overseas departments",
  },
  {
    nameAliases: ["Montserrat"],
    title: "Montserrat: a UK-administered Caribbean territory",
    description: "Montserrat is a Caribbean island territory administered by the United Kingdom, not an independent historical country. Its political status and regional associations changed over time, including membership in the West Indies Federation from 1958 to 1962; a generic map label needs this territorial context rather than invented national rulers.",
    sourceLink: "https://www.un.org/dppa/decolonization/en/node/682",
    sourceLabel: "United Nations, Montserrat decolonization profile",
  },
  {
    nameAliases: ["Wallis and Futuna Islands"],
    title: "Wallis and Futuna: islands with a French territorial status",
    description: "Wallis and Futuna denotes islands with distinct customary kingdoms as well as a later French territorial framework. French overseas-territory status dates from 1961; a single generic map label cannot turn the islands' earlier and local political histories into one uninterrupted state.",
    sourceLink: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000684031/",
    sourceLabel: "French law on Wallis and Futuna's 1961 status",
  },
  {
    nameAliases: ["Madagascar"],
    title: "Madagascar: an island, not one continuous premodern state",
    description: "Madagascar is an island with many distinct Malagasy polities, communities, and regional histories. The Merina kingdom expanded from the central highlands only in the late eighteenth and nineteenth centuries, while the independent republic dates from 1960; a country-shaped map label at other dates must be read as geographic shorthand rather than a timeless sovereign polity.",
    sourceLink: "https://www.metmuseum.org/essays/kingdoms-of-madagascar-maroserana-and-merina",
    sourceLabel: "The Metropolitan Museum of Art, Kingdoms of Madagascar: Maroserana and Merina",
  },
  {
    nameAliases: ["Hadramaut"],
    title: "Hadramawt: a South Arabian region",
    description: "Hadramawt names a South Arabian region as well as an ancient kingdom. The ancient kingdom is separately curated where the snapshot fits its archaeological period; later polygons bearing the same name should be read as regional geography or later political configurations, not as a 1,000-year continuation of the ancient state.",
    sourceLink: "https://www.britishmuseum.org/collection/galleries/ancient-south-arabia",
    sourceLabel: "The British Museum, Ancient South Arabia galleries",
  },
  {
    nameAliases: ["Expansionist Kingdom of Merina"],
    title: "Merina expansion: a late historical period",
    description: "The Merina monarchy developed in Madagascar's central highlands and expanded over much of the island in the nineteenth century. When this specific label appears on much earlier map snapshots, it is an anachronistic basemap category rather than evidence that the same kingdom ruled from the year shown; the date-bound Merina political card is used only for its actual period.",
    sourceLink: "https://www.metmuseum.org/essays/kingdoms-of-madagascar-maroserana-and-merina",
    sourceLabel: "The Metropolitan Museum of Art, Kingdoms of Madagascar: Maroserana and Merina",
  },
  {
    nameAliases: ["Britany"],
    title: "Brittany: a historical region",
    description: "The map's “Britany” spelling denotes Brittany, a region whose political status shifted through Breton kingdoms and duchies, incorporation into France, and modern regional administration. Its long-lived megalithic and cultural landscapes cannot responsibly be reduced to one uninterrupted state or ruler list.",
    sourceLink: "https://whc.unesco.org/en/decisions/8957/",
    sourceLabel: "UNESCO World Heritage Committee, Megalithic Sites of Carnac and the shores of Morbihan",
  },
  {
    nameAliases: ["Sardinia"],
    title: "Sardinia: a Mediterranean island with changing polities",
    description: "Sardinia is an island whose history includes Nuragic communities, Phoenician, Carthaginian and Roman rule, medieval judicates, and later dynastic and Italian state frameworks. A polygon labelled simply “Sardinia” is geographic shorthand, not proof of a single state extending across the map's long timeline.",
    sourceLink: "https://whc.unesco.org/en/list/833/",
    sourceLabel: "UNESCO World Heritage Centre, Su Nuraxi di Barumini",
  },
  {
    nameAliases: ["Ceylon"],
    title: "Ceylon: an historical island and colonial name",
    description: "Ceylon was a long-used name for the island now called Sri Lanka, including Portuguese, Dutch, and British colonial periods and the dominion that became independent in 1948. A bare “Ceylon” map label does not identify one continuous sovereign polity and should not be used to flatten the island's diverse kingdoms, languages, and communities.",
    sourceLink: "https://www.britannica.com/place/Sri-Lanka",
    sourceLabel: "Encyclopaedia Britannica, Sri Lanka",
  },
  {
    nameAliases: ["Dutch East Indies"],
    title: "Dutch East Indies: a colonial administrative frame",
    description: "The Dutch East Indies was a colonial administration encompassing many islands, peoples, kingdoms, and port societies in what is now largely Indonesia. It is not a single indigenous polity or a timeless name for Indonesia; the label should be read as a changing colonial framework with uneven territorial control.",
    sourceLink: "https://www.nationaalarchief.nl/en/research/archives",
    sourceLabel: "National Archives of the Netherlands, colonial archives research",
  },
  {
    nameAliases: ["Rapa Nui"],
    title: "Rapa Nui: an island and living Indigenous culture",
    description: "Rapa Nui refers to the island and its Indigenous people, whose history includes the creation of moai landscapes, changing local social orders, Chilean annexation, and ongoing community stewardship. It is not a single centralized kingdom for every map snapshot, so a cultural and historical context is more accurate than a fabricated ruler list.",
    sourceLink: "https://whc.unesco.org/en/list/715/",
    sourceLabel: "UNESCO World Heritage Centre, Rapa Nui National Park",
  },
  {
    nameAliases: ["Maori"],
    title: "Māori: tangata whenua of Aotearoa",
    description: "Māori are the Indigenous peoples of Aotearoa New Zealand, with distinct iwi and hapū histories, oral traditions, artistic practices, and systems of authority. “Maori” on a historical map is not the name of one centralized kingdom; it should be interpreted as cultural and territorial geography rather than a single sovereign border.",
    sourceLink: "https://teara.govt.nz/en/maori",
    sourceLabel: "Te Ara — The Encyclopedia of New Zealand, Māori",
  },
  {
    nameAliases: ["Minang"],
    title: "Minangkabau: a people and cultural region",
    description: "Minang is a map shorthand for Minangkabau communities of West Sumatra, whose social organization, customary law, architecture, arts, and matrilineal traditions have their own histories. It does not identify one empire or a single ruler; the polygon should be read as a cultural region rather than a unitary state.",
    sourceLink: "https://whc.unesco.org/en/tentativelists/6059/",
    sourceLabel: "UNESCO Tentative Lists, Traditional Settlement at Nagari Sijunjung",
  },
  {
    nameAliases: ["Malaya"],
    title: "Malaya: a changing regional and colonial term",
    description: "Malaya has been used for a peninsula and for shifting political arrangements, including Malay sultanates, British colonial territories, and the Federation of Malaya before the formation of Malaysia. A bare map label cannot be honestly turned into one continuous state or ruler list across all its snapshots.",
    sourceLink: "https://www.nas.gov.sg/archivesonline/data/pdfdoc/lky19600119a.pdf",
    sourceLabel: "National Archives of Singapore, historical record on Malaya and regional colonial boundaries",
  },
];

const BY_NAME = new Map<string, MapLabelContext>();
for (const context of MAP_LABEL_CONTEXTS) {
  for (const alias of context.nameAliases) BY_NAME.set(alias, context);
}

export function findMapLabelContext(name: string | null): MapLabelContext | undefined {
  return name ? BY_NAME.get(name.trim()) : undefined;
}
