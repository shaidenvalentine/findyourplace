/** Shared funnel→Meta event taxonomy, used by both the client Pixel and server CAPI. */

export type FunnelEvent =
  | "landing_view"
  | "quiz_start"
  | "quiz_complete"
  | "paywall_view"
  | "checkout_start"
  | "purchase";

/** Map our funnel events to Meta standard events for clean optimization + reporting. */
export const META_STANDARD: Record<FunnelEvent, string> = {
  landing_view: "PageView",
  quiz_start: "ViewContent",
  quiz_complete: "Lead",
  paywall_view: "AddToCart",
  checkout_start: "InitiateCheckout",
  purchase: "Purchase",
};
