# Find Your Place — Product & Architecture Spec

## What it is
A city/place matching platform for young professionals & digital nomads (ages 20-30).
Users take a 9-step quiz, get AI-ranked matches across 193 curated locations, with a paywall reveal.

## Tech Stack
- **Frontend**: React 18, Vite 5, TypeScript 5, Tailwind v3, shadcn/ui, Framer Motion, React Router 6, TanStack Query, Sonner toasts, canvas-confetti, html-to-image
- **Backend**: Supabase (Postgres + Auth + Storage + Edge Functions on Deno)
- **Payments**: Stripe Checkout ($10 unlock)
- **AI**: Lovable AI Gateway (Gemini / GPT-5 family) via `LOVABLE_API_KEY`
- **PWA**: vite-plugin-pwa

## Core Features
1. **Landing page** (`/`) — Hero, Features, HowItWorks, Statistics, CTA, Footer
2. **Places library** (`/places`) — public searchable browse of 193 locations grouped by region, filterable by Cost/Safety/Climate. Shows personalized match % once quiz done.
3. **9-step Onboarding quiz** (`/app/onboarding`):
   1. Basics (name, age, current city, passports, languages)
   2. Mobility (Rooted vs Nomadic — gates "Annual Circuit" feature)
   3. Lifestyle & Environment (climate, urban/outdoor, noise, routine)
   4. Career & Work (industries, networking, entrepreneurship)
   5. Community & Social (vibes, family proximity, density)
   6. Cost & Finances (budget, tax sensitivity, housing)
   7. Values (freedom/stability, novelty/consistency, culture tolerance)
   8. Health & Travel (healthcare, gym, airport, public transit)
   9. Safety & Priorities (must-haves, deal-breakers, top priorities)
4. **Results** (`/app/results/:runId`) — TopMatchHero, ScoreRing, CategoryBars, Current City Fit, blurred reveal of full ranking, Tax Deep Dive, Personality Profile, Annual Circuit (nomadic only), Friend Invite flow, Share modal, paywall CTA.
5. **Auth** (`/app/login`) — Supabase email/password + Google OAuth
6. **Dashboard** (`/app`) — user's past runs
7. **Admin** (`/admin/place-images`) — audit/fix place images

## Scoring (10 dimensions)
Climate & Nature · Community Fit · Career Opportunities · Cost of Living · Safety & Stability · Wellness Ecosystem · Social & Dating · Travel Connectivity · Mobility & Transit · Visa & Taxes

Algorithm: dynamic weights from user priorities × dimension scores, deal-breaker multipliers, alignment bonuses. See `src/lib/scoring.ts`.

## Annual Circuit
Nomadic-only feature: generates 12-month itinerary across 3-6 destinations. See `src/lib/circuitGenerator.ts`.

## Database Tables
- `locations` (193 rows) — name, country, continent, lat/lon, image_url + 30+ score columns + tax fields + image audit columns
- `onboarding_runs` — user quiz submissions (inputs_json, weights, signals)
- `match_results` — computed rankings per run
- `profiles` — user profile
- `payments` — Stripe payment records ($10 unlock)
- `unlocked_results` — flag for paid users
- `quiz_completions` — for public live counter
- `friend_invites` + `friend_comparisons` — viral friend invite flow
- `share_events` — share tracking
- `email_captures` — pre-paywall email gate

All tables have RLS. Locations are publicly readable.

## Edge Functions
- `create-checkout` / `verify-payment` — Stripe
- `populate-locations` — seeds the 193 locations
- `sync-place-images` — fetches/mirrors place photos from Wikimedia → Supabase storage with relevance scoring + optional AI gate
- `create-invite` / `complete-invite` / `get-invite-status` — viral flow
- `get-live-count` — public counter
- `track-share` — share analytics

## Storage Buckets
- `place-images` (public) — mirrored place photos

## Secrets
- `LOVABLE_API_KEY`, `STRIPE_SECRET_KEY`, `SUPABASE_*` (auto)

## Design System
HSL semantic tokens in `src/index.css`, mapped in `tailwind.config.ts`. Never use raw colors in components.

## Files to read first when rebuilding
1. `SPEC.md` (this file)
2. `CODEBASE.md` — every source file inline
3. `DATABASE.txt` — locations table schema + full row list
4. `src/lib/scoring.ts`, `src/lib/circuitGenerator.ts` — core algorithms
5. `supabase/functions/populate-locations/index.ts` — seed data
6. `supabase/migrations/*.sql` — schema in order
