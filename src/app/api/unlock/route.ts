import { NextRequest, NextResponse } from "next/server";
import { getRun, putRun, markUnlocked } from "@/lib/server/runStore";
import { buildScoredRun } from "@/lib/buildRun";
import { isStripeConfigured } from "@/lib/pricing";
import type { OnboardingData } from "@/types/onboarding";

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

  let body: { runId?: string; inputs?: OnboardingData };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const runId = body.runId ?? "";
  // Cold-lambda fallback: rebuild from inputs so we never error on the first try.
  if (!getRun(runId)) {
    if (body.inputs) {
      putRun(buildScoredRun({ runId, createdAt: Date.now(), inputs: body.inputs, source: "quiz" }));
    } else {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
  }

  markUnlocked(runId);
  return NextResponse.json({ unlocked: true, dev: true });
}
