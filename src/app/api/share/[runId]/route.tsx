import { ImageResponse } from "next/og";
import { getRun, isUnlocked } from "@/lib/server/runStore";
import { LOCATIONS } from "@/data/locations";
import { formatMoney } from "@/lib/tax";

/**
 * Dynamic share images — a "Wrapped"-style swipeable set, each 1080×1920 for stories.
 * ?slide=identity|gap|tax|place|cta  (default = a summary card, also used for link unfurls
 * at ?format=og 1200×630). Branches on server-verified unlock: the place SLIDE only names
 * the #1 (with its photo) when paid — locked otherwise. No emoji/special glyphs (Satori).
 * Every flex container sets display:flex explicitly (Satori requires it for >1 child).
 */
export const runtime = "nodejs";

const C = {
  bg: "#0a0b12",
  fg: "#f0f2f7",
  muted: "#9aa0b0",
  panel: "#13151f",
  border: "#222533",
  primary: "#f26a3e",
  accent: "#f9b13c",
  success: "#2fb673",
};
const COL = { display: "flex", flexDirection: "column" } as const;
const ROW = { display: "flex", flexDirection: "row" } as const;
const AURORA = `radial-gradient(55% 38% at 12% 0%, rgba(242,106,62,0.22), transparent 70%), radial-gradient(50% 38% at 95% 8%, rgba(45,193,180,0.16), transparent 70%), ${C.bg}`;

function Brand() {
  return (
    <div style={{ ...ROW, alignItems: "center" }}>
      <div style={{ display: "flex", width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#f26a3e,#f9b13c)", marginRight: 14 }} />
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: C.fg }}>Find Your Place</div>
    </div>
  );
}
function Footer() {
  return (
    <div style={{ ...ROW, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", fontSize: 28, color: C.muted }}>findyourplace.app</div>
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#1a1206", background: "linear-gradient(100deg,#f26a3e,#f9b13c)", padding: "14px 28px", borderRadius: 999 }}>
        Find your place
      </div>
    </div>
  );
}

/** Story frame: brand (top), centered content (middle), footer (bottom). */
function story(content: React.ReactNode) {
  return (
    <div style={{ ...COL, width: "100%", height: "100%", justifyContent: "space-between", background: AURORA, color: C.fg, padding: 96, fontFamily: "sans-serif" }}>
      <Brand />
      <div style={{ ...COL, flexGrow: 1, justifyContent: "center", paddingTop: 50, paddingBottom: 50 }}>{content}</div>
      <Footer />
    </div>
  );
}

export async function GET(req: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const run = getRun(runId);
  const url = new URL(req.url);
  const slide = url.searchParams.get("slide") || "summary";
  const isOg = url.searchParams.get("format") === "og";
  const W = isOg ? 1200 : 1080;
  const H = isOg ? 630 : 1920;

  if (!run) {
    return new ImageResponse(
      (
        <div style={{ ...COL, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: AURORA, color: C.fg, fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800 }}>Find Your Place</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  const unlocked = isUnlocked(runId);
  const lc = run.lifeChange;
  const tc = run.taxComparison;
  const top = run.ranking[0];
  const loc = LOCATIONS.find((l) => l.id === top?.id);
  const here = run.currentCity?.trim() || "where I live now";

  // ── OG link-unfurl (compact 1200×630): the gap ──────────────────────────────
  if (isOg) {
    return new ImageResponse(
      (
        <div style={{ ...COL, width: "100%", height: "100%", justifyContent: "space-between", background: AURORA, color: C.fg, padding: 56, fontFamily: "sans-serif" }}>
          <Brand />
          <div style={COL}>
            <div style={{ display: "flex", fontSize: 26, color: C.muted, marginBottom: 10 }}>How much better my life could fit</div>
            <div style={{ ...ROW, alignItems: "flex-end" }}>
              <div style={{ display: "flex", fontSize: 120, fontWeight: 800, color: C.muted, lineHeight: 1, marginRight: 40 }}>{lc.currentScore}</div>
              <div style={{ display: "flex", fontSize: 60, fontWeight: 800, color: C.muted, marginBottom: 16, marginRight: 40 }}>{">"}</div>
              <div style={{ display: "flex", fontSize: 120, fontWeight: 800, color: C.primary, lineHeight: 1 }}>{lc.bestScore}</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: C.muted }}>findyourplace.app · find the place that fits you</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── PLACE slide (photo when paid) ───────────────────────────────────────────
  if (slide === "place") {
    if (unlocked && loc?.image_url) {
      return new ImageResponse(
        (
          <div style={{ ...COL, width: "100%", height: "100%", position: "relative", fontFamily: "sans-serif" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={loc.image_url} alt={loc.name} width={W} height={H} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(to top, rgba(8,9,16,0.94) 16%, rgba(8,9,16,0.1) 55%, rgba(8,9,16,0.5))" }} />
            <div style={{ ...COL, position: "absolute", inset: 0, justifyContent: "space-between", padding: 96, color: C.fg }}>
              <Brand />
              <div style={COL}>
                <div style={{ display: "flex", fontSize: 34, color: "#e7e9f0", marginBottom: 10 }}>The place that fits me:</div>
                <div style={{ display: "flex", fontSize: 116, fontWeight: 800, lineHeight: 1 }}>{loc.name}</div>
                <div style={{ display: "flex", fontSize: 34, color: "#cfd3df", marginTop: 16 }}>{loc.country} · {top.totalScore}/100 match</div>
              </div>
              <Footer />
            </div>
          </div>
        ),
        { width: W, height: H }
      );
    }
    return new ImageResponse(
      story(
        <div style={COL}>
          <div style={{ display: "flex", fontSize: 40, color: C.muted, marginBottom: 14 }}>My perfect place is in</div>
          <div style={{ display: "flex", fontSize: 100, fontWeight: 800, color: C.accent, lineHeight: 1.05 }}>{run.topTease.continent}</div>
          <div style={{ ...ROW, alignItems: "center", marginTop: 44 }}>
            <div style={{ display: "flex", width: 40, height: 34, borderRadius: 8, border: `6px solid ${C.accent}`, marginRight: 18 }} />
            <div style={{ display: "flex", fontSize: 56, fontWeight: 800 }}>Still locked</div>
          </div>
          <div style={{ display: "flex", fontSize: 36, color: C.muted, marginTop: 30, maxWidth: 820 }}>Guess where? Take the quiz and find yours.</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── TAX slide ───────────────────────────────────────────────────────────────
  if (slide === "tax" && tc && tc.currentKnown && tc.annualSavings > 0) {
    return new ImageResponse(
      story(
        <div style={COL}>
          <div style={{ display: "flex", fontSize: 40, color: C.muted, marginBottom: 10 }}>I could keep</div>
          <div style={{ display: "flex", fontSize: 176, fontWeight: 800, color: C.success, lineHeight: 1 }}>{formatMoney(tc.annualSavings)}</div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 700, marginTop: 8 }}>more a year in taxes</div>
          <div style={{ display: "flex", fontSize: 34, color: C.muted, marginTop: 36, maxWidth: 840 }}>
            moving from {tc.currentCountry} ({tc.currentRate}%) to my #1 match ({tc.destRate}%).
          </div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── CTA slide ───────────────────────────────────────────────────────────────
  if (slide === "cta") {
    return new ImageResponse(
      story(
        <div style={COL}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.1, maxWidth: 840 }}>Where should YOU live?</div>
          <div style={{ display: "flex", fontSize: 42, color: C.muted, marginTop: 30, maxWidth: 820 }}>Find the place on Earth that actually fits you — in under a minute.</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── GAP slide (default) ──────────────────────────────────────────────────────
  if (slide === "gap" || slide === "summary") {
    return new ImageResponse(
      story(
        <div style={COL}>
          <div style={{ display: "flex", fontSize: 40, color: C.muted, marginBottom: 28 }}>How much better my life could fit</div>
          <div style={{ ...ROW, alignItems: "flex-end" }}>
            <div style={{ ...COL, marginRight: 70 }}>
              <div style={{ display: "flex", fontSize: 220, fontWeight: 800, color: C.muted, lineHeight: 1 }}>{lc.currentScore}</div>
              <div style={{ display: "flex", fontSize: 32, color: C.muted, marginTop: 12 }}>{here}</div>
            </div>
            <div style={COL}>
              <div style={{ display: "flex", fontSize: 220, fontWeight: 800, color: C.primary, lineHeight: 1 }}>{lc.bestScore}</div>
              <div style={{ display: "flex", fontSize: 32, color: C.muted, marginTop: 12 }}>my best-fit place</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 42, fontWeight: 600, marginTop: 56, maxWidth: 880 }}>{lc.headline}</div>
        </div>
      ),
      { width: W, height: H }
    );
  }

  // ── IDENTITY slide (default fallthrough) ─────────────────────────────────────
  return new ImageResponse(
    story(
      <div style={COL}>
        <div style={{ display: "flex", fontSize: 44, color: C.muted, marginBottom: 10 }}>I am</div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 800, color: C.accent, lineHeight: 1.05, maxWidth: 890 }}>{run.personality.archetype}</div>
        <div style={{ ...ROW, flexWrap: "wrap", marginTop: 44 }}>
          {run.personality.traits.slice(0, 4).map((t) => (
            <div key={t} style={{ display: "flex", fontSize: 30, color: C.fg, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 999, padding: "12px 26px", marginRight: 14, marginBottom: 14 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
