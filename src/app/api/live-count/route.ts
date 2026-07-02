import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Public live-completion counter — HONEST or absent. Returns the real
 * `quiz_completions` count once Supabase is configured AND the number has passed a
 * floor (small numbers hurt more than no number); otherwise `{count: null}` and the
 * UI shows nothing. No synthetic social proof on launch day.
 */
export const dynamic = "force-dynamic";

const FLOOR = 500;

export async function GET() {
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ count: null });

  const { count, error } = await db
    .from("quiz_completions")
    .select("id", { count: "exact", head: true });
  if (error || count === null || count < FLOOR) return NextResponse.json({ count: null });

  return NextResponse.json({ count });
}
