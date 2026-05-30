# Find Your Place — Claude Code Operating Guide

@SPEC.md — original prototype product & architecture spec (reference only; the
prototype is being rebuilt, not extended)
@BUILD_PLAN.md — the phased production roadmap (build against this)

## One-liner
City/place matching for 20–30s. A fast quiz feeds a deterministic 10-dimension
scoring engine that ranks 193 curated locations, revealed behind a one-time
paywall (~$19). Launch is reel-driven ("how I chose Bali → find your place").

## Stack
- Next.js (App Router) + React + TypeScript + Tailwind + shadcn/ui.
- Supabase for DB (Postgres) + Auth + Storage ONLY.
- Server logic = Next.js route handlers / server actions. NO Supabase edge functions.
- Stripe for the one-time unlock. GitHub → Vercel (auto-deploy main, preview on PRs).
- This is a fresh build. We port four validated assets from the prototype and
  rebuild everything else. See BUILD_PLAN "Frame".

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests: required for scoring before any refactor (see Guardrails).

## Guardrails — do not break these
- **Scoring is the IP.** Port `scoring.ts` / `circuitGenerator.ts` logic into clean,
  TESTED modules. Never change scoring output without characterization tests that
  lock the current behavior first.
- **Payments are server-verified.** One-time unlock. Verify on the server (Stripe
  webhook / server action) against an `unlocked_results` record. Never trust a
  client-side unlocked flag; never put gate logic in the client.
- **RLS on every table.** `locations` is public-read; everything else user-scoped.
  Never weaken a policy to make a query pass — fix the query.
- **Design tokens only.** HSL semantic tokens in the Tailwind theme. No hardcoded color.
- **AI profile/export data is sensitive.** The AI-profile paste (where the user
  pastes a profile their own ChatGPT/Claude generated) is explicit opt-in. Process it
  server-side, extract only the scoring signal, never log its contents, and don't
  persist raw text beyond what's needed to produce the run.
- **No scraping, no facial analysis.** Never scrape Instagram or any social platform
  (violates TOS, endangers the Meta ad account, legally fraught). All identity signal
  comes from consent-based user input only. Never gather or analyze facial images.

## Conventions
- shadcn/ui primitives composed, not rewritten.
- App Router: default to server components; mark client components explicitly.
- Server-only logic (Stripe, AI calls, privileged queries) in route handlers /
  server actions, never the client. Secrets server-side only.
- Mobile-first — ad + reel traffic is ~80% mobile. Design at 380px, scale up.

## Working agreement
- Propose a plan and wait for approval before any multi-file change, or anything
  touching scoring, payments, auth, RLS, or the AI-export pipeline.
- Small, reviewable commits. One concern at a time.
