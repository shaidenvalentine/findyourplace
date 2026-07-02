# Find Your Place — Design Brief & Portable System

**Aesthetic:** light, editorial, *liquid glass*. Warm-paper canvas, near-black ink,
frosted-glass surfaces floating over an ambient color field, one lime accent reserved
for data. Premium, calm, dashboard-grade — deliberately not "default UI."

Reference north star: the SOMA glucose-monitor dashboard — fine typography, frosted
panels over a rich backdrop, a single chartreuse accent, generous whitespace.

This doc is both the FYP spec and a **drop-in starter** you can lift into another site
(e.g. shaidenvalentine.com). Everything is token- and utility-driven, framework-agnostic
CSS + Tailwind conventions.

---

## 1. Principles

1. **One canvas, one ink, one accent.** Warm paper background, near-black text, and a
   single lime accent. The accent is for *data and state* (scores, deltas, active dots) —
   never for big fills or the primary button.
2. **Interaction is near-black.** CTAs and nav are dark pills. This keeps the accent rare
   and the hierarchy obvious.
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
  --background: 48 22% 95%;      /* warm paper */
  --surface:    48 28% 97%;
  --card:       0 0% 100%;
  --card-foreground: 220 14% 14%;
  --foreground: 220 16% 13%;     /* near-black ink */
  --muted:      45 12% 90%;
  --muted-foreground: 220 8% 42%;
  --border:     44 12% 87%;
  --input:      44 12% 89%;
  --ring:       74 55% 45%;

  --primary:    220 16% 13%;     /* near-black — CTAs, nav pills */
  --primary-foreground: 48 30% 97%;
  --secondary:  220 14% 20%;
  --accent:     74 64% 50%;      /* lime — data/highlights only */
  --accent-foreground: 220 24% 12%;

  --success:    150 46% 40%;
  --destructive: 6 72% 52%;
  --radius: 1.1rem;
}
```

Accent usage note: `--accent` (74 64% 50%) is for fills/rings/dots. For lime **text on
light**, drop to `hsl(84 60% 38%)` (`.text-accent-lime`) for contrast.

---

## 3. The glass recipe (core of the system)

```css
/* Liquid frosted glass: gradient fill + heavy blur/saturation + bright inset top edge
   + layered depth shadow. This exact combination is what makes it read as glass. */
.glass {
  background: linear-gradient(135deg, hsl(0 0% 100% / 0.58), hsl(0 0% 100% / 0.34));
  -webkit-backdrop-filter: blur(26px) saturate(1.7);
  backdrop-filter: blur(26px) saturate(1.7);
  border: 1px solid hsl(0 0% 100% / 0.65);
  box-shadow:
    inset 0 1px 0 hsl(0 0% 100% / 0.75),   /* bright top edge */
    inset 0 -1px 0 hsl(0 0% 100% / 0.18),
    0 1px 2px hsl(220 30% 18% / 0.04),
    0 14px 44px hsl(220 30% 18% / 0.09);   /* soft float shadow */
}

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
    radial-gradient(46% 38% at 10% -2%, hsl(74 78% 60% / 0.16), transparent 60%),
    radial-gradient(42% 40% at 102% 6%, hsl(32 88% 70% / 0.15), transparent 55%),
    radial-gradient(50% 46% at 78% 58%, hsl(268 60% 72% / 0.08), transparent 60%),
    radial-gradient(55% 50% at 30% 110%, hsl(190 70% 66% / 0.12), transparent 60%);
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

- **Primary CTA / nav pill:** near-black rounded-full pill, subtle vertical gradient
  `linear-gradient(180deg, hsl(220 14% 20%), hsl(220 16% 11%))`, white text,
  `shadow-md shadow-black/15`, `hover:brightness-125`, `active:scale-[0.98]`.
- **Card:** `.glass rounded-2xl`. Nest content with generous padding (`p-5`–`p-8`).
- **Chips / option buttons:** unselected = `.glass`; selected = `border-primary
  bg-primary/10 ring-1 ring-primary`. Round-full for filters, `rounded-xl` for list rows.
- **Inputs:** translucent glass — `bg-white/45 border-white/60 backdrop-blur-md rounded-xl`,
  ring on focus.
- **Score ring:** light track (`hsl(220 14% 90%)`) + lime progress arc
  (`hsl(84 62% 45%)`), light-weight number in the center, tiny uppercase label beneath.
- **Bars / meters:** dark fill (`bg-foreground` / `primary`) on a muted track; the accent
  reserved for the "goal"/gain marker.
- **Badges:** `rounded-full` glass or `bg-primary/10`; accent variant for state.
- **Brand mark:** one crisp **vector** glyph (a lime pin holding a globe on a dark tile),
  used for favicon/PWA/app icon and the header logo. Never a raster/emoji.

---

## 6. Motion & accessibility

- Entrances: a single `fade-up` (`opacity 0→1`, `translateY 14px→0`, ~0.5s ease-out).
- Rings/bars animate once; **respect `prefers-reduced-motion`** (skip sweeps/transitions).
- Contrast: keep body copy on paper ≥ AA; the lime is decorative/data — don't set essential
  small text in lime on white (use `.text-accent-lime` when you must).
- Allow pinch-zoom (no `maximum-scale`). 44px min tap targets. Focus-visible rings on all
  interactive elements.

---

## 7. Drop-in starter (for shaidenvalentine.com or any site)

1. Paste the tokens (§2), `.glass` / `.glass-dark`, `body::before` mesh, and `.hero-stage`
   (§3) into your global stylesheet.
2. Load Space Grotesk; set body to `hsl(var(--background))` / `hsl(var(--foreground))`.
3. Adopt the type rules (§4) — the biggest single "premium" lever is switching display
   headings to `font-light` + tight tracking.
4. Make cards `.glass rounded-2xl`; make the primary button the near-black pill.
5. Give one hero a `.hero-stage` and float 2–3 `.glass` cards over it for the signature
   depth moment.
6. Strip emojis; use a vector icon set + the lime accent.

Keep the accent rare and the type light — that restraint is the whole look.
