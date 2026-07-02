import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Branded OG card for the landing page (and any route that doesn't set its own) — the
 * image that unfurls when the founder reel / ads / shared links point at the site.
 * Rendered in the dark "stage" identity with real Space Grotesk, matching the share
 * cards and the app itself. Satori rules: multi-child divs set display:flex; no emoji.
 */
export const runtime = "nodejs";
export const alt = "Find Your Place — find the place that actually fits you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEAL = "#2fbcae";
const TEAL_BRIGHT = "#54e0cf";

const STAGE = `
  radial-gradient(70% 50% at 30% 0%, rgba(255,255,255,0.10), transparent 60%),
  radial-gradient(70% 60% at 75% 20%, rgba(224,178,106,0.55), transparent 60%),
  radial-gradient(80% 80% at 20% 90%, rgba(38,100,104,0.65), transparent 65%),
  linear-gradient(150deg, #263a3c 0%, #19242e 55%, #211d31 100%)
`;

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/assets/fonts");
  const [light, medium] = await Promise.all([
    readFile(path.join(dir, "SpaceGrotesk-300.ttf")),
    readFile(path.join(dir, "SpaceGrotesk-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 64,
          background: STAGE,
          color: "#ffffff",
          fontFamily: "SG",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "radial-gradient(120% 120% at 30% 20%, #21271a 0%, #0d0f0a 100%)",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <svg width={27} height={27} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22.6c4.75-4.3 7.05-7.75 7.05-11.1A7.05 7.05 0 1 0 4.95 11.5c0 3.35 2.3 6.8 7.05 11.1Z"
                fill={TEAL}
              />
              <circle cx="12" cy="10.45" r="3.65" fill="#14160f" />
              <path d="M8.35 10.45h7.3" stroke={TEAL} strokeWidth="0.75" strokeLinecap="round" />
              <path d="M12 6.8c1.95 1.2 1.95 6.1 0 7.3" stroke={TEAL} strokeWidth="0.75" fill="none" strokeLinecap="round" />
              <path d="M12 6.8c-1.95 1.2-1.95 6.1 0 7.3" stroke={TEAL} strokeWidth="0.75" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 500, letterSpacing: -0.5 }}>
            Find Your Place
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: 5,
              marginBottom: 18,
            }}
          >
            Where you actually belong
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            The biggest decision you haven&apos;t made yet.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.66)", marginTop: 24, maxWidth: 860 }}>
            250 places on Earth, scored against who you actually are.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", fontSize: 25, color: "rgba(255,255,255,0.45)" }}>
          <div style={{ display: "flex", color: TEAL_BRIGHT, fontWeight: 500 }}>60 seconds</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>free to start</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>findyourplace.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SG", data: light, weight: 300 },
        { name: "SG", data: medium, weight: 500 },
      ],
    },
  );
}
