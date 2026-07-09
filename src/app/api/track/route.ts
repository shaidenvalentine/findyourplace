import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsStore } from "@/lib/analytics/store";
import { isAnalyticsEvent } from "@/lib/analytics/events";

/**
 * First-party funnel ingest. The client tracker mirrors every funnel event here (in
 * addition to the Meta Pixel/CAPI) so /admin/analytics can show the funnel, per-quiz
 * drop-off, and conversion rates from our OWN data.
 *
 * Structural signal only — the route accepts no email, IP, or profile text, and the
 * event name is checked against a fixed allowlist so the table can't be spammed with
 * arbitrary names. Fire-and-forget: it must never block or break the funnel.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    runId?: string | null;
    stepKey?: string | null;
    stepIndex?: number | null;
    source?: string | null;
    sessionId?: string | null;
    path?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isAnalyticsEvent(body.name)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await getAnalyticsStore().record({
      name: body.name,
      runId: body.runId ?? null,
      stepKey: typeof body.stepKey === "string" ? body.stepKey.slice(0, 64) : null,
      stepIndex: typeof body.stepIndex === "number" ? body.stepIndex : null,
      source: typeof body.source === "string" ? body.source.slice(0, 32) : null,
      sessionId: typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : null,
      path: typeof body.path === "string" ? body.path.slice(0, 128) : null,
    });
  } catch {
    /* analytics must never break the funnel */
  }

  return NextResponse.json({ ok: true });
}
