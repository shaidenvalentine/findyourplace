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
  | "remote-jobs"
  | "business"
  | "tax"
  | "insurance"
  | "banking"
  | "visa"
  | "flights"
  | "stay"
  | "housing"
  | "mail"
  | "esim"
  | "vpn"
  | "moving"
  | "coworking"
  | "language";

export interface AffiliatePartner {
  id: string;
  name: string;
  category: AffCategory;
  /** One-line scannable hook, always visible on the card. */
  blurb: string;
  cta: string;
  baseUrl: string;
  /** Env var holding the full affiliate tracking URL; falls back to baseUrl if unset. */
  affEnv: string;
  recurring?: boolean;
  /** Concierge guide: 2–3 sentences on why THIS mover needs the service. */
  why: string;
  /** One-line loss-aversion consequence; the card prefixes "If you skip it:". */
  skipCost: string;
  /** Renders an "Essential" badge and breaks priority ties. */
  essential?: boolean;
  /** Payout-weighted relevance 0–100; higher sorts first within a section. Source of truth: docs/AFFILIATES.md. */
  priority?: number;
  /** Internal program economics note (commission, network, cookie). NEVER render this. */
  payoutNote?: string;
  conditions?: {
    lifestyle?: ("rooted" | "nomadic")[];
    usCitizenOnly?: boolean;
    investorOnly?: boolean;
    minIncomeMidpoint?: number;
    /** Only for users who do NOT already work remotely (job/income platforms). */
    needsRemoteIncome?: boolean;
  };
}

export const PARTNERS: AffiliatePartner[] = [
  // Income — remote work + business structure
  {
    id: "deel",
    name: "Deel",
    category: "remote-jobs",
    blurb: "Get hired or paid compliantly from anywhere — the payroll platform remote companies already use.",
    cta: "Set up compliant pay",
    baseUrl: "https://www.deel.com",
    affEnv: "AFF_DEEL",
    why: "Working from another country isn't just a plane ticket — your employer needs a compliant way to pay you there, and clients need a clean way to send money. Deel handles contracts, payroll, and compliance in 150+ countries: share it with your company, or invoice through it as a contractor.",
    skipCost: "informal \"just keep paying my US account\" arrangements collapse at tax time — or cost you the job when HR finds out.",
    priority: 75,
    payoutNote: "$500/sales-qualified lead + $1,000 when they become a paying customer (up to $1,500), PartnerStack, 90d cookie.",
  },
  {
    id: "doola",
    name: "doola",
    category: "business",
    blurb: "Form a US LLC with business banking from anywhere — freelance income, structured properly.",
    cta: "Set up your LLC",
    baseUrl: "https://www.doola.com",
    affEnv: "AFF_DOOLA",
    why: "If you freelance or run anything on the side, a US LLC keeps your invoicing, banking, and taxes clean while you're abroad — clients pay a US company, not a personal account in a country they've never heard of. doola forms it and handles the annual paperwork entirely remotely.",
    skipCost: "mixing freelance income into a personal account abroad is an audit flag and a banking-freeze risk.",
    priority: 70,
    payoutNote: "15% base, tiered up to ~$1,000/referral (unverified — confirm in dashboard), in-house program.",
  },
  {
    id: "flexjobs",
    name: "FlexJobs",
    category: "remote-jobs",
    blurb: "Hand-screened remote jobs — the income that makes the move possible.",
    cta: "Find a remote job",
    baseUrl: "https://www.flexjobs.com",
    affEnv: "AFF_FLEXJOBS",
    why: "Your move only works if your income travels with you. FlexJobs vets every listing — no scams, no commission-only bait — which makes it the fastest way to swap your desk job for one that boards a plane.",
    skipCost: "moving without location-independent income is the #1 reason people boomerang home within a year.",
    priority: 55,
    payoutNote: "~$12/subscription, Impact, 30d cookie.",
    conditions: { needsRemoteIncome: true },
  },
  // Tax
  {
    id: "brighttax",
    name: "Bright!Tax",
    category: "tax",
    blurb: "US expat tax specialists — file from abroad and claim the exclusions you're owed.",
    cta: "Talk to a US expat CPA",
    baseUrl: "https://brighttax.com",
    affEnv: "AFF_BRIGHTTAX",
    why: "The US is one of only two countries that taxes its citizens wherever they live — moving abroad doesn't end your IRS filing, it complicates it. A specialist applies the Foreign Earned Income Exclusion (over $120k of income excluded) and foreign tax credits correctly, which is routinely the difference between owing thousands and owing nothing.",
    skipCost: "missed foreign-account disclosures carry IRS penalties that start at $10,000 — and DIY filings miss them constantly.",
    essential: true,
    priority: 45,
    payoutNote: "No cash affiliate program (client $50 credit referral only, verified 2026-07). Kept for advice value.",
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
    why: "Where you're tax-resident is the single biggest number in this move — often bigger than rent. An advisor structures the exit before you go (residency timing, treaty positions, what to close and when), while the good options are still open.",
    skipCost: "get residency timing wrong and you can owe full tax in two countries for the same year.",
    priority: 90,
    payoutNote: "$75 flat OR 15% capped at $250 per paying client, in-house, monthly PayPal payout.",
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
    why: "Your health insurance almost certainly stops at the border, and credit-card travel cover isn't built for months abroad. SafetyWing works like a subscription: covers you in 180+ countries, lets you start it after you've already left, and pauses when you're home.",
    skipCost: "one uninsured hospital visit abroad can cost more than your entire first year away.",
    essential: true,
    priority: 90,
    payoutNote: "~10% of premium, RECURRING on renewals, in-house ambassador program, 364d cookie.",
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
    why: "If you're settling somewhere rather than hopping, you want real health insurance, not travel cover. Genki's long-term plans work like a local policy that follows you across borders — monthly, cancellable, and valid as proof of cover for residency applications that demand it.",
    skipCost: "many visa and residency applications are rejected outright without qualifying health coverage.",
    priority: 60,
    payoutNote: "5% recurring for membership lifetime, GoAffPro, ~365d cookie (unverified), €50 min payout.",
  },
  {
    id: "insurednomads",
    name: "Insured Nomads",
    category: "insurance",
    blurb: "Global health insurance with real hospital networks and telehealth — built for people who left.",
    cta: "Compare global plans",
    baseUrl: "https://www.insurednomads.com",
    affEnv: "AFF_INSUREDNOMADS",
    why: "Between nomad travel cover and a full local policy sits Insured Nomads: global medical networks, telehealth, and plans that work whether you're trying a place for three months or staying two years.",
    skipCost: "the underinsured middle ground — too settled for travel insurance, no local coverage yet — is where the five-figure bills happen.",
    priority: 65,
    payoutNote: "15% per policy (company-stated; one source claims up to $500 + renewals — verify), Tapfiliate, contact partners@insurednomads.com.",
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
    why: "Your home bank quietly takes 3–6% of everything you move abroad in hidden exchange spread. Wise gives you local account details in USD, EUR, GBP and more, converts at the real mid-market rate, and is the account landlords, employers, and other movers abroad already expect.",
    skipCost: "paying rent and getting paid through a regular US bank abroad burns hundreds of dollars a year in fees.",
    essential: true,
    priority: 85,
    payoutNote: "£10/personal + £50/business per qualified signup, Partnerize, no-expiry cookie (first transfer).",
  },
  {
    id: "mercury",
    name: "Mercury",
    category: "banking",
    blurb: "Banking built for founders running a business from anywhere.",
    cta: "Set up business banking",
    baseUrl: "https://mercury.com",
    affEnv: "AFF_MERCURY",
    why: "If you run a company or freelance through an LLC, you need US business banking that doesn't care where you're sitting. Mercury is fully online — no branch visits, no foreign-login lockouts, and international wires that just work.",
    skipCost: "traditional business banks freeze accounts that suddenly log in from abroad — usually mid-move, when you can least afford it.",
    priority: 60,
    payoutNote: "Negotiated only (no public rate); advisor tracks pay up to $1,000–1,500/funded client, in-house.",
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
    why: "Every country has its own entry rules, and digital-nomad visas each come with their own income proofs and timelines. iVisa checks exactly what your passport needs and handles the application — instead of you deciphering embassy PDFs the week before you fly.",
    skipCost: "arriving on the wrong visa can mean denied boarding, or a stamp that caps your stay at 30 days.",
    priority: 75,
    payoutNote: "20% of service fees (35% on photos), 365d cookie, in-house, $50 min payout, monthly.",
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
    why: "Book a scouting trip before you commit — a week on the ground tells you more than a year of research. Skyscanner's whole-month view and price alerts find the cheap window to go see your match in person.",
    skipCost: "booking blind on dates can double the cost of the exact same route.",
    priority: 25,
    payoutNote: "~20% of Skyscanner's own referral revenue (cents per click-out), Impact or Travelpayouts, 30d cookie.",
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
    why: "Book your first one to two weeks somewhere flexible while you hunt for a real apartment in person. Free-cancellation stays keep you mobile if the neighborhood turns out to be wrong — and the neighborhood is only ever obvious on foot.",
    skipCost: "signing a long lease sight-unseen is the single most expensive regret movers report.",
    priority: 40,
    payoutNote: "~4% of completed stays via Awin (US) — the in-house program shut for small partners May 2025; session cookie.",
  },
  {
    id: "blueground",
    name: "Blueground",
    category: "housing",
    blurb: "Move-in-ready furnished apartments by the month — perfect for a soft landing.",
    cta: "Browse furnished homes",
    baseUrl: "https://www.theblueground.com",
    affEnv: "AFF_BLUEGROUND",
    why: "A furnished monthly apartment bridges the gap between hotel and lease: move in with a suitcase, extend month to month, and skip the deposit-and-furniture sprint in a city you don't know yet.",
    skipCost: "unfurnished leases abroad often want 2–3 months' deposit plus a local guarantor you don't have yet.",
    priority: 65,
    payoutNote: "Advertised up to ~$200/booking (unverified), via Sovrn/aggregators — apply at promos.theblueground.com/affiliate.",
  },
  {
    id: "flatio",
    name: "Flatio",
    category: "housing",
    blurb: "Monthly furnished rentals without tenant paperwork — built for stays of 1–12 months.",
    cta: "Browse monthly rentals",
    baseUrl: "https://www.flatio.com",
    affEnv: "AFF_FLATIO",
    why: "Flatio specializes in the exact stay a mover needs: one to twelve months, furnished, deposit-free on most listings, no local guarantor. It's how you rent like a local before you can prove you are one.",
    skipCost: "local rental sites want payslips, a guarantor, and a year's commitment you can't give yet.",
    priority: 60,
    payoutNote: "Rev-share per booking + host signup (rate unpublished — confirm at signup), in-house, 60d cookie, €50 min.",
  },
  {
    id: "trustedhousesitters",
    name: "TrustedHousesitters",
    category: "housing",
    blurb: "Live rent-free by looking after homes and pets around the world.",
    cta: "Find house sits",
    baseUrl: "https://www.trustedhousesitters.com",
    affEnv: "AFF_TRUSTEDHOUSESITTERS",
    why: "One membership can erase your biggest cost. House sits run from a weekend to several months, come furnished with wifi and a pet, and let you live in neighborhoods you couldn't otherwise afford while you scout.",
    skipCost: "rent is 30–50% of a nomad budget — this is the single biggest lever most people never pull.",
    priority: 50,
    payoutNote: "~$28–30 per membership sale (20–30%, unverified), Impact, 30d cookie.",
    conditions: { lifestyle: ["nomadic"] },
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
    why: "Data is how you order the taxi, load the map, and pass the WhatsApp verification the minute you land. Install the eSIM before you fly and your phone simply works at the gate — no airport SIM kiosk markup.",
    skipCost: "roaming through your first week abroad can cost more than a year of local eSIM data.",
    priority: 60,
    payoutNote: "~10% per sale, Impact, 30d cookie. (Alternatives: Saily 15%, Holafly ~7% but 365d cookie + higher AOV.)",
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
    why: "Banks, brokerages, and streaming services flag or lock accounts that suddenly appear from a new country. A VPN keeps your US logins looking like home and secures you on every hotel and café network you'll live on.",
    skipCost: "one flagged login from abroad can freeze your bank account while you're mid-move.",
    essential: true,
    priority: 80,
    payoutNote: "40–100% on new signups + 30% RECURRING on all renewals, in-house, 30d cookie.",
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
    why: "If you're shipping furniture rather than packing a suitcase, quotes vary wildly — the same container can differ by thousands between movers. Sirelo pulls competing quotes from vetted international movers so you see the real market price before you commit.",
    skipCost: "taking the first mover quote typically overpays 30–50% for the same route.",
    priority: 60,
    payoutNote: "50% of Sirelo's revenue per accepted moving lead, in-house, invoice-based monthly.",
    conditions: { lifestyle: ["rooted"] },
  },
  // Mail
  {
    id: "anytimemailbox",
    name: "Anytime Mailbox",
    category: "mail",
    blurb: "A permanent US mailing address — see and forward your mail from anywhere.",
    cta: "Claim your US address",
    baseUrl: "https://www.anytimemailbox.com",
    affEnv: "AFF_ANYTIMEMAILBOX",
    why: "Banks, the IRS, the DMV, and your brokerage all still want a US address after you leave. A virtual mailbox scans your mail the day it arrives and forwards what matters, so \"where do we send this?\" never becomes an emergency.",
    skipCost: "using a friend's address works until a debit card, a jury summons, or a tax notice goes missing.",
    priority: 55,
    payoutNote: "~$25 per new renter, Everflow, 30d cookie, $300 min payout.",
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
    why: "A desk gives your day structure and your social life a head start — the first friends in a new city are usually the ones at the next desk. Book before you land so week one already has a rhythm.",
    skipCost: "working from your rental for months is the fastest route to the isolation that sends people home.",
    priority: 20,
    payoutNote: "No affiliate program (verified 2026-07). Kept for advice value.",
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
    why: "Even twenty lessons of the local language changes how a place treats you — prices, friendships, bureaucracy, all of it. italki is 1-on-1 with native tutors on your schedule, from around $10 a lesson, so you can start weeks before you move.",
    skipCost: "staying inside the English bubble is the most common reason a move never turns into a life.",
    priority: 45,
    payoutNote: "$10+ per new student's first purchase, in-house, 30d cookie, monthly PayPal/Payoneer.",
  },
  {
    id: "lingoda",
    name: "Lingoda",
    category: "language",
    blurb: "Structured small-group classes that get you conversational fast.",
    cta: "Join a class",
    baseUrl: "https://www.lingoda.com",
    affEnv: "AFF_LINGODA",
    why: "If you want a plan rather than a playlist, Lingoda runs teacher-led classes on a real schedule with real progression — the difference between \"I use an app sometimes\" and ordering, arguing, and making friends in the language.",
    skipCost: "apps alone stall at tourist phrases; conversation is what makes a place yours.",
    priority: 50,
    payoutNote: "~$50–75 per order (unverified — conflicting sources), Rakuten Advertising, 30–45d cookie.",
  },
];

export function getPartner(id: string): AffiliatePartner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

/**
 * Replaces every {CLICK_ID} in an affiliate URL template with a sanitized subId, so
 * network conversion reports can be reconciled per run/placement. Templates without
 * the placeholder pass through untouched.
 */
export function buildOutboundUrl(template: string, subId: string): string {
  return template.replaceAll("{CLICK_ID}", encodeURIComponent(subId));
}

function passesConditions(p: AffiliatePartner, run: FreeRun): boolean {
  const c = p.conditions;
  if (!c) return true;
  const inp = run.inputs;
  if (c.lifestyle && (!inp.lifestyleMode || !c.lifestyle.includes(inp.lifestyleMode))) return false;
  if (c.needsRemoteIncome && inp.workStyle === "remote") return false;
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
/** Payout-weighted relevance order: priority first, Essential breaks ties. */
function byPriority(a: AffiliatePartner, b: AffiliatePartner): number {
  return (b.priority ?? 0) - (a.priority ?? 0) || Number(b.essential ?? false) - Number(a.essential ?? false);
}

export function recommendToolkit(run: FreeRun): ToolkitSection[] {
  const pick = (cats: AffCategory[], extra?: (p: AffiliatePartner) => boolean) =>
    PARTNERS.filter((p) => cats.includes(p.category) && passesConditions(p, run) && (!extra || extra(p))).sort(
      byPriority
    );

  const taxRelevant =
    Boolean(run.taxComparison) ||
    run.inputs.taxSensitivity === "very-sensitive" ||
    Boolean(run.inputs.isUsCitizen) ||
    Boolean(run.inputs.hasInvestmentIncome);

  const sections: ToolkitSection[] = [];

  const income = pick(["remote-jobs", "business"]);
  if (income.length)
    sections.push({
      title: "Secure your income",
      subtitle: "Money that travels is the whole game — lock this in before you book anything.",
      items: income,
    });

  if (taxRelevant) {
    const tax = pick(["tax"]);
    if (tax.length)
      sections.push({
        title: "Sort your taxes",
        subtitle: "The biggest number in your move — structure it before you go, not after.",
        items: tax,
      });
  }

  const money = pick(["banking"]);
  if (money.length)
    sections.push({
      title: "Move your money",
      subtitle: "Set this up first — everything else abroad gets paid through it.",
      items: money,
    });

  const cover = pick(["insurance"]);
  if (cover.length)
    sections.push({
      title: "Get covered",
      subtitle: "Your health insurance stops at the border. Fix that before you book anything.",
      items: cover,
    });

  const getThere = pick(["visa", "flights", "moving", "mail"]);
  if (getThere.length)
    sections.push({
      title: "Get there",
      subtitle: "Visa, flights, mail, and what you're bringing — sort this early, it has the longest lead times.",
      items: getThere,
    });

  const firstPlace = pick(["stay", "housing"]);
  if (firstPlace.length)
    sections.push({
      title: "Find your first place",
      subtitle: "Stay flexible for the first month — the right neighborhood is only ever obvious on foot.",
      items: firstPlace,
    });

  const settle = pick(["esim", "vpn", "coworking", "language"]);
  if (settle.length)
    sections.push({
      title: "Land softly",
      subtitle: "The difference between a rough first month and a good one is set up before you fly.",
      items: settle,
    });

  return sections;
}

/** A single highest-intent recommendation for a contextual spot (e.g. under the tax card). */
export function topTaxPartner(run: FreeRun): AffiliatePartner | undefined {
  return PARTNERS.filter((p) => p.category === "tax" && passesConditions(p, run)).sort(byPriority)[0];
}

/**
 * Non-personalized picks for place detail pages: the top-priority partner per category.
 * Only unconditional partners qualify — there's no run to check conditions against.
 */
export function recommendForPlace(): AffiliatePartner[] {
  const cats: AffCategory[] = ["flights", "stay", "housing", "insurance", "esim"];
  return cats
    .map((c) => PARTNERS.filter((p) => p.category === c && !p.conditions).sort(byPriority)[0])
    .filter((p): p is AffiliatePartner => Boolean(p));
}
