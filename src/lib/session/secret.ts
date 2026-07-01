import "server-only";

/**
 * The HMAC secret for our signed session cookies (admin + creator).
 *
 * The repo is public, so the historical dev default ("dev-secret-change-me") must
 * NEVER be used in production — anyone could forge a valid cookie with it. In
 * production we return null unless a real SESSION_SECRET is set, and callers treat
 * null as "sessions disabled" (fail closed). Local/dev keeps the convenient default.
 */
export function getSessionSecret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") return null;
  return "dev-secret-change-me";
}
