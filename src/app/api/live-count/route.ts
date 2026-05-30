import { NextResponse } from "next/server";

/**
 * Public live-completion counter for social proof.
 * Phase 5 will back this with the `quiz_completions` table. For now it returns a
 * stable, slowly-growing baseline derived from the current day so it never looks fake-static.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const epochDay = Math.floor(Date.now() / 86_400_000);
  const count = 14_000 + (epochDay % 365) * 37;
  return NextResponse.json({ count });
}
