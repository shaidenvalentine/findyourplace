import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RankedBreed } from "@/lib/run";
import { getBreedById } from "@/data/breeds";
import { ShoppingBag, Stethoscope, Home, GraduationCap, Users, PawPrint } from "lucide-react";

/**
 * Paid "your first 30 days" — a concrete plan for bringing the #1 breed home, derived
 * from the breed's actual traits (energy, grooming, alone-tolerance, sociability).
 * Turns the reveal from a fun fact into a decision the user can act on.
 */
export function FirstWeekPlan({ breed }: { breed: RankedBreed }) {
  const b = getBreedById(breed.id);

  const highEnergy = (b?.exercise_needs ?? b?.energy_level ?? 50) >= 65;
  const proGrooming = (b?.grooming_needs ?? 0) > 65;
  const separationRisk = (b?.alone_tolerance ?? 50) < 40;
  const sharpMind = (b?.intelligence ?? 50) >= 70 || (b?.trainability ?? 50) >= 70;
  const shy = (b?.stranger_friendly ?? 50) < 45;

  const gear = `Before pickup: crate, bed, leash + harness, bowls, and a bag of whatever they're eating now — switch foods slowly.${
    proGrooming ? ` Book a groomer intro too: a ${breed.name}'s coat is a standing appointment, and early visits make it routine, not a fight.` : ""
  }`;

  const vet = `Book the first vet visit for week one — baseline exam, vaccine records, microchip check, and a plan for parasite prevention. It also starts the relationship before you ever need it at 2am.`;

  const rules =
    separationRisk
      ? `Set the house rules on day one — and start alone-time training immediately: ${breed.name}s don't do solitude naturally, so build up from minutes, not hours, before your first full day away.`
      : `Set the house rules on day one — where they sleep, what's off-limits, one word per command from everyone. Consistency this week saves months of un-training later.`;

  const training =
    (sharpMind
      ? `Start training on day two — a ${breed.name} learns fast, and a smart dog without a job invents one you won't like. Five-minute sessions, twice a day.`
      : `Start gentle training on day two — five-minute sessions, twice a day, ending on a win. Slow and cheerful beats long and stern.`) +
    (highEnergy ? ` Pair it with a real exercise plan: this is a high-energy dog, and a tired dog is a trainable dog.` : "");

  const social = shy
    ? `Socialize on their terms — a ${breed.name} warms up slowly to strangers, so let new people come to them, one at a time, with treats doing the introductions.`
    : `Socialize deliberately in weeks two to four — new people, calm dogs, different surfaces and sounds, all kept positive. This window shapes their confidence for life.`;

  const steps = [
    { icon: <ShoppingBag className="size-4" />, title: "Prep & gear week", body: gear },
    { icon: <Stethoscope className="size-4" />, title: "First vet visit", body: vet },
    { icon: <Home className="size-4" />, title: "House rules + routine", body: rules },
    { icon: <GraduationCap className="size-4" />, title: "Training foundations", body: training },
    { icon: <Users className="size-4" />, title: "Socialization", body: social },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PawPrint className="size-4 text-primary" /> Your first 30 days — {breed.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
              {s.icon}
            </span>
            <div>
              <div className="text-sm font-semibold">{s.title}</div>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
