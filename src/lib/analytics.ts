"use client";

/**
 * Funnel analytics — one tiny client API that fires the Meta Pixel AND mirrors the
 * event to our server-side Conversions API (CAPI) with a shared event_id so Meta
 * deduplicates the browser + server copy. Wired BEFORE the first ad runs (BUILD_PLAN
 * Phase 5). Everything no-ops cleanly until NEXT_PUBLIC_META_PIXEL_ID is set, so the
 * funnel works identically with or without tracking configured.
 *
 * Event taxonomy (the only names we fire):
 *   landing_view  → PageView      (auto, on every route, by MetaPixel)
 *   quiz_start    → InitiateCheckout-adjacent custom + ViewContent
 *   quiz_complete → Lead          (the key pre-purchase optimization event)
 *   paywall_view  → AddToCart
 *   checkout_start→ InitiateCheckout
 *   purchase      → Purchase       (also fired server-side in the webhook via CAPI)
 */

import { META_STANDARD, type FunnelEvent } from "@/lib/metaEvents";
import { isAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics/events";

export type { FunnelEvent };

type Params = {
  value?: number;
  currency?: string;
  /** Stable id so the Pixel copy and the CAPI copy dedup. Defaults to a random uuid. */
  eventId?: string;
  /** Optional plaintext email — hashed server-side only, never sent to the Pixel. */
  email?: string;
  /** The run this event belongs to, when one exists (first-party analytics only). */
  runId?: string;
  [k: string]: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fbq = (...args: any[]) => void;

const SID_KEY = "fyp_sid";

/** Anonymous, stable-per-browser session id used ONLY to de-dup our own funnel. Never
 * sent to Meta and never tied to identity. */
function sessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = localStorage.getItem(SID_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return "";
  }
}

/** Mirror an event to our first-party ingest (/api/track). Fire-and-forget; no PII. */
function logFirstParty(
  name: AnalyticsEventName,
  extra: { runId?: string | null; stepKey?: string | null; stepIndex?: number | null; source?: string | null } = {},
): void {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      name,
      sessionId: sessionId(),
      path: window.location.pathname,
      ...extra,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* analytics must never break the funnel */
  }
}

/** Log the user reaching a specific quiz question — powers per-question drop-off. */
export function trackStep(stepIndex: number, stepKey: string): void {
  logFirstParty("quiz_step", { stepIndex, stepKey });
}

/** Log a first-party-only event (not part of the Meta taxonomy), e.g. results_view. */
export function logEvent(
  name: AnalyticsEventName,
  extra: { runId?: string | null; source?: string | null } = {},
): void {
  logFirstParty(name, extra);
}

export function track(event: FunnelEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const eventId = params.eventId ?? crypto.randomUUID();
  const standard = META_STANDARD[event];
  const { email } = params;
  const custom: Record<string, unknown> = { ...params };
  delete custom.eventId;
  delete custom.email;
  delete custom.runId;

  // First-party mirror so our own admin funnel matches what Meta receives.
  if (isAnalyticsEvent(event)) logFirstParty(event, { runId: params.runId ?? null });

  // 1) Browser Pixel (no PII — email is server-only).
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") {
    fbq("track", standard, custom, { eventID: eventId });
  }

  // 2) Server CAPI mirror (fire-and-forget). The route is a no-op without credentials.
  try {
    const body = JSON.stringify({
      event,
      eventId,
      eventSourceUrl: window.location.href,
      value: params.value,
      currency: params.currency,
      email,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/meta/capi", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/meta/capi", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* tracking must never break the funnel */
  }
}
