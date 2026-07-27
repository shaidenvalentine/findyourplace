import type { Breed } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";
import { Wallet, HeartPulse, Check, X, Ruler, Clock } from "lucide-react";

/** The depth layer for a single breed — the "this app really knows this dog" content. */

/** Derive honest good-fit / bad-fit chips from the trait data (the dataset has no
 *  hand-written best_for lists — the scores ARE the source of truth). */
export function breedFitProfile(b: Breed): { goodFor: string[]; notFor: string[] } {
  const goodFor: string[] = [];
  const notFor: string[] = [];
  const n = (v: number | null | undefined) => v ?? 50;

  if (n(b.apartment_friendly) >= 70) goodFor.push("Apartment living");
  if (n(b.novice_friendly) >= 70) goodFor.push("First-time owners");
  if (n(b.kid_friendly) >= 75) goodFor.push("Families with kids");
  if (n(b.alone_tolerance) >= 65) goodFor.push("Busy work schedules");
  if (n(b.exercise_needs) >= 75) goodFor.push("Runners & hikers");
  if (n(b.dog_friendly) >= 75) goodFor.push("Multi-dog homes");
  if (n(b.cat_friendly) >= 70) goodFor.push("Homes with cats");
  if (b.hypoallergenic) goodFor.push("Allergy-prone owners");
  if (n(b.watchdog_alertness) >= 80 || n(b.protectiveness) >= 80) goodFor.push("A watchful presence");
  if (n(b.trainability) >= 80) goodFor.push("Trick & sport training");

  if (n(b.exercise_needs) >= 75) notFor.push("Couch-first lifestyles");
  if (n(b.novice_friendly) <= 40) notFor.push("First-time owners");
  if (n(b.alone_tolerance) <= 35) notFor.push("Long days home alone");
  if (n(b.barking_level) >= 75) notFor.push("Noise-sensitive neighbors");
  if (n(b.grooming_needs) >= 70) notFor.push("Minimal-grooming homes");
  if (n(b.kid_friendly) <= 40) notFor.push("Homes with small kids");
  if (n(b.apartment_friendly) <= 35) notFor.push("Small apartments");
  if (n(b.cat_friendly) <= 35) notFor.push("Homes with cats");
  if (n(b.drooling_level) >= 70) notFor.push("Drool-averse households");
  if (n(b.shedding_level) >= 80) notFor.push("Fur-free furniture");

  return { goodFor: goodFor.slice(0, 5), notFor: notFor.slice(0, 5) };
}

export function BreedProfile({ breed }: { breed: Breed }) {
  const { goodFor, notFor } = breedFitProfile(breed);
  return (
    <div className="flex flex-col gap-5">
      {breed.description && <p className="text-sm leading-relaxed text-muted-foreground">{breed.description}</p>}

      {/* Vitals */}
      <div className="grid grid-cols-2 gap-3">
        {breed.weight_lbs ? (
          <StatTile icon={<Ruler className="size-4" />} value={`~${breed.weight_lbs} lbs`} label={`${breed.size.toLowerCase()} breed, adult weight`} />
        ) : null}
        {breed.lifespan_years ? (
          <StatTile icon={<Clock className="size-4" />} value={`~${breed.lifespan_years} years`} label="typical lifespan" />
        ) : null}
        {breed.monthly_cost_usd ? (
          <StatTile
            icon={<Wallet className="size-4" />}
            value={`$${breed.monthly_cost_usd.toLocaleString()}/mo`}
            label="food, grooming, insurance & routine vet"
          />
        ) : null}
        {breed.health_robustness != null ? (
          <StatTile icon={<HeartPulse className="size-4" />} value={`${breed.health_robustness}/100`} label="health robustness" />
        ) : null}
      </div>

      {/* Good fit / not for */}
      {(goodFor.length || notFor.length) ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {goodFor.length ? (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-success">
                <Check className="size-3.5" /> Great for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {goodFor.map((g) => (
                  <Badge key={g} variant="success">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          {notFor.length ? (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <X className="size-3.5" /> Not for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {notFor.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function StatTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-1 flex items-center gap-1.5 text-accent">{icon}</div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
