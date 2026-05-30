import { NextRequest, NextResponse } from "next/server";
import { scoreLocations, scoreCurrentCity } from "@/lib/scoring";
import { generateAnnualCircuit } from "@/lib/circuitGenerator";
import { LOCATIONS } from "@/data/locations";
import { buildPersonalityRead } from "@/lib/personality";
import { toRankedPlace, toFreeRun, type ScoredRun } from "@/lib/run";
import { putRun } from "@/lib/server/runStore";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Authoritative scoring endpoint. Runs the deterministic engine server-side so the
 * client never recomputes (and so we can persist + gate later). Returns the full
 * ScoredRun; the results page is responsible for hiding locked fields until paid.
 */
export async function POST(req: NextRequest) {
  let body: { inputs?: OnboardingData; source?: "quiz" | "ai-profile" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const inputs = body.inputs ?? {};
  const source = body.source === "ai-profile" ? "ai-profile" : "quiz";
  const currentCity = (inputs.currentCity ?? "").trim();

  const matches = scoreLocations(LOCATIONS, inputs);
  if (matches.length === 0) {
    return NextResponse.json({ error: "No locations to score" }, { status: 500 });
  }

  const top = matches[0];
  const currentCityFit = scoreCurrentCity(currentCity || "unknown", LOCATIONS, inputs);
  const circuit = generateAnnualCircuit(LOCATIONS, inputs);

  // Category averages across the top 10 (free "category bars" surface).
  const topSlice = matches.slice(0, 10);
  const labels = top.categoryScores.map((c) => c.label);
  const categoryAverages = labels.map((label, i) => ({
    label,
    score: Math.round(topSlice.reduce((s, m) => s + (m.categoryScores[i]?.score ?? 0), 0) / topSlice.length),
  }));

  const run: ScoredRun = {
    runId: crypto.randomUUID(),
    createdAt: Date.now(),
    currentCity,
    inputs,
    source,
    personality: buildPersonalityRead(inputs),
    currentCityFit,
    categoryAverages,
    topTease: { score: top.totalScore, continent: top.location.continent, region: top.location.region },
    ranking: matches.map(toRankedPlace),
    circuit,
    topCount: matches.length,
  };

  // Persist the FULL run server-side; return only the FREE surface to the client.
  // The locked ranking/circuit/#1-name are never sent until a server-verified unlock.
  putRun(run);
  return NextResponse.json({ runId: run.runId, free: toFreeRun(run) });
}
