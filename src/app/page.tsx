import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LiveCounter } from "@/components/marketing/LiveCounter";
import { Button } from "@/components/ui/button";
import { getBreedById, BREED_COUNT } from "@/data/breeds";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Dog,
  Fingerprint,
  HeartHandshake,
  MapPin,
  PawPrint,
  Timer,
  Star,
} from "lucide-react";

/**
 * Real breeds shown on the landing page — recognizable, characterful, spread across
 * groups. Pulled from the dataset so the vibe lines are the product's own voice.
 */
const SHOWCASE_IDS = [
  "golden-retriever",
  "french-bulldog",
  "border-collie",
  "greyhound",
  "shiba-inu",
  "cavalier-king-charles-spaniel",
];

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <Logo />
          <Button asChild variant="gradient" size="sm">
            <Link href="/start">Find my dog</Link>
          </Button>
        </div>
      </header>

      {/* Hero — editorial title + a floating glass product panel over a rich stage */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-24">
          {/* Left — the promise */}
          <div className="animate-fade-up">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              The breed you&apos;re actually meant to have
            </span>
            <h1 className="mt-5 text-balance text-5xl font-light leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.75rem]">
              The wrong dog is a 12-year{" "}
              <span className="italic font-normal">mismatch</span>.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Most people pick a breed by looks. In 60 seconds we score you against {BREED_COUNT} breeds
              on 10 dimensions of your real life — then point you to that dog in shelters near you.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                <Link href="/start">
                  Find my dog <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Free to start · no signup
                <LiveCounter />
              </p>
            </div>
          </div>

          {/* Right — the product, as floating glass over the hero stage */}
          <HeroPreview />
        </div>
      </section>

      {/* Stakes — three big claims, no walls of text */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-light leading-[1.05] tracking-[-0.03em] sm:text-5xl">
          You don&apos;t just pick a dog.
          <br />
          You pick the next <span className="text-gradient">decade.</span>
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Stake stat="12+" body="Years the right dog is beside you — longer than most jobs, apartments, and relationships last." />
          <Stake stat="3M" body="Dogs enter shelters every year, many because the match was wrong. Your right dog is probably already waiting in one." />
          <Stake stat="One" body="Decision. The right breed disappears into your life. The wrong one fights your schedule, your home, and your energy every single day." />
        </div>
      </section>

      {/* Stats band — what YOU get, not trivia. Every number points into the quiz. */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-12">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat icon={<Dog className="size-5" />} value={String(BREED_COUNT)} label="breeds ranked against you" />
            <Stat icon={<Fingerprint className="size-5" />} value="10" label="dimensions of your life weighed" />
            <Stat icon={<MapPin className="size-5" />} value="Near you" label="every match links to real adoptable dogs" />
            <Stat icon={<Timer className="size-5" />} value="60s" label="to your first score — free" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-light tracking-[-0.03em] sm:text-5xl">
          One minute to your match.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Step n={1} title="Tell us how you live." body="A few quick taps — or paste a profile your own AI wrote about you." />
          <Step n={2} title="See your instinct scored." body="The breed you think you want, rated honestly against your real life. Free." />
          <Step n={3} title="Meet your match." body="The breed. The full ranking of all 170. Real adoptable dogs near you." />
        </div>
      </section>

      {/* Real breeds — the dataset is real, characterful, and one of these could be theirs. */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <h2 className="text-balance text-center text-3xl font-light tracking-[-0.03em] sm:text-5xl">
          Your dog is already on this list.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground">
          Velcro lap dogs, trail athletes, apartment comedians, gentle giants — {BREED_COUNT} real
          breeds, each scored against how you actually live.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_IDS.map((id) => {
            const b = getBreedById(id);
            if (!b) return null;
            return (
              <div key={id} className="flex flex-col rounded-2xl glass p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                    <PawPrint className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{b.name}</div>
                    <div className="text-[11px] text-muted-foreground">{b.group} · {b.size}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{b.vibe_summary}&rdquo;
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="gradient">
            <Link href="/start">
              Score me against all {BREED_COUNT} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Comparison tease */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mx-auto max-w-lg rounded-2xl glass p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            A glimpse
          </p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <Compare label="The breed you want" value={58} muted />
            <ArrowRight className="size-7 shrink-0 text-muted-foreground" />
            <Compare label="The breed that fits" value={94} />
          </div>
          <p className="mt-6 text-center text-base text-muted-foreground">
            Your instinct, scored free. The <span className="font-semibold text-foreground">name</span> is the reveal.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="gradient">
              <Link href="/start">
                Score my instinct — free <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Founder story — the reel hook, in the product */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto w-full max-w-3xl px-4 py-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why this exists
          </p>
          <blockquote className="mt-6 text-balance text-center text-2xl font-light leading-snug tracking-[-0.02em] sm:text-3xl">
            &ldquo;I almost got the wrong dog. The breed I&apos;d wanted for years would have been
            miserable in my life — and made me miserable too. Finding the right one changed
            everything. This quiz does for you what took me months of research.&rdquo;
          </blockquote>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            — Shaiden Valentine, <a href="https://instagram.com/findyourdog.ai" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">@findyourdog.ai</a>
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="gradient">
              <Link href="/start">
                Find my dog <ArrowRight className="size-4" />
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
            body="It scored the breed I'd wanted since I was a kid at 54 — and explained exactly why. The #1 it picked instead is asleep on my feet right now."
            name="Maya R."
            place="adopted a whippet"
          />
          <Quote
            body="The read on my dream breed was brutally honest. That's when I knew the #1 was worth unlocking."
            name="Devin K."
            place="adopted a greyhound mix"
          />
          <Quote
            body="Did the AI-profile version. The read-back knew my schedule better than I did. Then it found my match at a shelter twenty minutes away."
            name="Priya S."
            place="adopted a cavalier mix"
          />
        </div>
      </section>

      {/* Adopt-first + honest scoring */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <h2 className="text-center text-3xl font-light tracking-[-0.03em] sm:text-5xl">
          Matched honestly. Adopted locally.
        </h2>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <ModeCard
            icon={<Dog className="size-5" />}
            iconClass="bg-secondary/15 text-secondary"
            title="Honest scoring"
            body="We score the breed you think you want against the life you actually live — no flattery, no upsell to the cute one."
          />
          <ModeCard
            icon={<HeartHandshake className="size-5" />}
            iconClass="bg-primary/15 text-primary"
            title="Adopt-first"
            body="Every match links to real adoptable dogs in shelters near you. Your dog may already be waiting."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-aurora relative">
        <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
          <h2 className="text-balance text-4xl font-light leading-[1.0] tracking-[-0.03em] sm:text-6xl">
            Your dog is out there.
            <br />
            <span className="text-gradient">Let&apos;s find which one.</span>
          </h2>
          <Button asChild size="lg" variant="gradient" className="mt-10">
            <Link href="/start">
              Find my dog <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/findyourdog.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Camera className="size-4" /> @findyourdog.ai
            </a>
            <span className="hidden sm:inline">·</span>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <span className="hidden sm:inline">·</span>
            <p>© {new Date().getFullYear()} findyourdog.app</p>
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
          stroke="hsl(var(--accent))"
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

/**
 * The hero product preview: frosted-glass result panels floating over the moody
 * hero-stage gradient — the actual #1-match moment the product sells (the breed
 * dataset ships without photography, so the stage itself carries the depth).
 */
function HeroPreview() {
  return (
    <div className="animate-fade-up relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      {/* Stage: the moody brand gradient the glass refracts. */}
      <div className="hero-stage absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_30px_80px_hsl(210_40%_20%/0.25)]">
        {/* Scrims so the glass panels + type stay legible. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(210_30%_8%/0.55),hsl(210_30%_8%/0.15)_40%,hsl(210_30%_8%/0.62))]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,hsl(0_0%_100%/0.08),transparent_60%)]" />
      </div>

      {/* Main match card */}
      <div className="glass absolute left-4 top-6 w-52 rounded-3xl p-5 sm:left-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Your #1 match</span>
          <span className="size-2 rounded-full bg-accent" />
        </div>
        <div className="mt-3 grid place-items-center">
          <HeroRing score={94} />
        </div>
        <div className="mt-3 text-center">
          <div className="text-lg font-medium tracking-tight">Whippet</div>
          <div className="text-xs text-muted-foreground">Hound · apartment athlete</div>
        </div>
      </div>

      {/* Dream-breed satellite — the honest instinct score */}
      <div className="glass absolute right-3 top-16 w-36 rounded-2xl p-4 sm:right-6">
        <ArrowUpRight className="absolute right-3 top-3 size-3.5 text-muted-foreground/50" />
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Your instinct</div>
        <div className="mt-1 flex items-end gap-1">
          <span className="text-3xl font-light tabular-nums">58</span>
          <span className="mb-1 text-xs text-muted-foreground">/100 fit</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-foreground/70" style={{ width: "58%" }} />
        </div>
      </div>

      {/* Ranking satellite — the locked list, exactly as the product shows it. */}
      <div className="glass absolute bottom-[4.5rem] left-4 w-44 rounded-2xl p-4 sm:left-6">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Your ranking</div>
        <div className="mt-2.5 flex flex-col gap-2">
          <RankRow n={1} name="Whippet" score={94} revealed />
          <RankRow n={2} score={91} />
          <RankRow n={3} score={89} />
          <RankRow n={4} score={87} />
        </div>
      </div>

      {/* Shelter satellite */}
      <div className="glass absolute bottom-6 right-6 w-44 rounded-2xl p-4">
        <ArrowUpRight className="absolute right-3 top-3 size-3.5 text-muted-foreground/50" />
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Near you</div>
        <div className="mt-1 text-2xl font-light tabular-nums text-accent">3 dogs<span className="text-sm text-muted-foreground"> adoptable</span></div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" /> shelters within 25 miles
        </div>
      </div>
    </div>
  );
}

/** One row of the hero's mini ranking — locked rows show a redacted name bar. */
function RankRow({ n, name, score, revealed = false }: { n: number; name?: string; score: number; revealed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 text-[11px] tabular-nums text-muted-foreground">{n}</span>
      {revealed ? (
        <span className="flex-1 truncate text-xs font-medium">{name}</span>
      ) : (
        <span className="h-2 flex-1 rounded-full bg-white/20" />
      )}
      <span className={`text-xs font-medium tabular-nums ${revealed ? "text-accent" : "text-muted-foreground"}`}>
        {score}
      </span>
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
