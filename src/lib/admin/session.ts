import "server-only";
import { cookies } from "next/headers";
import { getSessionSecret } from "@/lib/session/secret";

/**
 * Admin session — password-based, signed cookie. MVP: single password in env
 * (ADMIN_PASSWORD). When Supabase Auth is wired this becomes an `is_admin` claim
 * or an email allowlist; until then this keeps the admin behind a wall.
 *
 * FAIL CLOSED IN PRODUCTION: the repo is public, so we refuse to run the admin wall
 * on the dev default password/secret. In production, both ADMIN_PASSWORD and
 * SESSION_SECRET must be set or login is impossible and no cookie validates.
 */
const COOKIE = "fyp_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

/** In production, admin auth only operates when both secrets are explicitly set. */
function adminAuthReady(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(process.env.SESSION_SECRET && process.env.ADMIN_PASSWORD);
}

function sign(): string | null {
  const secret = getSessionSecret();
  if (!secret) return null;
  const data = `admin.${Date.now()}`;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("node:crypto") as typeof import("node:crypto");
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${hmac}`;
}

function verify(value: string): boolean {
  const secret = getSessionSecret();
  if (!secret) return false;
  try {
    const [tag, ts, sig] = value.split(".");
    if (tag !== "admin" || !ts || !sig) return false;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require("node:crypto") as typeof import("node:crypto");
    const expected = crypto.createHmac("sha256", secret).update(`${tag}.${ts}`).digest("base64url");
    if (expected !== sig) return false;
    if (Date.now() - Number(ts) > MAX_AGE * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export async function setAdminSession() {
  const value = sign();
  if (!value) return; // secrets not configured in prod — no session issued
  const jar = await cookies();
  jar.set(COOKIE, value, {
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!adminAuthReady()) return false;
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  return verify(raw);
}

export function checkAdminPassword(input: string): boolean {
  // In production, refuse to authenticate unless a real ADMIN_PASSWORD + SESSION_SECRET
  // are set — the repo is public, so the dev default ("password") must never grant
  // access to the business/payout portal. Local dev keeps the convenient default.
  if (!adminAuthReady()) return false;
  const expected = process.env.ADMIN_PASSWORD || "password";
  // Constant-time-ish comparison
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
