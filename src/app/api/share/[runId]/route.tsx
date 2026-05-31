import { ImageResponse } from "next/og";
import { getRun, isUnlocked } from "@/lib/server/runStore";
import { LOCATIONS } from "@/data/locations";
import { titleCase } from "@/lib/utils";

/**
 * Share images — designed for what people ACTUALLY want to share.
 *
 * Pre-unlock (free) the only share-worthy moment is identity — the archetype
 * flex (16-personalities-style). We expose that + a "my place is in [continent] 🔒"
 * curiosity card. After unlock we add the photo-led place reveal. Tax and gap-math
 * cards were removed — nobody posts their income or a category-comparison chart.
 *
 * ?slide=identity|tease|place|cta · ?format=og 1200×630 for link unfurls
 * Satori rules: every multi-child div has explicit display:flex; no emoji/glyphs.
 */
export const runtime = "nodejs";

const C = {
  bg: "#0a0b12",
  ink: "#ffffff",
  muted: "#a8acbb",
  faint: "#6b6f7e",
  primary: "#f26a3e",
  accent: "#f9b13c",
  teal: "#2dc1b4",
  surface: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.10)",
};

// Atmospheric layered gradient — Spotify-Wrapped depth.
const ATMOSPHERE = `
  radial-gradient(60% 50% at 18% 8%, rgba(242,106,62,0.55), transparent 55%),
  radial-gradient(45% 45% at 88% 22%, rgba(249,177,60,0.40), transparent 50%),
  radial-gradient(65% 55% at 50% 100%, rgba(45,193,180,0.32), transparent 60%),
  linear-gradient(135deg, #0a0b12 0%, #14091e 50%, #0a0b12 100%)
`;

function Brand({ tone = "ink" }: { tone?: "ink" | "white" }) {
  const color = tone === "white" ? "rgba(255,255,255,0.95)" : C.ink;
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg, #f26a3e, #f9b13c)",
          marginRight: 14,
        }}
      />
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color, letterSpacing: -0.5 }}>
        Find Your Place
      </div>
    </div>
  );
}

function Footer({ tone = "ink" }: { tone?: "ink" | "white" }) {
  const color = tone === "white" ? "rgba(255,255,255,0.85)" : C.muted;
  return (
    <div
      style={{
        display: "flex",
        fontSize: 32,
        fontWeight: 600,
        color,
        letterSpacing: -0.3,
      }}
    >
      findyourplace.app
    </div>
  );
}

function frame(content: React.ReactNode) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        background: ATMOSPHERE,
        color: C.ink,
        padding: 100,
        fontFamily: "sans-serif",
      }}
    >
      <Brand />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
        {content}
      </div>
      <Footer />
    </div>
  );
}

export async function GET(req: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const run = getRun(runId);
  const url = new URL(req.url);
  const slide = url.searchParams.get("slide") || "identity";
  const isOg = url.searchParams.get("format") === "og";
  const W = isOg ? 1200 : 1080;
  const H = isOg ? 630 : 1920;

  // ── No run → minimal hero (for /og fallbacks) ───────────────────────────────
  if (!run) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: ATMOSPHERE,
            color: C.ink,
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", fontSize: 80, fontWeight: 900, letterSpacing: -2 }}>Find Your Place</div>
          <div style={{ display: "flex", fontSize: 32, color: C.muted, marginTop: 16 }}>findyourplace.app</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  const unlocked = isUnlocked(runId);
  const archetype = run.personality.archetype.replace(/^The /, "");
  const traits = run.personality.traits.slice(0, 3);
  const top = run.ranking[0];
  const loc = LOCATIONS.find((l) => l.id === top?.id);
  const continent = run.topTease.continent;

  // ── OG link-unfurl: identity preview at 1200×630 ────────────────────────────
  if (isOg) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            background: ATMOSPHERE,
            color: C.ink,
            padding: 56,
            fontFamily: "sans-serif",
          }}
        >
          <Brand />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: 4,
                marginBottom: 12,
              }}
            >
              I am
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: -3,
                color: C.ink,
              }}
            >
              <span>The {archetype}</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: C.muted }}>
            findyourplace.app · find your place in under a minute
          </div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── PLACE slide ─────────────────────────────────────────────────────────────
  if (slide === "place") {
    // Paid reveal with photo — but only if the URL doesn't smell like a portrait/stamp/map.
    const photoLooksOk =
      loc?.image_url &&
      !/portrait|painting|engraving|stamp|warrior|coronation|coat[-_ ]of[-_ ]arms|\bflag\b|\bseal\b|locator|\bmap\b|orthographic|mascarenhas|descripcion/i.test(
        decodeURIComponent(loc.image_url)
      );
    if (unlocked && photoLooksOk && loc) {
      const photoSrc = loc.image_url as string;
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              position: "relative",
              fontFamily: "sans-serif",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt={loc.name}
              width={W}
              height={H}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Top vignette for brand legibility */}
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: H * 0.28,
                background: "linear-gradient(to bottom, rgba(8,9,16,0.7) 0%, rgba(8,9,16,0) 100%)",
              }}
            />
            {/* Bottom HEAVY gradient for hero text legibility — 60% of canvas */}
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: H * 0.6,
                background:
                  "linear-gradient(to top, rgba(8,9,16,0.96) 0%, rgba(8,9,16,0.85) 30%, rgba(8,9,16,0.4) 70%, rgba(8,9,16,0) 100%)",
              }}
            />
            {/* Brand pinned to top */}
            <div style={{ display: "flex", position: "absolute", top: 100, left: 100, right: 100 }}>
              <Brand tone="white" />
            </div>
            {/* Hero anchored to bottom */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                bottom: 100,
                left: 100,
                right: 100,
                color: C.ink,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  letterSpacing: 6,
                  marginBottom: 18,
                }}
              >
                i&apos;m moving to
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: loc.name.length > 12 ? 170 : 210,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: -6,
                  color: C.ink,
                  marginBottom: 24,
                }}
              >
                {loc.name}
              </div>
              {loc.country !== loc.name && (
                <div
                  style={{
                    display: "flex",
                    fontSize: 42,
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 500,
                    letterSpacing: -0.3,
                    marginBottom: 56,
                  }}
                >
                  {loc.country}
                </div>
              )}
              <Footer tone="white" />
            </div>
          </div>
        ),
        { width: W, height: H }
      );
    }
    // Unlocked but no usable photo → premium gradient-only reveal with massive type.
    if (unlocked && loc) {
      return new ImageResponse(
        frame(
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 700,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: 6,
                marginBottom: 28,
              }}
            >
              i&apos;m moving to
            </div>
            <div
              style={{
                display: "flex",
                fontSize: loc.name.length > 12 ? 180 : 220,
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: -6,
                color: C.ink,
              }}
            >
              {loc.name}
            </div>
            {loc.country !== loc.name && (
              <div style={{ display: "flex", fontSize: 42, color: C.muted, marginTop: 36, fontWeight: 500 }}>
                {loc.country}
              </div>
            )}
          </div>
        ),
        { width: W, height: H }
      );
    }

    // Locked: poetic continent tease
    return new ImageResponse(
      frame(
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: 6,
              marginBottom: 28,
            }}
          >
            my perfect place is in
          </div>
          <div
            style={{
              display: "flex",
              fontSize: continent.length > 10 ? 200 : 240,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -6,
              color: C.ink,
            }}
          >
            {continent}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 44,
                height: 38,
                borderRadius: 10,
                border: `7px solid ${C.accent}`,
                marginRight: 22,
              }}
            />
            <div style={{ display: "flex", fontSize: 60, fontWeight: 700, color: C.accent, letterSpacing: -1 }}>
              still a mystery
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 38, color: C.muted, marginTop: 36, maxWidth: 820 }}>
            guess where? take the quiz and find yours.
          </div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── CTA slide ───────────────────────────────────────────────────────────────
  if (slide === "cta") {
    return new ImageResponse(
      frame(
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: 6,
              marginBottom: 28,
            }}
          >
            now you
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 180,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: -5,
              color: C.ink,
            }}
          >
            <span>Where</span>
            <span>should you</span>
            <span style={{ color: C.accent }}>live?</span>
          </div>
          <div style={{ display: "flex", fontSize: 42, color: C.muted, marginTop: 42, maxWidth: 820 }}>
            find your place in under a minute.
          </div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── IDENTITY slide (default — the universal share) ──────────────────────────
  // The flex: archetype + traits. Magazine-style typography.
  return new ImageResponse(
    frame(
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: 6,
            marginBottom: 28,
          }}
        >
          i am
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: archetype.length > 14 ? 170 : 200,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: -6,
            color: C.ink,
          }}
        >
          <span style={{ color: C.muted, fontSize: 88, fontWeight: 800, letterSpacing: -2, marginBottom: 6 }}>
            The
          </span>
          <span>{archetype}</span>
        </div>

        {traits.length > 0 && (
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 64 }}>
            {traits.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 36,
                  fontWeight: 600,
                  color: C.ink,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 999,
                  padding: "16px 32px",
                  marginRight: 16,
                  marginBottom: 16,
                  letterSpacing: -0.2,
                }}
              >
                {titleCase(t)}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: C.muted,
            marginTop: 72,
            letterSpacing: -0.3,
          }}
        >
          what&apos;s yours?
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
