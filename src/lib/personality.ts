import type { OnboardingData } from "@/types/onboarding";
import type { PersonalityRead } from "@/lib/run";

/**
 * Deterministic personality read derived from the scoring inputs. This is part of
 * the FREE trust-builder ("the engine gets me") shown before the paywall.
 */
export function buildPersonalityRead(p: OnboardingData): PersonalityRead {
  const traits: string[] = [];

  const nomadic = p.lifestyleMode === "nomadic";
  if (nomadic) traits.push("Nomadic");
  else if (p.lifestyleMode === "rooted") traits.push("Rooted");

  if (p.beachMountain === "beach") traits.push("Coast-seeker");
  if (p.beachMountain === "mountains") traits.push("Mountain-soul");
  if (p.preferredClimate) traits.push(`${cap(p.preferredClimate)} climate`);
  if (p.budgetRange === "budget") traits.push("Value-driven");
  if (p.budgetRange === "luxury") traits.push("Premium taste");
  if (p.safetyPriority === "top-priority") traits.push("Safety-first");
  if (p.taxSensitivity === "very-sensitive") traits.push("Tax-aware");
  if (p.workStyle === "remote") traits.push("Remote worker");
  if (p.noiseTolerance === "high") traits.push("Night-energy");
  if (p.noiseTolerance === "low") traits.push("Calm-seeker");
  if (p.wellnessImportance === "high" || p.gymCulture === "important") traits.push("Wellness-led");
  if (p.communityVibes?.includes("digital-nomad")) traits.push("Community-driven");

  const archetype = pickArchetype(p);

  return {
    archetype,
    blurb: blurbFor(archetype, p),
    traits: traits.slice(0, 6),
  };
}

function pickArchetype(p: OnboardingData): string {
  if (p.lifestyleMode === "nomadic" && p.beachMountain === "beach") return "The Sun-Chasing Nomad";
  if (p.lifestyleMode === "nomadic" && p.beachMountain === "mountains") return "The Altitude Wanderer";
  if (p.lifestyleMode === "nomadic") return "The Free-Range Builder";
  if (p.safetyPriority === "top-priority" && p.budgetRange === "luxury") return "The Settled Cosmopolitan";
  if (p.beachMountain === "beach") return "The Coastal Romantic";
  if (p.beachMountain === "mountains") return "The Highland Stoic";
  if (p.workStyle === "remote") return "The Anchored Remote";
  return "The Open Explorer";
}

function blurbFor(archetype: string, p: OnboardingData): string {
  const climate = p.preferredClimate ? `${p.preferredClimate} air` : "the right weather";
  const pace =
    p.noiseTolerance === "low"
      ? "a slower, quieter rhythm"
      : p.noiseTolerance === "high"
        ? "energy, nightlife, and people around you"
        : "a balanced day with room to breathe";
  return `You read as ${archetype.replace(/^The /, "").toLowerCase()}: someone drawn to ${climate} and ${pace}. We weighted your match toward the things you said you can't live without — and away from your deal-breakers.`;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
