import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/server/metaCapi";
import type { FunnelEvent } from "@/lib/metaEvents";

/**
 * Mirrors a client funnel event to the Meta Conversions API, enriching it with the
 * request IP, user-agent, and the Pixel's _fbp/_fbc cookies so Meta can match + dedup
 * against the browser Pixel copy (same event_id). No-ops without CAPI credentials.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: {
    event?: FunnelEvent;
    eventId?: string;
    eventSourceUrl?: string;
    value?: number;
    currency?: string;
    email?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.event || !body.eventId) return NextResponse.json({ ok: false }, { status: 400 });

  const fwd = req.headers.get("x-forwarded-for");
  await sendCapiEvent({
    event: body.event,
    eventId: body.eventId,
    eventSourceUrl: body.eventSourceUrl,
    value: body.value,
    currency: body.currency,
    email: body.email ?? null,
    clientIp: fwd ? fwd.split(",")[0].trim() : null,
    userAgent: req.headers.get("user-agent"),
    fbp: req.cookies.get("_fbp")?.value ?? null,
    fbc: req.cookies.get("_fbc")?.value ?? null,
  });

  return NextResponse.json({ ok: true });
}
