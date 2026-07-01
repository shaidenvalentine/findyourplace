import { NextRequest, NextResponse } from "next/server";
import { getRun, putRun, markUnlocked } from "@/lib/server/runStore";
import { buildScoredRun } from "@/lib/buildRun";
import { isPaymentConfigured, PRICE_CENTS } from "@/lib/pricing";
import { getCreatorStore } from "@/lib/creators/store";
import type { OnboardingData } from "@/types/onboarding";

/**
 * DEV-ONLY unlock. When NO payment rail is configured (local development), this lets the
 * funnel complete end-to-end without real payment. The moment any rail is live (Stripe
 * OR Lemon Squeezy keys set), this path is refused — the ONLY way to unlock then is the
 * server-verified webhook for that rail. This preserves the "gate holds" guardrail.
 */
export async function POST(req: NextRequest) {
  if (isPaymentConfigured()) {
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
  if (!(await getRun(runId))) {
    if (body.inputs) {
      await putRun(buildScoredRun({ runId, createdAt: Date.now(), inputs: body.inputs, source: "quiz" }));
    } else {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
  }

  await markUnlocked(runId);

  // Record the creator conversion (dev mode — simulated unlock). In production this
  // happens in the Stripe webhook instead so it's tied to verified payment.
  const run = await getRun(runId);
  if (run?.creatorId) {
    const creator = await getCreatorStore().getCreatorById(run.creatorId);
    if (creator) {
      await getCreatorStore().recordConversion({
        creatorId: creator.id,
        runId,
        stripeSessionId: null,
        email: null,
        amountCents: PRICE_CENTS,
        creatorCutCents: Math.round((PRICE_CENTS * creator.revSharePct) / 100),
        status: "pending",
      });
    }
  }

  return NextResponse.json({ unlocked: true, dev: true });
}
