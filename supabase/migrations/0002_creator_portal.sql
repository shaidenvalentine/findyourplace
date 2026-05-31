-- Creator Portal — referral attribution + earnings tracking
-- Founding Creators get 50% of every $19 quiz unlock attributed to their code.
-- The user (Find Your Place) keeps 100% of email captures + 100% of affiliate revenue downstream.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────────
-- creators: account + payout info
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  code text not null unique,                     -- e.g. "octaviusra" - used in /c/[code] and ?ref=
  display_name text not null,                    -- e.g. "Octavius Ra"
  email text not null,
  bio text,                                      -- short bio shown on co-branded landing
  instagram_handle text,
  tiktok_handle text,
  youtube_handle text,
  twitter_handle text,
  website text,
  -- Payout method (manual via Wise initially, Stripe Connect later)
  payout_email text,                             -- their Wise/PayPal email
  rev_share_pct integer not null default 50,     -- their %. Default 50, can be adjusted per creator.
  status text not null default 'active',         -- 'active' | 'suspended'
  approved boolean not null default true,        -- false = signed up but admin hasn't approved
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists creators_code_idx on public.creators (code);
create index if not exists creators_user_id_idx on public.creators (user_id);

alter table public.creators enable row level security;

drop policy if exists "creators read their own profile" on public.creators;
create policy "creators read their own profile" on public.creators
  for select using (auth.uid() = user_id);

drop policy if exists "creators update their own profile" on public.creators;
create policy "creators update their own profile" on public.creators
  for update using (auth.uid() = user_id);

-- New signups insert their own row at user_id = auth.uid()
drop policy if exists "creators self-signup" on public.creators;
create policy "creators self-signup" on public.creators
  for insert with check (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- creator_clicks: every ?ref= or /c/[code] visit
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.creator_clicks (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete cascade,
  -- Light fingerprint (no PII): host of referrer, country if known, UA hash.
  source text,                                   -- 'link' | 'code' | 'landing'
  referrer text,
  ua_hash text,                                  -- one-way hashed UA (no fingerprinting)
  created_at timestamptz not null default now()
);

create index if not exists creator_clicks_creator_idx on public.creator_clicks (creator_id, created_at desc);

alter table public.creator_clicks enable row level security;

drop policy if exists "creators see their own clicks" on public.creator_clicks;
create policy "creators see their own clicks" on public.creator_clicks
  for select using (
    creator_id in (select id from public.creators where user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- creator_conversions: $19 unlocks attributed to a creator
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.creator_conversions (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete restrict,
  run_id uuid,                                   -- the scoring run (no FK — runs may be in-memory pre-Supabase)
  stripe_session_id text unique,                 -- prevents double-credit on webhook retry
  email text,                                    -- buyer email (the user keeps this for nurture/affiliate)
  amount_cents integer not null,                 -- $19.00 = 1900
  creator_cut_cents integer not null,            -- 50% by default = 950
  status text not null default 'pending',        -- 'pending' | 'paid' | 'refunded'
  paid_in_payout_id uuid,                        -- set when included in a payout
  created_at timestamptz not null default now()
);

create index if not exists creator_conversions_creator_idx on public.creator_conversions (creator_id, created_at desc);
create index if not exists creator_conversions_status_idx on public.creator_conversions (status);

alter table public.creator_conversions enable row level security;

drop policy if exists "creators see their own conversions" on public.creator_conversions;
create policy "creators see their own conversions" on public.creator_conversions
  for select using (
    creator_id in (select id from public.creators where user_id = auth.uid())
  );
-- INSERTs only happen via service role (Stripe webhook), never client.

-- ─────────────────────────────────────────────────────────────────────────────
-- creator_payouts: monthly payout records
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.creator_payouts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creators (id) on delete restrict,
  period_start date not null,
  period_end date not null,
  total_cents integer not null,
  conversion_count integer not null,
  status text not null default 'pending',        -- 'pending' | 'paid'
  paid_at timestamptz,
  payout_method text,                            -- 'wise' | 'stripe_connect' | 'manual'
  reference text,                                -- Wise transfer ID etc.
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists creator_payouts_creator_idx on public.creator_payouts (creator_id, created_at desc);

alter table public.creator_payouts enable row level security;

drop policy if exists "creators see their own payouts" on public.creator_payouts;
create policy "creators see their own payouts" on public.creator_payouts
  for select using (
    creator_id in (select id from public.creators where user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- email_captures: also tag with creator (the user keeps the email + affiliate LTV)
-- ─────────────────────────────────────────────────────────────────────────────
-- Add creator_id to the existing email_captures table from 0001_init.sql
alter table public.email_captures
  add column if not exists creator_id uuid references public.creators (id) on delete set null;

-- ─────────────────────────────────────────────────────────────────────────────
-- onboarding_runs: tag runs with their referring creator
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.onboarding_runs
  add column if not exists creator_id uuid references public.creators (id) on delete set null;

create index if not exists onboarding_runs_creator_idx on public.onboarding_runs (creator_id, created_at desc);
