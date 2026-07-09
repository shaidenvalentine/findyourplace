/**
 * The Find Your Place growth plan — the founder's guide from launch to $30k/month.
 *
 * This is the single source of truth for the /admin/plan page. It encodes the target,
 * the unit economics that get us there, the channel mix at steady state, and a
 * month-by-month roadmap where every month names the milestone it unlocks and the
 * concrete steps to hit it.
 *
 * The numbers are TARGETS, not promises — an S-curve a solo founder can actually walk
 * with a $29 unlock, the built creator/affiliate engine, the share loop, and Meta ads.
 * Tune them as real data comes in; the page reads your live last-30 revenue against
 * this ladder to show where you actually are.
 */

import { PRICE_CENTS } from "@/lib/pricing";

/** The goal: $30,000 in a rolling 30-day window. */
export const NORTH_STAR_CENTS = 3_000_000;

/** Rough payment-processing take (Lemon Squeezy / Stripe ~5% + fixed). Net per sale. */
export const NET_MARGIN_AFTER_FEES = 0.94;

/** Funnel assumptions used for the unit-economics math. Tunable as the pixel learns. */
export const FUNNEL = {
  /** Landing view → starts a quiz/AI path. */
  landingToStart: 0.45,
  /** Starts → completes a scored run. */
  startToComplete: 0.55,
  /** Completed run → pays the $29 unlock. The locked #1 + current-city trust build carry this. */
  completeToPurchase: 0.08,
} as const;

/** Landing → purchase, end to end. */
export const LANDING_TO_PURCHASE =
  FUNNEL.landingToStart * FUNNEL.startToComplete * FUNNEL.completeToPurchase;

export interface UnitEconomics {
  priceCents: number;
  netPerSaleCents: number;
  salesForNorthStar: number;
  salesPerDay: number;
  completesNeeded: number;
  landingViewsNeeded: number;
  landingViewsPerDay: number;
}

export function unitEconomics(): UnitEconomics {
  const salesForNorthStar = Math.ceil(NORTH_STAR_CENTS / PRICE_CENTS);
  const completesNeeded = Math.ceil(salesForNorthStar / FUNNEL.completeToPurchase);
  const landingViewsNeeded = Math.ceil(salesForNorthStar / LANDING_TO_PURCHASE);
  return {
    priceCents: PRICE_CENTS,
    netPerSaleCents: Math.round(PRICE_CENTS * NET_MARGIN_AFTER_FEES),
    salesForNorthStar,
    salesPerDay: Math.ceil(salesForNorthStar / 30),
    completesNeeded,
    landingViewsNeeded,
    landingViewsPerDay: Math.ceil(landingViewsNeeded / 30),
  };
}

/** How the ~1,035 monthly sales split across the three built engines at steady state. */
export interface ChannelSlice {
  key: string;
  label: string;
  sharePct: number;
  note: string;
}

export const CHANNEL_MIX: ChannelSlice[] = [
  {
    key: "creators",
    label: "Creator / affiliate reels",
    sharePct: 55,
    note: "~50 active creators posting the format, each averaging a handful of sales/week. The built payout engine is the flywheel.",
  },
  {
    key: "founder",
    label: "Founder organic + share loop",
    sharePct: 20,
    note: "Your reel channel plus every result card that gets shared back to a friend. Near-zero CAC — this is the moat.",
  },
  {
    key: "ads",
    label: "Meta ads",
    sharePct: 25,
    note: "The paid amplifier — only scaled once the pixel is trained and CAC sits comfortably under the ~$27 net per sale.",
  },
];

export interface PlanStep {
  id: string;
  title: string;
  detail: string;
}

export interface PlanMonth {
  month: number;
  phaseKey: string;
  theme: string;
  /** Rolling-30-day revenue you should be clearing by the END of this month. */
  revenueTargetCents: number;
  /** The one thing this month unlocks — the reason it exists on the ladder. */
  milestone: string;
  /** The dominant growth lever for the month. */
  lever: string;
  steps: PlanStep[];
}

export interface PlanPhase {
  key: string;
  label: string;
  window: string;
  summary: string;
}

export const PHASES: PlanPhase[] = [
  {
    key: "prove",
    label: "Prove the funnel",
    window: "Months 1–2",
    summary:
      "Get the machine turning at all. Founder reel + a first handful of creators. The only question that matters: does a cold viewer who lands actually pay? Fix the funnel before spending a dollar on ads.",
  },
  {
    key: "ignite",
    label: "Ignite paid + creators",
    window: "Months 3–5",
    summary:
      "The funnel converts, so pour fuel on it. Turn on small ad budgets against your best organic creative, stand up the email nurture, and recruit creators in earnest. Break the first five-figure month.",
  },
  {
    key: "compound",
    label: "Compound the engine",
    window: "Months 6–9",
    summary:
      "Three channels running together, each feeding the others: creators make reels, reels make shareable cards, cards and ads make more creators. Systematize recruiting and scale what has proven CAC.",
  },
  {
    key: "land",
    label: "Land $30k & make it durable",
    window: "Months 10–12",
    summary:
      "Hit the number, then make it repeatable — not a spike. Diversify creative, defend CAC, and open the second revenue surface (SEO location pages / consult upsell) so the goal holds when any one channel wobbles.",
  },
];

/** Revenue ladder — the rolling-30-day figure to clear by the end of each month. */
const REVENUE_LADDER_CENTS = [
  100_000, // M1  $1.0k
  250_000, // M2  $2.5k
  450_000, // M3  $4.5k
  700_000, // M4  $7.0k
  1_000_000, // M5  $10k
  1_300_000, // M6  $13k
  1_650_000, // M7  $16.5k
  2_000_000, // M8  $20k
  2_300_000, // M9  $23k
  2_600_000, // M10 $26k
  2_850_000, // M11 $28.5k
  3_000_000, // M12 $30k — goal
];

export const PLAN: PlanMonth[] = [
  {
    month: 1,
    phaseKey: "prove",
    theme: "Launch the founder reel",
    revenueTargetCents: REVENUE_LADDER_CENTS[0],
    milestone: "First 30+ paid unlocks from a standing start.",
    lever: "Founder organic",
    steps: [
      { id: "m1-reel", title: "Ship the hero reel", detail: "'How I chose Bali → find your place.' Story-first, the quiz is the CTA. This is the whole GTM — make it good." },
      { id: "m1-funnel", title: "Watch a real cold run", detail: "Take the quiz on a phone as a stranger would. Time landing→paywall. If it drags anywhere, cut it." },
      { id: "m1-creators5", title: "Hand-pick 5 creators", detail: "DM small relocation/nomad accounts. Give them a ref link and the reel template. Warm, personal, not a mass blast." },
      { id: "m1-pixel", title: "Confirm the pixel fires", detail: "landing_view, quiz_complete, purchase in Meta Events Manager with CAPI dedup — before you ever spend on ads." },
      { id: "m1-price", title: "Lock the $29 test", detail: "Keep the $39→$29 anchor live. Don't discount yet — you need clean conversion signal at the real price." },
    ],
  },
  {
    month: 2,
    phaseKey: "prove",
    theme: "Tighten conversion",
    revenueTargetCents: REVENUE_LADDER_CENTS[1],
    milestone: "Complete→purchase rate at or above 8% on real traffic.",
    lever: "Funnel iteration",
    steps: [
      { id: "m2-teardown", title: "Read 20 real runs", detail: "Where do people drop — the AI paste step, the readback, the paywall? Fix the single biggest leak first." },
      { id: "m2-locked", title: "Sharpen the locked #1", detail: "The blurred #1 is the peak before the gate. Make the score ring + continent tease irresistible; never leak the name." },
      { id: "m2-creators10", title: "Grow to 10 creators", detail: "Double down on whoever drove the most clicks. Ask them what copy/hook worked and template it." },
      { id: "m2-share", title: "Instrument the share loop", detail: "Confirm result cards render their own OG image and count shares. This is your free acquisition channel." },
      { id: "m2-testimonial", title: "Capture 3 'it gets me' reactions", detail: "Screenshot genuine reactions to the readback. This social proof powers every later ad and creator pitch." },
    ],
  },
  {
    month: 3,
    phaseKey: "ignite",
    theme: "Turn on paid",
    revenueTargetCents: REVENUE_LADDER_CENTS[2],
    milestone: "First profitable ad set — CAC under net revenue per sale.",
    lever: "Meta ads (test)",
    steps: [
      { id: "m3-ads", title: "Launch a small ad test", detail: "$20–40/day against your best-performing organic reel as the creative. Optimize for purchase, let the pixel learn." },
      { id: "m3-nurture", title: "Ship the email nurture", detail: "Email gate before the paywall → 4-5 email sequence re-teasing the locked result for the ~90% who don't buy on the spot." },
      { id: "m3-cac", title: "Set your CAC ceiling", detail: `Net per sale is ~$${Math.round((PRICE_CENTS * NET_MARGIN_AFTER_FEES) / 100)}. Kill any ad set whose CAC creeps above it; scale any set below ~$18.` },
      { id: "m3-creators15", title: "Grow to 15 creators", detail: "Publish a simple creator landing/apply flow so recruiting stops being 1:1 DMs and starts to self-serve." },
      { id: "m3-payouts", title: "Run your first payout cycle", detail: "Pay creators on time from the Payouts tab. Fast, reliable payouts are how you keep and refer more creators." },
    ],
  },
  {
    month: 4,
    phaseKey: "ignite",
    theme: "Scale what works",
    revenueTargetCents: REVENUE_LADDER_CENTS[3],
    milestone: "One ad + one creator format proven to scale linearly.",
    lever: "Paid + creators",
    steps: [
      { id: "m4-scale", title: "Scale the winning ad", detail: "Raise budget on the profitable set in steps; duplicate it into 2-3 new audiences. Don't touch losers — cut them." },
      { id: "m4-creative", title: "Refresh 3 new hooks", detail: "Ad fatigue is real. Feed the pixel new founder + creator variants weekly so CAC doesn't drift up." },
      { id: "m4-creators20", title: "Grow to 20 creators", detail: "Introduce a leaderboard/bonus for top creators. Competition drives volume more than a higher base rate does." },
      { id: "m4-analytics", title: "Review the funnel weekly", detail: "landing→complete→purchase, by channel. Decide next week's spend from the numbers, not vibes." },
    ],
  },
  {
    month: 5,
    phaseKey: "ignite",
    theme: "First five-figure month",
    revenueTargetCents: REVENUE_LADDER_CENTS[4],
    milestone: "$10k in a rolling 30-day window.",
    lever: "Multi-channel",
    steps: [
      { id: "m5-blend", title: "Balance the three channels", detail: "Target roughly the steady-state mix: creators ~55%, organic/share ~20%, ads ~25%. Note which is under-indexing." },
      { id: "m5-ltv", title: "Test an order bump", detail: "A small upsell at checkout (deeper tax deep-dive / nomad circuit add-on) lifts average order value and your CAC ceiling with it." },
      { id: "m5-support", title: "Systematize support", detail: "Canned answers for the top 5 questions + refund policy. Protect the ad account and creator trust with fast, clean service." },
      { id: "m5-retarget", title: "Add a retargeting set", detail: "Retarget paywall_view non-buyers with the price anchor + a testimonial. Cheapest incremental sales you'll find." },
    ],
  },
  {
    month: 6,
    phaseKey: "compound",
    theme: "Recruiting as a system",
    revenueTargetCents: REVENUE_LADDER_CENTS[5],
    milestone: "Creators self-serve — recruiting no longer bottlenecked on you.",
    lever: "Creator engine",
    steps: [
      { id: "m6-apply", title: "Open self-serve creator signup", detail: "Application → approval → link + asset kit, all in the portal. You approve, the system does the rest." },
      { id: "m6-kit", title: "Ship the creator asset kit", detail: "Templates, top hooks, do/don't, example reels. Lower the effort to post and volume follows." },
      { id: "m6-creators30", title: "Reach 30 active creators", detail: "'Active' = posted + drove a click in the last 30 days. Prune dormant ones from your attention, not the roster." },
      { id: "m6-cohort", title: "Watch creator cohorts", detail: "Track sales-per-creator by join month. If new cohorts underperform, fix onboarding before recruiting more." },
    ],
  },
  {
    month: 7,
    phaseKey: "compound",
    theme: "Defend CAC at scale",
    revenueTargetCents: REVENUE_LADDER_CENTS[6],
    milestone: "Ad spend scaled 2-3x with CAC held flat.",
    lever: "Paid efficiency",
    steps: [
      { id: "m7-capi", title: "Harden server-side CAPI", detail: "Match quality high, dedup clean. Better signal = cheaper conversions as budgets climb. This directly lowers CAC." },
      { id: "m7-creative", title: "Build a creative pipeline", detail: "A steady cadence of new reels from creators becomes your ad creative library. Never let the account run stale." },
      { id: "m7-aud", title: "Expand audiences carefully", detail: "Lookalikes off purchasers, broad targeting with strong creative. Scale budget only where CAC holds." },
      { id: "m7-geo", title: "Test a second geo", detail: "The dataset is global. Open one more English-friendly market if CAC there beats your home market." },
    ],
  },
  {
    month: 8,
    phaseKey: "compound",
    theme: "$20k — over the hump",
    revenueTargetCents: REVENUE_LADDER_CENTS[7],
    milestone: "$20k rolling — two-thirds of the way to goal.",
    lever: "Multi-channel",
    steps: [
      { id: "m8-audit", title: "Audit unit economics honestly", detail: "Blended CAC vs net-per-sale incl. creator cut + fees. Confirm you're profitable on the marginal sale, not just gross." },
      { id: "m8-topcreators", title: "Invest in your top 10 creators", detail: "They drive most volume. A bonus tier, early features, or a call keeps them loyal and posting." },
      { id: "m8-winback", title: "Add a win-back email", detail: "Re-engage the nurture list that never bought — a fresh angle or limited anchor. Squeeze the list you already paid for." },
    ],
  },
  {
    month: 9,
    phaseKey: "compound",
    theme: "Redundancy",
    revenueTargetCents: REVENUE_LADDER_CENTS[8],
    milestone: "No single channel is more than ~60% of revenue.",
    lever: "Diversification",
    steps: [
      { id: "m9-creators45", title: "Reach ~45 active creators", detail: "The creator base is your most durable channel. Keep the recruiting → onboarding → payout loop humming." },
      { id: "m9-platform", title: "Test a second platform", detail: "TikTok / YouTube Shorts for creators, not just Instagram. Platform risk is real — don't be single-homed." },
      { id: "m9-seo", title: "Ship 10 SEO location pages", detail: "'Best city for [X]' pages are cheap on Next and compound for free. Start the slow channel now so it's there in month 12." },
    ],
  },
  {
    month: 10,
    phaseKey: "land",
    theme: "Approach $30k",
    revenueTargetCents: REVENUE_LADDER_CENTS[9],
    milestone: "$26k rolling — within striking distance.",
    lever: "Optimization",
    steps: [
      { id: "m10-price", title: "Run a price test", detail: "A/B $29 vs $34. If conversion holds, the extra margin lifts your CAC ceiling and pulls the goal closer immediately." },
      { id: "m10-cro", title: "Squeeze the paywall", detail: "Test the value framing, the anchor, the testimonial placement. A 1pt lift on complete→purchase is worth real money at this volume." },
      { id: "m10-scale", title: "Push ad budget to the edge", detail: "Find the daily spend where CAC starts to break. Sit just under it — that's your paid ceiling for now." },
    ],
  },
  {
    month: 11,
    phaseKey: "land",
    theme: "Hold the line",
    revenueTargetCents: REVENUE_LADDER_CENTS[10],
    milestone: "$28.5k with CAC and refund rate stable.",
    lever: "Durability",
    steps: [
      { id: "m11-upsell", title: "Launch the consult upsell", detail: "High-ticket 'relocation strategy session' on the paid results page. A few sales/month move the number meaningfully." },
      { id: "m11-quality", title: "Protect the ad account", detail: "Low refund rate, clean creative, honest claims. An account ban erases a channel overnight — guard it." },
      { id: "m11-seo2", title: "Expand SEO to 30 pages", detail: "Compound the free channel. By now early pages should show impressions — double down on what ranks." },
    ],
  },
  {
    month: 12,
    phaseKey: "land",
    theme: "$30k/month",
    revenueTargetCents: REVENUE_LADDER_CENTS[11],
    milestone: "$30k in a rolling 30-day window — goal hit, and repeatable.",
    lever: "All engines",
    steps: [
      { id: "m12-hit", title: "Clear $30k rolling", detail: "Creators + organic/share + ads firing together, each a third-ish of the number. No single point of failure." },
      { id: "m12-durable", title: "Prove it's not a spike", detail: "Hold $30k for a second consecutive 30-day window. One good month is luck; two is a machine." },
      { id: "m12-next", title: "Pick the next mountain", detail: "$30k→$50k needs a new lever: new geos, a subscription/renewal surface, or a productized consult. Choose deliberately." },
    ],
  },
];

export interface PlanProgress {
  last30Cents: number;
  pctToGoal: number;
  /** Highest month on the ladder you've already cleared (0 = not yet at month 1's target). */
  reachedMonth: number;
  /** The month to focus on next (clamped to 12). */
  focusMonth: number;
  salesToGoal: number;
}

/** Reads live last-30 revenue against the ladder — a performance-based "you are here". */
export function planProgress(last30Cents: number): PlanProgress {
  let reachedMonth = 0;
  for (const m of PLAN) {
    if (last30Cents >= m.revenueTargetCents) reachedMonth = m.month;
    else break;
  }
  const focusMonth = Math.min(12, reachedMonth + 1);
  const salesToGoal = Math.max(0, Math.ceil((NORTH_STAR_CENTS - last30Cents) / PRICE_CENTS));
  return {
    last30Cents,
    pctToGoal: Math.max(0, Math.min(100, (last30Cents / NORTH_STAR_CENTS) * 100)),
    reachedMonth,
    focusMonth,
    salesToGoal,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Paid acquisition playbook — where to run this product, how to run Meta in 2026,
// and how to turn ad spend into card points. Reference material for the plan above.
// ─────────────────────────────────────────────────────────────────────────────

export type PlatformRole = "Primary" | "Primary paid" | "Secondary" | "Compounding" | "Organic";

export interface AdPlatform {
  rank: number;
  name: string;
  role: PlatformRole;
  why: string;
}

/**
 * Where to advertise THIS product — a $29–49, visual, aspirational, impulse life-change
 * unlock sold to a mobile, travel-curious audience. Ranked for that specific shape.
 */
export const AD_PLATFORMS: AdPlatform[] = [
  {
    rank: 1,
    name: "Instagram Reels",
    role: "Primary",
    why: "Your GTM already lives here. Aspirational relocation video is native to the feed, and the founder reel is the whole top of funnel. The warmest audience for a 'where should I live' impulse buy.",
  },
  {
    rank: 2,
    name: "TikTok",
    role: "Primary",
    why: "Cheapest short-video reach and a nomad/'move abroad' curious crowd. The exact same reels repurpose 1:1 — hook in 2s, quiz as the CTA. Run organic first, then whitelist winners as ads.",
  },
  {
    rank: 3,
    name: "Meta ads (IG/FB, Advantage+)",
    role: "Primary paid",
    why: "Best paid rail: your organic reels become the creative, lookalikes off actual buyers, and the server-side CAPI you've already wired. Optimize for purchase — this is where scale comes from once the funnel proves out.",
  },
  {
    rank: 4,
    name: "YouTube (Shorts + 'why I moved to X')",
    role: "Compounding",
    why: "Slower but compounds for free. Shorts for reach; long-form captures high-intent searchers actively deciding where to live. Cheap CPMs and it feeds your SEO play.",
  },
  {
    rank: 5,
    name: "Pinterest",
    role: "Secondary",
    why: "Underrated for relocation/travel planning — high-intent, cheap, a planner mindset. Aspirational city boards map straight onto your result cards.",
  },
  {
    rank: 6,
    name: "Reddit + expat/nomad communities",
    role: "Organic",
    why: "r/digitalnomad, r/expats, r/IWantOut, r/SameGrassButGreener — the highest-intent audiences anywhere, but they punish anything that smells like an ad. Show up as a person, not a brand.",
  },
];

/** Channels to skip for this product — wrong context or wrong economics. */
export const AD_PLATFORMS_SKIP =
  "Skip LinkedIn (wrong headspace, brutal CPMs), broad display/banner networks (junk traffic), and Google Search as a paid channel early — search intent for this is better captured free via the 193 SEO location pages.";

export interface PlaybookItem {
  title: string;
  detail: string;
}

/** Current Meta best practice (2026), tuned for a bootstrapped single-offer funnel. */
export const META_PLAYBOOK: PlaybookItem[] = [
  {
    title: "Creative is the lever now, not targeting",
    detail: "Meta's 2026 algorithm wants volume: launch 8–15 genuinely different creatives (not tweaks) and add 3–5 fresh ones weekly to fight fatigue. You win or lose on creative, not audience tinkering.",
  },
  {
    title: "Your best organic reels ARE your best ads",
    detail: "Feed proven reels straight into the account. Native, vertical, captions on, hook in the first 2 seconds. Ads that look like ads lose to content that happens to sell.",
  },
  {
    title: "Go broad, let the AI target",
    detail: "Advantage+ Sales campaigns, optimized for purchase, minimal audience restriction. First-party signal (your pixel + CAPI + email list) now beats hand-stacked interests.",
  },
  {
    title: "Start small — don't cargo-cult the big test budget",
    detail: "The '$3–5k/mo, 50 conversions/week' advice is for scaled ecom catalogs. Bootstrap with a purchase-optimized sales campaign at $20–50/day, prove complete→purchase, THEN scale.",
  },
  {
    title: "Scale slowly",
    detail: "Once a set is profitable, raise budget 15–20% every 3–4 days and watch CPA for 48h after each bump. Big jumps reset the learning phase and torch your CAC.",
  },
  {
    title: "CAPI is your cheapest CAC win",
    detail: "The server-side conversions API is already wired here. Clean, deduped events = better signal = cheaper conversions as you scale. This is worth more than any targeting trick.",
  },
  {
    title: "Retarget the non-buyers",
    detail: "One set retargeting paywall_view non-buyers with the $39→$29 anchor + a real testimonial. The cheapest sales you'll ever buy.",
  },
  {
    title: "Judge everything against margin",
    detail: "The only number that matters: CAC vs net-per-sale (~$27 minus creator cut). Kill any set above it; scale only what sits under it. At $29 the headroom is thin — which is why price and creative matter so much.",
  },
];

export interface AdSpendCard {
  name: string;
  rate: string;
  effectiveReturn: string;
  cap: string;
  bestFor: string;
  note: string;
}

/**
 * Best cards for routing ad spend, as of mid-2026. Points effectively rebate a few
 * percent off your single biggest cost. Terms change constantly — verify before applying.
 */
export const AD_SPEND_CARDS: AdSpendCard[] = [
  {
    name: "Amex Business Gold",
    rate: "4× points on advertising",
    effectiveReturn: "~6–8% in travel value",
    cap: "$150k/yr (top 2 categories)",
    bestFor: "Your default while ad spend is under $150k/yr",
    note: "Must bill direct from US media providers (Meta, Google, etc.). ~$375 annual fee. Highest return of any card while under the cap.",
  },
  {
    name: "Chase Ink Business Preferred",
    rate: "3× points on ads/social",
    effectiveReturn: "~5–6% via transfer partners",
    cap: "$150k/yr (combined categories)",
    bestFor: "Lower fee + flexible, transferable Chase points",
    note: "$95 annual fee and a routinely strong welcome bonus. Great second card to pair with the Gold.",
  },
  {
    name: "Capital One Spark Cash Plus",
    rate: "2% cash back, flat",
    effectiveReturn: "2% cash (no valuation games)",
    cap: "No cap",
    bestFor: "Overflow once you blow past the $150k bonus caps",
    note: "Dead-simple cash, nothing to manage. Annual fee is waived at high spend. This is your 'past the cap' card.",
  },
  {
    name: "Ramp / Brex (corporate)",
    rate: "~1.5–2% + spend controls",
    effectiveReturn: "~1.5–2%",
    cap: "Varies",
    bestFor: "Easy approval, no personal guarantee, clean bookkeeping",
    note: "Lower rewards, but virtual cards per campaign, real-time controls, and automatic expense tracking. Good operational backbone even if not your rewards card.",
  },
];

/** The rules that make card-points-on-ads a rebate and not a trap. */
export const CARD_STRATEGY_RULES: PlaybookItem[] = [
  {
    title: "The float is the hidden win",
    detail: "Ad spend on a card buys you 30–45 days before the bill — free working capital to reinvest while sales revenue lands. As real as the points.",
  },
  {
    title: "Never, ever carry a balance",
    detail: "Card APR (~25%+) dwarfs any reward. Pay in full every month, always. If you can't, this whole play is a wealth-destroyer — points only count when you're debt-free on the card.",
  },
  {
    title: "Welcome bonuses beat multipliers",
    detail: "A new business card's sign-up bonus (often $750–1,500+ in value) is worth more than a year of category points — and ad spend hits the minimum-spend requirement fast. Time new cards to spend ramps.",
  },
  {
    title: "Stack two cards, don't scatter",
    detail: "Run ads on the 4×/3× card up to its $150k cap, then overflow onto the flat-2% card. Two cards cover essentially any spend level with no wasted earning.",
  },
  {
    title: "Keep it on business cards",
    detail: "Business cards keep ad spend off your personal credit report and utilization, and most don't report to personal bureaus. Cleaner credit, cleaner books.",
  },
  {
    title: "It's a rebate, not a strategy",
    detail: "Points shave 2–8% off CAC — real money at scale, but they never make an unprofitable ad profitable. Fix the funnel and the price first; treat this as the cherry on top.",
  },
];

export const CARD_DISCLAIMER =
  "Not financial advice. Card rates, fees, caps, and bonus categories change often — verify current terms with the issuer before applying, and confirm ad platforms bill as an eligible 'advertising' merchant category for your card.";

// ─────────────────────────────────────────────────────────────────────────────
// The points goal — 200k transferable points/month to fund business-class travel.
// Because the 4× rate caps at $150k/yr ($12.5k/mo) per card, this only works as a
// multi-card stack riding on a scaled ad budget. Kept honest, not hyped.
// ─────────────────────────────────────────────────────────────────────────────

/** The dream: 200k transferable points every month → business class for two. */
export const POINTS_GOAL_MONTHLY = 200_000;

export interface PointsStackRow {
  card: string;
  player: string;
  monthlySpendCents: number;
  multiplier: string;
  monthlyPoints: number;
}

/** The card stack that produces 200k points/month — the only way past the per-card caps. */
export const POINTS_STACK: PointsStackRow[] = [
  { card: "Amex Business Gold", player: "You", monthlySpendCents: 1_250_000, multiplier: "4×", monthlyPoints: 50_000 },
  { card: "Amex Business Gold", player: "Partner (P2)", monthlySpendCents: 1_250_000, multiplier: "4×", monthlyPoints: 50_000 },
  { card: "Chase Ink Preferred", player: "You", monthlySpendCents: 1_250_000, multiplier: "3×", monthlyPoints: 37_500 },
  { card: "Chase Ink Preferred", player: "Partner (P2)", monthlySpendCents: 1_250_000, multiplier: "3×", monthlyPoints: 37_500 },
  { card: "Flat 2× overflow", player: "Either", monthlySpendCents: 1_250_000, multiplier: "2×", monthlyPoints: 25_000 },
];

export const POINTS_STACK_SPEND_CENTS = POINTS_STACK.reduce((s, r) => s + r.monthlySpendCents, 0);
export const POINTS_STACK_TOTAL = POINTS_STACK.reduce((s, r) => s + r.monthlyPoints, 0);

/** Ad-spend → points ladder, so you can see where each business stage lands. */
export interface PointsRung {
  label: string;
  monthlyAdSpendCents: number;
  monthlyPoints: number;
  buys: string;
}

export const POINTS_LADDER: PointsRung[] = [
  {
    label: "Early (proving the funnel)",
    monthlyAdSpendCents: 100_000,
    monthlyPoints: 4_000,
    buys: "A domestic economy hop. You're testing, not farming yet.",
  },
  {
    label: "At the $30k/mo goal",
    monthlyAdSpendCents: 1_000_000,
    monthlyPoints: 40_000,
    buys: "~One international business one-way every couple months.",
  },
  {
    label: "Scaling up (~$25k/mo ads)",
    monthlyAdSpendCents: 2_500_000,
    monthlyPoints: 90_000,
    buys: "Two one-way business seats most months.",
  },
  {
    label: "The 200k dream",
    monthlyAdSpendCents: POINTS_STACK_SPEND_CENTS,
    monthlyPoints: POINTS_STACK_TOTAL,
    buys: "A business-class trip for two every 4–8 weeks.",
  },
];

/** The honest framing so the dream doesn't get mistaken for a month-12 deliverable. */
export const POINTS_GOAL_NOTES: PlaybookItem[] = [
  {
    title: "200k/mo is a scaled-business goal, not a month-12 one",
    detail: "At breakeven, ~$62.5k/mo of ad spend means ~$62.5k/mo of ad revenue — more than double the $30k goal by itself. Full stack running = roughly a $90–100k/mo business. Same machine, turned up.",
  },
  {
    title: "One card can't do it — the 4× caps at $12.5k/mo",
    detail: "The $150k/yr cap forces a stack. Two Amex Golds + two Chase Inks (you + partner) + a flat-2× overflow card is the recipe. Plan the applications; don't expect one card to carry it.",
  },
  {
    title: "Player 2 doubles everything",
    detail: "Your partner opening her own business cards doubles the bonus-category caps AND stacks a second set of welcome bonuses — often the single biggest chunk of points you'll earn all year.",
  },
  {
    title: "Only counts if it's true breakeven, paid in full",
    detail: "Breakeven must include payment fees, and the card must be paid in full every month. Points earned on a carried balance (or a real loss) are travel bought at full price — the opposite of the win.",
  },
];
