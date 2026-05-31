import { NextRequest, NextResponse } from "next/server";
import { getRun, isUnlocked, putRun } from "@/lib/server/runStore";
import { buildScoredRun } from "@/lib/buildRun";
import { toFreeRun } from "@/lib/run";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Returns a run's FREE surface always, and the LOCKED payload (full ranking +
 * annual circuit + the named #1) ONLY when the server confirms the run is unlocked.
 *
 * Serverless robustness: the in-memory runStore is per-lambda-instance, so a cold
 * lambda may not have the run. Both GET and POST work — POST lets the client send its
 * cached inputs as a fallback so any lambda can rebuild the run deterministically.
 * Result: no more "run error on first try" cold-start race.
 */
async function handleResult(runId: string, fallbackInputs?: OnboardingData) {
  let run = getRun(runId);

  // Cold-lambda fallback: rebuild from the client's cached inputs.
  if (!run && fallbackInputs) {
    run = buildScoredRun({
      runId,
      createdAt: Date.now(),
      inputs: fallbackInputs,
      source: "quiz",
    });
    putRun(run);
  }

  if (!run) {
    return NextResponse.json({ error: "Run not found or expired" }, { status: 404 });
  }

  const unlocked = isUnlocked(runId);
  const free = toFreeRun(run);
  if (!unlocked) return NextResponse.json({ free, unlocked: false });
  return NextResponse.json({
    free,
    unlocked: true,
    locked: { ranking: run.ranking, circuit: run.circuit },
  });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return handleResult(runId);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  let inputs: OnboardingData | undefined;
  try {
    const body = await req.json();
    if (body && body.inputs && typeof body.inputs === "object") inputs = body.inputs as OnboardingData;
  } catch {
    /* no body is fine — same as GET */
  }
  return handleResult(runId, inputs);
}
