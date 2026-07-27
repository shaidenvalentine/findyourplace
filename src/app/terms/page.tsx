import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { PRICE_LABEL } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Find Your Dog, including our refund policy.",
  alternates: { canonical: "/terms" },
};

/**
 * Plain-language terms incl. the refund policy the paywall promises. Founder should
 * review before/at launch.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-24">
      <header className="flex h-14 items-center">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <h1 className="mt-8 text-3xl font-light tracking-[-0.02em] sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective July 2, 2026 · findyourdog.app</p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
        <section>
          <h2>What Find Your Dog is</h2>
          <p className="mt-2">
            Find Your Dog scores curated dog breeds against the preferences you provide and shows you
            how well each fits your life. The free experience includes your lifestyle read and an honest
            score for the breed you think you want; a one-time purchase ({PRICE_LABEL}) unlocks your #1
            match, the full ranking, and links to adoptable dogs near you.
          </p>
        </section>

        <section>
          <h2>Not professional advice</h2>
          <p className="mt-2">
            Our scores, breed traits, cost estimates, and care notes are directional, general-purpose
            information — not veterinary, behavioral, or legal advice. Every individual dog is its own
            animal (rescues especially), and breed tendencies are averages, not guarantees. Before
            adopting or making health and training decisions, consult the shelter, a vet, or a qualified
            trainer for your specific case.
          </p>
        </section>

        <section>
          <h2>Purchases &amp; refunds</h2>
          <p className="mt-2">
            The unlock is a one-time digital purchase, delivered instantly, processed by Lemon Squeezy
            or Stripe. <span className="font-medium text-foreground">7-day refund promise:</span> if
            you&apos;re not blown away, email us within 7 days of purchase and we&apos;ll refund you in
            full — no forms, no hoops.
          </p>
        </section>

        <section>
          <h2>Fair use</h2>
          <p className="mt-2">
            Don&apos;t abuse the service: no scraping our dataset at scale, reselling results, attacking
            the site, or misrepresenting your affiliation with us. Results links are for personal use
            and sharing with people you choose.
          </p>
        </section>

        <section>
          <h2>Ours &amp; yours</h2>
          <p className="mt-2">
            The scoring engine, dataset curation, design, and brand are ours. Your inputs remain yours —
            we use them only to produce and improve your results as described in the{" "}
            <Link className="text-foreground underline underline-offset-4" href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2>The boring-but-necessary part</h2>
          <p className="mt-2">
            The service is provided &quot;as is&quot; without warranties of any kind. To the maximum
            extent permitted by law, our total liability for any claim related to the service is limited
            to the amount you paid us. We may update these terms; continued use after changes means
            acceptance, and the effective date above always reflects the current version.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p className="mt-2">
            <a className="text-foreground underline underline-offset-4" href="mailto:hello@findyourdog.app">
              hello@findyourdog.app
            </a>
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link className="underline underline-offset-4 hover:text-foreground" href="/privacy">
          Privacy Policy
        </Link>
        {" · "}
        <Link className="underline underline-offset-4 hover:text-foreground" href="/">
          findyourdog.app
        </Link>
      </p>
    </main>
  );
}
