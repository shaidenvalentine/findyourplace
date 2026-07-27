import type { Breed, MatchResult } from "@/lib/scoring";
import type { OnboardingData } from "@/types/onboarding";

/**
 * The adoption plan — the paid "now go get your dog" layer. Given the #1 match and the
 * user's location, we build a shelter-first plan: live search links for that breed (and
 * its common mixes) near them, the top matches from their ranking that are realistically
 * findable in shelters, and the questions worth asking. Free listings from local shelters
 * plug into the same surface via the `listings` table (see /adopt).
 *
 * We recommend adoption first, always — a breeder path is included only when the user
 * asked for it, with honest vetting notes.
 */

export interface AdoptionSource {
  name: string;
  url: string;
  note: string;
}

export interface ShelterAlternate {
  id: string;
  name: string;
  rank: number;
  score: number;
  shelterAvailability: number;
}

export interface AdoptionPlan {
  /** The user's location as typed — used for search links, never scoring. */
  location: string;
  preference: "adopt" | "breeder" | "either";
  /** 0–100: how often the #1 breed (or close mixes) shows up in shelters/rescues. */
  shelterAvailability: number;
  availabilityNote: string;
  /** Live search links for the #1 breed near the user. */
  sources: AdoptionSource[];
  /** Top-ranked matches that are genuinely common in shelters — the "adopt one of these
   *  this month" list. */
  shelterAlternates: ShelterAlternate[];
  /** Questions to ask the shelter/rescue before saying yes. */
  checklist: string[];
  /** Only present when the user is open to a breeder — how not to get burned. */
  breederNotes: string[];
}

function petfinderUrl(breedName: string, location: string): string {
  const params = new URLSearchParams();
  params.set("breed[0]", breedName);
  if (location) params.set("location", location);
  return `https://www.petfinder.com/search/dogs-for-adoption/?${params.toString()}`;
}

function adoptAPetUrl(breedName: string, location: string): string {
  const params = new URLSearchParams();
  params.set("breed", breedName);
  if (location) params.set("location", location);
  return `https://www.adoptapet.com/s/adopt-a-dog?${params.toString()}`;
}

function rescueSearchUrl(breedName: string): string {
  const q = encodeURIComponent(`${breedName} rescue near me`);
  return `https://www.google.com/search?q=${q}`;
}

function availabilityNote(breed: Breed, avail: number): string {
  if (avail >= 75) {
    return `${breed.name}s (and close mixes) show up in shelters constantly — with a saved search and a week of patience, adopting one is very realistic.`;
  }
  if (avail >= 45) {
    return `${breed.name}s appear in shelters and breed-specific rescues regularly, though not daily — set alerts on the searches below and check the breed rescue first.`;
  }
  if (avail >= 20) {
    return `Purebred ${breed.name}s are uncommon in general shelters — your best route is the national breed rescue network, where surrendered dogs go first.`;
  }
  return `${breed.name}s almost never reach general shelters — a dedicated breed rescue (or a long waitlist) is the realistic adoption path, and close mixes are worth considering.`;
}

const CHECKLIST = [
  "Ask why the dog was surrendered — pattern behaviors (guarding, separation issues) matter more than age.",
  "Meet the dog outside the kennel; shelter kennels make calm dogs frantic and frantic dogs shut down.",
  "Ask what the staff has actually observed: walking on leash, other dogs, cats, kids, food guarding.",
  "Confirm what's included in the fee — spay/neuter, vaccines, microchip — and get medical records.",
  "Ask about the return policy; good shelters and rescues always take the dog back, no questions.",
  "If you have kids or other pets, ask for a supervised meet-and-greet before you decide.",
];

const BREEDER_NOTES = [
  "A responsible breeder health-tests parents (OFA/PennHIP, breed-specific panels) and shows you the results unprompted.",
  "You should meet the mother and see where the puppies live — a breeder who won't allow it is the answer.",
  "Expect a waitlist and an interview. A breeder with puppies always available is a volume operation.",
  "No responsible breeder sells through marketplaces, pet stores, or ships a puppy sight-unseen.",
  "A real contract includes a take-back clause for the dog's entire life.",
];

export function buildAdoptionPlan(
  top: Breed,
  matches: MatchResult[],
  inputs: OnboardingData
): AdoptionPlan {
  const location = (inputs.currentCity ?? "").trim();
  const preference = inputs.adoptPreference ?? "either";
  const avail = top.shelter_availability ?? 40;

  const sources: AdoptionSource[] = [
    {
      name: "Petfinder",
      url: petfinderUrl(top.name, location),
      note: `Live ${top.name} listings near ${location || "you"} — save the search and turn on alerts.`,
    },
    {
      name: "Adopt-a-Pet",
      url: adoptAPetUrl(top.name, location),
      note: "Second-largest listing network — inventory differs from Petfinder, check both.",
    },
    {
      name: `${top.name} rescue network`,
      url: rescueSearchUrl(top.name),
      note: "Breed-specific rescues get surrendered purebreds before shelters do.",
    },
  ];

  // The top matches (excluding #1) that are genuinely findable in shelters — capped at 5.
  const shelterAlternates: ShelterAlternate[] = matches
    .filter((m) => m.breed.id !== top.id && (m.breed.shelter_availability ?? 0) >= 60)
    .slice(0, 5)
    .map((m) => ({
      id: m.breed.id,
      name: m.breed.name,
      rank: m.rank,
      score: m.displayScore,
      shelterAvailability: m.breed.shelter_availability ?? 0,
    }));

  return {
    location,
    preference,
    shelterAvailability: avail,
    availabilityNote: availabilityNote(top, avail),
    sources,
    shelterAlternates,
    checklist: CHECKLIST,
    breederNotes: preference === "adopt" ? [] : BREEDER_NOTES,
  };
}
