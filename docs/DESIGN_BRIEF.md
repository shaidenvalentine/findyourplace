# Find Your Place — Design Brief & Portable System

**Aesthetic:** dark, editorial, *liquid glass*. Deep blue-charcoal "stage" canvas with
warm gold + teal ambient glows, near-white ink, frosted dark-glass surfaces, one teal
accent reserved for data. Premium, calm, dashboard-grade — deliberately not "default UI."

Reference north star: the SOMA glucose-monitor dashboard — fine typography, frosted
panels over a rich backdrop, a single accent, generous whitespace.

This doc is both the FYP spec and a **drop-in starter** you can lift into another site
(e.g. shaidenvalentine.com). Everything is token- and utility-driven, framework-agnostic
CSS + Tailwind conventions.

---

## 1. Principles

1. **One canvas, one ink, one accent.** Deep dark background, near-white text, and a
   single teal accent. The accent is for *data and state* (scores, deltas, active dots) —
   never for big fills or the primary button.
2. **Interaction is light.** CTAs and nav are light pills — the brightest thing on the
   dark canvas is the action. This keeps the accent rare and the hierarchy obvious.
3. **Depth comes from glass, not borders.** Surfaces are frosted glass with a bright top
   edge + soft shadow, floating over a faint ambient color mesh. Glass only reads as glass
   when there's color behind it — always give it something to refract.
4. **Type does the work.** Large, *light-weight* display headings with tight tracking;
   tiny uppercase letter-spaced labels; relaxed muted body. No decorative rainbows.
5. **No emojis.** Use crisp vector icons (Lucide) + the accent + typography for meaning.
6. **Restraint + air.** Fewer elements, more spacing. Let the glass and type breathe.

---

## 2. Color tokens (HSL channels)

Store as `H S% L%` channels so you can do `hsl(var(--token) / <alpha>)`.

```css
:root {
  --background: 209 30% 9%;      /* deep blue-charcoal */
  --surface:    209 26% 12%;
  --card:       210 24% 13%;
  --card-foreground: 40 20% 96%;
  --foreground: 40 20% 96%;      /* near-white ink */
  --muted:      210 20% 18%;
  --muted-foreground: 213 12% 66%;
  --border:     210 16% 22%;
  --input:      210 16% 20%;
  --ring:       172 60% 55%;

  --primary:    42 28% 96%;      /* light pill — CTAs, nav */
  --primary-foreground: 213 28% 10%;
  --secondary:  213 14% 74%;
  --accent:     172 62% 52%;     /* teal — data/highlights only */
  --accent-foreground: 214 30% 10%;

  --success:    150 55% 55%;
  --destructive: 4 78% 62%;
  --radius: 1.1rem;
}
```

Accent usage note: `--accent` is for fills/rings/dots. For teal **text on dark**, use
`hsl(172 68% 60%)` (`.text-accent`) so it glows without vibrating.

---

## 3. The glass recipe (core of the system)

```css
/* Liquid frosted dark glass: translucent-white gradient + heavy blur/saturation +
   bright inset top edge + deep shadow. This combination is what reads as glass. */
.glass {
  background: linear-gradient(135deg, hsl(0 0% 100% / 0.10), hsl(0 0% 100% / 0.045));
  -webkit-backdrop-filter: blur(26px) saturate(1.5);
  backdrop-filter: blur(26px) saturate(1.5);
  border: 1px solid hsl(0 0% 100% / 0.12);
  box-shadow:
    inset 0 1px 0 hsl(0 0% 100% / 0.14),   /* bright top edge */
    inset 0 -1px 0 hsl(0 0% 100% / 0.04),
    0 1px 2px hsl(220 40% 5% / 0.2),
    0 14px 44px hsl(220 40% 5% / 0.35);    /* deep float shadow */
}

/* Perf rule: glass is for LOW-COUNT surfaces. Long lists/grids (100+ items) use solid
   bg-card + border — hundreds of backdrop-filters wreck scroll on low-end phones. */

/* Dark glass — for depth moments / pills over light */
.glass-dark {
  background: linear-gradient(135deg, hsl(220 16% 14% / 0.72), hsl(220 18% 10% / 0.6));
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid hsl(0 0% 100% / 0.1);
  box-shadow: inset 0 1px 0 hsl(0 0% 100% / 0.12), 0 12px 40px hsl(220 40% 10% / 0.28);
}
```

**Ambient color field** — a fixed mesh behind everything so glass has color to refract:

```css
body::before {
  content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(60% 45% at 78% 4%, hsl(38 62% 56% / 0.16), transparent 60%),
    radial-gradient(48% 40% at 4% 0%, hsl(174 60% 45% / 0.12), transparent 60%),
    radial-gradient(70% 60% at 22% 98%, hsl(186 46% 30% / 0.26), transparent 65%),
    radial-gradient(55% 50% at 94% 82%, hsl(255 30% 32% / 0.18), transparent 60%);
}
```

**Hero stage** — a rich, moody surface for a hero moment where glass panels float and pop:

```css
.hero-stage {
  background:
    radial-gradient(70% 60% at 75% 20%, hsl(38 70% 62% / 0.55), transparent 60%),
    radial-gradient(80% 80% at 20% 90%, hsl(160 40% 30% / 0.65), transparent 65%),
    linear-gradient(150deg, hsl(150 22% 22%), hsl(210 30% 14%) 55%, hsl(260 24% 16%));
}
```

---

## 4. Typography

- **Face:** Space Grotesk (variable) — geometric, modern. Load with `display: swap`.
- **Display headings:** `font-light`, large, tight tracking. e.g. hero `text-6xl→[4.75rem]
  font-light tracking-[-0.035em] leading-[0.98]`; use an *italic normal-weight* word for a
  single accent (`<span className="italic font-normal">`). No two-tone/gradient text.
- **Section headings:** `text-3xl→5xl font-light tracking-[-0.03em]`.
- **Eyebrow / labels:** `text-xs font-medium uppercase tracking-[0.2em–0.28em]
  text-muted-foreground`.
- **Body / subhead:** `text-lg leading-relaxed text-muted-foreground`, constrained width
  (`max-w-md`).
- **Numbers:** `tabular-nums`, light-to-normal weight (not bold) for the editorial feel.

---

## 5. Components

- **Primary CTA / nav pill:** LIGHT rounded-full pill (pops on the dark canvas), subtle
  vertical gradient `linear-gradient(180deg, hsl(45 30% 98%), hsl(40 18% 87%))`, dark
  text, `shadow-md shadow-black/40`, `hover:brightness-95`, `active:scale-[0.98]`.
- **Card:** `.glass rounded-2xl`. Nest content with generous padding (`p-5`–`p-8`).
- **Chips / option buttons:** unselected = `.glass`; selected = `border-primary
  bg-primary/10 ring-1 ring-primary`. Round-full for filters, `rounded-xl` for list rows.
- **Inputs:** dark glass — `bg-white/[0.08] border-white/15 backdrop-blur-md rounded-xl`,
  teal ring on focus.
- **Score ring:** translucent track (`hsl(0 0% 100% / 0.16)`) + bright teal progress arc
  (`hsl(172 66% 58%)`), light-weight number in the center, tiny uppercase label beneath.
- **Bars / meters:** light fill (`bg-foreground` = near-white) on a muted track; the
  accent reserved for the "goal"/gain marker.
- **Badges:** `rounded-full` glass or `bg-primary/10`; accent variant for state.
- **Brand mark:** one crisp **vector** glyph (a teal pin holding a globe on a dark tile),
  used for favicon/PWA/app icon and the header logo. Never a raster/emoji.

---

## 6. Motion & accessibility

- Entrances: a single `fade-up` (`opacity 0→1`, `translateY 14px→0`, ~0.5s ease-out).
- Rings/bars animate once; **respect `prefers-reduced-motion`** (skip sweeps/transitions).
- Contrast: keep body copy on the dark canvas ≥ AA; the teal is decorative/data — for teal
  text use the brightened `.text-accent` (`hsl(172 68% 60%)`), never the raw fill token.
- Allow pinch-zoom (no `maximum-scale`). 44px min tap targets. Focus-visible rings on all
  interactive elements.

---

## 7. Drop-in starter (for shaidenvalentine.com or any site)

1. Paste the tokens (§2), `.glass` / `.glass-dark`, `body::before` mesh, and `.hero-stage`
   (§3) into your global stylesheet.
2. Load Space Grotesk; set body to `hsl(var(--background))` / `hsl(var(--foreground))`.
3. Adopt the type rules (§4) — the biggest single "premium" lever is switching display
   headings to `font-light` + tight tracking.
4. Make cards `.glass rounded-2xl`; make the primary button the light pill.
5. Give one hero a `.hero-stage` and float 2–3 `.glass` cards over it for the signature
   depth moment.
6. Strip emojis; use a vector icon set + the teal accent.

Keep the accent rare and the type light — that restraint is the whole look.
