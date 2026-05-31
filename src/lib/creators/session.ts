import "server-only";
import { cookies } from "next/headers";
import { getCreatorStore } from "./store";
import type { Creator } from "./types";

/**
 * Lightweight session — magic-link style, signed cookie holding the creator's id.
 * MVP: until Supabase Auth is wired, we just trust a signed value in a httpOnly cookie.
 * Production (with Supabase): replace with createServerClient(...).auth.getUser().
 */
const SESSION_COOKIE = "fyp_creator_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function sign(creatorId: string): string {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-me";
  // Simple HMAC-style suffix for tamper resistance. Replace with real auth when Supabase lands.
  const data = `${creatorId}.${Date.now()}`;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("node:crypto") as typeof import("node:crypto");
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${hmac}`;
}

function verify(value: string): string | null {
  try {
    const [creatorId, ts, sig] = value.split(".");
    if (!creatorId || !ts || !sig) return null;
    const secret = process.env.SESSION_SECRET || "dev-secret-change-me";
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require("node:crypto") as typeof import("node:crypto");
    const expected = crypto.createHmac("sha256", secret).update(`${creatorId}.${ts}`).digest("base64url");
    if (expected !== sig) return null;
    // Expire 30 days after issued
    if (Date.now() - Number(ts) > MAX_AGE * 1000) return null;
    return creatorId;
  } catch {
    return null;
  }
}

export async function setCreatorSession(creatorId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, sign(creatorId), {
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearCreatorSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentCreator(): Promise<Creator | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const creatorId = verify(raw);
  if (!creatorId) return null;
  return getCreatorStore().getCreatorById(creatorId);
}
