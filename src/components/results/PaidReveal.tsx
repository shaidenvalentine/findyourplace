"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RankedBreed } from "@/lib/run";
import type { AdoptionPlan } from "@/lib/adoptionPlan";
import { FirstWeekPlan } from "./FirstWeekPlan";
import { getBreedById } from "@/data/breeds";
import { formatMoney } from "@/lib/cost";
import type { Breed } from "@/lib/scoring";
import { Check, Trophy, Coins, Heart, PawPrint, ChevronDown, ExternalLink, ListChecks, ShieldCheck } from "lucide-react";

export function PaidReveal({ ranking, adoptionPlan }: { ranking: RankedBreed[]; adoptionPlan: AdoptionPlan | null }) {
  const top = ranking[0];
  return (
    <div className="flex flex-col gap-5">
      <TopMatchHero breed={top} />
      {adoptionPlan && <BringThemHome plan={adoptionPlan} topName={top.name} />}
      <FirstWeekPlan breed={top} />
      <CostDeepDive breed={top} />
      <FullRanking ranking={ranking} />
    </div>
  );
}

/**
 * Placeholder visual — no breed photos exist yet (image_url is null across the dataset),
 * so we always guard the <img> and fall back to an elegant paw tile on the brand stage.
 */
function BreedTile({
  breed,
  className,
  emojiClass = "text-2xl",
}: {
  breed: Breed | undefined;
  className: string;
  emojiClass?: string;
}) {
  if (breed?.image_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={breed.image_url} alt={breed.name} className={`${className} object-cover`} />;
  }
  return (
    <div className={`${className} hero-stage grid place-items-center`}>
      <span className={`${emojiClass} select-none`} aria-hidden>
        🐾
      </span>
    </div>
  );
}

function TopMatchHero({ breed }: { breed: RankedBreed }) {
  const b = getBreedById(breed.id);
  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-primary/30">
      {/* Stage hero — a photo when we have one, the brand stage with a big paw otherwise */}
      <div className="hero-stage relative">
        {b?.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.image_url} alt={breed.name} className="h-56 w-full object-cover" />
        ) : (
          <div className="grid h-56 w-full place-items-center">
            <span className="select-none text-7xl drop-shadow" aria-hidden>
              🐕
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,hsl(210_40%_8%/0.75),transparent)] p-5">
          <Badge variant="primary" className="mb-2 w-fit">
            <Trophy className="size-3" /> Your #1 match
          </Badge>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow sm:text-4xl">
            {breed.name}
          </h2>
          <p className="text-sm text-white/80">
            {breed.group} group · {breed.size}
          </p>
        </div>
        <div className="glass-dark absolute right-4 top-4 rounded-2xl px-4 py-2.5 text-center">
          <div className="text-3xl font-light tabular-nums leading-none tracking-tight text-white">
            {breed.totalScore}
          </div>
          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/70">match</div>
        </div>
      </div>

      <div className="bg-card p-5">
        {b?.vibe_summary && <p className="mb-4 text-sm text-muted-foreground">{b.vibe_summary}</p>}
        {breed.reasons.length > 0 && (
          <ul className="flex flex-col gap-2">
            {breed.reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}
        {breed.tradeoffs.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            <span className="font-semibold">Worth knowing:</span> {breed.tradeoffs.join(" · ")}
          </p>
        )}
        {b && (
          <div className="mt-5 border-t border-border pt-5">
            <BreedProfile breed={b} />
          </div>
        )}
      </div>
    </div>
  );
}

/** At-a-glance breed stats — the profile block under the hero. */
function BreedProfile({ breed }: { breed: Breed }) {
  const stats: { label: string; value: string }[] = [
    breed.weight_lbs !== null ? { label: "Typical weight", value: `~${breed.weight_lbs} lbs` } : null,
    breed.lifespan_years !== null ? { label: "Lifespan", value: `~${breed.lifespan_years} yrs` } : null,
    breed.energy_level !== null ? { label: "Energy", value: levelWord(breed.energy_level) } : null,
    breed.grooming_needs !== null ? { label: "Grooming", value: levelWord(breed.grooming_needs) } : null,
    breed.shedding_level !== null ? { label: "Shedding", value: levelWord(breed.shedding_level) } : null,
    breed.trainability !== null ? { label: "Trainability", value: levelWord(breed.trainability) } : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      {breed.hypoallergenic && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 shrink-0 text-success" /> Considered hypoallergenic — one of the safer picks
          for allergy households.
        </p>
      )}
      {breed.description && <p className="mt-3 text-sm text-muted-foreground">{breed.description}</p>}
    </div>
  );
}

function levelWord(v: number): string {
  if (v >= 80) return "Very high";
  if (v >= 60) return "High";
  if (v >= 40) return "Moderate";
  if (v >= 20) return "Low";
  return "Very low";
}

/**
 * "Bring them home" — the paid adoption layer, and the heart of the product: getting
 * shelter dogs adopted. Live search links near the user, the shelter-common breeds from
 * their OWN ranking, the questions to ask, and honest breeder notes when they asked.
 */
function BringThemHome({ plan, topName }: { plan: AdoptionPlan; topName: string }) {
  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-accent/30">
      <div className="hero-stage p-5 text-white">
        <Badge variant="accent" className="mb-2 w-fit">
          <Heart className="size-3" /> Bring them home
        </Badge>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
          Where your {topName} is waiting{plan.location ? ` near ${plan.location}` : ""}
        </h2>
        <p className="mt-2 text-sm text-white/75">{plan.availabilityNote}</p>
      </div>

      <div className="flex flex-col gap-5 bg-card p-5">
        {/* Live search links */}
        <div>
          <h3 className="mb-2 text-sm font-semibold">Start the search today</h3>
          <div className="flex flex-col gap-2">
            {plan.sources.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl glass p-4 transition-colors hover:border-primary/40"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <PawPrint className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 font-semibold">
                    {s.name}
                    <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{s.note}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Shelter-common alternates from their own ranking */}
        {plan.shelterAlternates.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold">Also in your top matches — and common in shelters</h3>
            <p className="mb-2 text-xs text-muted-foreground">
              If the perfect {topName} doesn&apos;t show up this month, these scored nearly as well for you and are
              genuinely findable near you.
            </p>
            <div className="flex flex-col gap-1.5">
              {plan.shelterAlternates.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2">
                  <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums text-muted-foreground">
                    #{a.rank}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">{a.name}</span>
                  <span className="shrink-0 text-sm font-bold tabular-nums">{a.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checklist */}
        <div>
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
            <ListChecks className="size-4 text-primary" /> Ask before you say yes
          </h3>
          <ul className="flex flex-col gap-2">
            {plan.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Breeder notes — only when the user asked for the breeder path */}
        {plan.breederNotes.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="mb-2 text-sm font-semibold">If you go the breeder route</h3>
            <ul className="flex flex-col gap-2">
              {plan.breederNotes.map((n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function CostDeepDive({ breed }: { breed: RankedBreed }) {
  const b = getBreedById(breed.id);
  if (!b) return null;
  const monthly = b.monthly_cost_usd ?? 140;
  const lifespan = b.lifespan_years ?? 12;
  const rows = [
    { label: "Monthly care", value: `${formatMoney(monthly)}/mo` },
    { label: "Per year", value: formatMoney(monthly * 12) },
    { label: `Over ~${lifespan} yrs`, value: formatMoney(monthly * 12 * lifespan) },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Coins className="size-4 text-accent" /> Cost of ownership — {breed.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {rows.map((r) => (
            <div key={r.label} className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{r.value}</div>
              <div className="text-[11px] text-muted-foreground">{r.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Food, grooming, insurance, and routine vet care at typical national prices
          {(b.grooming_needs ?? 0) > 65 ? " — including the professional grooming this coat needs" : ""}. Adopting
          also skips the purchase price entirely; the fee usually covers spay/neuter, first shots, and a microchip.
        </p>
      </CardContent>
    </Card>
  );
}

function FullRanking({ ranking }: { ranking: RankedBreed[] }) {
  // Start tight — the page above is already dense. Top 10 tells the story; the rest expands.
  const [limit, setLimit] = useState(10);
  const shown = ranking.slice(0, limit);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PawPrint className="size-4 text-primary" /> Full ranking — all {ranking.length} breeds
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        {shown.map((r) => {
          const b = getBreedById(r.id);
          return (
            <div key={r.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/40">
              <span className="w-6 shrink-0 text-right text-sm font-semibold tabular-nums text-muted-foreground">
                {r.rank}
              </span>
              <BreedTile breed={b} className="size-9 shrink-0 overflow-hidden rounded-md" emojiClass="text-sm" />
              <span className="min-w-0 flex-1 truncate">
                <span className="font-medium">{r.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {r.group} · {r.size}
                </span>
              </span>
              <span className="shrink-0 text-sm font-bold tabular-nums">{r.totalScore}</span>
            </div>
          );
        })}
        {limit < ranking.length && (
          <button
            onClick={() => setLimit((l) => (l === 10 ? 50 : l + 100))}
            className="mt-2 flex items-center justify-center gap-1 rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:bg-muted/40"
          >
            Show {limit === 10 ? "top 50" : "more"} <ChevronDown className="size-4" />
          </button>
        )}
      </CardContent>
    </Card>
  );
}
