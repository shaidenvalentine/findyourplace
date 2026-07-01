import { ImageResponse } from "next/og";

/**
 * Branded OG card for the landing page (and any route that doesn't set its own). This is
 * the image that unfurls when the founder reel / ads / shared links point at the site —
 * previously blank. Satori rules: every multi-child div sets display:flex; no emoji.
 */
export const runtime = "edge";
export const alt = "Find Your Place — find the place that actually fits you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ATMOSPHERE = `
  radial-gradient(60% 50% at 18% 8%, rgba(242,106,62,0.55), transparent 55%),
  radial-gradient(45% 45% at 88% 22%, rgba(249,177,60,0.40), transparent 50%),
  radial-gradient(65% 55% at 50% 100%, rgba(45,193,180,0.32), transparent 60%),
  linear-gradient(135deg, #0a0b12 0%, #14091e 50%, #0a0b12 100%)
`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: ATMOSPHERE,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #f26a3e, #f9b13c)",
              marginRight: 16,
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            Find Your Place
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 900 }}>
            The biggest decision you haven&apos;t made yet.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#a8acbb", marginTop: 24, maxWidth: 860 }}>
            We match you against 250 of the best places on Earth — and show you the one that fits.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", fontSize: 26, color: "#6b6f7e" }}>
          <div style={{ display: "flex", color: "#f9b13c", fontWeight: 700 }}>60 seconds</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>free to start</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>findyourplace.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
