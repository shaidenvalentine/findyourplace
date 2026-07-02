import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Find Your Place handles your data.",
  alternates: { canonical: "/privacy" },
};

/**
 * Plain-language privacy policy. Drafted to match how the product ACTUALLY works
 * (see CLAUDE.md guardrails: AI-profile text is processed server-side, never logged,
 * raw text never persisted). Founder should review before/at launch.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-24">
      <header className="flex h-14 items-center">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <h1 className="mt-8 text-3xl font-light tracking-[-0.02em] sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective July 2, 2026 · findyourplace.app</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
        <section>
          <h2>What we collect</h2>
          <p className="mt-2">
            <span className="font-medium text-foreground">Quiz answers.</span> Your responses (climate,
            budget, lifestyle preferences, and similar) are used to compute your match and are stored
            with your results so your link keeps working.
          </p>
          <p className="mt-2">
            <span className="font-medium text-foreground">Pasted profile text (optional).</span> If you
            choose the AI-profile or in-your-own-words path, the text you paste is processed on our
            servers only to extract the preferences that drive your match. We do not log its contents
            and we do not store the raw text — only the structured preferences it produced.
          </p>
          <p className="mt-2">
            <span className="font-medium text-foreground">Email address.</span> Collected before checkout
            so we can send you your results link and occasional emails about your match. You can opt out
            anytime via the link in any email or by contacting us.
          </p>
          <p className="mt-2">
            <span className="font-medium text-foreground">Payments.</span> Handled entirely by our payment
            processors (Lemon Squeezy / Stripe). We never see or store your card details.
          </p>
          <p className="mt-2">
            <span className="font-medium text-foreground">Usage analytics.</span> We may measure funnel
            events (e.g. quiz started, results viewed) to improve the product, including via the Meta
            Pixel and Conversions API when enabled.
          </p>
        </section>

        <section>
          <h2>What we never do</h2>
          <p className="mt-2">
            We never scrape your social accounts, never analyze photos or faces, and never sell your
            personal information. All signal comes from what you deliberately give us.
          </p>
        </section>

        <section>
          <h2>Where data lives</h2>
          <p className="mt-2">
            Results and emails are stored with our infrastructure providers (Vercel, Supabase).
            Transactional email may be delivered via Resend. Each processes data on our behalf under
            their own security terms.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p className="mt-2">
            Want your data deleted? Email us and we&apos;ll remove your runs and email address. Results
            links are private to whoever holds the URL — share them intentionally.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p className="mt-2">
            Questions or requests:{" "}
            <a className="text-foreground underline underline-offset-4" href="mailto:hello@findyourplace.app">
              hello@findyourplace.app
            </a>
            . We may update this policy as the product evolves; the effective date above always reflects
            the current version.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link className="underline underline-offset-4 hover:text-foreground" href="/terms">
          Terms of Service
        </Link>
        {" · "}
        <Link className="underline underline-offset-4 hover:text-foreground" href="/">
          findyourplace.app
        </Link>
      </p>
    </main>
  );
}
