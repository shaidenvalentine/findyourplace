/**
 * Seeds Supabase `public.breeds` from the version-controlled dataset
 * (src/data/breeds.json). Idempotent upsert on `id`. Run with:
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-breeds.ts
 *
 * The dataset is the source of truth; the DB is a mirror of it.
 */
import { createClient } from "@supabase/supabase-js";
import breeds from "../src/data/breeds.json";

async function main() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to seed.");
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Only send columns that exist in the `breeds` table (migration 0001) — the full
  // Breed interface today. If the dataset JSON ever grows app-only depth fields that
  // are NOT DB columns, keep them out of COLUMNS or PostgREST rejects the upsert.
  const COLUMNS = [
    "id", "name", "group", "size", "weight_lbs", "lifespan_years", "image_url",
    "description", "vibe_summary", "tags", "hypoallergenic",
    "energy_level", "exercise_needs", "playfulness", "apartment_friendly",
    "novice_friendly", "trainability", "intelligence", "grooming_needs",
    "shedding_level", "drooling_level", "kid_friendly", "affection_level",
    "independence", "alone_tolerance", "dog_friendly", "cat_friendly",
    "stranger_friendly", "protectiveness", "watchdog_alertness", "barking_level",
    "heat_tolerance", "cold_tolerance", "health_robustness",
    "monthly_cost_usd", "popularity", "shelter_availability",
  ];
  const rows = (breeds as Record<string, unknown>[]).map((row) =>
    Object.fromEntries(COLUMNS.filter((c) => c in row).map((c) => [c, row[c]])),
  );
  console.log(`Seeding ${rows.length} breeds…`);

  const BATCH = 100;
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    const { error } = await supabase.from("breeds").upsert(slice, { onConflict: "id" });
    if (error) throw error;
    console.log(`  upserted ${Math.min(i + BATCH, rows.length)}/${rows.length}`);
  }

  const { count } = await supabase.from("breeds").select("id", { count: "exact", head: true });
  console.log(`Done. breeds row count: ${count}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
