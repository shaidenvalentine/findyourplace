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
export const alt = "Find Your Dog — the breed you're actually meant to have.";
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
            {/* paw mark — keep in sync with BrandMark in src/lib/brandIcon.tsx */}
            <svg width={27} height={27} viewBox="0 0 24 24" fill="none">
              <ellipse cx="5.2" cy="10.7" rx="2" ry="2.6" fill={TEAL} />
              <ellipse cx="9.7" cy="7.2" rx="2.1" ry="2.8" fill={TEAL} />
              <ellipse cx="14.3" cy="7.2" rx="2.1" ry="2.8" fill={TEAL} />
              <ellipse cx="18.8" cy="10.7" rx="2" ry="2.6" fill={TEAL} />
              <path
                d="M12 12.3c2.95 0 5.5 1.95 6.2 4.6.5 1.85-.55 3.7-2.3 4.2-1.3.38-2.6-.22-3.9-.22s-2.6.6-3.9.22c-1.75-.5-2.8-2.35-2.3-4.2.7-2.65 3.25-4.6 6.2-4.6Z"
                fill={TEAL}
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 500, letterSpacing: -0.5 }}>
            Find Your Dog
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
            The breed you&apos;re actually meant to have
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
            The wrong dog is a 12-year mismatch.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.66)", marginTop: 24, maxWidth: 860 }}>
            170 breeds, scored against how you actually live.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", fontSize: 25, color: "rgba(255,255,255,0.45)" }}>
          <div style={{ display: "flex", color: TEAL_BRIGHT, fontWeight: 500 }}>60 seconds</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>free to start</div>
          <div style={{ display: "flex", margin: "0 12px" }}>·</div>
          <div style={{ display: "flex" }}>findyourdog.app</div>
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
