import type { NextConfig } from "next";

/**
 * Baseline security response headers, applied to every route.
 *
 * Scope note: we deliberately set only the directives that add real protection without
 * risking a broken render. A full nonce-based `script-src` CSP is the natural next step,
 * but it requires threading a per-request nonce through the App Router and the Meta
 * Pixel, so we ship the high-value, zero-breakage headers first:
 *   - HSTS                → force HTTPS (defense against downgrade/MITM)
 *   - X-Content-Type-Options → stop MIME sniffing
 *   - Referrer-Policy     → don't leak full result URLs to third parties
 *   - Permissions-Policy  → deny sensor/geo/payment APIs we never use
 *   - X-Frame-Options + CSP frame-ancestors → clickjacking protection
 *
 * `frame-ancestors 'self'` (CSP) is the modern clickjacking control and, unlike
 * script-src, cannot break page rendering. The admin + creator portals get the stricter
 * override below so their login/payout screens can't be framed at all.
 */
const baseSecurityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: ["frame-ancestors 'self'", "base-uri 'self'", "object-src 'none'"].join("; "),
  },
];

const noFrameHeaders = [
  ...baseSecurityHeaders.filter((h) => h.key !== "X-Frame-Options" && h.key !== "Content-Security-Policy"),
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: ["frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'"].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.wikimedia.org" }, // commons.wikimedia.org, etc.
      { protocol: "https", hostname: "*.wikipedia.org" }, // en.wikipedia.org FilePath URLs
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: baseSecurityHeaders },
      // Sensitive surfaces (login, payouts, earnings) must never be framed.
      { source: "/admin/:path*", headers: noFrameHeaders },
      { source: "/portal/:path*", headers: noFrameHeaders },
    ];
  },
};

export default nextConfig;
