import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LiveCounter } from "@/components/marketing/LiveCounter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Camera, Home, Route, Globe2, Percent, Landmark, Plane, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Logo />
          <Button asChild variant="gradient" size="sm">
            <Link href="/start">Start</Link>
          </Button>
        </div>
      </header>

      {/* Hero — editorial title + a floating glass product panel over a rich stage */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-24">
          {/* Left — the promise */}
          <div className="animate-fade-up">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Where you actually belong
            </span>
            <h1 className="mt-5 text-balance text-5xl font-light leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.75rem]">
              The biggest decision you{" "}
              <span className="italic font-normal">haven&apos;t</span> made yet.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Where you live decides your money, your people, your health. We match you against 250 of
              the best places on Earth — and reveal the one that fits.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                <Link href="/start">
                  Find my place <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                60 seconds · free to start · <LiveCounter /> matched
              </p>
            </div>
          </div>

          {/* Right — the product, as floating glass over the hero image */}
          <HeroPreview />
        </div>
      </section>

      {/* Stakes — three big claims, no walls of text */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-light leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          You don&apos;t pick a city.
          <br />
          A city <span className="text-gradient">picks you.</span>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Stake stat="6×" body="The same income can mean 6× the lifestyle — or 6× less — depending on where you spend it." />
          <Stake stat="$54k" body="Move from a 45% tax country to a 0% one and a $120k salary keeps roughly $54k more a year." />
          <Stake stat="One" body="Where you live decides who you meet. Your friends, your partner, your future — all downstream of one decision." />
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat icon={<Landmark className="size-5" />} value="15+" label="0% tax countries" />
            <Stat icon={<Percent className="size-5" />} value="0–55%" label="global tax range" />
            <Stat icon={<Plane className="size-5" />} value="50+" label="nomad visas" />
            <Stat icon={<Globe2 className="size-5" />} value="250" label="best places on Earth" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-light tracking-[-0.03em] sm:text-5xl">
          One minute to your match.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Step n={1} title="Tell us who you are." body="A few quick answers — or paste a profile your own AI wrote about you." />
          <Step n={2} title="See your fit." body="Your current city, scored honestly. The gap to your real best place, free." />
          <Step n={3} title="Unlock your place." body="The name. The full ranking of all 250. The plan to actually get there." />
        </div>
      </section>

      {/* Comparison tease */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mx-auto max-w-lg rounded-2xl glass p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            A glimpse
          </p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <Compare label="Where you live" value={61} muted />
            <ArrowRight className="size-7 shrink-0 text-muted-foreground" />
            <Compare label="The place that fits" value={94} />
          </div>
          <p className="mt-6 text-center text-base text-muted-foreground">
            The gap is free. The <span className="font-semibold text-foreground">name</span> is the reveal.
          </p>
        </div>
      </section>

      {/* Founder story — the reel hook, in the product */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-3xl px-4 py-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why this exists
          </p>
          <blockquote className="mt-6 text-balance text-center text-2xl font-light leading-snug tracking-[-0.02em] sm:text-3xl">
            &ldquo;I spent two years and a small fortune figuring out that Bali fit me. You shouldn&apos;t
            have to guess, move, and hope. So I built the engine I wish I&apos;d had — and pointed it at
            250 of the best places on Earth.&rdquo;
          </blockquote>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            — the founder, <a href="https://instagram.com/findyourplace.ai" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">@findyourplace.ai</a>
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="gradient">
              <Link href="/start">
                Find my place <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-light tracking-[-0.03em] sm:text-4xl">
          People are finding theirs.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Quote
            body="It named a city I'd never have picked — and it was so obviously right I booked a scouting trip that week."
            name="Maya R."
            place="now in Lisbon"
          />
          <Quote
            body="The current-city score was brutally accurate. That's when I knew the #1 was worth unlocking."
            name="Devin K."
            place="now in Medellín"
          />
          <Quote
            body="Did the AI-profile version. The read-back felt like it had known me for years. Then it nailed the place."
            name="Priya S."
            place="now in Da Nang"
          />
        </div>
      </section>

      {/* Rooted or nomadic */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-light tracking-[-0.03em] sm:text-5xl">
          One home, or the whole world?
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <ModeCard
            icon={<Home className="size-5" />}
            iconClass="bg-secondary/15 text-secondary"
            title="Rooted"
            body="We pinpoint the single best place on Earth for you to put down roots."
          />
          <ModeCard
            icon={<Route className="size-5" />}
            iconClass="bg-primary/15 text-primary"
            title="Nomadic"
            body="We design a year-round circuit across multiple places that follows your ideal weather."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-aurora relative">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
          <h2 className="text-balance text-4xl font-light leading-[1.0] tracking-[-0.03em] sm:text-6xl">
            Your place is out there.
            <br />
            <span className="text-gradient">Let&apos;s find which one.</span>
          </h2>
          <Button asChild size="lg" variant="gradient" className="mt-10">
            <Link href="/start">
              Find my place <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/findyourplace.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Camera className="size-4" /> @findyourplace.ai
            </a>
            <span className="hidden sm:inline">·</span>
            <p>© {new Date().getFullYear()} findyourplace.app</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function HeroRing({ score, size = 132 }: { score: number; size?: number }) {
  const stroke = size * 0.09;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(0 0% 100% / 0.16)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(172 66% 58%)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-light tabular-nums leading-none tracking-tight">{score}</div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">match</div>
        </div>
      </div>
    </div>
  );
}

/** The hero product preview: frosted-glass panels floating over the hero image/stage. */
function HeroPreview() {
  return (
    <div className="animate-fade-up relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      {/* Rich moody stage — the depth the frosted glass refracts. */}
      <div className="hero-stage absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_30px_80px_hsl(210_40%_20%/0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,hsl(0_0%_100%/0.12),transparent_60%)]" />
      </div>

      {/* Main match card */}
      <div className="glass absolute left-4 top-6 w-52 rounded-3xl p-5 sm:left-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Your #1 match</span>
          <span className="size-2 rounded-full bg-[hsl(178_62%_44%)]" />
        </div>
        <div className="mt-3 grid place-items-center">
          <HeroRing score={94} />
        </div>
        <div className="mt-3 text-center">
          <div className="text-lg font-medium tracking-tight">Lisbon</div>
          <div className="text-xs text-muted-foreground">Europe · Iberian coast</div>
        </div>
      </div>

      {/* Current-fit satellite */}
      <div className="glass absolute right-3 top-16 w-36 rounded-2xl p-4 sm:right-6">
        <ArrowUpRight className="absolute right-3 top-3 size-3.5 text-muted-foreground/50" />
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Current city</div>
        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-light tabular-nums">61</span>
          <span className="mb-1 text-xs text-muted-foreground">/100 fit</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-foreground/70" style={{ width: "61%" }} />
        </div>
      </div>

      {/* Tax satellite */}
      <div className="glass absolute bottom-6 right-6 w-44 rounded-2xl p-4">
        <ArrowUpRight className="absolute right-3 top-3 size-3.5 text-muted-foreground/50" />
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Tax saved</div>
        <div className="mt-1 text-2xl font-light tabular-nums text-[hsl(172_66%_60%)]">≈ $54k<span className="text-sm text-muted-foreground">/yr</span></div>
        <div className="mt-2 flex items-end gap-0.5">
          {[30, 44, 38, 60, 52, 74, 68, 88].map((h, i) => (
            <span key={i} className="w-1.5 rounded-full bg-foreground/25" style={{ height: h * 0.35 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stake({ stat, body }: { stat: string; body: string }) {
  return (
    <div className="rounded-2xl glass p-8">
      <div className="text-5xl font-normal tracking-[-0.03em] text-accent sm:text-6xl">{stat}</div>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Quote({ body, name, place }: { body: string; name: string; place: string }) {
  return (
    <figure className="flex flex-col rounded-2xl glass p-6 text-left">
      <div className="mb-3 flex gap-0.5 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="flex-1 text-base leading-relaxed">&ldquo;{body}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold">{name}</span>
        <span className="text-muted-foreground"> · {place}</span>
      </figcaption>
    </figure>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <div className="text-3xl font-normal tracking-tight sm:text-4xl">{value}</div>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl glass p-8">
      <div className="mb-5 grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)))] text-base font-bold text-primary-foreground">
        {n}
      </div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function ModeCard({
  icon,
  iconClass,
  title,
  body,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl glass p-8">
      <div className={`mb-5 grid size-12 place-items-center rounded-xl ${iconClass}`}>{icon}</div>
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Compare({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <div className="flex-1 text-center">
      <div
        className={
          muted
            ? "text-5xl font-normal tabular-nums tracking-tight text-muted-foreground"
            : "text-5xl font-normal tabular-nums tracking-tight text-accent"
        }
      >
        {value}
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
    </div>
  );
}
