-- Find Your Dog — initial schema (clean rebuild, no Lovable history).
-- RLS on every table. `breeds` and `shelter_listings` are public-read;
-- everything else owner-scoped or service-role only.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- breeds: the curated dataset (seeded from src/data/breeds.json). PUBLIC READ.
-- Columns mirror the Breed interface in src/lib/scoring.ts.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.breeds (
  id text primary key,
  name text not null,
  "group" text not null,
  size text not null,
  weight_lbs numeric(6, 1),
  lifespan_years numeric(4, 1),
  image_url text,
  description text,
  vibe_summary text,
  tags jsonb not null default '[]'::jsonb,
  hypoallergenic boolean not null default false,
  -- Trait scores 0–100
  energy_level integer,
  exercise_needs integer,
  playfulness integer,
  apartment_friendly integer,
  novice_friendly integer,
  trainability integer,
  intelligence integer,
  grooming_needs integer,
  shedding_level integer,
  drooling_level integer,
  kid_friendly integer,
  affection_level integer,
  independence integer,
  alone_tolerance integer,
  dog_friendly integer,
  cat_friendly integer,
  stranger_friendly integer,
  protectiveness integer,
  watchdog_alertness integer,
  barking_level integer,
  heat_tolerance integer,
  cold_tolerance integer,
  health_robustness integer,
  -- Cost & meta
  monthly_cost_usd integer,
  popularity integer,
  shelter_availability integer,
  created_at timestamptz not null default now()
);

alter table public.breeds enable row level security;

drop policy if exists "breeds are public read" on public.breeds;
create policy "breeds are public read" on public.breeds
  for select using (true);
-- No insert/update/delete policy => writes only via service role (seed script).

-- ─────────────────────────────────────────────────────────────────────────────
-- onboarding_runs: a user's scored run. Owner-scoped; anonymous runs allowed.
-- Columns match src/lib/server/runStore.ts exactly.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.onboarding_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  source text not null default 'quiz',
  current_city text,
  dream_breed text,
  inputs_json jsonb not null default '{}'::jsonb,
  free_json jsonb not null default '{}'::jsonb,    -- the non-sensitive FREE surface
  ranking_json jsonb,                              -- LOCKED: full breed ranking
  plan_json jsonb,                                 -- LOCKED: adoption plan
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
-- Inserts happen ONLY via service role from the payment webhook (never client).

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

-- ─────────────────────────────────────────────────────────────────────────────
-- shelter_listings: the free shelter-adoption layer. PUBLIC READ.
-- Shelters submit via us (email/ops for now); rows are written by the service
-- role only — no anon/auth insert policies, matching the seed-script pattern.
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.shelter_listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  shelter_name text,
  shelter_email text,
  city text,
  breed_id text references public.breeds (id) on delete set null,
  breed_guess text,                -- shelter's own guess when the mix maps to no breed_id
  dog_name text,
  age_months integer,
  sex text,
  description text,
  photo_url text,
  source_url text,                 -- the shelter's own page for this dog
  status text not null default 'available'
);

create index if not exists shelter_listings_breed_idx on public.shelter_listings (breed_id);
create index if not exists shelter_listings_status_idx on public.shelter_listings (status, created_at desc);

alter table public.shelter_listings enable row level security;

drop policy if exists "shelter listings are public read" on public.shelter_listings;
create policy "shelter listings are public read" on public.shelter_listings
  for select using (true);
-- No insert/update/delete policy => writes only via service role.
