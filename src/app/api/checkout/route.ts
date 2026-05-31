import { NextRequest, NextResponse } from "next/server";
import { getRun, putRun } from "@/lib/server/runStore";
import { buildScoredRun } from "@/lib/buildRun";
import { PRICE_CENTS, CURRENCY, isStripeConfigured } from "@/lib/pricing";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Starts the one-time unlock checkout.
 * - With STRIPE_SECRET_KEY: creates a real Stripe Checkout Session (server-side),
 *   tagging the runId in metadata so the webhook can unlock it after payment.
 * - Without Stripe (local/dev): returns `{ mode: "dev" }` so the UI can use the
 *   dev unlock path. The gate is still server-enforced — dev unlock is refused in
 *   production (see /api/unlock).
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { runId?: string; email?: string; inputs?: OnboardingData };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const runId = body.runId ?? "";
  // Cold-lambda fallback: rebuild the run from client-cached inputs if needed.
  if (!getRun(runId)) {
    if (body.inputs) {
      putRun(buildScoredRun({ runId, createdAt: Date.now(), inputs: body.inputs, source: "quiz" }));
    } else {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ mode: "dev" });
  }

  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: body.email || undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          unit_amount: PRICE_CENTS,
          product_data: {
            name: "Find Your Place — full results unlock",
            description: "Your #1 match, full 250-place ranking, tax deep-dive, and annual circuit.",
          },
        },
      },
    ],
    metadata: { runId },
    success_url: `${origin}/results/${runId}?unlocked=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/results/${runId}`,
  });

  return NextResponse.json({ mode: "stripe", url: session.url });
}
