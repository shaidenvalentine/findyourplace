import { NextRequest, NextResponse } from "next/server";
import { getCreatorStore } from "@/lib/creators/store";
import { normalizeCode } from "@/lib/creators/attribution";
import { setCreatorSession } from "@/lib/creators/session";

/**
 * MVP login — code + email match. Lightweight until Supabase Auth (magic link) lands.
 * Privacy: no passwords. The code+email pair is the access token; both must match.
 */
export async function POST(req: NextRequest) {
  let body: { code?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const code = normalizeCode(body.code ?? "");
  const email = (body.email ?? "").trim().toLowerCase();
  if (!code || !email) return NextResponse.json({ error: "Both code and email are required" }, { status: 422 });

  const creator = await getCreatorStore().getCreatorByCode(code);
  if (!creator || creator.email.toLowerCase() !== email || creator.status !== "active") {
    return NextResponse.json({ error: "Couldn't find that creator. Check your code and email." }, { status: 401 });
  }

  await setCreatorSession(creator.id);
  return NextResponse.json({ ok: true });
}
