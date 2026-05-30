# Find Your Place — Production Build Plan

The rebuild roadmap. Complements `CLAUDE.md` (the persistent operating guide).
Hand Claude Code ONE phase at a time. Each phase has a definition of done — don't
move on until it's met.

## Frame
This is NOT a cleanup of the Lovable export. It's a fresh Next.js app into which we
port four validated assets. Keep the knowledge, rebuild the implementation.

**Port from the prototype (validated — reimplement cleanly, with tests):**
- Scoring logic (`scoring.ts`) — the algorithm IP
- The 193-location dataset + score data
- The funnel mechanic: free read → tease → locked #1 → paywall
- Viral surfaces: shareable result cards, friend invite, live counter (these lower CAC)

**Rebuild fresh:** UI, components, routing, page composition, design system, server logic.
**Discard:** all Lovable-specific code, Supabase edge functions, and anything not
serving the paid-results model.

## Launch context
GTM is a founder reel ("how I decided to live in Bali → take the quiz to find
yours") driving followers, plus Meta ads. So the front of the funnel must convert
cold mobile traffic in seconds, and every result must produce a shareable card —
that share loop is what lowers ad CAC.

## Baked assumptions (correct before starting if wrong)
- Stack: Next.js (App Router) + Supabase (DB/Auth/Storage) + Stripe, GitHub → Vercel.
- Price: test ~$19 one-time unlock (anchored above the prototype's $10).
- Channel: founder reel + Meta ads primary; shareable cards secondary.
- SEO (193 location pages) is now low-cost on Next — available near-term, not blocked.

---

## Phase 0 — Foundation (Next.js)
**Goal:** a clean repo that builds and deploys, with validated assets ported in.
- Scaffold Next.js (App Router) + TS + Tailwind + shadcn/ui.
- Stand up a NEW Supabase project. Recreate the schema via clean migrations (do not
  carry Lovable migration history). Re-seed the 193 locations.
- Port `scoring` + `circuitGenerator` as clean modules WITH characterization tests
  that lock current outputs before any refactor.
- Move all server logic into Next route handlers / server actions (Stripe, AI calls,
  privileged queries). No Supabase edge functions.
- Wire GitHub → Vercel: auto-deploy main, preview deploys on PRs, env in dashboard.
- Zero Lovable artifacts (tagger, AI gateway, CORS allowlists, OG tags, README).
- **Done when:** `npm run build` green, deploys to a Vercel preview, scoring tests
  pass, locations query returns 193 rows.

## Phase 1 — Design system & shell
**Goal:** the visual identity + app skeleton before any feature screens.
- Mobile-first (design at 380px). Dark / modern / minimal identity.
- HSL semantic tokens + type scale in the Tailwind theme. Never hardcode color.
- Core component kit on shadcn (buttons, inputs, cards, progress, modal, sheet).
- Landing page built to receive reel traffic: echoes the founder story, loads
  instantly, one obvious CTA into the quiz.
- App shell + routing: landing, entry/quiz, results, auth, dashboard.
- **Done when:** shell navigates end-to-end on a phone and looks like a real product.

## Phase 2 — Entry experience (conversion-critical front)
**Goal:** fastest path from landing to a scored run, built for the reel audience.
Two paths feed the SAME scoring engine; the user chooses on the entry screen.

- **Step 1 — instant opener (both paths):** "Where do you live now?" (single input).
  Powers the current-city fit score, the key trust-builder. Personal from the first tap.

- **Path A — AI profile (HERO path; this is the reel's promise):** hand the user a
  prompt engineered around our 10 scoring dimensions. They paste it into their OWN
  ChatGPT or Claude, which writes a profile from their history, and paste the profile
  back. No file export, no upload, no waiting — copy → paste → copy → paste.
  - The only real friction is the app-switch (leaving the site to run the prompt).
    The reel audience self-selects for people who'll happily do this, but never force
    it — Path B is always one tap away.

  Starting prompt (refine in-build; keep it mapped to the 10 dimensions):
  ```
  You know me from everything we've talked about. I'm using a tool that recommends
  where in the world I should live, based on a detailed profile. Write that profile
  about me — specific, honest, drawn from our actual conversations, no flattery.
  Cover each of these, and write "unknown" where you genuinely lack signal:

  1. Where I live now and how I actually feel about it
  2. Climate & environment I'm drawn to — and what I can't stand
  3. Daily rhythm: city vs nature, fast vs slow, routine vs spontaneity
  4. Work & career: what I do, my ambition, whether I need a scene/network around me
  5. Social life: how social I am, who I want near me, family proximity, dating
  6. Money: rough monthly budget to live well, how tax-sensitive I am
  7. Temperament: freedom vs stability, novelty vs consistency, risk tolerance
  8. Health & wellness: how central fitness/wellness is, any healthcare needs
  9. Movement: rooted vs nomadic, how much I travel, airport/connectivity needs
  10. My top 3 non-negotiables in a place, and my top 3 deal-breakers

  End with one paragraph on the kind of place that would actually make me thrive.
  ```

- **Path B — quick quiz (fallback):** the 9 dimensions as a fast, gamified, tap/swipe,
  image-driven flow for anyone not on ChatGPT/Claude (or who'd rather just tap). Cut
  any question that doesn't move the score. Persist progress.

- **Normalization + confirmation (Path A — critical):** the pasted profile is freeform
  text from a model we don't control, of varying depth. Parse it server-side (LLM) into
  structured scoring inputs across the 10 dimensions, then show a "Here's what we picked
  up — fix anything we got wrong" confirmation step BEFORE scoring. This stops a
  confident mismatch from landing right at the paywall, and the read-back itself
  amplifies the "it really gets me" effect.

- **Privacy:** the pasted profile is sensitive personal text. Explicit opt-in, process
  server-side, never log its contents, don't persist raw text beyond producing the run.
  NO social scraping, NO facial analysis (see CLAUDE.md).

- **Done when:** both paths produce a correctly scored run on mobile; Path A round-trips
  (prompt → paste → normalized inputs → confirmation → score); current-city fit computes;
  the entry screen lets the user choose with no dead ends.

## Phase 3 — Reveal + paywall (the storefront — most design love)
**Goal:** the conversion surface. This is where money is made; treat it as the hero.
- FREE (build trust the engine is smart): personality read, category bars, and the
  CURRENT city's fit score. The accurate read on where they already live earns the sale.
- LOCKED hook: show the #1 match EXISTS — score ring, blurred photo, continent — but
  never the name. They see the shape of the answer, not the answer.
- Paywall: clear value, ~$19, optional "$29 → $19 today" anchor frame.
- PAID reveal: the #1 city, full 193 ranking, tax deep-dive, annual circuit (nomadic).
- Pace it as a designed moment — the locked #1 is the peak right before the gate.
- **Done when:** the reveal runs on mobile, the gate holds (no client bypass), paid
  state shows the full result.

## Phase 4 — Monetization wiring
**Goal:** take money reliably; don't lose the non-buyers.
- Stripe one-time checkout, server-verified (webhook/server action → `unlocked_results`).
- Email gate before the paywall → push captures to an ESP (Resend/Loops/ConvertKit).
- Nurture sequence for the ~90% who don't buy on the spot (re-tease the locked
  result, social proof, price anchor).
- **Done when:** a test purchase unlocks server-side, a captured email enters the
  sequence automatically.

## Phase 5 — Growth instrumentation + viral loop
**Goal:** never run ads blind; make every result shareable.
- Meta Pixel + Conversions API (server-side) wired BEFORE the first ad/reel push.
- Event taxonomy: `landing_view`, `quiz_start`, `quiz_complete`, `paywall_view`,
  `purchase` — fired client + server (CAPI) for match quality and dedup.
- Shareable result cards as the reel→share→friend loop. Generate a custom per-result
  OG image at the edge with `@vercel/og` (native to Next) so shared links render a
  branded, personalized card — not a generic preview.
- **Done when:** a full funnel run shows all five events in Meta Events Manager with
  dedup working, and a shared result link renders its own OG card.

## Phase 6 — Launch
**Goal:** ship.
- QA the full funnel on real devices. Audit RLS on every table. Confirm the export
  pipeline deletes raw files and logs nothing sensitive.
- Lighthouse pass — reel + ad + mobile traffic punishes slow loads; target fast LCP.
- Custom domain on Vercel. OG/Twitter tags render our brand.
- Publish the reel; turn ads on with a small test budget; watch
  `(quiz_complete → purchase rate × price) vs CAC`.
- **Done when:** live on the domain, funnel events firing, reel out, first ad set running.

---

## Phase 2+ (post-launch, decide later)
- SEO: 193 server-rendered "best city for [X]" pages — now cheap on Next; spin up if
  organic becomes a channel bet.
- Consultation upsell: high-ticket "relocation strategy session" button on the PAID
  results page, with an advisor view of the user's inputs + ranking.
