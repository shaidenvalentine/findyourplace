import { NextRequest, NextResponse } from "next/server";
import { getRun, markUnlocked } from "@/lib/server/runStore";
import { isStripeConfigured } from "@/lib/pricing";

/**
 * DEV-ONLY unlock. When Stripe is NOT configured (local development), this lets the
 * funnel complete end-to-end without real payment. The moment STRIPE_SECRET_KEY is
 * set (any real/prod deploy), this path is refused — the ONLY way to unlock then is
 * the server-verified Stripe webhook. This preserves the "gate holds" guardrail.
 */
export async function POST(req: NextRequest) {
  if (isStripeConfigured()) {
    return NextResponse.json(
      { error: "Dev unlock disabled — unlock only via verified payment." },
      { status: 403 }
    );
  }

  let body: { runId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const runId = body.runId ?? "";
  if (!getRun(runId)) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  markUnlocked(runId);
  return NextResponse.json({ unlocked: true, dev: true });
}
