import type { PolityCulturalLink } from "../../types";

/** Geographic production links preserve the difference between a scholar's
 * cultural tradition and the state within which a work was made. They do not
 * imply that an emperor commissioned an entire intellectual tradition. */
export const CLASSICAL_CULTURAL_LINKS: PolityCulturalLink[] = [
  // Metropolitan Museum: Augustan Rule (27 B.C.–14 A.D.).
  // https://www.metmuseum.org/essays/augustan-rule-27-b-c-14-a-d
  {
    polityId: "roman-empire",
    culturalWorkId: "aeneid",
    relationship: "produced",
    start: -19,
    end: -19,
    note: "Virgil's epic belongs to Augustan Rome's literary culture. This production link does not assert a documented imperial commission; the date marks the unfinished poem at Virgil's death.",
    confidence: "high",
  },
  // Vatican Museums dates the surviving statue to the early first century CE.
  // https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/braccio-nuovo/Augusto-di-Prima-Porta.html
  {
    polityId: "roman-empire",
    culturalWorkId: "augustus-prima-porta",
    relationship: "produced",
    start: 1,
    end: 50,
    note: "The early-imperial marble statue was found at Livia's villa near Rome. Its imagery presents Augustus's authority; the date refers to the surviving sculpture, not the earlier diplomatic event represented on its cuirass.",
    confidence: "high",
  },
  // National Library of Medicine: Greek Medicine, Galen and his Roman career.
  // https://www.nlm.nih.gov/hmd/topics/greek-medicine/index.html
  {
    polityId: "roman-empire",
    culturalWorkId: "galenic-corpus",
    relationship: "produced",
    start: 160,
    end: 200,
    note: "Galen developed his Greek-language medical writings within the Roman Empire, practicing at Pergamum and Rome and serving Marcus Aurelius. This approximate span represents the corpus's second-century development, not a single publication or state commission.",
    confidence: "high",
  },
  // University of St Andrews: Ptolemy biography and Alexandrian observations.
  // https://mathshistory.st-andrews.ac.uk/Biographies/Ptolemy/
  {
    polityId: "roman-empire",
    culturalWorkId: "ptolemys-almagest",
    relationship: "produced",
    start: 150,
    end: 150,
    note: "Ptolemy compiled this Greek astronomical synthesis in second-century Roman Egypt. His name does not place him in the earlier Ptolemaic dynasty; no imperial commission is asserted.",
    confidence: "high",
  },
  // University of St Andrews: Euclid biography, with uncertainty in chronology.
  // https://mathshistory.st-andrews.ac.uk/Biographies/Euclid/
  {
    polityId: "ptolemaic-kingdom-of-egypt",
    culturalWorkId: "euclids-elements",
    relationship: "produced",
    start: -300,
    end: -300,
    note: "Euclid's Elements is conventionally placed around 300 BCE in Alexandria under Ptolemy I. Details of Euclid's life are uncertain; this scholarly-production link does not imply that the king commissioned the treatise.",
    confidence: "medium",
  },
];
