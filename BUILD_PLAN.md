# Find Your Dog — Production Build Plan

The roadmap. Complements `CLAUDE.md` (the persistent operating guide). Hand Claude Code
ONE phase at a time. Each phase has a definition of done — don't move on until it's met.

## Frame
Find Your Dog is the dog-breed sibling of Find Your Place: the SAME validated funnel
(free read → tease → locked #1 → paywall), the SAME fit-based scoring architecture and
server-enforced gate, rebuilt around a new domain:

**Ported from Find Your Place (mechanics, reimplemented for dogs, with tests):**
- Fit-based scoring engine (neutral unexpressed axes, hard constraints,
  revealed-preference resonance) over 10 dog-match dimensions
- The trust-builder: honest fit score for the breed the user THOUGHT they wanted
  (the analog of current-city fit)
- The funnel mechanic: free read → tease → locked #1 breed → paywall
- Viral surfaces: shareable result cards, live counter

**New to this product:**
- 170-breed dataset with 23 trait scores each, owned in-repo, locked by breed-fact tests
- Cost-of-ownership deep-dive (replaces the tax deep-dive)
- The adoption layer: every paid result routes to real adoptable dogs near the user
  (Petfinder/Adopt-a-Pet/breed-rescue searches), plus which of their top matches are
  shelter-common. `/adopt` is a free shelter listing surface — shelters list free,
  always. This is the mission: get shelter dogs into right-fit homes.

## Launch context
GTM is a founder reel ("I almost got the wrong dog — here's how I found the right one →
take the quiz") plus Meta ads. Front of funnel must convert cold mobile traffic in
seconds; every result produces a shareable card; the adoption mission is the share hook.

## Baked assumptions (correct before starting if wrong)
- Stack: Next.js (App Router) + Supabase (DB/Auth/Storage) + Stripe/Lemon Squeezy,
  GitHub → Vercel.
- Price: test ~$19 one-time unlock.
- Channel: founder reel + Meta ads primary; shareable cards + adoption mission secondary.
- SEO: 170 breed pages + "best breeds for [X]" — cheap on Next, available near-term.

---

## Phase 0 — Core port (DONE on this branch)
- 10-dimension dog engine (`src/lib/match/engine.ts`) + breed resolution
  (`resolve.ts`), locked by characterization + invariant + breed-fact tests.
- 170-breed dataset (`src/data/breeds.json`), schema-validated.
- Both entry paths (AI-profile paste + quiz) producing scored runs; dream-breed
  trust-builder; cost-of-ownership; adoption plan on the paid surface.
- Server-enforced gate + both payment rails carried over intact.
- Migrations rewritten for the dog schema (breeds, shelter_listings, plan_json).
- **Done when:** `npm run build` green, tests pass, funnel clicks end-to-end locally.

## Phase 1 — Polish pass on the money surfaces
- Reveal/paywall design love: the locked #1 (score ring, breed group + size, blurred
  silhouette) is the peak moment — art-direct it.
- Breed photography: source a consistent image set (license-safe), wire `image_url`,
  regenerate share cards with real dogs.
- QA both paths on real phones at 380px; kill any dead end.
- **Done when:** the reveal feels like a designed moment on a phone.

## Phase 2 — Monetization wiring
- Payment rail live (LS or Stripe), server-verified unlock tested with a real card.
- Email gate before the paywall → ESP; nurture for non-buyers (re-tease the locked
  breed, adoption-mission social proof, price anchor).
- **Done when:** a test purchase unlocks server-side; a captured email enters the
  sequence automatically.

## Phase 3 — The adoption layer becomes real
- `shelter_listings` intake: a simple form + review flow so local shelters/rescues can
  list dogs free (service-role write, public read).
- Surface real listings on `/adopt` and inside paid results when breed + location match.
- Partnerships: 5–10 local shelters seeded at launch city.
- **Done when:** a real shelter dog appears in a paid result's "bring them home" plan.

## Phase 4 — Growth instrumentation + viral loop
- Meta Pixel + Conversions API (server-side) wired BEFORE the first ad/reel push.
- Event taxonomy: `landing_view`, `quiz_start`, `quiz_complete`, `paywall_view`,
  `purchase` — client + server (CAPI) with dedup.
- Per-result OG share cards via `@vercel/og` (breed silhouette + score for free runs,
  the named breed for unlocked runs).
- **Done when:** full-funnel events show in Meta Events Manager with dedup; a shared
  result link renders its own OG card.

## Phase 5 — SEO surface
- 170 breed pages (`/breeds/[id]`) indexed; "best breeds for apartments / runners /
  families with toddlers / allergies" programmatic pages fed by the same engine.
- **Done when:** breed pages are indexed and the first programmatic page ranks for a
  long-tail query.

## Phase 6 — Launch
- QA the full funnel on real devices. Audit RLS on every table. Confirm the AI-profile
  pipeline logs nothing sensitive.
- Lighthouse pass — target fast LCP on the landing.
- Custom domain, OG/Twitter tags, publish the reel, ads on small test budget; watch
  `(quiz_complete → purchase rate × price) vs CAC` and adoption-click-through.
- **Done when:** live on the domain, funnel events firing, reel out, first ad set
  running, first adoption click recorded.

---

## Post-launch (decide later)
- Breeder-vetting content path (only ever guidance, never rankings/marketplace).
- "New dog starter" affiliate toolkit expansion (insurance, food, training).
- Shelter dashboard: self-serve listing management once volume justifies it.
