import { NextRequest, NextResponse } from "next/server";
import { buildScoredRun } from "@/lib/buildRun";
import { toFreeRun } from "@/lib/run";
import { getRun, putRun } from "@/lib/server/runStore";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Re-scores an existing run with additional deep-quiz answers. Merges the new inputs,
 * rebuilds the full run server-side (same engine as /api/score), and persists it under
 * the SAME runId — so confidence climbs and the match sharpens without ever changing the
 * gate. Unlock state lives in a separate ledger and is preserved across refinement.
 */
export async function POST(req: NextRequest) {
  let body: { runId?: string; additionalInputs?: OnboardingData };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const runId = body.runId ?? "";
  const existing = await getRun(runId);
  if (!existing) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  // Merge: keep the original currentCity if the patch doesn't include one.
  const mergedInputs: OnboardingData = { ...existing.inputs, ...(body.additionalInputs ?? {}) };
  if (!mergedInputs.currentCity && existing.currentCity) mergedInputs.currentCity = existing.currentCity;

  const updated = buildScoredRun({
    runId: existing.runId,
    createdAt: existing.createdAt,
    inputs: mergedInputs,
    source: existing.source,
  });

  await putRun(updated);
  return NextResponse.json({ free: toFreeRun(updated) });
}
