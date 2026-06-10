import type { Location } from "@/lib/scoring";

/**
 * Worldwide current-city resolution. Turns ANY free-text input ("Seseh Bali",
 * "Lisbon, Portugal", "Chengdu", "Portugal") into a REAL feature vector:
 *   1. alias table        — neighborhoods / alt-names → a curated city
 *   2. dataset match       — exact, then comma-part, then word-token
 *   3. country synthesis    — average of that country's curated places
 *   4. global-median synth  — last resort, still grounded (never a random hash)
 *
 * Offline by design (no geocoder/network). The alias + city→country tables are a
 * hand-authored starter set; a full GeoNames gazetteer can be dropped in later via a
 * build step without touching callers.
 */

export interface ResolveResult {
  /** A real Location to score — a dataset hit, or a synthesized vector. Never null. */
  location: Location;
  /** The curated location, if the input resolved to one; null if synthesized. */
  matched: Location | null;
  resolvedName: string;
  /** True when the vector was synthesized (country/global), not a curated place. */
  estimated: boolean;
}

// Neighborhood / alt-name → canonical curated city name (lowercase keys).
const ALIASES: Record<string, string> = {
  // Bali
  canggu: "Canggu", pererenan: "Canggu", berawa: "Canggu", seseh: "Canggu", echo_beach: "Canggu",
  ubud: "Ubud", seminyak: "Bali", kuta: "Bali", sanur: "Bali", uluwatu: "Bali", denpasar: "Bali",
  "nusa dua": "Bali", jimbaran: "Bali", "bali island": "Bali",
  // Common metro neighborhoods
  brooklyn: "New York", manhattan: "New York", nyc: "New York", "new york city": "New York",
  hollywood: "Los Angeles", "la, ca": "Los Angeles", "santa monica": "Los Angeles", venice: "Los Angeles",
  "south beach": "Miami", "miami beach": "Miami",
  shoreditch: "London", hackney: "London",
  // Other frequent nomad spots → nearest curated
  pererenan_bali: "Canggu", ahangama: "Weligama", midigama: "Weligama",
};

// Country-string normalization → canonical country name (matches dataset `country`).
const COUNTRY_NORM: Record<string, string> = {
  usa: "United States", us: "United States", "u.s.": "United States", "u.s.a.": "United States",
  america: "United States", "united states of america": "United States",
  uk: "United Kingdom", "u.k.": "United Kingdom", britain: "United Kingdom", england: "United Kingdom",
  uae: "United Arab Emirates", "czech republic": "Czechia", "south korea": "South Korea",
};

// Bare-city → country, for well-known places not in the curated set (no comma given).
const CITY_COUNTRY: Record<string, string> = {
  chengdu: "China", chongqing: "China", shenzhen: "China", guangzhou: "China", hangzhou: "China",
  nagoya: "Japan", sapporo: "Japan", busan: "South Korea", kaohsiung: "Taiwan",
  surabaya: "Indonesia", bandung: "Indonesia", cebu: "Philippines", davao: "Philippines",
  pune: "India", hyderabad: "India", ahmedabad: "India", kolkata: "India", surat: "India",
  lyon: "France", marseille: "France", toulouse: "France", nantes: "France",
  hamburg: "Germany", cologne: "Germany", stuttgart: "Germany", dusseldorf: "Germany", leipzig: "Germany",
  naples: "Italy", turin: "Italy", bologna: "Italy", verona: "Italy",
  seville: "Spain", malaga: "Spain", bilbao: "Spain", zaragoza: "Spain", murcia: "Spain",
  rotterdam: "Netherlands", "the hague": "Netherlands", utrecht: "Netherlands",
  manchester: "United Kingdom", birmingham: "United Kingdom", leeds: "United Kingdom", glasgow: "United Kingdom",
  calgary: "Canada", ottawa: "Canada", edmonton: "Canada", winnipeg: "Canada",
  houston: "United States", phoenix: "United States", philadelphia: "United States", dallas: "United States",
  "san jose": "United States", columbus: "United States", charlotte: "United States", detroit: "United States",
  guadalajara: "Mexico", monterrey: "Mexico", puebla: "Mexico", queretaro: "Mexico", merida: "Mexico",
  curitiba: "Brazil", recife: "Brazil", fortaleza: "Brazil", "porto alegre": "Brazil", brasilia: "Brazil",
  rosario: "Argentina", cordoba: "Argentina", cali: "Colombia", barranquilla: "Colombia",
  durban: "South Africa", pretoria: "South Africa", nairobi: "Kenya", accra: "Ghana", lagos: "Nigeria",
  perth: "Australia", adelaide: "Australia", "gold coast": "Australia", hobart: "Australia",
};

const AGG_FIELDS = [
  "cost_of_living_score", "rent_score", "safety_score", "healthcare_score", "climate_score",
  "avg_temp_summer", "avg_temp_winter", "humidity_level", "sunshine_days", "beach_access_score",
  "mountain_access_score", "outdoor_score", "nightlife_score", "wellness_score", "community_score",
  "english_friendliness_score", "tax_friendliness_score", "airport_connectivity_score",
  "internet_quality_score", "walkability_score", "transit_score", "culture_openness_score",
  "startup_ecosystem_score", "dating_scene_score", "visa_friendliness_score", "bureaucracy_score",
] as const;

type Stats = { byCountry: Map<string, Record<string, number>>; global: Record<string, number> };
let stats: Stats | null = null;

function buildStats(locations: Location[]): Stats {
  if (stats) return stats;
  const acc = new Map<string, Record<string, { s: number; n: number }>>();
  const g: Record<string, { s: number; n: number }> = {};
  for (const l of locations) {
    const c = acc.get(l.country) ?? {};
    for (const f of AGG_FIELDS) {
      const v = l[f] as number | null;
      if (typeof v === "number") {
        c[f] = c[f] ?? { s: 0, n: 0 }; c[f].s += v; c[f].n += 1;
        g[f] = g[f] ?? { s: 0, n: 0 }; g[f].s += v; g[f].n += 1;
      }
    }
    acc.set(l.country, c);
  }
  const byCountry = new Map<string, Record<string, number>>();
  for (const [country, rec] of acc) {
    const out: Record<string, number> = {};
    for (const f of AGG_FIELDS) if (rec[f]) out[f] = rec[f].s / rec[f].n;
    byCountry.set(country, out);
  }
  const global: Record<string, number> = {};
  for (const f of AGG_FIELDS) if (g[f]) global[f] = g[f].s / g[f].n;
  stats = { byCountry, global };
  return stats;
}

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function synthesize(name: string, country: string | null, locations: Location[]): Location {
  const st = buildStats(locations);
  const src = (country && st.byCountry.get(country)) || st.global;
  const get = (f: (typeof AGG_FIELDS)[number]) => (typeof src[f] === "number" ? Math.round(src[f]) : (typeof st.global[f] === "number" ? Math.round(st.global[f]) : null));
  const sample = country ? locations.find((l) => l.country === country) : undefined;
  return {
    id: `synth:${name.toLowerCase()}`,
    name: titleCase(name),
    region: null,
    country: country ?? "",
    continent: sample?.continent ?? "",
    latitude: null, longitude: null, population: null, image_url: null, description: null, vibe_summary: null,
    tags: [],
    cost_of_living_score: get("cost_of_living_score"), rent_score: get("rent_score"),
    safety_score: get("safety_score"), healthcare_score: get("healthcare_score"),
    climate_score: get("climate_score"), avg_temp_summer: get("avg_temp_summer"),
    avg_temp_winter: get("avg_temp_winter"), humidity_level: get("humidity_level"),
    sunshine_days: get("sunshine_days"), beach_access_score: get("beach_access_score"),
    mountain_access_score: get("mountain_access_score"), outdoor_score: get("outdoor_score"),
    nightlife_score: get("nightlife_score"), wellness_score: get("wellness_score"),
    dating_scene_score: get("dating_scene_score"), community_score: get("community_score"),
    english_friendliness_score: get("english_friendliness_score"),
    visa_friendliness_score: get("visa_friendliness_score"),
    tax_friendliness_score: get("tax_friendliness_score"),
    airport_connectivity_score: get("airport_connectivity_score"),
    internet_quality_score: get("internet_quality_score"), walkability_score: get("walkability_score"),
    transit_score: get("transit_score"), culture_openness_score: get("culture_openness_score"),
    startup_ecosystem_score: get("startup_ecosystem_score"), bureaucracy_score: get("bureaucracy_score"),
    personal_income_tax_rate: null, corporate_tax_rate: null, capital_gains_tax_rate: null, tax_notes: null,
  };
}

export function resolvePlace(input: string, locations: Location[]): ResolveResult {
  const raw = (input ?? "").trim();
  if (!raw || raw.toLowerCase() === "unknown") {
    return { location: synthesize("your area", null, locations), matched: null, resolvedName: "your area", estimated: true };
  }
  const norm = raw.toLowerCase();
  const parts = norm.split(",").map((s) => s.trim()).filter(Boolean);
  const byName = (n: string) => locations.find((l) => l.name.toLowerCase() === n);

  // 1) exact dataset match on the whole string or any comma part (city part).
  let matched = byName(norm) || parts.map(byName).find(Boolean);

  // 2) alias table (substring/word match) → canonical curated city.
  if (!matched) {
    for (const key of Object.keys(ALIASES)) {
      const k = key.replace(/_/g, " ");
      if (norm === k || norm.includes(k)) { matched = byName(ALIASES[key].toLowerCase()); if (matched) break; }
    }
  }

  // 3) word-token dataset match (e.g. "canggu bali" → Canggu).
  if (!matched) {
    const words = norm.split(/[,\s]+/).filter(Boolean);
    matched = words.map(byName).find(Boolean);
  }

  if (matched) {
    return { location: matched, matched, resolvedName: matched.name, estimated: false };
  }

  // 4) country synthesis. Identify a country from any part / known city→country map.
  const normCountry = (s: string) => COUNTRY_NORM[s] ?? titleCase(s);
  const datasetCountries = new Set(locations.map((l) => l.country));
  let country: string | null = null;
  let cityLabel = parts[0] ? titleCase(parts[0]) : titleCase(raw);
  for (const part of parts) {
    const cand = normCountry(part);
    if (datasetCountries.has(cand)) { country = cand; break; }
  }
  if (!country) {
    const cityKey = parts[0] ?? norm;
    if (CITY_COUNTRY[cityKey]) country = CITY_COUNTRY[cityKey];
  }
  // If the input WAS just a country name, label it by the country.
  if (country && parts.length === 1 && normCountry(parts[0]) === country) cityLabel = country;

  return {
    location: synthesize(cityLabel, country, locations),
    matched: null,
    resolvedName: cityLabel,
    estimated: true,
  };
}
