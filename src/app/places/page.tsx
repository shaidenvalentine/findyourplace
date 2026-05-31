import type { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS } from "@/data/locations";
import type { Location } from "@/lib/scoring";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { PlacePhoto } from "@/components/places/PlacePhoto";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All 250 places",
  description: "Browse 250 of the best places on Earth to live — cost of living, vibe, safety, and tax at a glance.",
};

const CONTINENT_ORDER = ["Europe", "Asia", "North America", "South America", "Oceania", "Africa", "Middle East"];

export default function PlacesIndex() {
  const byContinent = new Map<string, Location[]>();
  for (const l of LOCATIONS) {
    const arr = byContinent.get(l.continent) ?? [];
    arr.push(l);
    byContinent.set(l.continent, arr);
  }
  // Continents rendered in CONTINENT_ORDER below; any not listed fall through unshown.
  const extras = [...byContinent.keys()].filter((c) => !CONTINENT_ORDER.includes(c));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="gradient" size="sm">
          <Link href="/start">
            Find my place <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>

      <div className="bg-aurora -mx-4 px-4 py-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">250 of the best places on Earth</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Cost of living, vibe, safety, and tax at a glance. Take the quiz to see which fits you.
        </p>
      </div>

      {[...CONTINENT_ORDER.filter((c) => byContinent.has(c)), ...extras].map((continent) => (
        <section key={continent} className="mt-10">
          <h2 className="mb-4 text-xl font-bold tracking-tight">{continent}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {byContinent
              .get(continent)!
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => (
                <Link
                  key={l.id}
                  href={`/places/${l.id}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <PlacePhoto location={l} className="aspect-[4/3] w-full" rounded="rounded-none" sizes="(max-width:640px) 50vw, 25vw" />
                  <div className="p-3">
                    <div className="truncate font-semibold leading-tight">{l.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{l.country}</div>
                    {l.monthly_budget_usd ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        ~${l.monthly_budget_usd.toLocaleString()}/mo
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
