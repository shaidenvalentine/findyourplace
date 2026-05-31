import { ImageResponse } from "next/og";
import { getRun, isUnlocked } from "@/lib/server/runStore";

/**
 * Dynamic share card (the viral surface). Branches on server-verified unlock state:
 *  - TEASER (free/locked): archetype + current→best fit + "my place is locked" + continent.
 *  - REVEAL (paid/unlocked): names the #1 place.
 * Formats: ?format=story (1080×1920, default) or ?format=og (1200×630, link unfurls).
 * Runs on node so it can read the in-memory run store.
 *
 * Satori rules honored: EVERY div with >1 child has an explicit display:flex; no
 * emoji/special glyphs (Satori has no font for them).
 */
export const runtime = "nodejs";

const C = {
  bg: "#0a0b12",
  panel: "#13151f",
  border: "#222533",
  fg: "#f0f2f7",
  muted: "#9aa0b0",
  primary: "#f26a3e",
  accent: "#f9b13c",
};

export async function GET(req: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const run = getRun(runId);
  const url = new URL(req.url);
  const format = url.searchParams.get("format") === "og" ? "og" : "story";
  const W = format === "og" ? 1200 : 1080;
  const H = format === "og" ? 630 : 1920;
  const isOg = format === "og";

  if (!run) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: C.bg, color: C.fg, fontSize: 56, fontWeight: 800 }}>
          Find Your Place
        </div>
      ),
      { width: W, height: H }
    );
  }

  const unlocked = isUnlocked(runId);
  const lc = run.lifeChange;
  const archetype = run.personality.archetype;
  const here = run.currentCity?.trim() || "where you live now";
  const placeName = unlocked ? run.ranking[0]?.name : null;
  const continent = run.topTease.continent;
  const pad = isOg ? 60 : 100;
  const big = isOg ? 130 : 210;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          background: `radial-gradient(55% 40% at 12% 0%, rgba(242,106,62,0.22), transparent 70%), radial-gradient(50% 40% at 95% 8%, rgba(45,193,180,0.16), transparent 70%), ${C.bg}`,
          color: C.fg,
          padding: pad,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div style={{ display: "flex", width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #f26a3e, #f9b13c)", marginRight: 16 }} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>Find Your Place</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: isOg ? 24 : 34, color: C.muted, marginBottom: 6 }}>I am</div>
          <div style={{ display: "flex", fontSize: isOg ? 52 : 84, fontWeight: 800, lineHeight: 1.05, color: C.accent }}>{archetype}</div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", marginTop: isOg ? 26 : 64 }}>
            <div style={{ display: "flex", flexDirection: "column", marginRight: 56 }}>
              <div style={{ display: "flex", fontSize: big, fontWeight: 800, color: C.muted, lineHeight: 1 }}>{String(lc.currentScore)}</div>
              <div style={{ display: "flex", fontSize: 26, color: C.muted, marginTop: 12 }}>{here}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: big, fontWeight: 800, color: C.primary, lineHeight: 1 }}>{String(lc.bestScore)}</div>
              <div style={{ display: "flex", fontSize: 26, color: C.muted, marginTop: 12 }}>{placeName ? placeName : "my best-fit place"}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: isOg ? 22 : 56, padding: "22px 30px", borderRadius: 18, border: `1px solid ${C.border}`, background: C.panel }}>
            <div style={{ display: "flex", fontSize: 26, color: C.muted, marginBottom: 6 }}>
              {placeName ? "The place that fits me" : `My perfect place is in ${continent}`}
            </div>
            <div style={{ display: "flex", fontSize: isOg ? 44 : 62, fontWeight: 800, color: placeName ? C.fg : C.accent }}>
              {placeName ? placeName : "Locked"}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: isOg ? 25 : 34, color: C.fg, marginTop: isOg ? 22 : 56, fontWeight: 600 }}>{lc.headline}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, color: C.muted }}>findyourplace.app</div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#1a1206", background: "linear-gradient(100deg, #f26a3e, #f9b13c)", padding: "16px 32px", borderRadius: 999 }}>
            Find your place
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
