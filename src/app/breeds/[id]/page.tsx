import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBreedById, BREEDS } from "@/data/breeds";
import type { Breed } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreedPhoto } from "@/components/breeds/BreedPhoto";
import { BreedProfile } from "@/components/breeds/BreedProfile";
import { AffiliateCard } from "@/components/affiliates/AffiliateCard";
import { getPartner } from "@/lib/affiliates";
import { computeCostComparison, formatMoney } from "@/lib/cost";
import { ArrowRight, Wallet, HeartHandshake, Scissors, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return BREEDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const breed = getBreedById(id);
  if (!breed) return { title: "Breed not found" };
  const title = `${breed.name} — temperament, cost & who it's for`;
  const description = breed.vibe_summary || breed.description?.slice(0, 150) || `What it's like to live with a ${breed.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/breeds/${breed.id}` },
    openGraph: { title, description, type: "article", images: breed.image_url ? [breed.image_url] : [] },
    twitter: { card: "summary_large_image", title, description, images: breed.image_url ? [breed.image_url] : [] },
  };
}

const TRAIT_FIELDS: { key: keyof Breed; label: string }[] = [
  { key: "energy_level", label: "Energy" },
  { key: "exercise_needs", label: "Exercise needs" },
  { key: "apartment_friendly", label: "Apartment-friendly" },
  { key: "novice_friendly", label: "First-owner friendly" },
  { key: "trainability", label: "Trainability" },
  { key: "affection_level", label: "Affection" },
  { key: "kid_friendly", label: "Kid-friendly" },
  { key: "dog_friendly", label: "Dog-friendly" },
  { key: "alone_tolerance", label: "OK alone" },
  { key: "grooming_needs", label: "Grooming needs" },
  { key: "shedding_level", label: "Shedding" },
  { key: "barking_level", label: "Barking" },
];

export default async function BreedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const breed = getBreedById(id);
  if (!breed) notFound();

  // Static, budget-agnostic cost read — the same engine the paid result uses.
  const cost = computeCostComparison({} as OnboardingData, breed, null);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/breeds">All breeds</Link>
        </Button>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl">
        <BreedPhoto breed={breed} className="h-64 w-full sm:h-80" priority scrim />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {breed.tags?.slice(0, 4).map((t) => (
              <Badge key={t} variant="primary">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">{breed.name}</h1>
          <p className="text-sm text-white/80">
            {breed.group} group · {breed.size}
            {breed.weight_lbs ? ` · ~${breed.weight_lbs} lbs` : ""}
            {breed.lifespan_years ? ` · ${breed.lifespan_years}-yr lifespan` : ""}
          </p>
        </div>
      </div>

      {breed.vibe_summary && <p className="mt-5 text-lg font-medium leading-snug">{breed.vibe_summary}</p>}

      <div className="mt-5">
        <BreedProfile breed={breed} />
      </div>

      {/* Traits */}
      <h2 className="mt-8 text-lg font-bold tracking-tight">The scorecard</h2>
      <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {TRAIT_FIELDS.map((f) => {
          const v = (breed[f.key] as number) ?? 50;
          return (
            <div key={f.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{f.label}</span>
                <span className="font-semibold tabular-nums">{v}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))]"
                  style={{ width: `${Math.max(3, Math.min(100, v))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost of ownership — the honest-numbers deep-dive */}
      <div className="mt-6 rounded-xl glass p-5">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Wallet className="size-4 text-accent" /> What a {breed.name} actually costs
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <CostStat label="Per month" v={formatMoney(cost.monthlyCost)} />
          <CostStat label="First year, adopted" v={formatMoney(cost.firstYearAdopted)} />
          <CostStat label={`Lifetime (~${cost.lifespanYears} yrs)`} v={formatMoney(cost.lifetimeCost)} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary">
            <HeartHandshake className="size-3" /> Adopting saves ~{formatMoney(cost.adoptionSavings)} vs. a breeder
          </Badge>
          {cost.needsProGrooming && (
            <Badge variant="outline">
              <Scissors className="size-3" /> Budget for professional grooming
            </Badge>
          )}
          {cost.insuranceRecommended && (
            <Badge variant="outline">
              <ShieldCheck className="size-3" /> Pet insurance strongly recommended
            </Badge>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Directional estimate — food, grooming, insurance, and routine vet care vary by city and by the individual dog.
        </p>
      </div>

      {/* Adopt-first nudge */}
      {(breed.shelter_availability ?? 0) >= 50 && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
          <HeartHandshake className="mt-0.5 size-5 shrink-0 text-secondary" />
          <div>
            <p className="text-sm font-semibold">
              {breed.name}s (and close mixes) show up in shelters {(breed.shelter_availability ?? 0) >= 85 ? "all the time" : "regularly"}.
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Check rescues near you before you call a breeder — same dog, a fraction of the cost, one saved life.
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-2 -ml-2">
              <Link href="/adopt">
                Find one near you <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Gear up — contextual affiliate CTAs */}
      <h2 className="mt-8 text-lg font-bold tracking-tight">Set up life with a {breed.name}</h2>
      <div className="mt-3 flex flex-col gap-2">
        {["chewy", "lemonade-pet", "goodpup", "barkbox"].map((pid) => {
          const partner = getPartner(pid);
          return partner ? (
            <AffiliateCard key={pid} partner={partner} runId="" placement={`breed:${breed.id}`} />
          ) : null;
        })}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Some links are partner links — we may earn a commission at no cost to you.
      </p>

      {/* CTA */}
      <div className="bg-aurora mt-8 rounded-2xl border border-primary/30 p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">Is the {breed.name} YOUR breed?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Take the 60-second quiz and see how well it actually fits your life — and what beats it.
        </p>
        <Button asChild variant="gradient" size="lg" className="mt-4">
          <Link href="/start">
            Find my breed <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}

function CostStat({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <div className="text-lg font-bold tabular-nums">{v}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
