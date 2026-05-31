import { NextRequest, NextResponse } from "next/server";
import { getCurrentCreator } from "@/lib/creators/session";
import { getCreatorStore } from "@/lib/creators/store";

export async function PATCH(req: NextRequest) {
  const creator = await getCurrentCreator();
  if (!creator) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Allow only safe fields to be updated.
  const patch: Record<string, unknown> = {};
  for (const k of ["displayName", "bio", "instagramHandle", "tiktokHandle", "youtubeHandle", "twitterHandle", "website", "payoutEmail"] as const) {
    if (typeof body[k] === "string") patch[k] = (body[k] as string).trim() || null;
  }
  const updated = await getCreatorStore().updateCreator(creator.id, patch);
  return NextResponse.json({ creator: updated });
}
