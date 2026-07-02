/**
 * The Find Your Place brand mark — a refined location pin holding a small globe, in the
 * app's dark + lime identity. One vector source of truth for the favicon, Apple touch
 * icon, PWA/app icon, the /api/icon generator, the Instagram profile picture, and the
 * in-app header logo. Pure SVG so it stays razor-crisp at every size.
 */

/** The pin+globe glyph on its own (transparent) — used over any background. */
export function BrandMark({
  size,
  pin = "#c8e85a",
  well = "#14160f",
}: {
  size: number;
  pin?: string;
  well?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* teardrop pin */}
      <path d="M12 22.6c4.75-4.3 7.05-7.75 7.05-11.1A7.05 7.05 0 1 0 4.95 11.5c0 3.35 2.3 6.8 7.05 11.1Z" fill={pin} />
      {/* globe well (negative space) */}
      <circle cx="12" cy="10.45" r="3.65" fill={well} />
      {/* equator + meridians, in the pin color */}
      <path d="M8.35 10.45h7.3" stroke={pin} strokeWidth="0.75" strokeLinecap="round" />
      <path d="M12 6.8c1.95 1.2 1.95 6.1 0 7.3" stroke={pin} strokeWidth="0.75" fill="none" strokeLinecap="round" />
      <path d="M12 6.8c-1.95 1.2-1.95 6.1 0 7.3" stroke={pin} strokeWidth="0.75" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Full-bleed icon canvas (dark, subtle lime glow) — for favicons / PWA / og profile. */
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
