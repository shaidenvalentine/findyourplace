import type { OnboardingData } from "@/types/onboarding";

export type QuestionType = "single" | "multi";

export interface QuizOption {
  value: string;
  label: string;
  emoji?: string;
  hint?: string;
  /** Reactive micro-insight shown after the user picks this (mid-quiz dopamine). */
  insight?: string;
}

export interface QuizQuestion {
  /** OnboardingData key this writes to. */
  key: keyof OnboardingData;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options: QuizOption[];
  /** For multi, the max selectable (optional). */
  max?: number;
}

/**
 * Fast, high-signal quiz. Every question moves the score (see scoring.ts). Ordered
 * to feel like a conversation: mobility → environment → rhythm → work → money →
 * safety → wellness → travel → priorities.
 */
export const QUIZ: QuizQuestion[] = [
  {
    key: "lifestyleMode",
    title: "Rooted or roaming?",
    subtitle: "This unlocks your annual circuit if you roam.",
    type: "single",
    options: [
      { value: "rooted", label: "Put down roots", hint: "One home base", insight: "Got it — we'll hunt for the single best home base on Earth for you." },
      { value: "nomadic", label: "Stay on the move", hint: "Multiple stops a year", insight: "Nice — we'll also build you a year-round circuit that chases your perfect weather." },
    ],
  },
  {
    key: "beachMountain",
    title: "Pulled toward…",
    type: "single",
    options: [
      { value: "beach", label: "Ocean & beaches", insight: "Noted — that already reshuffles your whole top 20." },
      { value: "mountains", label: "Mountains & trails", insight: "Noted — that already reshuffles your whole top 20." },
      { value: "either", label: "Either, honestly", insight: "Open to both — that keeps more of the world in play for you." },
    ],
  },
  {
    key: "preferredClimate",
    title: "Your ideal climate?",
    type: "single",
    options: [
      { value: "tropical", label: "Tropical & warm", insight: "Warm it is — we just ruled out a lot of grey winters." },
      { value: "mediterranean", label: "Sunny & mild", insight: "The climate most people score highest in — strong choice." },
      { value: "temperate", label: "Four real seasons", insight: "Four seasons — that points somewhere very different from the beach crowd." },
      { value: "cold", label: "Crisp & cool", insight: "Cool and crisp — a rarer taste, and it narrows things fast." },
    ],
  },
  {
    key: "noiseTolerance",
    title: "Your ideal day sounds like…",
    type: "single",
    options: [
      { value: "low", label: "Quiet & calm" },
      { value: "medium", label: "Walkable buzz" },
      { value: "high", label: "Energy & nightlife" },
    ],
  },
  {
    key: "workStyle",
    title: "How do you work?",
    type: "single",
    options: [
      { value: "remote", label: "Fully remote" },
      { value: "hybrid", label: "Hybrid / flexible" },
      { value: "onsite", label: "On-site / local" },
    ],
  },
  {
    key: "communityVibes",
    title: "Your people are…",
    subtitle: "Pick any that fit.",
    type: "multi",
    options: [
      { value: "digital-nomad", label: "Nomads & remote folks" },
      { value: "startup", label: "Founders & builders" },
      { value: "expat", label: "International expats" },
      { value: "local", label: "Locals & deep culture" },
    ],
  },
  {
    key: "budgetRange",
    title: "Monthly budget to live well?",
    type: "single",
    options: [
      { value: "budget", label: "Stretch it far", hint: "Under ~$1.5k" },
      { value: "mid-range", label: "Comfortable", hint: "~$2–4k" },
      { value: "luxury", label: "No real ceiling", hint: "$5k+" },
    ],
  },
  {
    key: "taxSensitivity",
    title: "How much do taxes matter?",
    type: "single",
    options: [
      { value: "very-sensitive", label: "A lot — optimize it" },
      { value: "somewhat", label: "Nice to have" },
      { value: "not-sensitive", label: "Not a factor" },
    ],
  },
  {
    key: "safetyPriority",
    title: "Safety & stability is…",
    type: "single",
    options: [
      { value: "top-priority", label: "Non-negotiable" },
      { value: "important", label: "Important" },
      { value: "flexible", label: "I'm adaptable" },
    ],
  },
  {
    key: "mustHaves",
    title: "Your non-negotiables?",
    subtitle: "Pick up to 3 — we weight these hardest.",
    type: "multi",
    max: 3,
    options: [
      { value: "affordable", label: "Affordable" },
      { value: "safety", label: "Safe" },
      { value: "nature", label: "Nature access" },
      { value: "nightlife", label: "Nightlife" },
      { value: "beach", label: "Beach" },
    ],
  },
];

/**
 * The DEEP dive — the high-impact dimensions the quick path doesn't capture. Surfaced
 * AFTER the first result as the "sharpen your match" lever. The client only asks the
 * questions we don't already know the answer to (from the AI/IG/quick-quiz inputs), so
 * it never feels redundant. Every answer re-scores the run and climbs match confidence.
 */
export const DEEP_QUIZ: QuizQuestion[] = [
  {
    key: "dailyRoutine",
    title: "When do you come alive?",
    type: "single",
    options: [
      { value: "early-bird", label: "Early mornings" },
      { value: "balanced", label: "Middle of the day" },
      { value: "night-owl", label: "Late nights" },
    ],
  },
  {
    key: "outdoorUrban",
    title: "City energy or open space?",
    type: "single",
    options: [
      { value: "urban", label: "In the middle of it" },
      { value: "balanced", label: "A bit of both" },
      { value: "outdoor", label: "Out in nature" },
    ],
  },
  {
    key: "peopleDensity",
    title: "Your ideal density?",
    type: "single",
    options: [
      { value: "dense", label: "Dense & buzzing" },
      { value: "mid", label: "Mid-size" },
      { value: "spacious", label: "Room to breathe" },
    ],
  },
  {
    key: "wellnessImportance",
    title: "How central is fitness & wellness?",
    type: "single",
    options: [
      { value: "high", label: "It's my lifestyle" },
      { value: "medium", label: "I keep it up" },
      { value: "low", label: "Not a priority" },
    ],
  },
  {
    key: "healthcarePriority",
    title: "Top-tier healthcare nearby?",
    type: "single",
    options: [
      { value: "essential", label: "Essential" },
      { value: "nice", label: "Nice to have" },
      { value: "low", label: "Not worried" },
    ],
  },
  {
    key: "airportImportance",
    title: "How important is a major airport?",
    type: "single",
    options: [
      { value: "essential", label: "I fly constantly" },
      { value: "important", label: "Fairly important" },
      { value: "low", label: "I stay put" },
    ],
  },
  {
    key: "cultureTolerance",
    title: "Open, progressive culture matters…",
    type: "single",
    options: [
      { value: "important", label: "A lot" },
      { value: "somewhat", label: "Somewhat" },
      { value: "neutral", label: "I'm easy" },
    ],
  },
  {
    key: "riskTolerance",
    title: "Your appetite for the unknown?",
    type: "single",
    options: [
      { value: "high", label: "Throw me in" },
      { value: "medium", label: "Calculated" },
      { value: "low", label: "I like stability" },
    ],
  },
  {
    key: "familyProximity",
    title: "Staying close to family?",
    type: "single",
    options: [
      { value: "close", label: "Keep them close" },
      { value: "flexible", label: "Flexible" },
      { value: "far", label: "Distance is fine" },
    ],
  },
  {
    key: "industries",
    title: "What's your field?",
    subtitle: "Pick any that fit.",
    type: "multi",
    options: [
      { value: "tech", label: "Tech" },
      { value: "creative", label: "Creative" },
      { value: "finance", label: "Finance" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    key: "dealBreakers",
    title: "Any hard deal-breakers?",
    subtitle: "We'll push these places down hard.",
    type: "multi",
    options: [
      { value: "high-crime", label: "Unsafe areas" },
      { value: "expensive", label: "Too expensive" },
    ],
  },
];
