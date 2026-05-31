import type { OnboardingData } from "@/types/onboarding";

export type QuestionType = "single" | "multi";

export interface QuizOption {
  value: string;
  label: string;
  emoji?: string;
  hint?: string;
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
      { value: "rooted", label: "Put down roots", emoji: "🏡", hint: "One home base" },
      { value: "nomadic", label: "Stay on the move", emoji: "✈️", hint: "Multiple stops a year" },
    ],
  },
  {
    key: "beachMountain",
    title: "Pulled toward…",
    type: "single",
    options: [
      { value: "beach", label: "Ocean & beaches", emoji: "🏝️" },
      { value: "mountains", label: "Mountains & trails", emoji: "🏔️" },
      { value: "either", label: "Either, honestly", emoji: "🌍" },
    ],
  },
  {
    key: "preferredClimate",
    title: "Your ideal climate?",
    type: "single",
    options: [
      { value: "tropical", label: "Tropical & warm", emoji: "🌴" },
      { value: "mediterranean", label: "Sunny & mild", emoji: "☀️" },
      { value: "temperate", label: "Four real seasons", emoji: "🍂" },
      { value: "cold", label: "Crisp & cool", emoji: "❄️" },
    ],
  },
  {
    key: "noiseTolerance",
    title: "Your ideal day sounds like…",
    type: "single",
    options: [
      { value: "low", label: "Quiet & calm", emoji: "🧘" },
      { value: "medium", label: "Walkable buzz", emoji: "🚶" },
      { value: "high", label: "Energy & nightlife", emoji: "🎉" },
    ],
  },
  {
    key: "workStyle",
    title: "How do you work?",
    type: "single",
    options: [
      { value: "remote", label: "Fully remote", emoji: "💻" },
      { value: "hybrid", label: "Hybrid / flexible", emoji: "🔀" },
      { value: "onsite", label: "On-site / local", emoji: "🏢" },
    ],
  },
  {
    key: "communityVibes",
    title: "Your people are…",
    subtitle: "Pick any that fit.",
    type: "multi",
    options: [
      { value: "digital-nomad", label: "Nomads & remote folks", emoji: "🌐" },
      { value: "startup", label: "Founders & builders", emoji: "🚀" },
      { value: "expat", label: "International expats", emoji: "🛫" },
      { value: "local", label: "Locals & deep culture", emoji: "🏘️" },
    ],
  },
  {
    key: "budgetRange",
    title: "Monthly budget to live well?",
    type: "single",
    options: [
      { value: "budget", label: "Stretch it far", emoji: "💸", hint: "Under ~$1.5k" },
      { value: "mid-range", label: "Comfortable", emoji: "💳", hint: "~$2–4k" },
      { value: "luxury", label: "No real ceiling", emoji: "💎", hint: "$5k+" },
    ],
  },
  {
    key: "taxSensitivity",
    title: "How much do taxes matter?",
    type: "single",
    options: [
      { value: "very-sensitive", label: "A lot — optimize it", emoji: "📉" },
      { value: "somewhat", label: "Nice to have", emoji: "🤷" },
      { value: "not-sensitive", label: "Not a factor", emoji: "🙅" },
    ],
  },
  {
    key: "safetyPriority",
    title: "Safety & stability is…",
    type: "single",
    options: [
      { value: "top-priority", label: "Non-negotiable", emoji: "🛡️" },
      { value: "important", label: "Important", emoji: "✅" },
      { value: "flexible", label: "I'm adaptable", emoji: "😎" },
    ],
  },
  {
    key: "mustHaves",
    title: "Your non-negotiables?",
    subtitle: "Pick up to 3 — we weight these hardest.",
    type: "multi",
    max: 3,
    options: [
      { value: "affordable", label: "Affordable", emoji: "💸" },
      { value: "safety", label: "Safe", emoji: "🛡️" },
      { value: "nature", label: "Nature access", emoji: "🌲" },
      { value: "nightlife", label: "Nightlife", emoji: "🌃" },
      { value: "beach", label: "Beach", emoji: "🏖️" },
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
      { value: "early-bird", label: "Early mornings", emoji: "🌅" },
      { value: "balanced", label: "Middle of the day", emoji: "🌤️" },
      { value: "night-owl", label: "Late nights", emoji: "🌙" },
    ],
  },
  {
    key: "outdoorUrban",
    title: "City energy or open space?",
    type: "single",
    options: [
      { value: "urban", label: "In the middle of it", emoji: "🏙️" },
      { value: "balanced", label: "A bit of both", emoji: "🌳" },
      { value: "outdoor", label: "Out in nature", emoji: "⛰️" },
    ],
  },
  {
    key: "peopleDensity",
    title: "Your ideal density?",
    type: "single",
    options: [
      { value: "dense", label: "Dense & buzzing", emoji: "🚇" },
      { value: "mid", label: "Mid-size", emoji: "🏘️" },
      { value: "spacious", label: "Room to breathe", emoji: "🌾" },
    ],
  },
  {
    key: "wellnessImportance",
    title: "How central is fitness & wellness?",
    type: "single",
    options: [
      { value: "high", label: "It's my lifestyle", emoji: "🏋️" },
      { value: "medium", label: "I keep it up", emoji: "🚴" },
      { value: "low", label: "Not a priority", emoji: "🛋️" },
    ],
  },
  {
    key: "healthcarePriority",
    title: "Top-tier healthcare nearby?",
    type: "single",
    options: [
      { value: "essential", label: "Essential", emoji: "🏥" },
      { value: "nice", label: "Nice to have", emoji: "🩺" },
      { value: "low", label: "Not worried", emoji: "🤙" },
    ],
  },
  {
    key: "airportImportance",
    title: "How important is a major airport?",
    type: "single",
    options: [
      { value: "essential", label: "I fly constantly", emoji: "✈️" },
      { value: "important", label: "Fairly important", emoji: "🛫" },
      { value: "low", label: "I stay put", emoji: "🧳" },
    ],
  },
  {
    key: "cultureTolerance",
    title: "Open, progressive culture matters…",
    type: "single",
    options: [
      { value: "important", label: "A lot", emoji: "🌈" },
      { value: "somewhat", label: "Somewhat", emoji: "🙂" },
      { value: "neutral", label: "I'm easy", emoji: "🤷" },
    ],
  },
  {
    key: "riskTolerance",
    title: "Your appetite for the unknown?",
    type: "single",
    options: [
      { value: "high", label: "Throw me in", emoji: "🎲" },
      { value: "medium", label: "Calculated", emoji: "⚖️" },
      { value: "low", label: "I like stability", emoji: "🛟" },
    ],
  },
  {
    key: "familyProximity",
    title: "Staying close to family?",
    type: "single",
    options: [
      { value: "close", label: "Keep them close", emoji: "👨‍👩‍👧" },
      { value: "flexible", label: "Flexible", emoji: "🔁" },
      { value: "far", label: "Distance is fine", emoji: "🌍" },
    ],
  },
  {
    key: "industries",
    title: "What's your field?",
    subtitle: "Pick any that fit.",
    type: "multi",
    options: [
      { value: "tech", label: "Tech", emoji: "💻" },
      { value: "creative", label: "Creative", emoji: "🎨" },
      { value: "finance", label: "Finance", emoji: "📈" },
      { value: "other", label: "Something else", emoji: "🧰" },
    ],
  },
  {
    key: "dealBreakers",
    title: "Any hard deal-breakers?",
    subtitle: "We'll push these places down hard.",
    type: "multi",
    options: [
      { value: "high-crime", label: "Unsafe areas", emoji: "🚫" },
      { value: "expensive", label: "Too expensive", emoji: "💰" },
    ],
  },
];
