import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LiveCounter } from "@/components/marketing/LiveCounter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Activity,
  Compass,
  Camera,
  Home,
  Route,
  Landmark,
  Plane,
  Percent,
  Globe2,
} from "lucide-react";

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

      {/* Hero — the big idea */}
      <section className="bg-aurora relative overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-14 sm:pt-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge variant="primary" className="mb-5 animate-fade-in">
              <Sparkles className="size-3" /> Your ideal place in under a minute
            </Badge>
            <h1 className="animate-fade-up text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              The biggest decision
              <br />
              you&apos;re <span className="text-gradient">not really making.</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Where you live shapes your income, your relationships, your health — who you become.
              Yet most people end up somewhere by accident. In{" "}
              <span className="font-semibold text-foreground">under a minute</span>, we match you
              against{" "}
              <span className="font-semibold text-foreground">250 of the best places on Earth</span>{" "}
              and show you the one that fits you best — then go as deep as you want.
            </p>

            <div className="animate-fade-up mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                <Link href="/start">
                  Find my place <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Under 60 seconds · free to start · <LiveCounter /> people matched
            </p>
          </div>
        </div>
      </section>

      {/* The stakes */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-2xl font-bold tracking-tight sm:text-3xl">
          You&apos;d research a $30k car for weeks. You picked the city that decides your
          whole life on a job offer.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StakeCard
            icon={<TrendingUp className="size-5" />}
            title="Your money & career"
            body="The same work pays wildly differently — and costs wildly differently — depending on where you do it. Location is the biggest lever on your runway."
          />
          <StakeCard
            icon={<HeartHandshake className="size-5" />}
            title="Your people & dating"
            body="Who you meet, who you fall for, the friends you make — all downstream of the streets you walk every day. Place decides your circle."
          />
          <StakeCard
            icon={<Activity className="size-5" />}
            title="Your health & energy"
            body="Sunlight, walkability, food, pace, nature at your door. Your environment quietly sets your baseline mood and how you feel every morning."
          />
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
          If some part of you suspects you&apos;re in the wrong place but you don&apos;t know
          where the <em>right</em> one is — that&apos;s exactly what this finds.
        </p>
      </section>

      {/* Real stats band — the money/tax case */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Where you live decides what you keep
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile icon={<Landmark className="size-5" />} value="15+" label="countries charge 0% personal income tax" />
            <StatTile icon={<Percent className="size-5" />} value="0–55%+" label="income-tax range worldwide — same salary, very different take-home" />
            <StatTile icon={<Plane className="size-5" />} value="50+" label="countries now offer digital-nomad visas" />
            <StatTile icon={<Globe2 className="size-5" />} value="250" label="of the best places on Earth, scored on 10 life dimensions" />
          </div>
          <p className="mt-5 text-center text-[11px] text-muted-foreground">
            Move from a 45% tax country to a 0% one and a $120k income keeps ~$54k more a year.
            We&apos;ll show you your real numbers.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Fast first. Deep when you want.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          A great match in under a minute — then a deeper dive for a read that really nails you.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StepCard
            n={1}
            title="Start fast — under a minute"
            body="Let your AI describe you, drop an Instagram screenshot, or tap a few quick questions. Tell us where you live now."
          />
          <StepCard
            n={2}
            title="See your ideal place, instantly"
            body="Your top match, your current-city fit, and how your life could change — free, in seconds."
          />
          <StepCard
            n={3}
            title="Go deeper for the bullseye"
            body="The deeper-dive quiz reads who you are in detail — then unlock your #1 by name, the full 250 ranking, and your move plan."
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">
            <Sparkles className="size-3" /> Your AI describes you
          </Badge>
          <Badge variant="outline">
            <Camera className="size-3" /> Instagram vibe read
          </Badge>
          <Badge variant="outline">
            <Compass className="size-3" /> Quick quiz
          </Badge>
        </div>
      </section>

      {/* Comparison tease */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-center text-sm text-muted-foreground">A glimpse of your result</p>
          <div className="mt-5 flex items-center justify-between gap-4">
            <CompareTile label="Where you live now" value={61} muted />
            <ArrowRight className="size-6 shrink-0 text-muted-foreground" />
            <CompareTile label="The place that fits you" value={94} />
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            We show you the gap for free — your community, cost, nature, and career, side by side.
            The <span className="font-semibold text-foreground">name</span> of your place is the
            reveal.
          </p>
        </div>
      </section>

      {/* Rooted or nomadic — the circuit */}
      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <h2 className="mx-auto max-w-xl text-balance text-center text-2xl font-bold tracking-tight sm:text-3xl">
          One home, or the whole world?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          Tell us how you want to live — we match the plan to you.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary">
              <Home className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">Rooted</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Want a home base? We pinpoint the single best place on Earth for you to put down roots —
              and show you how it beats where you live now.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
              <Route className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">Nomadic</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Built to roam? We design a year-round circuit across multiple places that follows your
              ideal weather — where to be each month, and why.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-aurora relative">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your place is out there.
            <br />
            <span className="text-gradient">Let&apos;s find which one.</span>
          </h2>
          <Button asChild size="lg" variant="gradient" className="mt-7">
            <Link href="/start">
              Find my place <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Free read · unlock your #1 match for the price of lunch
          </p>
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

function StakeCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function StatTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">{value}</div>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">{label}</p>
    </div>
  );
}

function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-sm font-bold text-primary-foreground">
        {n}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function CompareTile({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="flex-1 text-center">
      <div
        className={
          muted
            ? "text-4xl font-extrabold tabular-nums text-muted-foreground"
            : "text-4xl font-extrabold tabular-nums text-gradient"
        }
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
