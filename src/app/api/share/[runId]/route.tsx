import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getRun, isUnlocked } from "@/lib/server/runStore";
import { LOCATIONS } from "@/data/locations";
import { titleCase } from "@/lib/utils";

/**
 * Share images — the viral surface, rebuilt in the product's own identity so a shared
 * card looks exactly like the premium app: the dark "stage", the teal score ring, light
 * editorial type, glass chips, and the sharer's REAL numbers (Wrapped-style — personal
 * data is what makes a card feel worth posting).
 *
 * ?slide=identity|place|cta · ?format=og 1200×630 for link unfurls
 * Gate: the #1 name/photo renders ONLY when the run is server-verified unlocked;
 * locked runs share the ring + continent tease.
 * Satori rules: every multi-child div has explicit display:flex; no emoji; fonts loaded
 * from repo TTFs (Space Grotesk 300/500/700) so the light editorial weight is real.
 */
export const runtime = "nodejs";

const INK = "#ffffff";
const MUT = "rgba(255,255,255,0.66)";
const FAINT = "rgba(255,255,255,0.45)";
const TEAL = "#2fbcae";
const TEAL_BRIGHT = "#54e0cf";
const CHIP_BG = "rgba(255,255,255,0.10)";
const CHIP_BORDER = "rgba(255,255,255,0.16)";

// The app's hero-stage surface, verbatim in hex — rich, moody, teal-and-gold.
const STAGE = `
  radial-gradient(70% 50% at 30% 0%, rgba(255,255,255,0.10), transparent 60%),
  radial-gradient(70% 60% at 75% 20%, rgba(224,178,106,0.55), transparent 60%),
  radial-gradient(80% 80% at 20% 90%, rgba(38,100,104,0.65), transparent 65%),
  linear-gradient(150deg, #263a3c 0%, #19242e 55%, #211d31 100%)
`;

async function loadFonts() {
  const dir = path.join(process.cwd(), "src/assets/fonts");
  const [light, medium, bold] = await Promise.all([
    readFile(path.join(dir, "SpaceGrotesk-300.ttf")),
    readFile(path.join(dir, "SpaceGrotesk-500.ttf")),
    readFile(path.join(dir, "SpaceGrotesk-700.ttf")),
  ]);
  return [
    { name: "SG", data: light, weight: 300 as const },
    { name: "SG", data: medium, weight: 500 as const },
    { name: "SG", data: bold, weight: 700 as const },
  ];
}

/** The brand pin-globe on its dark tile — same vector as the app favicon. */
function Brand({ size = 44 }: { size?: number }) {
  const glyph = Math.round(size * 0.62);
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.3),
          background: "radial-gradient(120% 120% at 30% 20%, #21271a 0%, #0d0f0a 100%)",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="none">
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
      <div style={{ display: "flex", fontSize: Math.round(size * 0.72), fontWeight: 500, color: INK, letterSpacing: -0.5 }}>
        Find Your Place
      </div>
    </div>
  );
}

function MicroLabel({ children, color = FAINT, size = 26 }: { children: string; color?: string; size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        fontSize: size,
        fontWeight: 500,
        color,
        textTransform: "uppercase",
        letterSpacing: size * 0.22,
      }}
    >
      {children}
    </div>
  );
}

/** Static teal score ring — the app's signature visual, drawn for Satori. */
function Ring({ score, size, label }: { score: number; size: number; label?: string }) {
  const stroke = Math.round(size * 0.075);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.max(0, Math.min(100, score)) / 100) * circ;
  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={TEAL_BRIGHT}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={`${offset}`}
        />
      </svg>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: Math.round(size * 0.33), fontWeight: 300, color: INK, letterSpacing: -2 }}>
          {Math.round(score)}
        </div>
        {label && (
          <div
            style={{
              display: "flex",
              fontSize: Math.round(size * 0.075),
              fontWeight: 500,
              color: FAINT,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginTop: 4,
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

/** Map the engine's category labels to short radar labels. */
const RADAR_SHORT: Record<string, string> = {
  "Climate Fit": "Climate",
  "Nature & Outdoors": "Nature",
  "Community & Social": "People",
  "Career & Work": "Career",
  "Cost & Value": "Cost",
  "Safety & Stability": "Safety",
  "Health & Wellness": "Wellness",
  "Travel & Connectivity": "Travel",
  "Culture & Openness": "Culture",
  "Lifestyle Match": "Lifestyle",
};

/**
 * The "Place DNA" radar — a 10-dimension fingerprint of who the sharer is. No two
 * people's polygons look alike; that uniqueness is what makes the card feel personal
 * enough to post. Pure SVG for Satori.
 */
function Radar({ items, size }: { items: { label: string; score: number }[]; size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.33;
  const n = items.length;
  const pt = (i: number, radius: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)] as const;
  };
  const poly = (radius: number) =>
    Array.from({ length: n }, (_, i) => pt(i, radius).map((v) => v.toFixed(1)).join(",")).join(" ");
  // Floor at 18% so a weak axis still draws — the shape stays readable.
  const dataPts = items.map((c, i) => pt(i, r * (0.18 + 0.82 * Math.max(0, Math.min(100, c.score)) / 100)));
  const dataPoly = dataPts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        {[1 / 3, 2 / 3, 1].map((f) => (
          <polygon key={f} points={poly(r * f)} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1.5} />
        ))}
        {items.map((_, i) => {
          const [x, y] = pt(i, r);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth={1.5} />;
        })}
        <polygon points={dataPoly} fill="rgba(84,224,207,0.22)" stroke={TEAL_BRIGHT} strokeWidth={4} strokeLinejoin="round" />
        {dataPts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill={TEAL_BRIGHT} />
        ))}
      </svg>
      {items.map((c, i) => {
        const [x, y] = pt(i, r + size * 0.085);
        return (
          <div
            key={c.label}
            style={{
              display: "flex",
              position: "absolute",
              left: x - 90,
              top: y - 18,
              width: 180,
              justifyContent: "center",
              fontSize: 25,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {RADAR_SHORT[c.label] ?? c.label}
          </div>
        );
      })}
    </div>
  );
}

/** Redacted-digit blocks for the mystery coordinates. */
function RedactedDigits() {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 6, marginRight: 6 }}>
      {[22, 22, 22].map((w, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            width: w,
            height: 30,
            borderRadius: 6,
            background: "rgba(255,255,255,0.28)",
            marginRight: i === 2 ? 0 : 6,
          }}
        />
      ))}
    </div>
  );
}

function Chip({ children, color = INK }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 30,
        fontWeight: 500,
        color,
        background: CHIP_BG,
        border: `1px solid ${CHIP_BORDER}`,
        borderRadius: 999,
        padding: "14px 30px",
        marginRight: 14,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function frame(content: React.ReactNode, footer: string) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        background: STAGE,
        color: INK,
        padding: 88,
        fontFamily: "SG",
      }}
    >
      <Brand />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>{content}</div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: MUT, letterSpacing: -0.3 }}>{footer}</div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: FAINT }}>findyourplace.app</div>
      </div>
    </div>
  );
}

export async function GET(req: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const run = await getRun(runId);
  const url = new URL(req.url);
  const slide = url.searchParams.get("slide") || "identity";
  const isOg = url.searchParams.get("format") === "og";
  const W = isOg ? 1200 : 1080;
  const H = isOg ? 630 : 1920;
  const fonts = await loadFonts();
  const opts = { width: W, height: H, fonts };

  // ── No run → minimal brand hero (for /og fallbacks) ─────────────────────────
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
            background: STAGE,
            color: INK,
            fontFamily: "SG",
          }}
        >
          <Brand size={56} />
          <div style={{ display: "flex", fontSize: 54, fontWeight: 300, color: MUT, marginTop: 32, letterSpacing: -1 }}>
            Find the place that actually fits you.
          </div>
        </div>
      ),
      opts,
    );
  }

  const unlocked = await isUnlocked(runId);
  const archetype = run.personality.archetype.replace(/^The /, "");
  const traits = run.personality.traits.slice(0, 3);
  const top = run.ranking[0];
  const loc = LOCATIONS.find((l) => l.id === top?.id);
  const continent = run.topTease.continent;
  const region = run.topTease.region;
  const teaseScore = run.topTease.score;
  const currentScore = run.currentCityFit.score;
  const delta = run.lifeChange.overallDelta;
  const alreadyHome = Boolean(run.lifeChange.alreadyHome);
  const topCats = [...run.categoryAverages].sort((a, b) => b.score - a.score).slice(0, 3);

  // ── OG link-unfurl (1200×630): archetype + the ring, side by side ───────────
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
            background: STAGE,
            color: INK,
            padding: 56,
            fontFamily: "SG",
          }}
        >
          <Brand size={40} />
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
              <MicroLabel size={22}>My read</MicroLabel>
              <div
                style={{
                  display: "flex",
                  fontSize: archetype.length > 14 ? 84 : 100,
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: -3,
                  color: INK,
                  marginTop: 14,
                }}
              >
                The {archetype}
              </div>
              <div style={{ display: "flex", fontSize: 26, color: MUT, marginTop: 22 }}>
                My #1 place on Earth is waiting in {continent}.
              </div>
            </div>
            <Ring score={teaseScore} size={280} label="match" />
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: FAINT }}>
            findyourplace.app · 60 seconds, free to start
          </div>
        </div>
      ),
      opts,
    );
  }

  // ── PLACE DNA slide (the flagship share) ────────────────────────────────────
  // Identity flex (radar fingerprint + archetype) + a game for the viewer (the real
  // latitude of their #1 place with the longitude redacted). Free and paid share the
  // same card — the coordinates never name the place.
  if (slide === "dna") {
    const lat = loc?.latitude ?? null;
    const lon = loc?.longitude ?? null;
    const latStr = lat !== null ? `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? "N" : "S"}` : null;
    const ew = lon !== null ? (lon >= 0 ? "E" : "W") : "E";

    return new ImageResponse(
      frame(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: TEAL_BRIGHT, marginRight: 16 }} />
            <MicroLabel color="rgba(255,255,255,0.7)" size={28}>
              My place DNA
            </MicroLabel>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: archetype.length > 14 ? 86 : 104,
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: -3,
              color: INK,
              marginTop: 28,
              textAlign: "center",
            }}
          >
            The {archetype}
          </div>

          <div style={{ display: "flex", marginTop: 30 }}>
            <Radar items={run.categoryAverages} size={800} />
          </div>

          {/* The hooks: mystery coordinates of the #1 place + the proof score */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 34 }}>
            {latStr && (
              <Chip color={TEAL_BRIGHT}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <div style={{ display: "flex" }}>my #1 place: {latStr} ·</div>
                  <RedactedDigits />
                  <div style={{ display: "flex" }}>°{ew}</div>
                </div>
              </Chip>
            )}
            <Chip>{teaseScore} match</Chip>
          </div>
        </div>,
        "guess where I belong?",
      ),
      opts,
    );
  }

  // ── PLACE slide ─────────────────────────────────────────────────────────────
  if (slide === "place") {
    const photoLooksOk =
      loc?.image_url &&
      !/portrait|painting|engraving|stamp|warrior|coronation|coat[-_ ]of[-_ ]arms|\bflag\b|\bseal\b|locator|\bmap\b|orthographic|mascarenhas|descripcion/i.test(
        decodeURIComponent(loc.image_url),
      );

    // Unlocked + photo → cinematic reveal in the new identity.
    if (unlocked && photoLooksOk && loc) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              position: "relative",
              background: STAGE,
              fontFamily: "SG",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={loc.image_url as string}
              alt={loc.name}
              width={W}
              height={H}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: H * 0.26,
                background: "linear-gradient(to bottom, rgba(13,18,22,0.72) 0%, rgba(13,18,22,0) 100%)",
              }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: H * 0.62,
                background:
                  "linear-gradient(to top, rgba(13,18,22,0.97) 0%, rgba(13,18,22,0.86) 30%, rgba(13,18,22,0.4) 70%, rgba(13,18,22,0) 100%)",
              }}
            />
            <div style={{ display: "flex", position: "absolute", top: 88, left: 88, right: 88 }}>
              <Brand />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                bottom: 88,
                left: 88,
                right: 88,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
                  <MicroLabel color="rgba(255,255,255,0.75)">I found my place</MicroLabel>
                  <div
                    style={{
                      display: "flex",
                      fontSize: loc.name.length > 12 ? 130 : 170,
                      fontWeight: 300,
                      lineHeight: 0.95,
                      letterSpacing: -5,
                      color: INK,
                      marginTop: 20,
                    }}
                  >
                    {loc.name}
                  </div>
                  {loc.country !== loc.name && (
                    <div style={{ display: "flex", fontSize: 40, color: "rgba(255,255,255,0.85)", fontWeight: 500, marginTop: 16 }}>
                      {loc.country}
                    </div>
                  )}
                </div>
                <Ring score={top.totalScore} size={230} label="match" />
              </div>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,0.8)", marginTop: 44 }}>
                findyourplace.app · where do you belong?
              </div>
            </div>
          </div>
        ),
        opts,
      );
    }

    // Unlocked, no usable photo → stage reveal.
    if (unlocked && loc) {
      return new ImageResponse(
        frame(
          <div style={{ display: "flex", flexDirection: "column" }}>
            <MicroLabel>I found my place</MicroLabel>
            <div
              style={{
                display: "flex",
                fontSize: loc.name.length > 12 ? 150 : 190,
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: -6,
                color: INK,
                marginTop: 26,
              }}
            >
              {loc.name}
            </div>
            {loc.country !== loc.name && (
              <div style={{ display: "flex", fontSize: 42, color: MUT, marginTop: 24, fontWeight: 500 }}>{loc.country}</div>
            )}
            <div style={{ display: "flex", marginTop: 64 }}>
              <Ring score={top.totalScore} size={260} label="match" />
            </div>
          </div>,
          "where do you belong?",
        ),
        opts,
      );
    }

    // LOCKED → the app's peak moment as a share: ring + blurred plate + the gap.
    return new ImageResponse(
      frame(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              background: CHIP_BG,
              border: `1px solid ${CHIP_BORDER}`,
              borderRadius: 999,
              padding: "14px 32px",
            }}
          >
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: TEAL_BRIGHT, marginRight: 16 }} />
            <MicroLabel color="rgba(255,255,255,0.8)" size={28}>
              My #1 place on Earth
            </MicroLabel>
          </div>

          <div style={{ display: "flex", marginTop: 70 }}>
            <Ring score={teaseScore} size={430} label="match" />
          </div>

          {/* Locked name plate */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              marginTop: 74,
              background: CHIP_BG,
              border: `1px solid ${CHIP_BORDER}`,
              borderRadius: 28,
              padding: "40px 84px",
            }}
          >
            {/* Redacted name — drawn blocks (the block glyph isn't in the brand font) */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 64 }}>
              {[72, 46, 88, 58, 74, 50].map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    width: w,
                    height: 44,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.20)",
                    marginRight: i === 5 ? 0 : 12,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 34, color: MUT, marginTop: 14 }}>
              {continent}
              {region ? ` · ${region}` : ""}
            </div>
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 26,
                width: 76,
                height: 76,
                borderRadius: 999,
                background: INK,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={38} height={38} viewBox="0 0 24 24" fill="none">
                <path d="M7 10.5V7a5 5 0 0 1 10 0v3.5" stroke="#141a1e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <rect x="4.6" y="10.5" width="14.8" height="10" rx="2.6" fill="#141a1e" />
              </svg>
            </div>
          </div>

          {/* The gap — the sharer's real numbers */}
          <div style={{ display: "flex", flexDirection: "row", marginTop: 60 }}>
            <Chip color={TEAL_BRIGHT}>
              {alreadyHome
                ? "it might be where I already am"
                : delta > 0
                  ? `+${delta} fit vs my city's ${currentScore}`
                  : `my city scores ${currentScore}/100`}
            </Chip>
          </div>
        </div>,
        "guess where?",
      ),
      opts,
    );
  }

  // ── CTA slide ───────────────────────────────────────────────────────────────
  if (slide === "cta") {
    return new ImageResponse(
      frame(
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MicroLabel>Now you</MicroLabel>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 168,
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: -5,
              color: INK,
              marginTop: 30,
            }}
          >
            <span>Where</span>
            <span>should you</span>
            <span style={{ color: TEAL_BRIGHT }}>live?</span>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: MUT, marginTop: 48 }}>
            250 places, scored against who you actually are.
          </div>
        </div>,
        "60 seconds · free to start",
      ),
      opts,
    );
  }

  // ── IDENTITY slide (default — the universal share) ──────────────────────────
  return new ImageResponse(
    frame(
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: TEAL_BRIGHT, marginRight: 16 }} />
          <MicroLabel>My read</MicroLabel>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 300, color: MUT, letterSpacing: -1, marginTop: 40 }}>
          The
        </div>
        <div
          style={{
            display: "flex",
            fontSize: archetype.length > 14 ? 130 : 165,
            fontWeight: 300,
            lineHeight: 0.98,
            letterSpacing: -5,
            color: INK,
          }}
        >
          {archetype}
        </div>

        {traits.length > 0 && (
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 56 }}>
            {traits.map((t) => (
              <Chip key={t}>{titleCase(t)}</Chip>
            ))}
          </div>
        )}

        {/* The sharer's real data — top strengths as hairline bars */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 84 }}>
          <MicroLabel size={24}>My strongest fits</MicroLabel>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
            {topCats.map((c) => (
              <div key={c.label} style={{ display: "flex", flexDirection: "column", marginBottom: 34 }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ display: "flex", fontSize: 33, color: MUT }}>{c.label}</div>
                  <div style={{ display: "flex", fontSize: 44, fontWeight: 300, color: INK, letterSpacing: -1 }}>
                    {Math.round(c.score)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    marginTop: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: `${Math.max(4, Math.min(100, c.score))}%`,
                      height: 8,
                      borderRadius: 999,
                      background: TEAL_BRIGHT,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>,
      "what's yours?",
    ),
    opts,
  );
}
