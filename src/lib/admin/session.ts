import "server-only";
import { cookies } from "next/headers";

/**
 * Admin session — password-based, signed cookie. MVP: single password in env
 * (ADMIN_PASSWORD). When Supabase Auth is wired this becomes an `is_admin` claim
 * or an email allowlist; until then this keeps the admin behind a wall.
 */
const COOKIE = "fyp_admin";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getSecret(): string {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

function sign(): string {
  const data = `admin.${Date.now()}`;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("node:crypto") as typeof import("node:crypto");
  const hmac = crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
  return `${data}.${hmac}`;
}

function verify(value: string): boolean {
  try {
    const [tag, ts, sig] = value.split(".");
    if (tag !== "admin" || !ts || !sig) return false;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const crypto = require("node:crypto") as typeof import("node:crypto");
    const expected = crypto.createHmac("sha256", getSecret()).update(`${tag}.${ts}`).digest("base64url");
    if (expected !== sig) return false;
    if (Date.now() - Number(ts) > MAX_AGE * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export async function setAdminSession() {
  const jar = await cookies();
  jar.set(COOKIE, sign(), {
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
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  return verify(raw);
}

export function checkAdminPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // Refuse to authenticate if no password is configured.
  // Constant-time-ish comparison
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
