import type { Metadata } from "next";
import Link from "next/link";
import { BREEDS, BREED_COUNT } from "@/data/breeds";
import type { Breed } from "@/lib/scoring";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { BreedPhoto } from "@/components/breeds/BreedPhoto";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `All ${BREED_COUNT} dog breeds`,
  description: `Browse ${BREED_COUNT} dog breeds — temperament, energy, grooming, and cost of ownership at a glance.`,
};

const GROUP_ORDER = ["Sporting", "Herding", "Working", "Hound", "Terrier", "Toy", "Non-Sporting", "Mixed & Rescue"];

export default function BreedsIndex() {
  const byGroup = new Map<string, Breed[]>();
  for (const b of BREEDS) {
    const arr = byGroup.get(b.group) ?? [];
    arr.push(b);
    byGroup.set(b.group, arr);
  }
  // Groups rendered in GROUP_ORDER below; any not listed appended after.
  const extras = [...byGroup.keys()].filter((g) => !GROUP_ORDER.includes(g));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-20">
      <header className="flex h-14 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button asChild variant="gradient" size="sm">
          <Link href="/start">
            Find my breed <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>

      <div className="bg-aurora -mx-4 px-4 py-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{BREED_COUNT} dog breeds, scored honestly</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Temperament, energy, grooming, and real monthly cost at a glance. Take the quiz to see which fits your life.
        </p>
      </div>

      {[...GROUP_ORDER.filter((g) => byGroup.has(g)), ...extras].map((group) => (
        <section key={group} className="mt-10">
          <h2 className="mb-4 text-xl font-bold tracking-tight">{group}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {byGroup
              .get(group)!
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((b) => (
                <Link
                  key={b.id}
                  href={`/breeds/${b.id}`}
                  // Solid surface, NOT .glass: ~170 backdrop-filter layers on one page
                  // wrecks scroll perf on low-end phones. Glass stays for low-count surfaces.
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <BreedPhoto breed={b} className="aspect-[4/3] w-full" rounded="rounded-none" />
                  <div className="p-3">
                    <div className="truncate font-semibold leading-tight">{b.name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {b.size}
                      {b.hypoallergenic ? " · hypoallergenic" : ""}
                    </div>
                    {b.monthly_cost_usd ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        ~${b.monthly_cost_usd.toLocaleString()}/mo
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
