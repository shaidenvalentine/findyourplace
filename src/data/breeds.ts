import type { Breed } from "@/lib/scoring";
import raw from "./breeds.json";

/**
 * The canonical, version-controlled dataset of curated dog breeds.
 *
 * This ships WITH the app (it is the IP). Supabase is seeded FROM this file via
 * `scripts/seed-breeds.ts`, so the database is always a mirror of this source
 * of truth — there is no runtime dependency on any external data source.
 */
export const BREEDS: Breed[] = raw as Breed[];

export const BREED_COUNT = BREEDS.length;

export function getBreedById(id: string): Breed | undefined {
  return BREEDS.find((b) => b.id === id);
}
