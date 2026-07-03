# Affiliate Programs — Study & Signup Checklist

> Research date: **2026-07-03** · Audience: mostly-US 20–30s relocating abroad / going nomad
> Companion to `src/lib/affiliates.ts` (the in-app catalog) and the `AFF_*` block in `.env.example`.
>
> **Verification key:** ✅ = confirmed on an official program page/network listing · ⚠️ = third-party
> roundup / search-snippet only — confirm the exact number inside the network dashboard before
> counting on it. Most brands' affiliate pages block automated reading, so several figures are
> directional. None of this changes *which* programs to join — only the precision of the payout.

## 1. Summary

Five programs will carry most of the revenue: **SafetyWing** (~10% of premium, *recurring* on
every renewal, 364-day cookie — the best long-tail earner here), **Wise** (£10/personal,
£50/business per qualified signup, effectively lifetime cookie, near-universal relevance),
**NordVPN** (40–100% on new signups + 30% recurring on renewals), **Taxes for Expats** ($75 cash
per paying client — high intent right under our tax card), and **iVisa** (20% of service fees
with a 365-day cookie). The lottery tickets are **Deel** (up to $1,500 per converted customer)
and **doola** (tiered to ~$1,000) — low conversion odds from a consumer audience, but one
conversion pays for a month of ads. Two incumbents turned out to be duds: **Bright!Tax** has no
cash affiliate program at all, and **Booking.com killed its small-partner program in May 2025**
(now ~4% via Awin). Sign up for the top five first; they're all free, self-serve, and approve in
days.

Networks you'll end up with accounts on: **Impact** (Airalo, FlexJobs, TrustedHousesitters,
+alternates), **Partnerize** (Wise), **PartnerStack** (Deel), **Awin** (Booking.com), **Rakuten**
(Lingoda), plus a handful of in-house dashboards (SafetyWing, NordVPN, iVisa, TFX, Sirelo,
italki, Flatio, doola).

## 2. Ranked payout comparison

Sorted by expected value for THIS audience (payout × conversion likelihood × relevance — not
headline payout). The `priority` column is the exact number in `PARTNERS[]`; this table is the
ordering source of truth.

| # | Partner | Category | Program / Network | Commission | Cookie | Recurring | Fit (1–5) | priority | Status |
|---|---------|----------|-------------------|------------|--------|-----------|-----------|----------|--------|
| 1 | Taxes for Expats | tax | In-house | $75 flat OR 15% cap $250/client ⚠️ | unknown | — | 5 | 90 | ☐ |
| 2 | SafetyWing | insurance | In-house (Ambassador) | ~10% of premium ✅ | 364d ✅ | **Yes** ✅ | 5 | 90 | ✅ signed up |
| 3 | Wise | banking | Partnerize | £10 personal / £50 business ✅ | no expiry ✅ | — | 5 | 85 | ☐ |
| 4 | NordVPN | vpn | In-house | 40–100% new + 30% renewals ⚠️ | 30d ⚠️ | **Yes** | 4 | 80 | ☐ |
| 5 | Deel | remote-jobs | PartnerStack | $500/SQL + $1,000/paying customer ✅ | 90d ✅ | — | 3 | 75 | ☐ |
| 6 | iVisa | visa | In-house | 20% service fees, 35% photos ✅ | 365d ✅ | — | 5 | 75 | ☐ |
| 7 | doola | business | In-house | 15% base, tiered to ~$1,000 ⚠️ | unknown | — | 3 | 70 | ☐ |
| 8 | Insured Nomads | insurance | In-house (Tapfiliate) | 15%/policy ✅ (one source: to $500 ⚠️) | unknown | maybe | 4 | 65 | ☐ |
| 9 | Blueground | housing | Sovrn/aggregators | up to ~$200/booking ⚠️ | unknown | — | 4 | 65 | ☐ |
| 10 | Genki | insurance | GoAffPro | 5% for life of membership ⚠️ | ~365d ⚠️ | **Yes** | 4 | 60 | ☐ |
| 11 | Sirelo | moving | In-house | 50% of lead revenue ✅ | unknown | — | 4 | 60 | ☐ |
| 12 | Flatio | housing | In-house | rev-share/booking (rate gated) ✅ | 60d ✅ | — | 4 | 60 | ☐ |
| 13 | Airalo | esim | Impact | ~10%/sale ⚠️ | 30d ⚠️ | — | 5 | 60 | ☐ |
| 14 | Mercury | banking | In-house (negotiated) | up to $1,000–1,500/funded client ✅* | n/a | — | 2 | 60 | ☐ |
| 15 | Anytime Mailbox | mail | Everflow | ~$25/renter ⚠️ ($300 min payout) | 30d ⚠️ | — | 4 | 55 | ☐ |
| 16 | FlexJobs | remote-jobs | Impact | ~$12/subscription ⚠️ | 30d ⚠️ | — | 4 | 55 | ☐ |
| 17 | Lingoda | language | Rakuten | ~$50–75/order ⚠️ (conflicting) | 30–45d ⚠️ | — | 3 | 50 | ☐ |
| 18 | TrustedHousesitters | housing | Impact | ~$28–30/membership ⚠️ | 30d ⚠️ | — | 4 | 50 | ☐ |
| 19 | italki | language | In-house | $10+/new student ✅ | 30d ✅ | — | 4 | 45 | ☐ |
| 20 | Bright!Tax | tax | **None** (client credit only) ✅ | $0 | — | — | 5 | 45 | n/a |
| 21 | Booking.com | stay | Awin (US) | ~4% completed stays ⚠️ | session ⚠️ | — | 4 | 40 | ☐ |
| 22 | Skyscanner | flights | Travelpayouts or Impact | cents/click-out ⚠️ | 30d ⚠️ | — | 4 | 25 | ☐ |
| 23 | Coworker | coworking | **None** ✅ | $0 | — | — | 3 | 20 | n/a |

\* Mercury's public numbers are for its accountant/advisor tracks; a general partnership is
negotiated. Worth one email to partnerships once traffic exists; don't block launch on it.

Bright!Tax and Coworker stay in the app **unmonetized** — they're genuinely the right advice for
their slots, and the toolkit's credibility (which sells the $19 unlock and every other click) is
worth more than an empty slot.

## 3. Per-partner details & signup steps

Work top-down. Every entry ends at its env var: set it in Vercel → click-test `/go/<id>` →
check the network dashboard recorded the click.

### Taxes for Expats — `AFF_TAXESFOREXPATS`
- **Apply:** https://app.taxesforexpats.com/affiliate/new (free, in-house, easy approval ⚠️)
- **Commission:** $75 cash per paying client, or 15% capped at $250 — pick flat $75 unless AOV
  proves higher. Paid monthly via PayPal once the referral pays ~$350+.
- **Link/subId:** in-house dashboard link; no documented subId — leave `{CLICK_ID}` out.
- **Why over Bright!Tax/Greenback:** the only US-expat tax firm with a clear public *cash*
  program. Greenback (affiliates.greenbacktaxservices.com) and MyExpatTaxes exist but gate their
  rates — apply to both later and A/B if approved.

### SafetyWing — `AFF_SAFETYWING`
- **Apply:** https://safetywing.com/ambassador (self-serve signup, near-instant)
- **Commission:** ~10% of total premium, **recurring on every 4-week renewal** — a subscriber
  who stays insured a year pays you ~13 times. 364-day cookie. $10 payout threshold.
- **Link/subId:** in-house referral link; no standard subId — leave `{CLICK_ID}` out.

### Wise — `AFF_WISE`
- **Apply:** https://wise.com/us/blog/become-a-wise-affiliate-partner → Partnerize
  (https://signup.partnerize.com/signup/en/wise). Manual review ~48h; wants a live site — link
  the production domain and describe the toolkit placement.
- **Commission:** £10 per personal user, £50 per business user completing a first
  cross-currency transfer; USD payout available. Cookie: effectively no expiry.
- **Link/subId:** Partnerize links take a publisher ref:
  `https://wise.prf.hn/click/camref:XXXX/pubref:{CLICK_ID}` — use `{CLICK_ID}` here.

### NordVPN — `AFF_NORDVPN`
- **Apply:** https://nordvpn.com/affiliate/ (in-house, accessible, monthly payouts, no minimum)
- **Commission:** 100% of a 1-month plan / 40% of 6-month+ plans on signup, then **30% on every
  renewal**. 30d cookie.
- **Link/subId:** in-house platform supports campaign IDs — check dashboard for the sub-ID
  parameter and map `{CLICK_ID}` to it if present.

### Deel — `AFF_DEEL`
- **Apply:** https://www.deel.com/affiliates/ → PartnerStack
  (dash.partnerstack.com/application?company=deel). Free; standard B2B vetting.
- **Commission:** $500 per sales-qualified referral + $1,000 when they become a paying customer
  (post-Dec-2025 terms — ignore old "$200" roundups). 90d cookie. Conversion = the referred
  company/contractor runs a first payroll within ~4 months.
- **Positioning note:** our card sells it as "get paid compliantly abroad — share with your
  employer or invoice through it." One HR-team conversion pays ~$1,500.
- **Link/subId:** PartnerStack links support a sub-ID query param (varies by program — check the
  dashboard, commonly `sid`); wire `{CLICK_ID}` to it if available.

### iVisa — `AFF_IVISA`
- **Apply:** https://www.ivisa.com/affiliates (in-house, free, open to content sites)
- **Commission:** 20% of service fees (35% on photos), repeat purchases inside the window also
  credit. **365-day cookie.** $50 min payout, paid monthly on the 15th.
- **Link/subId:** in-house tracking; check dashboard for sub-ID support.

### doola — `AFF_DOOLA`
- **Apply:** https://www.doola.com/university/become-a-doola-affiliate-partner-and-earn-commission/
- **Commission:** 15% base, tiered to ~$1,000/referral on VIP tiers ⚠️ (figures vary — confirm
  in dashboard; cash payouts may carry ~6% processing fee). High-ticket products ($297–$1,999/yr).
- **Alternative:** Firstbase.io (PartnerStack, 10%+ lifetime) — same niche; apply to whichever
  approves first, list one.

### Insured Nomads — `AFF_INSUREDNOMADS`
- **Apply:** email partners@insurednomads.com or https://www.nomadinsurance.com/partner
  (relationship-based; they set you up on white-labeled Tapfiliate with a referral code/widget)
- **Commission:** 15% per policy ✅ (one source claims up to $500 + renewals ⚠️ — ask directly).

### Blueground — `AFF_BLUEGROUND`
- **Apply:** https://promos.theblueground.com/affiliate/
- **Commission:** advertised up to ~$200 per booking ⚠️; runs via aggregators (Sovrn). Confirm
  the actual rate on approval — monthly furnished AOV is high, so even a low % is meaningful.

### Genki — `AFF_GENKI`
- **Apply:** https://genki.world/partners (GoAffPro portal: genkithings.goaffpro.com)
- **Commission:** 5% recurring for the life of the membership ⚠️; €50 min payout.

### Sirelo — `AFF_SIRELO`
- **Apply:** https://sirelo.com/for-affiliates/ (in-house; no minimums)
- **Commission:** 50% of Sirelo's revenue per accepted moving lead ✅ — lead-based, so it
  converts on quote requests, not purchases. Monthly report on the 15th; you invoice them.

### Flatio — `AFF_FLATIO`
- **Apply:** https://www.flatio.com/page/affiliate (in-house; aimed at nomad content; also
  partners@flatio.com)
- **Commission:** paid on every booking AND every host signup; rate disclosed at signup ✅ gated.
  60-day cookie, €50 threshold, monthly.

### Airalo — `AFF_AIRALO`
- **Apply:** https://partners.airalo.com/solutions/affiliates → Impact
- **Commission:** ~10% per sale ⚠️, 30d cookie. **Impact subId:** append `subId1={CLICK_ID}`.
- **Alternatives if rejected/better terms wanted:** Saily (15% ⚠️, saily.com/affiliate, Nord
  Security's eSIM) or Holafly (~7% but 365d cookie + higher AOV, esim.holafly.com/affiliate-program).

### Mercury — `AFF_MERCURY`
- **Apply:** https://mercury.com/partnerships — negotiated, written agreement required.
  ⚠️ **Do not** sign up for "Mercury Global" (mercury.global) — different company, lookalike name.

### Anytime Mailbox — `AFF_ANYTIMEMAILBOX`
- **Apply:** https://www.anytimemailbox.com/affiliate-program (Everflow-based)
- **Commission:** ~$25/new renter ⚠️; note the $300 minimum payout — slow to first check.

### FlexJobs — `AFF_FLEXJOBS`
- **Apply:** https://www.flexjobs.com/affiliate-program → Impact
- **Commission:** ~$12/subscription ⚠️, 30d cookie, $50 min. **Impact subId:** `subId1={CLICK_ID}`.

### Lingoda — `AFF_LINGODA`
- **Apply:** via Rakuten Advertising (search "Lingoda")
- **Commission:** ~$50–75/order ⚠️ (sources conflict — verify). **Rakuten subId:** `u1={CLICK_ID}`.

### TrustedHousesitters — `AFF_TRUSTEDHOUSESITTERS`
- **Apply:** https://www.trustedhousesitters.com/pages/affiliates/ → Impact
- **Commission:** ~$28–30 per membership (20–30% ⚠️). **Impact subId:** `subId1={CLICK_ID}`.

### italki — `AFF_ITALKI`
- **Apply:** https://www.italki.com/en/affiliates (in-house; just needs an italki account)
- **Commission:** $10+ per new student's first purchase ✅, 30d cookie, monthly PayPal/Payoneer.

### Booking.com — `AFF_BOOKING`
- **Apply:** via **Awin** (US/APAC; CJ handles Europe) — the in-house program closed to small
  partners May 2025 (Skift). Approval is stricter now; apply once the domain has traffic.
- **Commission:** ~4% of completed stays ⚠️; paid only after checkout, session-length cookie.
  **Awin subId:** `clickref={CLICK_ID}`.

### Skyscanner — `AFF_SKYSCANNER`
- **Apply:** easiest via **Travelpayouts** (instant); direct Impact program wants established
  traffic. Revenue share of Skyscanner's own referral income — effectively $0.40–1.00/click-out ⚠️.
  **Travelpayouts subId:** `sub_id={CLICK_ID}`. Low value; last on the list.

### Bright!Tax / Coworker — no env var needed
No affiliate programs (verified 2026-07). Kept in-app for advice value. Re-check yearly.

## 4. Signup runbook (do in this order)

Week 1 — the five that matter (all free, self-serve):
- [ ] TFX → approved → dashboard link → `AFF_TAXESFOREXPATS` in Vercel → click-test `/go/taxesforexpats`
- [x] SafetyWing → ambassador link obtained (referenceID-style, no {CLICK_ID}) → set `AFF_SAFETYWING` in Vercel → test `/go/safetywing`
- [ ] Wise → Partnerize approval → `https://wise.prf.hn/click/camref:XXXX/pubref:{CLICK_ID}` → `AFF_WISE` → test `/go/wise`
- [ ] NordVPN → in-house link → `AFF_NORDVPN` → test `/go/nordvpn`
- [ ] iVisa → in-house link → `AFF_IVISA` → test `/go/ivisa`

Week 2 — high-ticket + housing:
- [ ] Deel (PartnerStack) → `AFF_DEEL` · [ ] doola → `AFF_DOOLA` · [ ] Blueground → `AFF_BLUEGROUND`
- [ ] Flatio → `AFF_FLATIO` · [ ] Insured Nomads (email) → `AFF_INSUREDNOMADS` · [ ] Sirelo → `AFF_SIRELO`

Week 3 — the rest:
- [ ] Airalo, FlexJobs, TrustedHousesitters (one Impact account) → `AFF_AIRALO` / `AFF_FLEXJOBS` / `AFF_TRUSTEDHOUSESITTERS`
- [ ] Genki → `AFF_GENKI` · [ ] italki → `AFF_ITALKI` · [ ] Anytime Mailbox → `AFF_ANYTIMEMAILBOX`
- [ ] Lingoda (Rakuten) → `AFF_LINGODA` · [ ] Booking (Awin) → `AFF_BOOKING` · [ ] Skyscanner (Travelpayouts) → `AFF_SKYSCANNER`
- [ ] Mercury: email partnerships@ once there's traffic to show

After each: set the env var in Vercel (Production), redeploy, click the card on a real run,
confirm the click shows in the partner dashboard.

## 5. Attribution — how `{CLICK_ID}` works

`/go/[id]` replaces every `{CLICK_ID}` in the env URL with `hash(runId).slice(0,12) + "_" +
placement` (see `buildOutboundUrl` in `src/lib/affiliates.ts`). The raw runId is **never** sent
outbound — it's the bearer token for the results page. To reconcile: export conversions from the
network dashboard, match the subId prefix against our click records (same hash, once the
`affiliate_clicks` Supabase table lands).

SubId parameter per network: Impact `subId1` · Partnerize `pubref:` (in-path) · Awin `clickref` ·
CJ `sid` · Travelpayouts `sub_id` · Rakuten `u1` · PartnerStack varies (often `sid`) ·
in-house programs usually none (omit the placeholder).

## 6. Compliance

- FTC disclosure renders on every surface (`RelocationToolkit`, place pages) — keep it.
- All outbound affiliate links carry `rel="sponsored nofollow noopener"` (in `AffiliateCard`).
- Standard program TOS across these networks: **no brand bidding** (don't run Meta/Google ads on
  partner brand names), **no coupon-code sites/cookie stuffing**, **no incentivized clicks**
  (don't gate app features behind clicking a partner link), no misrepresenting terms/prices.
- Insurance programs (SafetyWing, Insured Nomads, World Nomads) restrict describing coverage —
  link, don't paraphrase policy terms.
- `payoutNote` in the catalog is internal — never render it.

## 7. Evaluated & rejected

| Candidate | Verdict |
|-----------|---------|
| Bright!Tax, Expatfile, SavvyNomad, Atlys, Global Citizen Solutions | Client-referral credits/gift cards only — no cash affiliate |
| MyExpatTaxes, Greenback, VisaHQ | Real programs, rates gated — apply later, compare against TFX |
| HousingAnywhere, Coworker, Kindred, Intl Van Lines, Charles Schwab | No affiliate program at all |
| Remote.com | 10–15% rev-share ×12mo — solid but duplicates Deel; revisit if Deel rejects us |
| Firstbase.io | Good (10%+ lifetime, PartnerStack) — doola alternative, one is enough |
| Payoneer ($25), Revolut (~$10–50 ⚠️), Remitly (~$20), CurrencyFair (3d cookie, EUR) | Weaker than Wise for this audience; Revolut worth adding later as a second banking card |
| World Nomads | Pay-per-quote ~$0.83–2.50 — regulatory-capped, weak |
| Heymondo (12% ⚠️), VisitorsCoverage (~3%), Cigna Global (£10/quote), Insubuy (to $150, 2-wk vetting) | Insurance alternates — Insubuy worth a later look |
| Saily (15%), Holafly (7%, 365d) | eSIM alternates if Airalo underperforms |
| Expedia (~3%, 7d cookie), Kiwi (3%), WayAway ($10/Plus) | Marginal; WayAway easy via the same Travelpayouts account |
| Preply (~1st-lesson %), Babbel (~$32) | Language alternates; italki+Lingoda cover the slot |
| Anyplace (5%/booking) | Overlaps Flatio/Blueground; revisit if either rejects us |
| MakeSpace ($50 ⚠️ stale), Allied Van Lines ($4/lead) | Too small/stale |
| Travel credit cards | Approval-gated, compliance-heavy — not for launch |

## 8. Maintenance

Re-verify rates every ~6 months (set a reminder): affiliate terms churn constantly (Deel 3×'d in
Dec 2025; Booking.com shut its program with 30 days notice). When a rate changes materially,
update the partner's `priority` + `payoutNote` in `src/lib/affiliates.ts` and this table together.
