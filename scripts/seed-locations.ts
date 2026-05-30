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

  const rows = locations as Record<string, unknown>[];
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
