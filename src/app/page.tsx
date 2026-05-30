import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LiveCounter } from "@/components/marketing/LiveCounter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOCATION_COUNT } from "@/data/locations";
import { ArrowRight, Sparkles, Globe2, Lock, Compass, Quote } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link href="/start">Start</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-aurora relative overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-14 sm:pt-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge variant="primary" className="mb-5 animate-fade-in">
              <Sparkles className="size-3" /> The reel made you curious. This answers it.
            </Badge>
            <h1 className="animate-fade-up text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Find the place that
              <br />
              <span className="text-gradient">actually fits you.</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              I chose Bali after months of agonizing. You can skip the agonizing. Answer a few
              questions — or let your own AI describe you — and our engine ranks{" "}
              <span className="font-semibold text-foreground">{LOCATION_COUNT} cities & islands</span>{" "}
              by how well they fit your life.
            </p>

            <div className="animate-fade-up mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                <Link href="/start">
                  Find my place <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              30 seconds · no signup to start · <LiveCounter /> people matched
            </p>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <figure className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-8">
          <Quote className="size-6 text-primary" />
          <blockquote className="mt-3 text-pretty text-lg font-medium leading-relaxed">
            “Everyone kept asking me <em>how</em> I knew Bali was right. The honest answer is I
            built a system to figure it out — and then I turned it into this.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">— the founder</figcaption>
        </figure>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Two ways in. One engine.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          Both paths feed the same deterministic 10-dimension scoring engine.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <FeatureCard
            icon={<Sparkles className="size-5" />}
            kicker="Hero path"
            title="Let your AI describe you"
            body="Copy one prompt into your own ChatGPT or Claude. It writes an honest profile from everything it knows about you. Paste it back — we read it and score you. No quiz fatigue."
          />
          <FeatureCard
            icon={<Compass className="size-5" />}
            kicker="Classic path"
            title="Take the quick quiz"
            body="A fast, tap-through quiz across the dimensions that actually move your match — climate, cost, community, safety, taxes, and more. Done before your coffee's cold."
          />
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={<Globe2 className="size-5" />} stat={`${LOCATION_COUNT}`} label="curated cities & islands, scored across 10 life dimensions" />
          <StatCard icon={<Compass className="size-5" />} stat="10" label="dimensions: climate, cost, safety, community, taxes, wellness & more" />
          <StatCard icon={<Lock className="size-5" />} stat="#1" label="your top match revealed — plus a current-city fit score, free" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-aurora relative">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your place is on the list.
            <br />
            <span className="text-gradient">Let&apos;s find which one.</span>
          </h2>
          <Button asChild size="lg" variant="gradient" className="mt-7">
            <Link href="/start">
              Find my place <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} Find Your Place. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  kicker,
  title,
  body,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <Badge variant="outline" className="mb-2">
        {kicker}
      </Badge>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function StatCard({ icon, stat, label }: { icon: React.ReactNode; stat: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <div className="mx-auto mb-3 grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary">
        {icon}
      </div>
      <div className="text-3xl font-extrabold tracking-tight">{stat}</div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
