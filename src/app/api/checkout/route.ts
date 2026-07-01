import { NextRequest, NextResponse } from "next/server";
import { getRun, putRun } from "@/lib/server/runStore";
import { buildScoredRun } from "@/lib/buildRun";
import { PRICE_CENTS, CURRENCY, activePaymentProvider } from "@/lib/pricing";
import { createLemonCheckout } from "@/lib/server/lemonsqueezy";
import { LOCATION_COUNT } from "@/data/locations";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Starts the one-time unlock checkout. The active rail is chosen by config
 * (see activePaymentProvider — Lemon Squeezy first, then Stripe, then dev):
 * - Lemon Squeezy: creates a hosted LS checkout, returns `{ mode: "lemonsqueezy", url }`.
 * - Stripe: creates a Stripe Checkout Session, returns `{ mode: "stripe", url }`.
 *   Both tag the runId so their webhook can unlock it after a verified payment.
 * - Dev (no rail configured): returns `{ mode: "dev" }` so the UI uses the dev unlock.
 *   The gate is still server-enforced — dev unlock is refused once a rail is live
 *   (see /api/unlock).
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
  if (!(await getRun(runId))) {
    if (body.inputs) {
      await putRun(buildScoredRun({ runId, createdAt: Date.now(), inputs: body.inputs, source: "quiz" }));
    } else {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
  }

  const provider = activePaymentProvider();
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (provider === "dev") {
    return NextResponse.json({ mode: "dev" });
  }

  if (provider === "lemonsqueezy") {
    try {
      const url = await createLemonCheckout({
        runId,
        email: body.email,
        redirectUrl: `${origin}/results/${runId}?unlocked=1`,
      });
      return NextResponse.json({ mode: "lemonsqueezy", url });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Checkout failed";
      return NextResponse.json({ error: msg }, { status: 502 });
    }
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
              description: `Your #1 match, full ${LOCATION_COUNT}-place ranking, tax deep-dive, and annual circuit.`,
            },
          },
        },
      ],
      metadata: { runId },
      success_url: `${origin}/results/${runId}?unlocked=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/results/${runId}`,
    });

    return NextResponse.json({ mode: "stripe", url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
