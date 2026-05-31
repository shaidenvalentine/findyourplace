import { NextRequest, NextResponse } from "next/server";
import { LOCATIONS } from "@/data/locations";
import { buildScoredRun } from "@/lib/buildRun";
import { toFreeRun } from "@/lib/run";
import { putRun } from "@/lib/server/runStore";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Authoritative scoring endpoint. Runs the deterministic engine server-side so the
 * client never recomputes (and so we can persist + gate later). Returns the runId +
 * the FREE surface; the locked ranking/circuit/#1-name are stored server-side and
 * never sent until a server-verified unlock.
 */
export async function POST(req: NextRequest) {
  let body: { inputs?: OnboardingData; source?: "quiz" | "ai-profile" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (LOCATIONS.length === 0) {
    return NextResponse.json({ error: "No locations to score" }, { status: 500 });
  }

  const run = buildScoredRun({
    runId: crypto.randomUUID(),
    createdAt: Date.now(),
    inputs: body.inputs ?? {},
    source: body.source === "ai-profile" ? "ai-profile" : "quiz",
  });

  putRun(run);
  return NextResponse.json({ runId: run.runId, free: toFreeRun(run) });
}
