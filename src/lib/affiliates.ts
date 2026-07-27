import type { FreeRun } from "@/lib/run";
import { budgetMidpoint } from "@/lib/cost";

/**
 * Affiliate catalog + recommendation engine — the primary back-end revenue stream.
 *
 * Each partner is a real, relevant service a new dog owner needs. The actual tracked link
 * lives in an env var (the affiliate URL the partner's program gives you); until it's set,
 * the link falls back to the plain site (no commission, still useful). We route every click
 * through /go/[id] so we can attribute + measure. Recommendations are PERSONALIZED to the
 * run so they read as concierge advice, not ads. FTC disclosure shown in the UI.
 */

export type AffCategory =
  | "insurance"
  | "food"
  | "training"
  | "gear"
  | "care"
  | "health";

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
    /** Only for first-time owners (training-heavy picks). */
    firstTimeOnly?: boolean;
    /** Only when the user is open to adopting (DNA kits, rescue-flavored picks). */
    adoptersOnly?: boolean;
    /** Only when the dog will regularly be without them (long days / frequent travel). */
    awayALot?: boolean;
    /** Minimum monthly budget midpoint (premium food, subscriptions). */
    minBudgetMidpoint?: number;
  };
}

export const PARTNERS: AffiliatePartner[] = [
  // Insurance
  {
    id: "lemonade-pet",
    name: "Lemonade Pet",
    category: "insurance",
    blurb: "Pet insurance in minutes — cover the surgery bill before it exists. Cheapest while they're young.",
    cta: "Get a quote",
    baseUrl: "https://www.lemonade.com/pet",
    affEnv: "AFF_LEMONADE_PET",
    recurring: true,
  },
  {
    id: "healthypaws",
    name: "Healthy Paws",
    category: "insurance",
    blurb: "One simple plan, no payout caps — the workhorse policy for accident + illness coverage.",
    cta: "Compare coverage",
    baseUrl: "https://www.healthypawspetinsurance.com",
    affEnv: "AFF_HEALTHYPAWS",
    recurring: true,
  },
  // Food
  {
    id: "chewy",
    name: "Chewy",
    category: "food",
    blurb: "Food, treats, and everything else on autoship — never run out the week you're busiest.",
    cta: "Set up autoship",
    baseUrl: "https://www.chewy.com",
    affEnv: "AFF_CHEWY",
    recurring: true,
  },
  {
    id: "farmersdog",
    name: "The Farmer's Dog",
    category: "food",
    blurb: "Fresh food portioned to your dog's breed, weight, and age — delivered on your schedule.",
    cta: "Build their plan",
    baseUrl: "https://www.thefarmersdog.com",
    affEnv: "AFF_FARMERSDOG",
    recurring: true,
    conditions: { minBudgetMidpoint: 200 },
  },
  // Training
  {
    id: "goodpup",
    name: "GoodPup",
    category: "training",
    blurb: "1-on-1 video training with a certified trainer — house rules and recall from your living room.",
    cta: "Meet your trainer",
    baseUrl: "https://goodpup.com",
    affEnv: "AFF_GOODPUP",
    recurring: true,
  },
  {
    id: "spiritdog",
    name: "SpiritDog Training",
    category: "training",
    blurb: "Self-paced online courses for the specifics — leash pulling, barking, separation, recall.",
    cta: "Browse courses",
    baseUrl: "https://spiritdogtraining.com",
    affEnv: "AFF_SPIRITDOG",
    conditions: { firstTimeOnly: true },
  },
  // Gear
  {
    id: "barkbox",
    name: "BarkBox",
    category: "gear",
    blurb: "A monthly box of toys + treats matched to your dog's size — enrichment on autopilot.",
    cta: "Get the box",
    baseUrl: "https://www.barkbox.com",
    affEnv: "AFF_BARKBOX",
    recurring: true,
  },
  {
    id: "fi",
    name: "Fi Smart Collar",
    category: "gear",
    blurb: "GPS collar with escape alerts and step tracking — know where they are and how far they ran.",
    cta: "Track your dog",
    baseUrl: "https://tryfi.com",
    affEnv: "AFF_FI",
    recurring: true,
    conditions: { awayALot: true },
  },
  // Care (when you're away)
  {
    id: "rover",
    name: "Rover",
    category: "care",
    blurb: "Vetted local sitters and dog walkers — midday walks for long workdays, boarding for trips.",
    cta: "Find a sitter",
    baseUrl: "https://www.rover.com",
    affEnv: "AFF_ROVER",
    conditions: { awayALot: true },
  },
  // Health
  {
    id: "vetster",
    name: "Vetster",
    category: "health",
    blurb: "Licensed vets on video, day or night — triage the 2am 'should I worry?' without the ER bill.",
    cta: "Talk to a vet",
    baseUrl: "https://vetster.com",
    affEnv: "AFF_VETSTER",
  },
  {
    id: "embark",
    name: "Embark",
    category: "health",
    blurb: "The dog DNA test — confirm your rescue's breed mix and screen 250+ genetic health risks.",
    cta: "Decode your dog",
    baseUrl: "https://embarkvet.com",
    affEnv: "AFF_EMBARK",
    conditions: { adoptersOnly: true },
  },
];

export function getPartner(id: string): AffiliatePartner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

function passesConditions(p: AffiliatePartner, run: FreeRun): boolean {
  const c = p.conditions;
  if (!c) return true;
  const inp = run.inputs;
  if (c.firstTimeOnly && inp.experienceLevel && inp.experienceLevel !== "first-time") return false;
  if (c.adoptersOnly && inp.adoptPreference === "breeder") return false;
  if (c.awayALot && !(inp.hoursAlone === "full-day" || inp.travelFrequency === "often")) return false;
  if (c.minBudgetMidpoint) {
    const mid = budgetMidpoint(inp.budgetRange) ?? 0;
    if (mid < c.minBudgetMidpoint) return false;
  }
  return true;
}

export interface ToolkitSection {
  title: string;
  subtitle: string;
  items: AffiliatePartner[];
}

/**
 * Personalized "new-dog toolkit" — sectioned, ordered by the user's situation so the
 * most relevant, highest-intent items lead. Only includes partners whose conditions match.
 */
export function recommendToolkit(run: FreeRun): ToolkitSection[] {
  const pick = (cats: AffCategory[], extra?: (p: AffiliatePartner) => boolean) =>
    PARTNERS.filter((p) => cats.includes(p.category) && passesConditions(p, run) && (!extra || extra(p)));

  // Insurance leads when the match's health profile makes it urgent (or budget is tight —
  // one surprise surgery is exactly what a lean budget can't absorb).
  const insuranceUrgent =
    Boolean(run.costComparison?.insuranceRecommended) || run.inputs.budgetRange === "budget";

  const sections: ToolkitSection[] = [];

  const cover = pick(["insurance"]);
  const coverSection = cover.length
    ? {
        title: "Cover the vet bills",
        subtitle: insuranceUrgent
          ? "Your match's health profile makes insurance a day-one move."
          : "Lock in a rate while they're young and healthy.",
        items: cover,
      }
    : null;
  if (coverSection && insuranceUrgent) sections.push(coverSection);

  const feed = pick(["food"]);
  if (feed.length) sections.push({ title: "Feed them right", subtitle: "The right food, delivered before you run out.", items: feed });

  if (coverSection && !insuranceUrgent) sections.push(coverSection);

  const train = pick(["training"]);
  if (train.length) sections.push({ title: "Train the good habits", subtitle: "The first month sets the next decade.", items: train });

  const gear = pick(["gear"]);
  if (gear.length) sections.push({ title: "Gear up", subtitle: "The kit that keeps them busy, safe, and found.", items: gear });

  const away = pick(["care"]);
  if (away.length) sections.push({ title: "When you're away", subtitle: "Walkers and sitters for long days and trips.", items: away });

  const health = pick(["health"]);
  if (health.length) sections.push({ title: "Know your dog", subtitle: "Answers on their health without the waiting room.", items: health });

  return sections;
}

/** A single highest-intent recommendation for a contextual spot (e.g. under the cost card). */
export function topInsurancePartner(run: FreeRun): AffiliatePartner | undefined {
  return PARTNERS.filter((p) => p.category === "insurance" && passesConditions(p, run))[0];
}
