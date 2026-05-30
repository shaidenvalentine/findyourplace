"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (anon key, RLS-enforced). Returns null until env is set.
 * Used for auth (magic link / OAuth) and reading the user's own runs.
 */
export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}
