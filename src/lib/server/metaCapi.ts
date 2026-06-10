import "server-only";
import crypto from "node:crypto";
import { META_STANDARD, type FunnelEvent } from "@/lib/metaEvents";

/**
 * Meta Conversions API (server-side) sender. The reliable half of the dedup pair —
 * fires even when the browser Pixel is blocked. No-ops without credentials.
 *
 * Set NEXT_PUBLIC_META_PIXEL_ID (the pixel) and META_CAPI_TOKEN (a Conversions API
 * access token) to enable. Used by the funnel's `/api/meta/capi` proxy (mirrors client
 * events) and directly by the payment webhooks for the server-verified Purchase.
 */

const GRAPH_VERSION = "v21.0";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export function isCapiConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_TOKEN);
}

export async function sendCapiEvent(opts: {
  event: FunnelEvent;
  eventId: string;
  eventSourceUrl?: string;
  value?: number;
  currency?: string;
  email?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
}): Promise<void> {
  if (!isCapiConfigured()) return;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
  const token = process.env.META_CAPI_TOKEN!;

  const userData: Record<string, unknown> = {};
  if (opts.email) userData.em = [sha256(opts.email)];
  if (opts.clientIp) userData.client_ip_address = opts.clientIp;
  if (opts.userAgent) userData.client_user_agent = opts.userAgent;
  if (opts.fbp) userData.fbp = opts.fbp;
  if (opts.fbc) userData.fbc = opts.fbc;

  const customData: Record<string, unknown> = {};
  if (typeof opts.value === "number") customData.value = opts.value;
  if (opts.currency) customData.currency = opts.currency;

  const payload = {
    data: [
      {
        event_name: META_STANDARD[opts.event],
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        action_source: "website",
        event_source_url: opts.eventSourceUrl,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  try {
    await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* tracking must never break a payment or a request */
  }
}
