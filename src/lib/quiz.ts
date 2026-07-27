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
 * to feel like a conversation: home → energy → schedule → experience → household →
 * coat → noise → money → priorities.
 */
export const QUIZ: QuizQuestion[] = [
  {
    key: "homeType",
    title: "Where would this dog live?",
    type: "single",
    options: [
      { value: "apartment", label: "Apartment", hint: "City living", insight: "Got it — space-savvy breeds just moved way up your list." },
      { value: "house-small-yard", label: "House, small yard", insight: "A little outdoor space opens up a lot of breeds." },
      { value: "house-big-yard", label: "House, big yard", insight: "Room to run — almost nothing is off the table for space." },
      { value: "rural", label: "Rural / acreage", insight: "Wide open — working and guardian breeds are in play." },
    ],
  },
  {
    key: "activityLevel",
    title: "Your honest activity level?",
    subtitle: "The dog has to live with the real you.",
    type: "single",
    options: [
      { value: "relaxed", label: "Walks & couch", hint: "~30 min/day", insight: "Honest answer — that just saved you from a very frustrated herding dog." },
      { value: "moderate", label: "Daily walks, weekend outings", insight: "The sweet spot — most great family breeds live right here." },
      { value: "active", label: "Runs, hikes, long walks", insight: "Nice — the athletic breeds just entered the chat." },
      { value: "athlete", label: "Training partner wanted", hint: "Runs, trails, sport", insight: "A true running partner — that's a rare and specific list." },
    ],
  },
  {
    key: "hoursAlone",
    title: "How long would the dog be alone?",
    subtitle: "On a normal weekday.",
    type: "single",
    options: [
      { value: "rarely", label: "Rarely alone", hint: "WFH / someone's home", insight: "A velcro breed would thrive with you." },
      { value: "half-day", label: "A few hours", insight: "Manageable for most breeds with a good routine." },
      { value: "full-day", label: "Full workday", insight: "Important — we're now weighting hard for independent breeds." },
    ],
  },
  {
    key: "experienceLevel",
    title: "Your dog experience?",
    type: "single",
    options: [
      { value: "first-time", label: "First dog", insight: "We'll weight toward forgiving, easygoing breeds — the ones that make you look good." },
      { value: "had-dogs", label: "Had dogs before", insight: "Solid — that opens up breeds with a little more personality." },
      { value: "experienced", label: "Very experienced", insight: "The strong-willed working breeds just became fair game." },
    ],
  },
  {
    key: "hasKids",
    title: "Kids in the picture?",
    type: "single",
    options: [
      { value: "true", label: "Yes", insight: "Kid-proof patience is now a top weight." },
      { value: "false", label: "No", insight: "Noted — that frees up some wonderful one-person breeds." },
    ],
  },
  {
    key: "otherPets",
    title: "Other animals at home?",
    subtitle: "Pick any that apply.",
    type: "multi",
    options: [
      { value: "dog", label: "Another dog" },
      { value: "cat", label: "Cat(s)" },
      { value: "small-pets", label: "Small pets" },
      { value: "none", label: "Just us" },
    ],
  },
  {
    key: "sizePreference",
    title: "Size you're drawn to?",
    type: "single",
    options: [
      { value: "small", label: "Small", hint: "Under ~25 lbs" },
      { value: "medium", label: "Medium", hint: "~25–55 lbs" },
      { value: "large", label: "Large", hint: "~55–90 lbs" },
      { value: "giant", label: "Giant", hint: "90+ lbs" },
      { value: "open", label: "Open to anything" },
    ],
  },
  {
    key: "allergies",
    title: "Allergies in the household?",
    type: "single",
    options: [
      { value: "true", label: "Yes — need low-allergen", insight: "Hard filter applied — heavy shedders are out." },
      { value: "false", label: "No allergies" },
    ],
  },
  {
    key: "guardingImportance",
    title: "Do you want a protector?",
    subtitle: "Some dogs are lovers, some are guardians.",
    type: "single",
    options: [
      { value: "top-priority", label: "Yes — safety matters", insight: "Guardian breeds just moved up — presence and loyalty." },
      { value: "nice-to-have", label: "A watchdog is nice" },
      { value: "not-needed", label: "Just a companion" },
    ],
  },
  {
    key: "mustHaves",
    title: "Your non-negotiables?",
    subtitle: "Pick up to 3 — we weight these hardest.",
    type: "multi",
    max: 3,
    options: [
      { value: "good-with-kids", label: "Great with kids" },
      { value: "apartment-ok", label: "Apartment-friendly" },
      { value: "low-shedding", label: "Low shedding" },
      { value: "quiet", label: "Quiet" },
      { value: "easy-training", label: "Easy to train" },
      { value: "jogging-partner", label: "Running partner" },
      { value: "protective", label: "Protective" },
    ],
  },
];

/**
 * The DEEP dive — the high-impact dimensions the quick path doesn't capture. Surfaced
 * AFTER the first result as the "sharpen your match" lever. The client only asks the
 * questions we don't already know the answer to (from the AI/quick-quiz inputs), so
 * it never feels redundant. Every answer re-scores the run and climbs match confidence.
 */
export const DEEP_QUIZ: QuizQuestion[] = [
  {
    key: "affectionStyle",
    title: "How much dog do you want on you?",
    type: "single",
    options: [
      { value: "velcro", label: "Velcro — glued to me" },
      { value: "balanced", label: "Affectionate but chill" },
      { value: "independent", label: "Independent roommate" },
    ],
  },
  {
    key: "trainingAppetite",
    title: "How do you feel about training?",
    type: "single",
    options: [
      { value: "love-it", label: "I'd love it — tricks, sports" },
      { value: "basics", label: "The basics, done well" },
      { value: "minimal", label: "As little as possible" },
    ],
  },
  {
    key: "barkTolerance",
    title: "Your barking tolerance?",
    type: "single",
    options: [
      { value: "low", label: "Need quiet", hint: "Thin walls / neighbors" },
      { value: "medium", label: "Some barking is fine" },
      { value: "high", label: "Let them talk" },
    ],
  },
  {
    key: "groomingTolerance",
    title: "Grooming: chore or hobby?",
    type: "single",
    options: [
      { value: "minimal", label: "Wash-and-go only" },
      { value: "moderate", label: "Weekly brushing is fine" },
      { value: "enjoys-grooming", label: "I'd enjoy the ritual" },
    ],
  },
  {
    key: "sheddingTolerance",
    title: "Fur on the couch is…",
    type: "single",
    options: [
      { value: "low", label: "A dealbreaker" },
      { value: "medium", label: "Manageable" },
      { value: "high", label: "A lifestyle I accept" },
    ],
  },
  {
    key: "kidsAges",
    title: "How old are the kids?",
    type: "single",
    options: [
      { value: "toddlers", label: "Toddlers / under 6" },
      { value: "school-age", label: "School age" },
      { value: "teens", label: "Teens" },
    ],
  },
  {
    key: "climate",
    title: "Your climate?",
    type: "single",
    options: [
      { value: "hot", label: "Hot most of the year" },
      { value: "temperate", label: "Four seasons" },
      { value: "cold", label: "Cold winters" },
    ],
  },
  {
    key: "travelFrequency",
    title: "How often are you away?",
    type: "single",
    options: [
      { value: "rarely", label: "Rarely travel" },
      { value: "sometimes", label: "A few trips a year" },
      { value: "often", label: "Away a lot" },
    ],
  },
  {
    key: "budgetRange",
    title: "Monthly budget for the dog?",
    subtitle: "Food, grooming, insurance, vet.",
    type: "single",
    options: [
      { value: "budget", label: "Keep it lean", hint: "~$100/mo" },
      { value: "mid-range", label: "Comfortable", hint: "~$150–250/mo" },
      { value: "no-ceiling", label: "Whatever they need" },
    ],
  },
  {
    key: "adoptPreference",
    title: "Where would your dog come from?",
    type: "single",
    options: [
      { value: "adopt", label: "Adopt / rescue", hint: "We'll find them near you" },
      { value: "either", label: "Open to either" },
      { value: "breeder", label: "Breeder" },
    ],
  },
  {
    key: "dealBreakers",
    title: "Any hard deal-breakers?",
    subtitle: "We'll push these breeds down hard.",
    type: "multi",
    options: [
      { value: "heavy-shedding", label: "Heavy shedding" },
      { value: "drooling", label: "Drooling" },
      { value: "constant-barking", label: "Constant barking" },
      { value: "high-energy", label: "Hyper energy" },
      { value: "stubborn", label: "Stubborn to train" },
      { value: "fragile-health", label: "Fragile health" },
    ],
  },
];
