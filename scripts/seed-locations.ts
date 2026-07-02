/**
 * Seeds Supabase `public.locations` from the version-controlled dataset
 * (src/data/locations.json). Idempotent upsert on `id`. Run with:
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-locations.ts
 *
 * The dataset is the source of truth; the DB is a mirror of it.
 */
import { createClient } from "@supabase/supabase-js";
import locations from "../src/data/locations.json";

async function main() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to seed.");
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Only send columns that exist in the `locations` table (migration 0001). The dataset
  // JSON also carries depth-content fields (lowdown/scene/best_for/monthly_budget_usd/…)
  // that the app renders straight from the JSON and are NOT DB columns — including them
  // would make PostgREST reject the upsert on unknown columns.
  const COLUMNS = [
    "id", "name", "region", "country", "continent", "latitude", "longitude", "population",
    "image_url", "description", "vibe_summary", "tags", "cost_of_living_score", "rent_score",
    "safety_score", "healthcare_score", "climate_score", "avg_temp_summer", "avg_temp_winter",
    "humidity_level", "sunshine_days", "beach_access_score", "mountain_access_score",
    "outdoor_score", "nightlife_score", "wellness_score", "dating_scene_score",
    "community_score", "english_friendliness_score", "visa_friendliness_score",
    "tax_friendliness_score", "airport_connectivity_score", "internet_quality_score",
    "walkability_score", "transit_score", "culture_openness_score", "startup_ecosystem_score",
    "bureaucracy_score", "personal_income_tax_rate", "corporate_tax_rate",
    "capital_gains_tax_rate", "tax_notes",
  ];
  const rows = (locations as Record<string, unknown>[]).map((row) =>
    Object.fromEntries(COLUMNS.filter((c) => c in row).map((c) => [c, row[c]])),
  );
  console.log(`Seeding ${rows.length} locations…`);

  const BATCH = 100;
  for (let i = 0; i < rows.length; i += BATCH) {
    const slice = rows.slice(i, i + BATCH);
    const { error } = await supabase.from("locations").upsert(slice, { onConflict: "id" });
    if (error) throw error;
    console.log(`  upserted ${Math.min(i + BATCH, rows.length)}/${rows.length}`);
  }

  const { count } = await supabase.from("locations").select("id", { count: "exact", head: true });
  console.log(`Done. locations row count: ${count}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
