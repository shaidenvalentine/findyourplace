import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";

/**
 * Create a payout: collects all PENDING conversions for a creator, sums them, marks
 * them paid against a new payout record. Admin then sends the Wise transfer manually
 * and can PATCH the payout to "paid" with the Wise reference.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: { creatorId?: string; conversionIds?: string[]; reference?: string; markPaid?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const creatorId = body.creatorId ?? "";
  const ids = body.conversionIds ?? [];
  if (!creatorId || !ids.length) {
    return NextResponse.json({ error: "creatorId + conversionIds required" }, { status: 422 });
  }
  const store = getCreatorStore();
  const conversions = await store.listConversions(creatorId, 1000);
  const targets = conversions.filter((c) => ids.includes(c.id) && c.status === "pending");
  if (!targets.length) return NextResponse.json({ error: "No pending conversions match" }, { status: 422 });

  const total = targets.reduce((s, c) => s + c.creatorCutCents, 0);
  const today = new Date().toISOString().slice(0, 10);
  const earliest = targets.reduce((min, c) => (c.createdAt < min ? c.createdAt : min), targets[0].createdAt);
  const periodStart = new Date(earliest).toISOString().slice(0, 10);

  const payout = await store.createPayout({
    creatorId,
    periodStart,
    periodEnd: today,
    totalCents: total,
    conversionCount: targets.length,
    status: body.markPaid ? "paid" : "pending",
    paidAt: body.markPaid ? Date.now() : null,
    payoutMethod: "wise",
    reference: body.reference ?? null,
    notes: null,
  });
  await store.markConversionsPaid(creatorId, targets.map((c) => c.id), payout.id);
  return NextResponse.json({ payout });
}
