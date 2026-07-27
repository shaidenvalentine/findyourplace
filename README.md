# Find Your Dog

Dog-breed matching for people about to get a dog. A fast quiz (or your own AI's
profile of you) feeds a deterministic 10-dimension scoring engine that ranks
**170 curated breeds**, revealed behind a one-time ~$19 unlock — then points you to
that dog **in shelters near you** (adopt-first, always).

An identical-mechanics sibling of Find Your Place: the scoring architecture and the
funnel are the same; the domain, dataset, and mission are new. The dataset is
**owned in-repo** (no external breed API).

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Supabase (DB/Auth/Storage)
· Stripe / Lemon Squeezy · Vitest.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm test             # scoring characterization + breed-fact tests (locks behavior)
npm run build        # production build
```
**It runs fully without any keys** — in-memory run store, heuristic AI-profile parser,
and a dev unlock so you can click the whole funnel end-to-end.

## What's built
- **Scoring engine** — `src/lib/match/engine.ts` (fit-based, not trait-maximization:
  unexpressed axes stay neutral, deal-breakers filter hard, "breeds you've loved"
  resonance pulls the *I-always-knew* match to #1), locked by characterization tests
  (`src/lib/scoring.test.ts` snapshots + `verify.test.ts` breed facts).
- **Dataset** — `src/data/breeds.json`, 170 breeds × 23 trait scores + cost/lifespan/
  shelter-availability, validated (all scores 0–100).
- **Funnel** — landing → `/start` (where you live + the breed you *think* you want +
  path choice) → Path A `/start/ai` (paste a profile your own ChatGPT/Claude wrote)
  or Path B `/quiz` → `/results/[runId]` (free read: owner profile, dream-breed fit,
  dimension bars, cost tease + locked #1 + paywall + paid reveal).
- **The dream-breed mechanic** — the free trust-builder scores the breed the user came
  in wanting against their real life (apartment, hours alone, kids, allergies…), the
  honest read that earns the sale. Nicknames resolve ("lab", "GSD", "frenchie").
- **Adoption layer** — the paid reveal includes an adopt-near-you plan (live Petfinder /
  Adopt-a-Pet / breed-rescue searches for the #1 breed at the user's location, plus
  which of their top matches are shelter-common), and `/adopt` is a free shelter
  listing surface. Helping shelter dogs out is the brand's spine.
- **Server-enforced gate** — the locked ranking/#1/adoption plan never reach the client
  until the server confirms an unlock (`src/lib/server/runStore.ts`, `/api/result/[runId]`).
- **Payments** — `/api/checkout` picks the active rail (Lemon Squeezy first, then Stripe,
  then dev), each with a server-verified webhook. Dev unlock auto-disables the moment
  any rail's keys are set.

## Going live — the credentials checklist
Copy `.env.example` → `.env.local` and fill in, block by block:
1. **Supabase** — create a project, run `supabase/migrations/`, then
   `npx tsx scripts/seed-breeds.ts` to seed the 170 breeds. Set
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` — `runStore.ts` automatically persists runs + unlocks to
   Supabase when these are present (and falls back to an in-memory store when they're not,
   so local dev still works). **This is required in production**: without it, unlock state
   isn't shared across serverless instances and paying users won't get unlocked.
2. **Payment rail** (pick one — they're decoupled):
   - **Lemon Squeezy** (launch default — merchant of record, handles global tax): set
     `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_VARIANT_ID`,
     `LEMONSQUEEZY_WEBHOOK_SECRET`; point an `order_created` webhook at
     `/api/lemonsqueezy/webhook`. Set the LS **variant** price to match `PRICE_CENTS` —
     on this rail the variant, not the code, sets the charged amount.
   - **Stripe**: add `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`; point a webhook at
     `/api/stripe/webhook`.
   - Optional `PAYMENT_PROVIDER=lemonsqueezy|stripe` forces one when both are configured.
3. **Anthropic** — optional, richer AI-profile parsing (Path A).
4. **Resend/ESP** — wire `/api/capture-email` to your audience + nurture.
5. **Meta Pixel + CAPI** — instrumentation before the first ad.

See `BUILD_PLAN.md` for the phased roadmap.
