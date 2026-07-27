# Find Your Dog — Claude Code Operating Guide

@BUILD_PLAN.md — the phased production roadmap (build against this)
docs/prototype/ — the original Find Your Place (city-matching) spec, kept as heritage
reference; this branch is the dog-breed sibling product built on the same mechanics.

## One-liner
Dog-breed matching for people about to get a dog. A fast quiz — or a profile written
by the user's own ChatGPT/Claude — feeds a deterministic 10-dimension scoring engine
that ranks 170 curated breeds, revealed behind a one-time paywall (~$19). Every paid
result routes to REAL adoptable dogs at shelters near the user (adopt-first, always);
`/adopt` is the free shelter-listing surface.

## Stack
- Next.js (App Router) + React + TypeScript + Tailwind + shadcn/ui.
- Supabase for DB (Postgres) + Auth + Storage ONLY.
- Server logic = Next.js route handlers / server actions. NO Supabase edge functions.
- Stripe / Lemon Squeezy for the one-time unlock. GitHub → Vercel (auto-deploy main,
  preview on PRs).

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: `npm test` — required for scoring before any refactor (see Guardrails).

## Guardrails — do not break these
- **Scoring is the IP.** `src/lib/match/engine.ts` (fit-based matching) +
  `src/lib/match/resolve.ts` (breed-name resolution). Never change scoring output
  without the characterization tests (`scoring.test.ts` snapshots, `verify.test.ts`
  breed facts, `engine.invariants.test.ts`) passing or being deliberately re-locked.
- **Payments are server-verified.** One-time unlock. Verify on the server (webhook /
  server action) against an `unlocked_results` record. Never trust a client-side
  unlocked flag; never put gate logic in the client. The locked payload (breed name,
  full ranking, adoption plan) leaves the server only after a verified unlock.
- **RLS on every table.** `breeds` and `shelter_listings` are public-read; everything
  else user-scoped/service-role. Never weaken a policy to make a query pass — fix the
  query.
- **Design tokens only.** HSL semantic tokens in the Tailwind theme. No hardcoded color.
- **AI profile/export data is sensitive.** The AI-profile paste (where the user pastes
  a profile their own ChatGPT/Claude generated) is explicit opt-in. Process it
  server-side, extract only the scoring signal, never log its contents, and don't
  persist raw text beyond what's needed to produce the run.
- **Adopt-first is brand-load-bearing.** Shelter/rescue routes lead every "get this
  dog" surface; breeder guidance appears only when the user asked for it, with vetting
  notes. Never sell dogs, never take listing fees from shelters, never rank breeders.
- **Breed facts must stay true.** The audience knows dogs — a wrong Husky fact kills
  trust. `verify.test.ts` locks the famous facts; dataset edits must keep it green.

## Conventions
- shadcn/ui primitives composed, not rewritten.
- App Router: default to server components; mark client components explicitly.
- Server-only logic (payments, AI calls, privileged queries) in route handlers /
  server actions, never the client. Secrets server-side only.
- Mobile-first — ad + reel traffic is ~80% mobile. Design at 380px, scale up.

## Working agreement
- Propose a plan and wait for approval before any multi-file change, or anything
  touching scoring, payments, auth, RLS, or the AI-export pipeline.
- Small, reviewable commits. One concern at a time.
