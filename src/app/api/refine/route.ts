import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/server/rateLimit";
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
  const limited = enforceRateLimit(req, "refine", 60, 60);
  if (limited) return limited;

  let body: { runId?: string; additionalInputs?: OnboardingData; inputs?: OnboardingData };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const runId = body.runId ?? "";
  let existing = await getRun(runId);

  // Cold-lambda / no-DB fallback: rebuild from the client's cached inputs so refine never
  // dead-ends the way the other routes already guard against.
  if (!existing && body.inputs) {
    existing = buildScoredRun({ runId, createdAt: Date.now(), inputs: body.inputs, source: "quiz" });
  }
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
