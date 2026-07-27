"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Search } from "lucide-react";

/**
 * Client search block for /adopt — builds outbound Petfinder / Adopt-a-Pet search
 * URLs from a breed + location. No API keys, no scraping: we hand the user a
 * pre-filled search on the platforms where the shelter dogs actually are.
 */
export function AdoptSearch({ breedNames }: { breedNames: string[] }) {
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");

  const { petfinderUrl, adoptapetUrl } = useMemo(() => {
    const loc = location.trim();
    const pf = new URL("https://www.petfinder.com/search/dogs-for-adoption/");
    if (breed) pf.searchParams.set("breed[0]", breed);
    if (loc) pf.searchParams.set("location", loc);
    const ap = new URL("https://www.adoptapet.com/s/adopt-a-dog");
    if (breed) ap.searchParams.set("breed", breed);
    if (loc) ap.searchParams.set("location", loc);
    return { petfinderUrl: pf.toString(), adoptapetUrl: ap.toString() };
  }, [breed, location]);

  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Breed (optional)</span>
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-input/70 px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Any breed — surprise me</option>
            {breedNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Where are you?</span>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or ZIP — e.g. Austin, TX"
            className="h-11 rounded-xl"
            autoComplete="postal-code"
          />
        </label>
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          <Button asChild variant="gradient" size="lg">
            <a href={petfinderUrl} target="_blank" rel="noopener noreferrer">
              <Search className="size-4" /> Search Petfinder
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={adoptapetUrl} target="_blank" rel="noopener noreferrer">
              Search Adopt-a-Pet <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Both searches open in a new tab on the platform itself — every dog you&apos;ll see is a real listing from a
          shelter or rescue.
        </p>
      </div>
    </div>
  );
}
