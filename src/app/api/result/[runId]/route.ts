import { NextRequest, NextResponse } from "next/server";
import { getRun, isUnlocked } from "@/lib/server/runStore";
import { toFreeRun } from "@/lib/run";

/**
 * Returns a run's FREE surface always, and the LOCKED payload (full ranking +
 * annual circuit + the named #1) ONLY when the server confirms the run is unlocked.
 * This is the gate: locked data is never serialized to an un-paid client.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const run = getRun(runId);
  if (!run) {
    return NextResponse.json({ error: "Run not found or expired" }, { status: 404 });
  }

  const unlocked = isUnlocked(runId);
  const free = toFreeRun(run);

  if (!unlocked) {
    return NextResponse.json({ free, unlocked: false });
  }

  return NextResponse.json({
    free,
    unlocked: true,
    locked: { ranking: run.ranking, circuit: run.circuit },
  });
}
