import type { Metadata } from "next";
import Link from "next/link";
import { BREEDS } from "@/data/breeds";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreedPhoto } from "@/components/breeds/BreedPhoto";
import { AdoptSearch } from "@/components/adopt/AdoptSearch";
import { ArrowRight, HeartHandshake, Inbox, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Adopt — find your dog at a shelter near you",
  description:
    "Adopt-first, always. Search real shelter and rescue listings near you, meet the breeds that fill shelters, and — if you run a shelter — list your dogs free.",
};

const SHELTER_EMAIL = "shelters@findyourdog.app";

export default function AdoptPage() {
  // "Shelter staples" — the breeds (and close mixes) you can realistically adopt this week.
  const staples = [...BREEDS]
    .filter((b) => (b.shelter_availability ?? 0) >= 85)
    .sort((a, b) => (b.shelter_availability ?? 0) - (a.shelter_availability ?? 0));

  const breedNames = [...BREEDS].map((b) => b.name).sort((a, b) => a.localeCompare(b));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href="/breeds">All breeds</Link>
        </Button>
      </header>

      {/* Mission */}
      <div className="bg-aurora -mx-4 px-4 py-10 text-center">
        <Badge variant="secondary" className="mx-auto">
          <HeartHandshake className="size-3" /> Adopt-first, always
        </Badge>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Find your dog at a shelter near you
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Millions of great dogs are waiting in shelters right now — including purebreds and near-perfect mixes of
          almost every breed we score. Before you ever pay a breeder, look here. This search is free and always will
          be.
        </p>
      </div>

      {/* Search */}
      <section className="mt-8">
        <h2 className="text-lg font-bold tracking-tight">Search adoptable dogs</h2>
        <p className="mb-3 mt-1 text-sm text-muted-foreground">
          We&apos;ll pre-fill a search on Petfinder or Adopt-a-Pet — the two biggest live databases of shelter and
          rescue dogs.
        </p>
        <AdoptSearch breedNames={breedNames} />
      </section>

      {/* Shelter staples */}
      <section className="mt-10">
        <h2 className="text-lg font-bold tracking-tight">The shelter staples</h2>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">
          These breeds — and mixes close to them — fill shelters everywhere. If one of them fits your life, you can
          probably meet yours this weekend.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {staples.map((b) => (
            <Link
              key={b.id}
              href={`/breeds/${b.id}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <BreedPhoto breed={b} className="aspect-[4/3] w-full" rounded="rounded-none" />
              <div className="p-3">
                <div className="truncate font-semibold leading-tight">{b.name}</div>
                <div className="truncate text-xs text-muted-foreground">{b.size} · very common in shelters</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Local listings — empty state until the `shelter_listings` table goes live.
          When Supabase listings land, this section renders them (see supabase/migrations:
          public.shelter_listings — public-read, service-role writes). */}
      <section className="mt-10">
        <h2 className="text-lg font-bold tracking-tight">Listed with us directly</h2>
        <div className="mt-3 rounded-2xl border border-dashed border-border p-8 text-center">
          <Inbox className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-2 text-sm font-semibold">No direct listings yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            We&apos;re onboarding our first shelters now. Dogs listed here will appear matched against your quiz
            results — so you see the shelter dogs that actually fit your life.
          </p>
        </div>
      </section>

      {/* Shelters CTA */}
      <section className="mt-10 rounded-2xl glass p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Store className="size-5 text-secondary" /> Run a shelter or rescue? List your dogs free.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every person who finishes our quiz gets matched to breeds that genuinely fit their home, schedule, and
          budget — and we point them at adoption first. List your adoptable dogs with us and we&apos;ll surface them
          to matched adopters near you. No fees, no catch: adoptions are the point.
        </p>
        <Button asChild variant="gradient" className="mt-4">
          <a href={`mailto:${SHELTER_EMAIL}?subject=List%20our%20shelter%20on%20Find%20Your%20Dog`}>
            Get listed — email us <ArrowRight className="size-4" />
          </a>
        </Button>
        <p className="mt-2 text-[11px] text-muted-foreground">{SHELTER_EMAIL} — a human reads every message.</p>
      </section>

      {/* Quiz CTA */}
      <div className="bg-aurora mt-10 rounded-2xl border border-primary/30 p-6 text-center">
        <h3 className="text-xl font-bold tracking-tight">Not sure what to search for?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Take the 60-second quiz — we&apos;ll find the breeds that fit your life, then show you where to adopt them.
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
