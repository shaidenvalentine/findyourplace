import { NextRequest, NextResponse } from "next/server";
import { normalizeProfileHeuristic, buildReadback, type NormalizedProfile } from "@/lib/profileNormalizer";
import type { OnboardingData } from "@/types/onboarding";

/**
 * Normalizes a pasted, AI-written personal profile into structured scoring inputs.
 *
 * PRIVACY (CLAUDE.md guardrail): the raw profile is sensitive. We process it in
 * memory only, extract just the scoring signal, NEVER log its contents, and never
 * persist the raw text. If ANTHROPIC_API_KEY is set we use the model for a richer
 * parse; otherwise the deterministic heuristic runs (so the path always works).
 */
export const runtime = "nodejs";

const EXTRACT_KEYS = `lifestyleMode(rooted|nomadic), preferredClimate(tropical|mediterranean|temperate|cold), beachMountain(beach|mountains|either), noiseTolerance(low|medium|high), outdoorUrban(urban|outdoor), workStyle(remote|hybrid|onsite), industries(array of tech|creative|finance), communityVibes(array of digital-nomad|startup|expat|local), budgetRange(budget|mid-range|luxury), taxSensitivity(very-sensitive|somewhat|not-sensitive), safetyPriority(top-priority|important|flexible), riskTolerance(low|medium|high), wellnessImportance(high|medium|low), gymCulture(important|neutral), healthcarePriority(essential|nice|low), airportImportance(essential|important|low), mustHaves(array of affordable|safety|nature|nightlife|beach), dealBreakers(array of high-crime|expensive), lovedPlaces(array of specific place names the person has loved, felt at home in, or keeps returning to)`;

async function normalizeWithLLM(text: string, currentCity: string): Promise<NormalizedProfile | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  // Never let a slow model hang the user on "Reading your profile…". Abort after 9s and
  // let the caller fall through to the always-available heuristic.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system:
          "You extract structured relocation-preference signals from a personal profile. " +
          "Return ONLY a JSON object whose keys are a subset of: " +
          EXTRACT_KEYS +
          ". Omit any field you have no signal for. No prose, no markdown.",
        messages: [{ role: "user", content: text.slice(0, 12000) }],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.content?.[0]?.text ?? "";
    const jsonStr = raw.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr) as OnboardingData;
    const inputs: OnboardingData = { ...parsed, currentCity };
    return { inputs, readback: buildReadback(inputs) };
  } catch {
    return null; // any failure (incl. timeout abort) → caller falls back to heuristic
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  let body: { profileText?: string; currentCity?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const profileText = (body.profileText ?? "").trim();
  const currentCity = (body.currentCity ?? "").trim();

  if (profileText.length < 40) {
    return NextResponse.json(
      { error: "That doesn't look like a full profile yet — paste the whole thing your AI wrote." },
      { status: 422 }
    );
  }

  const llm = await normalizeWithLLM(profileText, currentCity);
  const result = llm ?? normalizeProfileHeuristic(profileText, currentCity);

  // Note: we deliberately return ONLY the structured signal + readback, never echo raw text.
  return NextResponse.json({ inputs: result.inputs, readback: result.readback, usedModel: Boolean(llm) });
}
