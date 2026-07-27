/**
 * The Find Your Dog brand mark — a clean paw print in the app's dark + teal identity.
 * One vector source of truth for the favicon, Apple touch icon, PWA/app icon, the
 * /api/icon generator, the Instagram profile picture, and the in-app header logo.
 * Pure SVG so it stays razor-crisp at every size. (These are export-surface literals —
 * favicons/OG render outside the CSS token system, so the brand hexes live here.)
 */

/** The paw glyph on its own (transparent) — used over any background. */
export function BrandMark({ size, paw = "#2fbcae" }: { size: number; paw?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* four toe pads */}
      <ellipse cx="5.2" cy="10.7" rx="2" ry="2.6" fill={paw} />
      <ellipse cx="9.7" cy="7.2" rx="2.1" ry="2.8" fill={paw} />
      <ellipse cx="14.3" cy="7.2" rx="2.1" ry="2.8" fill={paw} />
      <ellipse cx="18.8" cy="10.7" rx="2" ry="2.6" fill={paw} />
      {/* main pad */}
      <path
        d="M12 12.3c2.95 0 5.5 1.95 6.2 4.6.5 1.85-.55 3.7-2.3 4.2-1.3.38-2.6-.22-3.9-.22s-2.6.6-3.9.22c-1.75-.5-2.8-2.35-2.3-4.2.7-2.65 3.25-4.6 6.2-4.6Z"
        fill={paw}
      />
    </svg>
  );
}

/** Full-bleed icon canvas (dark, subtle teal glow) — for favicons / PWA / og profile. */
export function BrandIcon({ size }: { size: number }) {
  const glyph = Math.round(size * 0.56);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(120% 120% at 30% 20%, #21271a 0%, #171a12 45%, #0d0f0a 100%)",
      }}
    >
      <BrandMark size={glyph} />
    </div>
  );
}
