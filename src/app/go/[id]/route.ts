import { NextRequest, NextResponse } from "next/server";
import { getPartner } from "@/lib/affiliates";

/**
 * Affiliate click tracker + redirect. Routes every partner click through here so we can
 * attribute it (which run, which placement) and measure revenue per surface, then 302 to
 * the partner's tracked affiliate URL (from env) — or the plain site if not yet configured.
 *
 * ⚠️ The affiliate URLs are paid by each partner's program/network, NOT through Stripe.
 * Set AFF_<PARTNER> env vars to your tracking links to start earning.
 */
export const runtime = "nodejs";

const g = globalThis as unknown as { __fypClicks?: Map<string, number> };
const clicks = (g.__fypClicks ??= new Map());

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = getPartner(id);
  if (!partner) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Attribution (in-memory for now → swap for an `affiliate_clicks` table in Supabase).
  const url = new URL(req.url);
  const placement = url.searchParams.get("p") || "unknown";
  const runId = url.searchParams.get("run") || "";
  const key = `${partner.id}:${placement}`;
  clicks.set(key, (clicks.get(key) ?? 0) + 1);
  // Note: never log anything sensitive; runId is an opaque token.
  void runId;

  const target = process.env[partner.affEnv] || partner.baseUrl;
  return NextResponse.redirect(target, { status: 302 });
}
