import type { Breed } from "@/lib/scoring";

/**
 * Breed resolution. Turns ANY free-text input ("lab", "golden", "GSD", "some kind of
 * husky mix", "doodle") into a REAL trait vector:
 *   1. alias table       — nicknames / abbreviations / misspellings → a curated breed
 *   2. dataset match     — exact, then contains, then word-token
 *   3. group synthesis   — "some terrier" → average of that group's curated breeds
 *   4. global-median synth — last resort, still grounded (never a random hash)
 *
 * Offline by design (no network). The alias table is a hand-authored starter set and can
 * grow without touching callers.
 */

export interface ResolveResult {
  /** A real Breed to score — a dataset hit, or a synthesized vector. Never null. */
  breed: Breed;
  /** The curated breed, if the input resolved to one; null if synthesized. */
  matched: Breed | null;
  resolvedName: string;
  /** True when the vector was synthesized (group/global), not a curated breed. */
  estimated: boolean;
}

// Nickname / abbreviation → canonical curated breed name (lowercase keys).
const ALIASES: Record<string, string> = {
  lab: "Labrador Retriever", labrador: "Labrador Retriever", "yellow lab": "Labrador Retriever",
  "black lab": "Labrador Retriever", "chocolate lab": "Labrador Retriever",
  golden: "Golden Retriever", "golden retreiver": "Golden Retriever",
  gsd: "German Shepherd", "german shepard": "German Shepherd", alsatian: "German Shepherd",
  "shepherd": "German Shepherd",
  frenchie: "French Bulldog", "french bull dog": "French Bulldog",
  bulldog: "English Bulldog", "british bulldog": "English Bulldog",
  husky: "Siberian Husky", "siberian huskie": "Siberian Husky",
  poodle: "Standard Poodle", "mini poodle": "Miniature Poodle",
  doodle: "Goldendoodle", "golden doodle": "Goldendoodle", "labra doodle": "Labradoodle",
  yorkie: "Yorkshire Terrier", "yorkshire terier": "Yorkshire Terrier",
  corgi: "Pembroke Welsh Corgi", "welsh corgi": "Pembroke Welsh Corgi",
  dachsund: "Dachshund", "wiener dog": "Dachshund", "sausage dog": "Dachshund", doxie: "Dachshund",
  "pit bull": "American Pit Bull Terrier", pitbull: "American Pit Bull Terrier", pittie: "Pit Bull Mix",
  staffy: "Staffordshire Bull Terrier", amstaff: "American Staffordshire Terrier",
  rottie: "Rottweiler", rott: "Rottweiler", rottweiller: "Rottweiler",
  dobie: "Doberman Pinscher", doberman: "Doberman Pinscher", dobermann: "Doberman Pinscher",
  "aussie": "Australian Shepherd", "australian shepard": "Australian Shepherd",
  "blue heeler": "Australian Cattle Dog", heeler: "Australian Cattle Dog", "cattle dog": "Australian Cattle Dog",
  "jack russell": "Jack Russell Terrier", jrt: "Jack Russell Terrier",
  westie: "West Highland White Terrier",
  "scottie": "Scottish Terrier",
  chi: "Chihuahua", chiwawa: "Chihuahua", chihuaha: "Chihuahua",
  pom: "Pomeranian", pomeranean: "Pomeranian",
  "shih-tzu": "Shih Tzu", shitzu: "Shih Tzu", "shi tzu": "Shih Tzu",
  "great dane": "Great Dane", dane: "Great Dane",
  "saint bernard": "Saint Bernard", "st bernard": "Saint Bernard", "st. bernard": "Saint Bernard",
  newfie: "Newfoundland",
  berner: "Bernese Mountain Dog", "bernese": "Bernese Mountain Dog",
  pyr: "Great Pyrenees", "pyrenees": "Great Pyrenees",
  malinois: "Belgian Malinois", "belgian shepherd": "Belgian Malinois", mal: "Belgian Malinois",
  cavalier: "Cavalier King Charles Spaniel", "king charles": "Cavalier King Charles Spaniel",
  "cavalier king charles": "Cavalier King Charles Spaniel",
  cocker: "Cocker Spaniel", "cocker spainel": "Cocker Spaniel",
  springer: "English Springer Spaniel",
  weim: "Weimaraner", weimeraner: "Weimaraner",
  vizla: "Vizsla", viszla: "Vizsla",
  ridgeback: "Rhodesian Ridgeback",
  "shar-pei": "Shar Pei", sharpei: "Shar Pei",
  "chow": "Chow Chow",
  shiba: "Shiba Inu",
  "mini schnauzer": "Miniature Schnauzer", schnauzer: "Miniature Schnauzer",
  malamute: "Alaskan Malamute",
  boxer: "Boxer",
  beagle: "Beagle",
  greyhound: "Greyhound", "grey hound": "Greyhound",
  whippet: "Whippet",
  "italian greyhound": "Italian Greyhound", iggy: "Italian Greyhound",
  "border collie": "Border Collie", collie: "Collie (Rough)",
  sheltie: "Shetland Sheepdog",
  "old english sheepdog": "Old English Sheepdog",
  havanese: "Havanese",
  maltese: "Maltese",
  bichon: "Bichon Frise", "bichon frise": "Bichon Frise",
  pug: "Pug",
  "boston": "Boston Terrier",
  "cane corso": "Cane Corso", corso: "Cane Corso",
  mastiff: "English Mastiff",
  bullmastiff: "Bullmastiff",
  akita: "Akita",
  samoyed: "Samoyed", sammy: "Samoyed",
  dalmation: "Dalmatian", dalmatian: "Dalmatian",
  basset: "Basset Hound",
  bloodhound: "Bloodhound",
  "coonhound": "Treeing Walker Coonhound",
  pointer: "Pointer", gsp: "German Shorthaired Pointer", "shorthaired pointer": "German Shorthaired Pointer",
  setter: "Irish Setter", "irish setter": "Irish Setter",
  brittany: "Brittany",
  "wolfhound": "Irish Wolfhound",
  leonberger: "Leonberger",
  "portuguese water dog": "Portuguese Water Dog", porty: "Portuguese Water Dog",
  "wheaten": "Soft Coated Wheaten Terrier", "wheaten terrier": "Soft Coated Wheaten Terrier",
  "mini pin": "Miniature Pinscher", "min pin": "Miniature Pinscher",
  papillon: "Papillon",
  pekingese: "Pekingese",
  "lhasa": "Lhasa Apso",
  basenji: "Basenji",
  borzoi: "Borzoi",
  saluki: "Saluki",
  "xolo": "Xoloitzcuintli", "mexican hairless": "Xoloitzcuintli",
  mutt: "All-Star Rescue Mutt", "mixed breed": "All-Star Rescue Mutt", mix: "All-Star Rescue Mutt",
  rescue: "All-Star Rescue Mutt", "rescue dog": "All-Star Rescue Mutt", mongrel: "All-Star Rescue Mutt",
  "lab mix": "Labrador Mix", "shepherd mix": "Shepherd Mix", "pit mix": "Pit Bull Mix",
  "hound mix": "Hound Mix", "terrier mix": "Terrier Mix", "chihuahua mix": "Chihuahua Mix",
};

// Loose group hints, for "some kind of terrier" → synthesize the Terrier group.
const GROUP_HINTS: Record<string, string> = {
  terrier: "Terrier", hound: "Hound", herding: "Herding", sheepdog: "Herding",
  retriever: "Sporting", spaniel: "Sporting", pointer: "Sporting", setter: "Sporting",
  working: "Working", guard: "Working", toy: "Toy", lapdog: "Toy",
};

const AGG_FIELDS = [
  "energy_level", "exercise_needs", "playfulness", "apartment_friendly", "novice_friendly",
  "trainability", "intelligence", "grooming_needs", "shedding_level", "drooling_level",
  "kid_friendly", "affection_level", "independence", "alone_tolerance", "dog_friendly",
  "cat_friendly", "stranger_friendly", "protectiveness", "watchdog_alertness", "barking_level",
  "heat_tolerance", "cold_tolerance", "health_robustness",
] as const;

type Stats = { byGroup: Map<string, Record<string, number>>; global: Record<string, number> };
let stats: Stats | null = null;

function buildStats(breeds: Breed[]): Stats {
  if (stats) return stats;
  const acc = new Map<string, Record<string, { s: number; n: number }>>();
  const g: Record<string, { s: number; n: number }> = {};
  for (const b of breeds) {
    const c = acc.get(b.group) ?? {};
    for (const f of AGG_FIELDS) {
      const v = b[f] as number | null;
      if (typeof v === "number") {
        c[f] = c[f] ?? { s: 0, n: 0 }; c[f].s += v; c[f].n += 1;
        g[f] = g[f] ?? { s: 0, n: 0 }; g[f].s += v; g[f].n += 1;
      }
    }
    acc.set(b.group, c);
  }
  const byGroup = new Map<string, Record<string, number>>();
  for (const [group, rec] of acc) {
    const out: Record<string, number> = {};
    for (const f of AGG_FIELDS) if (rec[f]) out[f] = rec[f].s / rec[f].n;
    byGroup.set(group, out);
  }
  const global: Record<string, number> = {};
  for (const f of AGG_FIELDS) if (g[f]) global[f] = g[f].s / g[f].n;
  stats = { byGroup, global };
  return stats;
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function synthesize(name: string, group: string | null, breeds: Breed[]): Breed {
  const st = buildStats(breeds);
  const src = (group && st.byGroup.get(group)) || st.global;
  const get = (f: (typeof AGG_FIELDS)[number]) =>
    typeof src[f] === "number" ? Math.round(src[f]) : (typeof st.global[f] === "number" ? Math.round(st.global[f]) : null);
  return {
    id: `synth:${name.toLowerCase()}`,
    name: titleCase(name),
    group: group ?? "Mixed & Rescue",
    size: "Medium",
    weight_lbs: null, lifespan_years: null, image_url: null, description: null, vibe_summary: null,
    tags: [],
    hypoallergenic: false,
    energy_level: get("energy_level"), exercise_needs: get("exercise_needs"), playfulness: get("playfulness"),
    apartment_friendly: get("apartment_friendly"), novice_friendly: get("novice_friendly"),
    trainability: get("trainability"), intelligence: get("intelligence"),
    grooming_needs: get("grooming_needs"), shedding_level: get("shedding_level"), drooling_level: get("drooling_level"),
    kid_friendly: get("kid_friendly"), affection_level: get("affection_level"),
    independence: get("independence"), alone_tolerance: get("alone_tolerance"),
    dog_friendly: get("dog_friendly"), cat_friendly: get("cat_friendly"), stranger_friendly: get("stranger_friendly"),
    protectiveness: get("protectiveness"), watchdog_alertness: get("watchdog_alertness"), barking_level: get("barking_level"),
    heat_tolerance: get("heat_tolerance"), cold_tolerance: get("cold_tolerance"), health_robustness: get("health_robustness"),
    monthly_cost_usd: null, popularity: null, shelter_availability: null,
  };
}

export function resolveBreed(input: string, breeds: Breed[]): ResolveResult {
  const raw = (input ?? "").trim();
  if (!raw || raw.toLowerCase() === "unknown" || raw.toLowerCase() === "none") {
    return { breed: synthesize("a great dog", null, breeds), matched: null, resolvedName: "a great dog", estimated: true };
  }
  const norm = raw.toLowerCase().replace(/\s+/g, " ");
  const byName = (n: string) => breeds.find((b) => b.name.toLowerCase() === n);

  // 1) exact dataset match on the whole string.
  let matched = byName(norm);

  // 2) alias table (exact key, then key contained in the input — longest keys first, so
  //    "lab mix" beats "lab" and "golden doodle" beats "golden").
  if (!matched && ALIASES[norm]) matched = byName(ALIASES[norm].toLowerCase());
  if (!matched) {
    const keys = Object.keys(ALIASES).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (norm === key || norm.includes(key)) {
        matched = byName(ALIASES[key].toLowerCase());
        if (matched) break;
      }
    }
  }

  // 3) dataset name contained in the input ("my childhood golden retriever") or vice versa,
  //    then word-token overlap (best breed sharing the most words with the input).
  if (!matched) {
    matched = breeds.find((b) => norm.includes(b.name.toLowerCase()));
  }
  if (!matched) {
    // A breed matches only if EVERY word of its name appears in the input (so reordered /
    // interspersed inputs match, but generic overlaps like "…Mountain Dog" can't hijack an
    // unrelated breed). Most-specific (longest) name wins.
    const words = new Set(norm.split(/[\s,/-]+/).filter(Boolean));
    let best: { breed: Breed; nWords: number } | null = null;
    for (const b of breeds) {
      const nameWords = b.name.toLowerCase().split(/[\s()-]+/).filter(Boolean);
      const allPresent = nameWords.every((w) => words.has(w));
      if (allPresent && (!best || nameWords.length > best.nWords)) best = { breed: b, nWords: nameWords.length };
    }
    if (best) matched = best.breed;
  }

  if (matched) {
    return { breed: matched, matched, resolvedName: matched.name, estimated: false };
  }

  // 4) group synthesis from a hint word ("some kind of terrier", "a hound of some sort").
  let group: string | null = null;
  for (const hint of Object.keys(GROUP_HINTS)) {
    if (norm.includes(hint)) { group = GROUP_HINTS[hint]; break; }
  }
  const label = titleCase(raw);
  return {
    breed: synthesize(label, group, breeds),
    matched: null,
    resolvedName: label,
    estimated: true,
  };
}
