import type { OnboardingData } from "@/types/onboarding";
import type { PersonalityRead } from "@/lib/run";

/**
 * Deterministic owner-profile read derived from the scoring inputs. This is part of
 * the FREE trust-builder ("the engine gets me") shown before the paywall.
 */
export function buildPersonalityRead(p: OnboardingData): PersonalityRead {
  const traits: string[] = [];

  if (p.activityLevel === "athlete") traits.push("High-mileage");
  else if (p.activityLevel === "active") traits.push("Outdoorsy");
  else if (p.activityLevel === "relaxed") traits.push("Homebody");

  if (p.homeType === "apartment") traits.push("City-living");
  if (p.homeType === "house-big-yard" || p.homeType === "rural") traits.push("Room-to-roam");
  if (p.experienceLevel === "first-time") traits.push("First-time owner");
  if (p.experienceLevel === "experienced") traits.push("Seasoned handler");
  if (p.hasKids) traits.push("Family pack");
  if (p.otherPets?.length && !p.otherPets.includes("none")) traits.push("Multi-pet home");
  if (p.affectionStyle === "velcro") traits.push("Velcro-dog person");
  if (p.affectionStyle === "independent") traits.push("Independent-streak");
  if (p.guardingImportance === "top-priority") traits.push("Security-minded");
  if (p.allergies || p.mustHaves?.includes("hypoallergenic")) traits.push("Allergy-aware");
  if (p.trainingAppetite === "love-it") traits.push("Training nerd");
  if (p.adoptPreference === "adopt") traits.push("Rescue-hearted");

  const archetype = pickArchetype(p);

  return {
    archetype,
    blurb: blurbFor(archetype, p),
    traits: traits.slice(0, 6),
  };
}

function pickArchetype(p: OnboardingData): string {
  if (p.activityLevel === "athlete") return "The Trail Partner";
  if (p.guardingImportance === "top-priority") return "The Guardian Household";
  if (p.hasKids && (p.activityLevel === "active" || p.activityLevel === "moderate")) return "The Pack Builder";
  if (p.homeType === "apartment" && p.hoursAlone === "full-day") return "The City Professional";
  if (p.homeType === "apartment") return "The City Companion Seeker";
  if (p.affectionStyle === "velcro") return "The Devoted Shadow-Keeper";
  if (p.experienceLevel === "first-time") return "The First-Time Devotee";
  if (p.adoptPreference === "adopt") return "The Rescue Romantic";
  if (p.activityLevel === "relaxed") return "The Gentle Homebody";
  return "The Open-Hearted Matchmaker";
}

function blurbFor(archetype: string, p: OnboardingData): string {
  const life =
    p.activityLevel === "athlete"
      ? "a dog that can genuinely keep up"
      : p.activityLevel === "relaxed"
        ? "calm, easy companionship"
        : "a dog that fits real life, not a fantasy of it";
  const home =
    p.homeType === "apartment"
      ? "your space and schedule"
      : p.hasKids
        ? "your whole household — kids included"
        : "the home you actually live in";
  return `You read as ${archetype.replace(/^The /, "").toLowerCase()}: someone looking for ${life}, matched honestly against ${home}. We weighted your match toward the things you said you can't live without — and away from your deal-breakers.`;
}
