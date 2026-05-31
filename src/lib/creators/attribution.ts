import "server-only";
import { cookies } from "next/headers";
import { getCreatorStore } from "./store";
import type { Creator } from "./types";

/**
 * 30-day attribution cookie. Set the moment a visitor arrives via ?ref=code or /c/code.
 * Stays sticky through the quiz → result → paywall → purchase flow, so the conversion
 * always credits the creator who sent the user, even days later.
 */
const COOKIE = "fyp_ref";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function setRefCookie(code: string) {
  const jar = await cookies();
  jar.set(COOKIE, code, {
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: false, // readable client-side for analytics if needed
    secure: process.env.NODE_ENV === "production",
  });
}

export async function readRefCookie(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value ?? null;
}

/** Resolves the current visitor's attributed creator (cookie → Supabase lookup). */
export async function getAttributedCreator(): Promise<Creator | null> {
  const code = await readRefCookie();
  if (!code) return null;
  return getCreatorStore().getCreatorByCode(code);
}

/** Normalizes a code: lowercase, strips whitespace, alphanumeric + dash/underscore only. */
export function normalizeCode(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 32);
}
