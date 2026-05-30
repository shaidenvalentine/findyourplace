-- Find Your Place — initial schema (clean rebuild, no Lovable history).
-- RLS on every table. `locations` is public-read; everything else owner-scoped.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- locations: the curated dataset (seeded from src/data/locations.json). PUBLIC READ.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.locations (
  id text primary key,
  name text not null,
  region text,
  country text not null,
  continent text not null,
  latitude numeric(10, 6),
  longitude numeric(10, 6),
  population integer,
  image_url text,
  description text,
  vibe_summary text,
  tags jsonb not null default '[]'::jsonb,
  cost_of_living_score integer,
  rent_score integer,
  safety_score integer,
  healthcare_score integer,
  climate_score integer,
  avg_temp_summer integer,
  avg_temp_winter integer,
  humidity_level integer,
  sunshine_days integer,
  beach_access_score integer,
  mountain_access_score integer,
  outdoor_score integer,
  nightlife_score integer,
  wellness_score integer,
  dating_scene_score integer,
  community_score integer,
  english_friendliness_score integer,
  visa_friendliness_score integer,
  tax_friendliness_score integer,
  airport_connectivity_score integer,
  internet_quality_score integer,
  walkability_score integer,
  transit_score integer,
  culture_openness_score integer,
  startup_ecosystem_score integer,
  bureaucracy_score integer,
  personal_income_tax_rate numeric(5, 2),
  corporate_tax_rate numeric(5, 2),
  capital_gains_tax_rate numeric(5, 2),
  tax_notes text,
  created_at timestamptz not null default now()
);

alter table public.locations enable row level security;

drop policy if exists "locations are public read" on public.locations;
create policy "locations are public read" on public.locations
  for select using (true);
-- No insert/update/delete policy => writes only via service role (seed script).

-- ─────────────────────────────────────────────────────────────────────────────
-- onboarding_runs: a user's scored run. Owner-scoped; anonymous runs allowed.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.onboarding_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  source text not null default 'quiz',
  current_city text,
  inputs_json jsonb not null default '{}'::jsonb,
  free_json jsonb not null default '{}'::jsonb,    -- the non-sensitive FREE surface
  ranking_json jsonb,                              -- LOCKED: full ranking
  circuit_json jsonb,                              -- LOCKED: annual circuit
  created_at timestamptz not null default now()
);

alter table public.onboarding_runs enable row level security;

drop policy if exists "own runs are readable" on public.onboarding_runs;
create policy "own runs are readable" on public.onboarding_runs
  for select using (user_id is null or auth.uid() = user_id);

drop policy if exists "insert own runs" on public.onboarding_runs;
create policy "insert own runs" on public.onboarding_runs
  for insert with check (user_id is null or auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- unlocked_results: server-verified payment flag. The paywall source of truth.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.unlocked_results (
  run_id uuid primary key references public.onboarding_runs (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  stripe_session_id text,
  amount_cents integer,
  unlocked_at timestamptz not null default now()
);

alter table public.unlocked_results enable row level security;

drop policy if exists "own unlocks are readable" on public.unlocked_results;
create policy "own unlocks are readable" on public.unlocked_results
  for select using (user_id is null or auth.uid() = user_id);
-- Inserts happen ONLY via service role from the Stripe webhook (never client).

-- ─────────────────────────────────────────────────────────────────────────────
-- email_captures: pre-paywall email gate → ESP nurture.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.email_captures (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  run_id uuid references public.onboarding_runs (id) on delete set null,
  stage text,
  created_at timestamptz not null default now()
);

alter table public.email_captures enable row level security;
-- No client policies: written via service role only.

-- ─────────────────────────────────────────────────────────────────────────────
-- quiz_completions: public live counter source.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.quiz_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.quiz_completions enable row level security;

drop policy if exists "completions count is public" on public.quiz_completions;
create policy "completions count is public" on public.quiz_completions
  for select using (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles: minimal user profile, owner-scoped.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "own profile readable" on public.profiles;
create policy "own profile readable" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "own profile upsert" on public.profiles;
create policy "own profile upsert" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles
  for update using (auth.uid() = id);
