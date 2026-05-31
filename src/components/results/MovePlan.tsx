import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RankedPlace } from "@/lib/run";
import { LOCATIONS } from "@/data/locations";
import { Plane, FileCheck, Wallet, Users, MapPin } from "lucide-react";

/**
 * Paid "your move plan" — concrete next steps to actually get there, derived from the
 * place's visa/tax/cost/connectivity data. Turns the reveal from a fun fact into a
 * decision the user can act on.
 */
export function MovePlan({ place }: { place: RankedPlace }) {
  const loc = LOCATIONS.find((l) => l.id === place.id);
  if (!loc) return null;

  const visa =
    (loc.visa_friendliness_score ?? 50) >= 70
      ? `Long-stay and remote-work visas for ${place.country} are relatively straightforward — check current nomad/long-stay options before you book.`
      : `${place.country} visas need planning — research long-stay routes and timelines early, before you commit to a move date.`;

  const cost =
    (loc.cost_of_living_score ?? 50) >= 65
      ? `Your money stretches far here. Budget a comfortable monthly figure and you'll likely live better than you do now.`
      : `It's not the cheapest — line up your income and a realistic monthly budget before moving.`;

  const connectivity =
    (loc.airport_connectivity_score ?? 50) >= 70
      ? `Well-connected by air — book a 1–2 week scouting trip to pressure-test the vibe in person.`
      : `Plan a scouting trip with extra travel buffer — connections can take longer.`;

  const community =
    (loc.community_score ?? 50) >= 65
      ? `There's an established expat/newcomer community — plug into it in week one and you won't feel alone.`
      : `Community is more local — learn a few phrases and lean into meeting people early.`;

  const steps = [
    { icon: <FileCheck className="size-4" />, title: "Sort the visa", body: visa },
    { icon: <Wallet className="size-4" />, title: "Pin your budget", body: cost },
    { icon: <Plane className="size-4" />, title: "Book a scouting trip", body: connectivity },
    { icon: <Users className="size-4" />, title: "Find your people", body: community },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MapPin className="size-4 text-primary" /> Your move plan — {place.name}
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
