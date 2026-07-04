import { NextRequest, NextResponse } from "next/server";
import { getCreatorStore } from "@/lib/creators/store";
import { normalizeCode } from "@/lib/creators/attribution";
import { setCreatorSession } from "@/lib/creators/session";
import { enforceRateLimit } from "@/lib/server/rateLimit";
import type { Creator } from "@/lib/creators/types";

/**
 * Open creator signup. MVP: anyone can claim a code; you can suspend/adjust rev share
 * later from the admin view. Doubles as login when an existing code is used.
 */
export async function POST(req: NextRequest) {
  let body: {
    code?: string;
    displayName?: string;
    email?: string;
    bio?: string;
    instagramHandle?: string;
    tiktokHandle?: string;
    youtubeHandle?: string;
    twitterHandle?: string;
    website?: string;
    payoutEmail?: string;
  };
  // Stop bots from mass-creating accounts / squatting codes.
  const limited = enforceRateLimit(req, "creator-signup", 5, 3600);
  if (limited) return limited;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = normalizeCode(body.code ?? "");
  if (code.length < 3) return NextResponse.json({ error: "Code must be at least 3 characters" }, { status: 422 });
  const displayName = (body.displayName ?? "").trim();
  if (!displayName) return NextResponse.json({ error: "Name is required" }, { status: 422 });
  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Valid email required" }, { status: 422 });

  const store = getCreatorStore();
  const existing = await store.getCreatorByCode(code);
  if (existing) {
    return NextResponse.json({ error: "That code is taken — try another." }, { status: 409 });
  }

  const creator: Creator = {
    id: crypto.randomUUID(),
    userId: null,
    code,
    displayName,
    email,
    bio: (body.bio ?? "").trim() || null,
    instagramHandle: (body.instagramHandle ?? "").trim() || null,
    tiktokHandle: (body.tiktokHandle ?? "").trim() || null,
    youtubeHandle: (body.youtubeHandle ?? "").trim() || null,
    twitterHandle: (body.twitterHandle ?? "").trim() || null,
    website: (body.website ?? "").trim() || null,
    payoutEmail: (body.payoutEmail ?? "").trim() || email,
    revSharePct: 50,
    status: "active",
    approved: true,
    createdAt: Date.now(),
  };

  await store.upsertCreator(creator);
  await setCreatorSession(creator.id);

  return NextResponse.json({ ok: true, creator });
}
