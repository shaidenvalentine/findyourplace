# Find Your Place

City/place matching for 20–30s. A fast quiz (or your own AI's profile of you) feeds a
deterministic 10-dimension scoring engine that ranks **250 curated locations**, revealed
behind a one-time ~$19 unlock.

Fresh Next.js rebuild of the validated prototype. The scoring algorithm and the funnel
mechanic are ported; the dataset is regenerated and now **owned in-repo** (no dependency
on the old app's database).

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Supabase (DB/Auth/Storage)
· Stripe · Vitest.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm test             # scoring characterization tests (locks behavior)
npm run build        # production build
```
**It runs fully without any keys** — in-memory run store, heuristic AI-profile parser,
and a dev unlock so you can click the whole funnel end-to-end.

## What's built
- **Scoring engine** — `src/lib/scoring.ts` + `circuitGenerator.ts`, ported verbatim and
  locked by characterization tests (`src/lib/scoring.test.ts`, snapshots).
- **Dataset** — `src/data/locations.json`, 250 places, validated (all scores 0–100).
- **Funnel** — landing → `/start` (city + path choice) → Path A `/start/ai` (AI profile)
  or Path B `/quiz` → `/results/[runId]` (free read + locked #1 + paywall + paid reveal).
- **Server-enforced gate** — the locked ranking/#1/tax/circuit never reach the client until
  the server confirms an unlock (`src/lib/server/runStore.ts`, `/api/result/[runId]`).
- **Payments** — `/api/checkout` picks the active rail (Lemon Squeezy first, then Stripe,
  then dev), each with a server-verified webhook (`/api/lemonsqueezy/webhook`,
  `/api/stripe/webhook`). The two rails stay decoupled so either can run alone. Dev unlock
  auto-disables the moment any rail's keys are set.

## Going live — the credentials checklist
Copy `.env.example` → `.env.local` and fill in, block by block:
1. **Supabase** — create a project, run `supabase/migrations/0001_init.sql`, then
   `npx tsx scripts/seed-locations.ts` to seed the 250 locations. Set
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` — `runStore.ts` automatically persists runs + unlocks to
   Supabase when these are present (and falls back to an in-memory store when they're not,
   so local dev still works). **This is required in production**: without it, unlock state
   isn't shared across serverless instances and paying users won't get unlocked.
2. **Payment rail** (pick one — they're decoupled):
   - **Lemon Squeezy** (launch default — merchant of record, handles global tax): set
     `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_VARIANT_ID`,
     `LEMONSQUEEZY_WEBHOOK_SECRET`; point an `order_created` webhook at
     `/api/lemonsqueezy/webhook`. Set the LS **variant** price to match `PRICE_CENTS`
     ($29) — on this rail the variant, not the code, sets the charged amount.
   - **Stripe**: add `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`; point a webhook at
     `/api/stripe/webhook`.
   - Optional `PAYMENT_PROVIDER=lemonsqueezy|stripe` forces one when both are configured.
3. **Anthropic** — optional, richer AI-profile parsing (Path A).
4. **Resend/ESP** — wire `/api/capture-email` to your audience + nurture.
5. **Meta Pixel + CAPI** — Phase 5 instrumentation before the first ad.

See `BUILD_PLAN.md` for the phased roadmap.
