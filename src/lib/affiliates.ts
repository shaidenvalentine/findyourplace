import type { FreeRun } from "@/lib/run";
import { incomeMidpoint } from "@/lib/tax";

/**
 * Affiliate catalog + recommendation engine — the primary back-end revenue stream.
 *
 * Each partner is a real, relevant service a mover needs. The actual tracked link lives
 * in an env var (the affiliate URL the partner's program gives you); until it's set, the
 * link falls back to the plain site (no commission, still useful). We route every click
 * through /go/[id] so we can attribute + measure. Recommendations are PERSONALIZED to the
 * run so they read as concierge advice, not ads. FTC disclosure shown in the UI.
 */

export type AffCategory =
  | "tax"
  | "insurance"
  | "banking"
  | "visa"
  | "flights"
  | "stay"
  | "esim"
  | "vpn"
  | "moving"
  | "coworking"
  | "language";

export interface AffiliatePartner {
  id: string;
  name: string;
  category: AffCategory;
  blurb: string;
  cta: string;
  baseUrl: string;
  /** Env var holding the full affiliate tracking URL; falls back to baseUrl if unset. */
  affEnv: string;
  recurring?: boolean;
  conditions?: {
    lifestyle?: ("rooted" | "nomadic")[];
    usCitizenOnly?: boolean;
    investorOnly?: boolean;
    minIncomeMidpoint?: number;
  };
}

export const PARTNERS: AffiliatePartner[] = [
  // Tax
  {
    id: "brighttax",
    name: "Bright!Tax",
    category: "tax",
    blurb: "US expat tax specialists — file from abroad and claim the exclusions you're owed.",
    cta: "Talk to a US expat CPA",
    baseUrl: "https://brighttax.com",
    affEnv: "AFF_BRIGHTTAX",
    conditions: { usCitizenOnly: true },
  },
  {
    id: "taxesforexpats",
    name: "Taxes for Expats",
    category: "tax",
    blurb: "Vetted cross-border tax advisors who plan the move, not just file the return.",
    cta: "Get a tax plan",
    baseUrl: "https://www.taxesforexpats.com",
    affEnv: "AFF_TAXESFOREXPATS",
  },
  // Insurance
  {
    id: "safetywing",
    name: "SafetyWing",
    category: "insurance",
    blurb: "Health + travel insurance built for nomads — covers you in 180+ countries, cancel anytime.",
    cta: "Get covered",
    baseUrl: "https://safetywing.com",
    affEnv: "AFF_SAFETYWING",
    recurring: true,
    conditions: { lifestyle: ["nomadic"] },
  },
  {
    id: "genki",
    name: "Genki",
    category: "insurance",
    blurb: "Flexible long-term health insurance for people living abroad. Simple, monthly, global.",
    cta: "Compare plans",
    baseUrl: "https://genki.world",
    affEnv: "AFF_GENKI",
    recurring: true,
  },
  // Banking
  {
    id: "wise",
    name: "Wise",
    category: "banking",
    blurb: "Hold + spend 40+ currencies at the real exchange rate. The default nomad bank account.",
    cta: "Open a Wise account",
    baseUrl: "https://wise.com",
    affEnv: "AFF_WISE",
  },
  {
    id: "mercury",
    name: "Mercury",
    category: "banking",
    blurb: "Banking built for founders running a business from anywhere.",
    cta: "Set up business banking",
    baseUrl: "https://mercury.com",
    affEnv: "AFF_MERCURY",
    conditions: { investorOnly: true },
  },
  // Visa / residency
  {
    id: "ivisa",
    name: "iVisa",
    category: "visa",
    blurb: "Check requirements and apply for visas and digital-nomad permits without the embassy run-around.",
    cta: "Check visa options",
    baseUrl: "https://www.ivisa.com",
    affEnv: "AFF_IVISA",
  },
  // Flights
  {
    id: "skyscanner",
    name: "Skyscanner",
    category: "flights",
    blurb: "Scout flights for your trial run — set a price alert and watch the route.",
    cta: "Find flights",
    baseUrl: "https://www.skyscanner.com",
    affEnv: "AFF_SKYSCANNER",
  },
  // Stay
  {
    id: "booking",
    name: "Booking.com",
    category: "stay",
    blurb: "Book your scouting trip or first weeks while you find a long-term place.",
    cta: "Book a stay",
    baseUrl: "https://www.booking.com",
    affEnv: "AFF_BOOKING",
  },
  {
    id: "blueground",
    name: "Blueground",
    category: "stay",
    blurb: "Move-in-ready furnished apartments by the month — perfect for a soft landing.",
    cta: "Browse furnished homes",
    baseUrl: "https://www.theblueground.com",
    affEnv: "AFF_BLUEGROUND",
  },
  // eSIM
  {
    id: "airalo",
    name: "Airalo",
    category: "esim",
    blurb: "Land with data already working — an eSIM for your new country in two taps.",
    cta: "Get an eSIM",
    baseUrl: "https://www.airalo.com",
    affEnv: "AFF_AIRALO",
  },
  // VPN
  {
    id: "nordvpn",
    name: "NordVPN",
    category: "vpn",
    blurb: "Keep your banking, streaming, and home-country logins working from abroad.",
    cta: "Stay connected",
    baseUrl: "https://nordvpn.com",
    affEnv: "AFF_NORDVPN",
    recurring: true,
  },
  // Moving
  {
    id: "sirelo",
    name: "Sirelo",
    category: "moving",
    blurb: "Compare quotes from vetted international movers if you're shipping a life, not a suitcase.",
    cta: "Compare movers",
    baseUrl: "https://www.sirelo.com",
    affEnv: "AFF_SIRELO",
    conditions: { lifestyle: ["rooted"] },
  },
  // Coworking
  {
    id: "coworker",
    name: "Coworker",
    category: "coworking",
    blurb: "Find a desk and a community from day one in your new city.",
    cta: "Find coworking",
    baseUrl: "https://www.coworker.com",
    affEnv: "AFF_COWORKER",
    conditions: { lifestyle: ["nomadic"] },
  },
  // Language
  {
    id: "italki",
    name: "italki",
    category: "language",
    blurb: "Learn enough of the local language to actually belong — 1-on-1 tutors, your schedule.",
    cta: "Start learning",
    baseUrl: "https://www.italki.com",
    affEnv: "AFF_ITALKI",
  },
];

export function getPartner(id: string): AffiliatePartner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

function passesConditions(p: AffiliatePartner, run: FreeRun): boolean {
  const c = p.conditions;
  if (!c) return true;
  const inp = run.inputs;
  if (c.lifestyle && (!inp.lifestyleMode || !c.lifestyle.includes(inp.lifestyleMode))) return false;
  if (c.usCitizenOnly && !inp.isUsCitizen) return false;
  if (c.investorOnly && !inp.hasInvestmentIncome) return false;
  if (c.minIncomeMidpoint) {
    const mid = incomeMidpoint(inp.annualIncomeBand) ?? 0;
    if (mid < c.minIncomeMidpoint) return false;
  }
  return true;
}

export interface ToolkitSection {
  title: string;
  subtitle: string;
  items: AffiliatePartner[];
}

/**
 * Personalized "relocation toolkit" — sectioned, ordered by the user's situation so the
 * most relevant, highest-intent items lead. Only includes partners whose conditions match.
 */
export function recommendToolkit(run: FreeRun): ToolkitSection[] {
  const pick = (cats: AffCategory[], extra?: (p: AffiliatePartner) => boolean) =>
    PARTNERS.filter((p) => cats.includes(p.category) && passesConditions(p, run) && (!extra || extra(p)));

  const taxRelevant =
    Boolean(run.taxComparison) ||
    run.inputs.taxSensitivity === "very-sensitive" ||
    Boolean(run.inputs.isUsCitizen) ||
    Boolean(run.inputs.hasInvestmentIncome);

  const sections: ToolkitSection[] = [];

  if (taxRelevant) {
    const tax = pick(["tax"]);
    if (tax.length) sections.push({ title: "Sort your taxes", subtitle: "Get the move structured right from day one.", items: tax });
  }

  const money = pick(["banking"]);
  if (money.length) sections.push({ title: "Move your money", subtitle: "Multi-currency accounts that work everywhere.", items: money });

  const cover = pick(["insurance"]);
  if (cover.length) sections.push({ title: "Get covered", subtitle: "Health + travel insurance for life abroad.", items: cover });

  const getThere = pick(["visa", "flights", "moving"]);
  if (getThere.length) sections.push({ title: "Get there", subtitle: "Visas, flights, and shipping your life over.", items: getThere });

  const settle = pick(["stay", "esim", "coworking", "language", "vpn"]);
  if (settle.length) sections.push({ title: "Land softly", subtitle: "Everything for a smooth first month.", items: settle });

  return sections;
}

/** A single highest-intent recommendation for a contextual spot (e.g. under the tax card). */
export function topTaxPartner(run: FreeRun): AffiliatePartner | undefined {
  return PARTNERS.filter((p) => p.category === "tax" && passesConditions(p, run))[0];
}
