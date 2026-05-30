import type { Location } from "@/lib/scoring";
import raw from "./locations.json";

/**
 * The canonical, version-controlled dataset of curated locations.
 *
 * This ships WITH the app (it is the IP). Supabase is seeded FROM this file via
 * `scripts/seed-locations.ts`, so the database is always a mirror of this source
 * of truth — there is no runtime dependency on any external data source.
 */
export const LOCATIONS: Location[] = raw as Location[];

export const LOCATION_COUNT = LOCATIONS.length;

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find((l) => l.id === id);
}
