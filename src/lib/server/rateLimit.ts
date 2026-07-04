import "server-only";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight fixed-window rate limiter — the first line of defense against bots
 * hammering our public endpoints (quiz spam, credential brute-force, and — most
 * expensive — abuse of the LLM-backed profile normalizer, which spends real money
 * per call).
 *
 * DESIGN: in-memory per-instance counters. This is intentionally dependency-free and
 * adds zero latency to the conversion-critical funnel. The tradeoff is that on
 * serverless (Vercel) each warm instance keeps its own window, so a distributed
 * attacker spread across many cold instances sees a higher effective ceiling. That's
 * an acceptable MVP posture: it stops the common case (one bot rapid-firing a single
 * instance) cold, and for the sensitive low-volume paths (login, LLM) the per-instance
 * window is still a meaningful brake. The production upgrade is a shared store
 * (Upstash Redis / Supabase) keyed the same way — swap the Map for that here and every
 * call site keeps working unchanged.
 */

type Bucket = { count: number; resetAt: number };

const g = globalThis as unknown as { __fypRate?: Map<string, Bucket> };
const store: Map<string, Bucket> = (g.__fypRate ??= new Map());

// Opportunistic cleanup so the Map can't grow unbounded across a long-lived instance.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of store) {
    if (b.resetAt <= now) store.delete(key);
  }
}

export type RateResult = { ok: boolean; remaining: number; retryAfterSec: number };

/**
 * Records a hit for `id` in `bucket` and reports whether it's within `limit` per
 * `windowSec`. Never throws — on any internal error it fails OPEN (allows the request)
 * so a limiter bug can never take down the funnel.
 */
export function rateLimit(
  bucket: string,
  id: string,
  limit: number,
  windowSec: number,
): RateResult {
  try {
    const now = Date.now();
    sweep(now);
    const key = `${bucket}:${id}`;
    const existing = store.get(key);
    if (!existing || existing.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + windowSec * 1000 });
      return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
    }
    existing.count += 1;
    if (existing.count > limit) {
      return { ok: false, remaining: 0, retryAfterSec: Math.ceil((existing.resetAt - now) / 1000) };
    }
    return { ok: true, remaining: limit - existing.count, retryAfterSec: 0 };
  } catch {
    return { ok: true, remaining: limit, retryAfterSec: 0 };
  }
}

/** Best-effort client IP from the proxy chain. Falls back to a shared bucket. */
export function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Convenience guard for route handlers. Returns a 429 NextResponse when the caller is
 * over the limit, or `null` to proceed. Usage:
 *
 *   const limited = enforceRateLimit(req, "score", 30, 60);
 *   if (limited) return limited;
 */
export function enforceRateLimit(
  req: NextRequest,
  bucket: string,
  limit: number,
  windowSec: number,
  id?: string,
): NextResponse | null {
  const res = rateLimit(bucket, id ?? clientIp(req), limit, windowSec);
  if (res.ok) return null;
  return NextResponse.json(
    { error: "Too many requests — slow down and try again in a moment." },
    { status: 429, headers: { "Retry-After": String(res.retryAfterSec) } },
  );
}
