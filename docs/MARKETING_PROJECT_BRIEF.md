# Find Your Place — Marketing & Content Strategy Brief

**Purpose of this document:** the complete, standalone context pack for a Claude Project
used as the founder's marketing hub. Everything here reflects the actual built product
and the strategy encoded in the codebase as of July 2026. Use it to plan marketing
strategy, write content, script reels, design ad campaigns, and pressure-test growth
decisions — without needing access to the repo.

---

## 1. What Find Your Place is

**One-liner:** City/place matching for people in their 20s–30s. A fast quiz (or a
profile written by the user's own AI) feeds a deterministic 10-dimension scoring engine
that ranks **250 curated locations worldwide** and reveals their #1 match behind a
one-time **$29 unlock**.

**Elevator pitch (brand narrative):** Where you live decides who you become — your
savings rate, your friendships, your health, your odds of meeting someone. Most people
never actually chose their city: born there, studied there, followed a job, stayed. The
fit between a person and a place is measurable. We measure it across 10 dimensions of
your life, score you against 250 of the best places on Earth, and show you the one that
actually fits. Your #1 exists. It has a name.

**Domain:** findyourplace.app
**Founder:** Shaiden Valentine (personal site: shaidenvalentine.com). The GTM story is
the founder's own relocation ("how I chose Bali → find your place").

**Business goal (north star):** $30,000 in a rolling 30-day window by month 12,
built by a solo founder on three engines: creators/affiliates, founder organic + the
share loop, and Meta ads.

---

## 2. The audience

- **Age 20–35, mobile-first.** ~80% of traffic arrives on a phone from reels and ads.
  Everything is designed at 380px width first.
- **Psychographic:** travel-curious, remote-work-adjacent, "move abroad" curious,
  digital nomads and aspiring ones, people feeling a quiet mismatch with their current
  city. They follow relocation/nomad content and respond to aspirational city footage.
- **Two lifestyle segments the product serves explicitly:**
  - **Rooted** — wants the single best home base on Earth.
  - **Nomadic** — gets an additional "Annual Circuit": a 12-month itinerary across 3–6
    destinations that follows their ideal weather.
- **Where they hang out:** Instagram Reels, TikTok, YouTube Shorts, Pinterest boards,
  and the high-intent communities r/digitalnomad, r/expats, r/IWantOut,
  r/SameGrassButGreener.

---

## 3. The product, in detail

### 3.1 Entry funnel (built and live in the app)

Landing → `/start` (asks current city + choose a path) → Path A or Path B → results.

- **Step 1 — instant opener (both paths):** "Where do you live now?" Powers the
  current-city fit score — the key trust-builder. Personal from the first tap.

- **Path A — AI profile (the HERO path; this is the reel's promise):** the app hands
  the user an engineered prompt mapped to the 10 scoring dimensions. They paste it into
  their OWN ChatGPT or Claude, which writes an honest profile of them from their chat
  history, and they paste the profile back. Copy → paste → copy → paste; no uploads.
  The profile is parsed server-side into structured scoring inputs, then a
  **"here's what we picked up — fix anything we got wrong"** read-back/confirmation
  step runs before scoring. The read-back is itself a marketing moment: "it felt like
  it had known me for years."

- **Path B — quick quiz (fallback, ~60 seconds):** 10 fast tap questions (rooted vs
  roaming, beach vs mountains, climate, noise/energy, work style, community, budget,
  tax sensitivity, safety, top-3 non-negotiables). Every option can fire a reactive
  micro-insight ("Noted — that already reshuffles your whole top 20") for mid-quiz
  dopamine.

- **Deep dive (post-result):** an optional second quiz (daily rhythm, density,
  wellness, healthcare, airport, culture openness, risk tolerance, family proximity,
  industry, deal-breakers) that re-scores the run and raises a visible "match
  confidence" — the "sharpen your match" lever.

### 3.2 The scoring engine (the IP)

Deterministic, not vibes: dynamic weights derived from user priorities × per-place
dimension scores, deal-breaker multipliers that push places down hard, and alignment
bonuses. Locked by characterization tests. **The 10 dimensions:**

1. Climate & Nature
2. Community Fit
3. Career Opportunities
4. Cost of Living
5. Safety & Stability
6. Wellness Ecosystem
7. Social & Dating
8. Travel Connectivity
9. Mobility & Transit
10. Visa & Taxes

### 3.3 The dataset (owned in-repo — a real content asset)

**250 curated places** across 7 continents/regions: Europe 71, Asia 58, North America
47, Africa 23, South America 23, Oceania 19, Middle East 9.

Each place carries 30+ scored attributes usable in content: cost of living, rent,
safety, healthcare, climate, summer/winter temps, humidity, **sunshine days/year**,
beach & mountain access, outdoor, nightlife, wellness, dating scene, community,
English-friendliness, visa-friendliness, tax-friendliness, **personal income tax
rate**, corporate & capital-gains rates, airport connectivity, internet quality,
walkability, transit, culture openness, startup ecosystem, bureaucracy — plus editorial
depth: vibe summary, "the lowdown," the scene, best-for / not-for lists, monthly
budget USD, 1-bed rent USD, and named neighborhoods.

**Marketing implication:** the dataset IS a content engine. Every ranked listicle
("7 beach towns where $2k/mo lives like $6k") is simultaneously content and a product
demo, with real numbers — never invented stats.

### 3.4 The reveal + paywall (the storefront)

- **FREE (trust-builders shown to everyone):**
  - A deterministic **personality read** with an archetype (e.g. The Sun-Chasing
    Nomad, The Altitude Wanderer, The Free-Range Builder, The Settled Cosmopolitan,
    The Coastal Romantic, The Highland Stoic, The Anchored Remote, The Open Explorer)
    plus traits (Coast-seeker, Tax-aware, Night-energy, Wellness-led…).
  - Category fit bars across the 10 dimensions.
  - **The current city's honest fit score** — "brutally accurate" is the intended
    reaction and the moment that earns the sale.
- **LOCKED hook:** the #1 match visibly EXISTS — score ring, blurred photo, continent —
  but never the name. The shape of the answer, not the answer. This is the designed
  peak right before the gate.
- **Paywall:** $29 one-time, anchored "$39 → $29". Email gate before the paywall feeds
  the nurture list.
- **PAID reveal:** the #1 city named, the full 250 ranking, tax deep-dive (income-tax
  comparison vs current country), a move plan, life-change comparison, the annual
  circuit (nomads), and a personalized relocation toolkit.
- **Server-enforced gate:** unlock state is verified server-side; there is no client
  bypass. (Claim-safe: "no, you can't inspect-element your way to the answer.")

### 3.5 Viral surfaces (built)

- **Shareable result cards / share-to-story slides** — the free result is designed as a
  status object with a curiosity gap ("I matched Lisbon — what's yours?").
- **Friend invite + comparison flow.**
- **Live counter** of quiz completions on the landing page (social proof).
- **Custom per-result OG images** so shared links render a branded, personalized card.
- **Public places library** (`/places`) — 250 browsable location pages; the SEO surface
  ("best city for X") is the planned free-traffic channel.

---

## 4. Pricing, monetization & the value ladder

**Current pricing:** $29 one-time unlock (PRICE_CENTS 2900), $39 anchor strike.
Net after payment fees ≈ **$27.26/sale** (~6% processing take). Payment rail at launch:
**Lemon Squeezy** (merchant of record, handles global tax), with Stripe wired as the
alternate rail.

**Planned price testing:** A/B $29 vs $39–49 EARLY (month 2, not month 10). Thesis: a
life decision is underpriced at $29; every extra dollar of margin widens the CAC
ceiling.

**The value ladder (the $29 unlock is rung 2 of 5):**

| # | Rung | Price | Role |
|---|------|-------|------|
| 1 | Free shareable result | $0 | **Distribution.** Non-buyers are the ad budget — optimize the free result to be shared before the paywall ever appears. |
| 2 | The unlock | $29 (test to $39–49) | Impulse buy on a viral moment. |
| 3 | Cohort / community ("Moving to Lisbon" groups) | $99–299 | Recurring-ish; belonging is the product; deepens the share loop. |
| 4 | Concierge relocation (visas, housing, taxes, the move) | $1–5k | High-ticket; a handful/month rivals hundreds of unlocks; uses the ranking + inputs already collected. |
| 5 | Annual re-check ("life changed — re-run your fit") | $19–39/yr | Subscription; turns a one-time transaction into compounding revenue. |

**Ladder note:** most of the money — and all of the durability — is in the rungs above
and below the unlock. **Build down (virality) before building up (upsells).**

**Back-end affiliate revenue (built):** a personalized "relocation toolkit" on paid
results — recommendations read as concierge advice, not ads, FTC-disclosed, routed
through tracked links. Partners: Bright!Tax & Taxes for Expats (tax), SafetyWing &
Genki (insurance), Wise & Mercury (banking), iVisa (visas), Skyscanner (flights),
Booking.com & Blueground (stays), Airalo (eSIM), NordVPN, Sirelo (movers), Coworker
(coworking), italki (language). Several are recurring-commission.

**Order bump (planned, month 5):** small checkout upsell (deeper tax dive / circuit
add-on) to lift AOV and the CAC ceiling.

---

## 5. Brand voice & visual identity

### 5.1 Voice (from the in-repo brand system)

Confident, specific, a little cinematic. Second person. Short lines. Zero corporate
speak. Max 1 emoji per caption, none on slides or in the UI. The audience is 20–35,
mobile, arriving from reels/ads about choosing where to live.

**Core narrative (memorize this — every piece of content advances it):**
> Where you live decides who you become. Most people never chose it. The fit between
> you and a place is measurable. Your #1 exists.

**Live copy examples (actual product copy — use as the voice benchmark):**
- Hero: "The biggest decision you *haven't* made yet."
- "You don't pick a city. A city picks you."
- "You weren't built for everywhere. But somewhere on Earth was built for you."
- "The wrong city taxes everything — your savings rate, your friendships, your health,
  your odds of meeting someone."
- Stakes stats: "The same income can mean 6× the lifestyle — or 6× less — depending on
  where you spend it." / "Move from a 45% tax country to a 0% one and a $120k salary
  keeps roughly $54k more a year." / "Where you live decides who you meet. Your
  friends, your partner, your future — all downstream of one decision."
- CTA line: **"Take the 60-second quiz → findyourplace.app"**
- Testimonial style: "It named a city I'd never have picked — and it was so obviously
  right I booked a scouting trip that week." / "The current-city score was brutally
  accurate. That's when I knew the #1 was worth unlocking."

**Standard hashtag set:** #findyourplace #wheretolive #relocation #digitalnomad
#movingabroad #expatlife #costofliving #travel2026 #lifedesign #geoarbitrage

### 5.2 Visual identity (for creatives, cards, carousels)

Dark, editorial, **liquid glass**. Deep blue-charcoal canvas, frosted dark-glass
panels, near-white ink, ONE teal accent reserved for data (scores, rings, deltas),
warm gold + teal ambient glows. Typography: Space Grotesk — large light-weight display
headings with tight tracking, tiny uppercase letter-spaced labels, one italic word as
the accent. **No emojis in brand surfaces; vector icons only.** Premium, calm,
dashboard-grade — deliberately not "default UI." Reference north star: the SOMA
glucose-monitor dashboard aesthetic. The signature product visual is the teal score
ring on dark glass. Brand mark: a teal pin holding a globe on a dark tile.

Instagram carousels render as branded 4:5 slides in this system (hook slide → ranked
list slides with real stats → insight slide → CTA slide).

---

## 6. GTM & the 12-month growth plan

### 6.1 Launch motion

The whole top-of-funnel is a **founder reel**: "How I chose Bali → find your place."
Story-first; the quiz is the CTA. It drives followers plus Meta ads, and every result
produces a shareable card — the share loop is what lowers ad CAC.

### 6.2 Unit economics (the math the plan runs on)

Funnel assumptions (tunable as the pixel learns):
- Landing → start: **45%**
- Start → completed scored run: **55%**
- Complete → purchase: **8%** (carried by the locked #1 + current-city trust)
- End-to-end landing → purchase: **~2.0%**

At $29 with ~$27.26 net/sale, the $30k month requires:
- **~1,035 sales/month (~35/day)**
- **~12,940 completed runs/month**
- **~52,300 landing views/month (~1,745/day)**

**CAC discipline:** kill any ad set with CAC above net-per-sale (~$27 minus creator
cut); scale sets under ~$18.

### 6.3 Steady-state channel mix (virality-first)

| Channel | Share | Note |
|---|---|---|
| Creator / affiliate reels | 45% | ~40–50 active creators posting the format; the payout engine is the flywheel. |
| Founder organic + share loop | 35% | Every result card shared back to a friend. Once k > 1 this is THE engine. Near-zero CAC — the real moat. |
| Meta ads | 20% | The amplifier and points farm — deliberately NOT load-bearing. Run at breakeven for volume. |

### 6.4 The month-by-month ladder (rolling-30-day revenue targets)

**Phase 1 — Prove the funnel (M1–2):** M1 $1k — ship the hero reel, watch real cold
runs, hand-pick 5 creators, confirm the pixel, design the result to be shared.
M2 $2.5k — price test $29 vs $39–49 NOW, measure k-factor (shares-per-result ×
signups-per-share), make the free result a status object, read 20 real runs and delete
the biggest leak, sharpen the locked #1.

**Phase 2 — Ignite paid + creators (M3–5):** M3 $4.5k — first ads at $20–40/day using
the best organic reel, ship the 4–5 email nurture, set the CAC ceiling, 15 creators,
first payout cycle. M4 $7k — scale the winning ad set, 3 fresh hooks weekly, 20
creators + leaderboard, weekly funnel review. M5 $10k — first five-figure month:
balance the three channels, test an order bump, systematize support, add retargeting.

**Phase 3 — Compound (M6–9):** M6 $13k — self-serve creator signup + asset kit, 30
active creators, watch cohorts. M7 $16.5k — harden CAPI, build a creative pipeline
from creator reels, careful audience expansion, test a second geo. M8 $20k — honest
unit-economics audit, invest in top 10 creators, win-back email. M9 $23k — ~45 active
creators, second platform (TikTok/Shorts), ship 10 SEO location pages.

**Phase 4 — Land $30k & make it durable (M10–12):** M10 $26k — price test $29 vs $34,
squeeze the paywall, find the paid ceiling. M11 $28.5k — launch the consult upsell,
protect the ad account (refund rate, clean claims), 30 SEO pages. M12 $30k — all
engines firing, no single point of failure, hold it a second consecutive window, then
pick the next mountain ($50k needs a new lever: new geos, subscription, productized
consult).

### 6.5 The three advisor lenses (gut-check every decision)

- **Elon (first principles):** the engine + dataset is the moat, not the quiz. The best
  step is a deleted one. "Can I delete a step instead of adding one? Is the product
  undeniable — or am I optimizing hacks while the funnel leaks?"
- **Naval (leverage + the long game):** code × media leverage; own the audience, not
  the transaction; price the life decision; build the ladder. "Am I building an asset
  that compounds — audience, brand, data — or renting growth I'll re-buy next month?"
- **Nikita Bier (the app is the ad):** growth is the free result, not the ad spend.
  Design the result as a status object; measure k-factor; sharing must happen before
  the wallet. "Why would someone share their result? What's the identity payload +
  curiosity gap?"

**The consensus warning already on record:** the plan is over-indexed on the two
lowest-leverage layers (paid ads, card-points farming) and under-indexed on the two
that compound (a viral free result, and a ladder with recurring + high-ticket). Points
are a reward once the machine works, not the machine.

---

## 7. Paid acquisition playbook

### 7.1 Platform ranking (for THIS product: a $29–49 visual, aspirational impulse unlock)

1. **Instagram Reels (Primary)** — the GTM already lives here; warmest audience for a
   "where should I live" impulse buy.
2. **TikTok (Primary)** — cheapest short-video reach; same reels repurpose 1:1; run
   organic first, whitelist winners as ads.
3. **Meta ads / Advantage+ (Primary paid)** — organic reels become the creative,
   lookalikes off actual buyers, server-side CAPI already wired; optimize for purchase.
4. **YouTube Shorts + long-form "why I moved to X" (Compounding)** — captures
   high-intent searchers; feeds SEO.
5. **Pinterest (Secondary)** — underrated for relocation planning; planner mindset;
   aspirational city boards map onto result cards.
6. **Reddit + expat/nomad communities (Organic only)** — highest intent anywhere, but
   they punish anything that smells like an ad. Show up as a person, not a brand.

**Skip:** LinkedIn (wrong headspace, brutal CPMs), display/banner networks (junk
traffic), paid Google Search early (that intent is captured free by the SEO location
pages).

### 7.2 Meta best practice, 2026, bootstrapped edition

- **Creative is the lever, not targeting.** Launch 8–15 genuinely different creatives;
  add 3–5 fresh ones weekly against fatigue.
- **Your best organic reels ARE your best ads.** Native, vertical, captions on, hook in
  the first 2 seconds. Ads that look like ads lose to content that happens to sell.
- **Go broad; let the AI target.** Advantage+ Sales, purchase-optimized, minimal
  audience restriction; first-party signal (pixel + CAPI + email list) beats
  hand-stacked interests.
- **Start small.** $20–50/day purchase-optimized; ignore the "$3–5k/mo minimum" advice
  (that's for scaled ecom). Prove complete→purchase, THEN scale.
- **Scale slowly.** +15–20% budget every 3–4 days; watch CPA 48h after each bump; big
  jumps reset learning.
- **CAPI is the cheapest CAC win.** Clean deduped server events = cheaper conversions.
- **Retarget paywall-viewers** with the $39→$29 anchor + a real testimonial — the
  cheapest sales available.
- **Judge everything against margin.** CAC vs ~$27 net (minus creator cut). At $29 the
  headroom is thin — which is why price and creative matter so much.

### 7.3 Card-points side-quest (context, not strategy)

Ad spend routes through rewards cards (Amex Business Gold 4×, Chase Ink Preferred 3×,
flat-2% overflow; Ramp/Brex as ops backbone). Long-term dream: 200k transferable
points/month (business-class travel for two) — which honestly requires ~$62.5k/mo ad
spend across a two-player multi-card stack, i.e. a ~$90–100k/mo business. Rules: pay in
full always, welcome bonuses beat multipliers, it's a rebate (2–8% off CAC) that never
makes a bad ad profitable. Treat as cherry-on-top; never let it drive decisions.

---

## 8. The content machine

### 8.1 Content Studio (built into the admin)

Generates Instagram carousels and Meta ad variants in two modes: a **data engine**
(always on — composes ranked carousels straight from the 250-place dataset, real names,
real scores) and an **LLM engine** (brand-voiced hooks/captions/ad copy, grounded in
real dataset numbers, never invented stats). Output renders as branded 4:5 slides,
downloadable as PNGs.

### 8.2 The six proven data angles (each is a carousel AND a reel premise)

1. **Cheap paradise:** "7 beach towns where $2k/mo lives like $6k" — your money is
   worth 3× somewhere.
2. **Tax-friendly:** "The places that tax you least" — same income, wildly different
   take-home; tax residency is a choice most people never realize they have.
3. **Sunshine:** "320+ days of sun. Every year." — seasonal sadness is optional;
   sunlight is the cheapest antidepressant ever invented.
4. **Nomad capitals:** "Where you won't be the only one" — loneliness kills more
   relocations than money ever will.
5. **Safe AND cheap:** "Safe and cheap. Pick both." — 'you get what you pay for' is a
   lie in geography.
6. **Nightlife:** "Cities that never run out of nights" — for the ones whose battery
   charges in a crowd.

Carousel formula: hook slide (<60-char scroll-stopper) → up to 6 ranked real places
with one stat each → one insight slide advancing the narrative → CTA slide to the
60-second quiz.

### 8.3 Proven ad angles (from the studio's variant set)

- **Identity:** "The city you live in quietly decides who you become… most people
  never chose theirs."
- **Data/proof:** "We scored 250 places on 10 dimensions… see how well your current
  city really fits you. The result feels like being read by someone who knows you."
- **Curiosity:** "There's a city where your rent is halved, your winters are warm, and
  your people already live. It has a name."
- Additional angles to rotate: loss-aversion, founder-story.

### 8.4 Reel formats that map to the product

- **Founder story (the hero):** "How I chose Bali" — story-first, quiz as CTA.
- **AI-path demo:** screen-record the ChatGPT/Claude prompt → paste → read-back →
  locked #1. The "it really gets me" moment is inherently filmable.
- **Current-city roast:** "I asked it to score the city I already live in. It was
  brutally honest." (Trust-builder as content.)
- **Result-share loop:** "I matched Lisbon — what's yours?" (status object + curiosity
  gap; the k-factor engine.)
- **Dataset listicles:** any of the six angles above as talking-head or b-roll reels.
- **Archetype content:** "Which relocation archetype are you?" (Sun-Chasing Nomad,
  Highland Stoic, etc.) — quiz-adjacent identity content.

---

## 9. The creator / affiliate program (built)

- **Offer:** creators promote with a ref link and earn **50% of every $29 unlock —
  $14.50 per sale, attributed for life** (i.e., on conversions from their link).
- **Infrastructure already live:** public `/creators` landing + signup, a full creator
  portal (stats, links, conversions by day, settings), click attribution, admin
  controls, and a payout runner in the admin ("pay creators on time from the Payouts
  tab — fast, reliable payouts are how you keep and refer more creators").
- **The playbook:** month 1 hand-pick 5 small relocation/nomad accounts via warm DMs
  (ref link + reel template); month 3 publish self-serve apply flow (15 creators);
  month 4 leaderboard/bonus for competition (20); month 6 asset kit — templates, top
  hooks, do/don't, example reels (30 active); month 8 invest in the top 10 (bonus
  tier, early features, a call); month 9 ~45 active + push them onto TikTok/Shorts so
  the program isn't single-platform.
- **Definition of "active":** posted + drove a click in the last 30 days. Track
  sales-per-creator by join cohort; fix onboarding before recruiting more if new
  cohorts underperform.
- Creator reels double as the Meta ads creative library.

---

## 10. Measurement & instrumentation

- **First-party event taxonomy (built):** `landing_view` → `quiz_start` → `quiz_step`
  (per-question drop-off) → `quiz_complete` → `results_view` → `paywall_view` →
  `checkout_start` → `purchase`, with entry-path (A vs B) split and source attribution.
  Admin analytics renders the full funnel by channel.
- **Meta Pixel + server-side Conversions API (built):** fired client + server for match
  quality and dedup. Rule: confirm events fire in Meta Events Manager BEFORE spending
  a dollar on ads.
- **The numbers that matter, in order:**
  1. **k-factor** (shares-per-result × signups-per-share) — obsess over this; k > 1
     means ads are optional.
  2. **Complete → purchase rate** (assumed 8%; a 1-point lift is worth real money).
  3. **Blended CAC vs ~$27 net-per-sale** (including creator cut + fees — profitable on
     the marginal sale, not just gross).
  4. Rolling-30-day revenue vs the month ladder.
  5. Refund rate (protects the ad account).
- **Admin command center (built):** live revenue vs the plan ladder ("you are here"),
  customers, leads export, creator payouts, system health, Content Studio.

---

## 11. Claims discipline & privacy guardrails (matters for marketing copy)

- **Never scrape Instagram or any social platform** — violates TOS, endangers the Meta
  ad account. All identity signal is consent-based user input. **No facial analysis.**
  (So: never market anything implying "we analyzed your Instagram.")
- **The AI-profile paste is sensitive personal text:** explicit opt-in, processed
  server-side, contents never logged, raw text not persisted beyond producing the run.
  This is a marketable privacy stance — "your profile stays yours."
- **Never invent statistics in content.** Every number cited must come from the real
  dataset. (The Content Studio enforces this; humans should too.)
- **Honest ads, low refund rate, clean claims** — an ad account ban erases a channel
  overnight.
- Results framing: the engine is deterministic scoring on real data — confident
  language is fine ("your #1 exists"), but don't promise life outcomes.
- Affiliate recommendations carry FTC disclosure.

---

## 12. Current build status (July 2026)

**Live/built:** full funnel (landing → start → both entry paths → free read → locked #1
→ paywall → server-verified paid reveal), scoring engine locked by tests, 250-place
dataset owned in-repo, Lemon Squeezy (launch rail) + Stripe payments both wired with
webhooks, email capture, Meta Pixel + CAPI, first-party analytics + admin funnel view,
share cards/slides + per-result OG images, live counter, friend invites, public places
library, personalized affiliate toolkit, complete creator program (signup → portal →
attribution → payouts), admin command center with the 12-month plan tracker and
Content Studio, custom-domain-ready on Vercel.

**Stack (context only):** Next.js 16 App Router, React 19, TypeScript, Tailwind v4,
Supabase (DB/Auth/Storage), deployed GitHub → Vercel.

**Not yet done / next up (per the plan):** the hero founder reel itself, first creator
recruits, ESP nurture sequence hookup, first ad spend, price A/B, k-factor
measurement, SEO location pages (planned M9+), cohort/community and concierge rungs of
the ladder, annual re-check subscription.

---

## 13. Key numbers cheat sheet

| Metric | Value |
|---|---|
| Price / anchor | $29 one-time ($39 strike); test $39–49 early |
| Net per sale after fees | ~$27.26 |
| Creator commission | 50% = $14.50/sale, lifetime attribution |
| North star | $30k rolling 30-day by month 12 |
| Sales needed at $29 | ~1,035/mo (~35/day) |
| Landing views needed | ~52,300/mo (~1,745/day) at 2.0% end-to-end |
| Funnel assumptions | 45% land→start · 55% start→complete · 8% complete→purchase |
| CAC rules | kill > ~$27; scale < ~$18 |
| Dataset | 250 places · 7 regions · 30+ attributes each |
| Scoring | 10 dimensions, deterministic, deal-breaker multipliers |
| Steady-state mix | creators 45% · founder/share 35% · ads 20% |
| Ad starting budget | $20–50/day, purchase-optimized, best organic reel as creative |
| Creator roster targets | 5 (M1) → 15 (M3) → 20 (M4) → 30 (M6) → 45 (M9) |
| Nurture | email gate pre-paywall → 4–5 email sequence re-teasing the locked #1 |
| CTA line | "Take the 60-second quiz → findyourplace.app" |

---

## 14. How to use this Project

Treat this brief as ground truth about the product, brand, and strategy. Good working
threads to run against it:

- **Content calendar & reel scripts** — hooks, shot lists, and captions in the brand
  voice, drawing on the six data angles, the archetypes, and the founder story.
- **The hero reel** — script and iterate the "how I chose Bali" launch reel (the single
  highest-leverage asset in month 1).
- **Creator program assets** — outreach DMs, the reel template, the asset kit,
  leaderboard mechanics, creator landing copy.
- **Ad creative & testing plans** — 8–15 distinct creatives per the Meta playbook,
  angle rotations, retargeting copy against the $39→$29 anchor.
- **Nurture sequence** — the 4–5 email arc re-teasing the locked #1 for the ~90% who
  don't buy on the spot, plus the win-back.
- **Virality engineering** — result-card copy, curiosity-gap variants, k-factor
  experiments; always ask Nikita's question ("why would someone share this?").
- **Strategy reviews** — pressure-test decisions against the three advisor lenses and
  the month ladder; keep the consensus warning in view (compound the free result and
  the ladder; don't over-rotate on ads and points).

When real funnel data arrives (k-factor, complete→purchase, CAC by channel), update
Section 6's assumptions — the whole plan is built to be re-tuned against live numbers.
