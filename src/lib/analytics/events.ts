/**
 * First-party funnel event taxonomy — the allowlist shared by the client tracker,
 * the /api/track ingest route, and the analytics store. Kept separate from
 * lib/metaEvents (which maps to Meta standard events) because our first-party set is
 * broader: it adds per-quiz-question drop-off (`quiz_step`) and the entry-path split.
 */

export const ANALYTICS_EVENTS = [
  "landing_view",
  "quiz_start",
  "quiz_step",
  "quiz_complete",
  "results_view",
  "paywall_view",
  "checkout_start",
  "purchase",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export function isAnalyticsEvent(v: unknown): v is AnalyticsEventName {
  return typeof v === "string" && (ANALYTICS_EVENTS as readonly string[]).includes(v);
}

/** The ordered top-line funnel shown in /admin/analytics (quiz_step is excluded — it's
 * the per-question breakdown, rendered separately). */
export const FUNNEL_STEPS: { name: AnalyticsEventName; label: string }[] = [
  { name: "landing_view", label: "Landing view" },
  { name: "quiz_start", label: "Quiz started" },
  { name: "quiz_complete", label: "Quiz completed" },
  { name: "results_view", label: "Results viewed" },
  { name: "paywall_view", label: "Paywall viewed" },
  { name: "checkout_start", label: "Checkout started" },
  { name: "purchase", label: "Purchased" },
];

export type AnalyticsEventInput = {
  name: AnalyticsEventName;
  runId?: string | null;
  stepKey?: string | null;
  stepIndex?: number | null;
  source?: string | null;
  sessionId?: string | null;
  path?: string | null;
};
