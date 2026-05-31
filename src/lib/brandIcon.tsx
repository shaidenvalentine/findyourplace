/**
 * The Find Your Place brand mark — coral→amber gradient + a white location pin holding a
 * little globe. One source of truth for the favicon, Apple touch icon, PWA/app icon, the
 * /api/icon generator, and the Instagram profile picture.
 */
export function BrandIcon({ size }: { size: number }) {
  const pin = Math.round(size * 0.52);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(120% 120% at 28% 22%, #ffd27a 0%, #f9b13c 34%, #f26a3e 74%, #e1542c 100%)",
      }}
    >
      <svg width={pin} height={pin} viewBox="0 0 24 24" fill="none">
        <path d="M12 23s7.5-6.4 7.5-12.2A7.5 7.5 0 1 0 4.5 10.8C4.5 16.6 12 23 12 23Z" fill="rgba(120,30,10,0.28)" transform="translate(0,0.45)" />
        <path d="M12 23s7.5-6.4 7.5-12.2A7.5 7.5 0 1 0 4.5 10.8C4.5 16.6 12 23 12 23Z" fill="#ffffff" />
        <circle cx="12" cy="10.4" r="3.5" fill="url(#fyp_g)" />
        <circle cx="12" cy="10.4" r="3.5" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.5" />
        <path d="M8.5 10.4h7M12 6.9c1.7 1 1.7 6 0 7M12 6.9c-1.7 1-1.7 6 0 7" stroke="rgba(255,255,255,0.85)" strokeWidth="0.55" fill="none" />
        <defs>
          <linearGradient id="fyp_g" x1="9" y1="7" x2="15" y2="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f9b13c" />
            <stop offset="1" stopColor="#e1542c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
