import { NextRequest, NextResponse } from "next/server";
import { getCreatorStore } from "@/lib/creators/store";
import { normalizeCode } from "@/lib/creators/attribution";
import { enforceRateLimit } from "@/lib/server/rateLimit";

/**
 * Records a creator click. Called from the co-branded landing page (`/c/[code]`) once
 * on mount via a client-side fetch — keeps the page itself a pure server component.
 */
export async function POST(req: NextRequest) {
  // Attribution integrity: stop a bot from inflating a creator's click count (which
  // drives rev-share analytics). Per-IP window.
  const limited = enforceRateLimit(req, "creator-click", 20, 60);
  if (limited) return limited;

  let body: { code?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const code = normalizeCode(body.code ?? "");
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 422 });

  const store = getCreatorStore();
  const creator = await store.getCreatorByCode(code);
  if (!creator || creator.status !== "active") {
    return NextResponse.json({ error: "Unknown creator" }, { status: 404 });
  }

  const source = body.source === "code" ? "code" : body.source === "link" ? "link" : "landing";
  await store.recordClick({ creatorId: creator.id, source, referrer: null });
  return NextResponse.json({ ok: true });
}
