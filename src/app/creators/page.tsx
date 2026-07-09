import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Wallet, Link as LinkIcon, BarChart3 } from "lucide-react";
import { PRICE_LABEL, PRICE_CENTS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Founding Creators · Find Your Place",
  description:
    "Bring your audience. Keep 50% of every unlock — for life. Real-time dashboard, monthly payouts.",
};

export default function CreatorsLanding() {
  return (
    <main className="flex flex-col">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/portal/login">Sign in</Link>
            </Button>
            <Button asChild variant="gradient" size="sm">
              <Link href="/portal/signup">Become a creator</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-aurora relative overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-20 sm:pt-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" /> Founding Creators · Open program
            </div>

            <h1 className="text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              Bring your people.
              <br />
              <span className="text-gradient">Keep 50%.</span>
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Find Your Place is the quiz that finds the one place on Earth that actually fits you.
              Promote it to your audience and earn ${(PRICE_CENTS / 200).toFixed(2)} of every {PRICE_LABEL} unlock — for life.
            </p>

            <Button asChild size="lg" variant="gradient" className="mt-10 w-full sm:w-auto">
              <Link href="/portal/signup">
                Become a creator <ArrowRight className="size-4" />
              </Link>
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">No application · Instant access · Real-time dashboard</p>
          </div>
        </div>
      </section>

      {/* The deal */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-5xl">The deal is simple.</h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <DealCard
            icon={<LinkIcon className="size-5" />}
            title="Your own link"
            body="findyourplace.app/c/yourcode — co-branded, with your name at the top. Plus a custom promo code for places that don't allow links."
          />
          <DealCard
            icon={<Wallet className="size-5" />}
            title="50% of every sale"
            body={`$${(PRICE_CENTS / 200).toFixed(2)} to you, paid monthly via Wise. Full transparency — see every conversion in real time.`}
          />
          <DealCard
            icon={<BarChart3 className="size-5" />}
            title="Real dashboard"
            body="Clicks, conversions, earnings, top-performing days. Watch your money move in real time."
          />
        </div>
      </section>

      {/* Why join */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-5xl">
            Built for creators who get it.
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Why title="Lifetime attribution">
              30-day cookie window. Whoever you sent stays yours when they buy — even three weeks later.
            </Why>
            <Why title="No quotas, no minimums">
              Make your video your way. We don&apos;t dictate the script, hashtags, or upload schedule.
            </Why>
            <Why title="Founding Creators wall">
              You get listed on findyourplace.app as a founding voice. Lifelong credit, not just a kickback.
            </Why>
            <Why title="It compounds">
              Your old videos keep earning. Every link, every promo code is forever yours.
            </Why>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-aurora relative">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
          <h2 className="text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl">
            Join the first wave.
            <br />
            <span className="text-gradient">Earn forever.</span>
          </h2>
          <Button asChild size="lg" variant="gradient" className="mt-10">
            <Link href="/portal/signup">
              Become a creator <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already onboard? <Link href="/portal/login" className="underline">Sign in</Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground">
          <Logo />
          <Users className="size-4" />
        </div>
      </footer>
    </main>
  );
}

function DealCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl glass p-8">
      <div className="mb-5 grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">{icon}</div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Why({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl glass p-6">
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
