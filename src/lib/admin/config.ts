import "server-only";
import { isLemonSqueezyConfigured, isStripeConfigured, activePaymentProvider } from "@/lib/pricing";
import { isEmailConfigured } from "@/lib/server/email";

/**
 * Integration health for /admin/system — a server-side read of WHICH integrations are
 * wired, never their secret values. Purely presence checks (Boolean of env), so it's
 * safe to render in the admin. This is the panel that makes a missing-config problem
 * (e.g. Supabase not set → paid unlocks can't persist) obvious at a glance.
 */

export type IntegrationStatus = {
  key: string;
  name: string;
  configured: boolean;
  /** true = the funnel/paid path is broken or blind without it. */
  critical: boolean;
  detail: string;
  fix?: string;
};

function has(...vars: string[]): boolean {
  return vars.every((v) => Boolean(process.env[v]));
}

export function integrationStatuses(): IntegrationStatus[] {
  const supabase = has("NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY");
  const provider = activePaymentProvider();

  return [
    {
      key: "supabase",
      name: "Supabase (database)",
      configured: supabase,
      critical: true,
      detail: supabase
        ? "Runs, unlocks, emails and analytics persist durably and are shared across instances."
        : "Not configured — runs and paid-unlock state live only in memory per instance, so a webhook unlock on one server is invisible to the results page on another. Paid customers stay locked out.",
      fix: supabase ? undefined : "Create the project, run migrations 0001–0004, set the 3 SUPABASE env vars, redeploy.",
    },
    {
      key: "payments",
      name: "Payments (Lemon Squeezy / Stripe)",
      configured: provider !== "dev",
      critical: true,
      detail:
        provider === "lemonsqueezy"
          ? "Live on Lemon Squeezy — hosted checkout + signature-verified webhook unlock."
          : provider === "stripe"
            ? "Live on Stripe."
            : "No payment rail live — the funnel falls back to a free dev-unlock. Nobody is charged.",
      fix: provider === "dev" ? "Set all four LEMONSQUEEZY_* env vars (incl. the webhook secret) and redeploy." : undefined,
    },
    {
      key: "email",
      name: "Resend (transactional email)",
      configured: isEmailConfigured(),
      critical: false,
      detail: isEmailConfigured()
        ? "Buyers and leads get their results link, so they can always return to a run."
        : "Not configured — the 'your results are saved' recovery email won't send, and admin resend won't work.",
      fix: isEmailConfigured() ? undefined : "Set RESEND_API_KEY and verify a sending domain; optionally EMAIL_FROM.",
    },
    {
      key: "meta",
      name: "Meta Pixel + Conversions API",
      configured: has("NEXT_PUBLIC_META_PIXEL_ID", "META_CAPI_TOKEN"),
      critical: false,
      detail: has("NEXT_PUBLIC_META_PIXEL_ID", "META_CAPI_TOKEN")
        ? "Client Pixel + server CAPI both fire, deduped — ad optimization has signal."
        : "Partial or off — you'd be running ads blind without deduped purchase signal.",
      fix: has("NEXT_PUBLIC_META_PIXEL_ID", "META_CAPI_TOKEN") ? undefined : "Set NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_TOKEN before the first ad.",
    },
    {
      key: "anthropic",
      name: "Anthropic (AI parsing + Content Studio)",
      configured: has("ANTHROPIC_API_KEY"),
      critical: false,
      detail: has("ANTHROPIC_API_KEY")
        ? "Richer AI-profile parsing on Path A, and the Content Studio can generate carousels + ads."
        : "Not set — Path A falls back to the deterministic heuristic, and Content Studio generation is disabled.",
      fix: has("ANTHROPIC_API_KEY") ? undefined : "Set ANTHROPIC_API_KEY to enable AI parsing and Content Studio generation.",
    },
    {
      key: "site_url",
      name: "Canonical site URL",
      configured: has("NEXT_PUBLIC_SITE_URL"),
      critical: false,
      detail: has("NEXT_PUBLIC_SITE_URL")
        ? "Checkout redirects, OG images, canonical URLs and emails resolve to the real domain."
        : "Falls back to the default domain — fine if that's correct, but set it to be safe.",
      fix: has("NEXT_PUBLIC_SITE_URL") ? undefined : "Set NEXT_PUBLIC_SITE_URL=https://findyourplace.app.",
    },
  ];
}

/** Which of the two payment rails is active — surfaced in system + overview. */
export function paymentSummary() {
  return {
    provider: activePaymentProvider(),
    lemonSqueezy: isLemonSqueezyConfigured(),
    stripe: isStripeConfigured(),
  };
}
