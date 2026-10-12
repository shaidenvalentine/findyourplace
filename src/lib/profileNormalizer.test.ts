import { describe, expect, it } from "vitest";
import { normalizeProfileHeuristic } from "./profileNormalizer";

describe("profile tax sensitivity", () => {
  it.each([
    "Taxes are not a priority. I work remotely and love the beach.",
    "Tax is not important to me.",
    "Taxes aren't my top priority.",
    "Taxes aren’t a concern.",
    "I don't care about taxes.",
    "I don’t care about low taxes.",
    "Low taxes do not matter to me.",
    "Taxation doesn't matter.",
    "I am not tax-sensitive.",
    "I am not very tax sensitive.",
  ])("honors explicit indifference: %s", (text) => {
    const result = normalizeProfileHeuristic(text, "London");
    expect(result.inputs.taxSensitivity).toBe("not-sensitive");
    expect(result.readback).toContainEqual({
      key: "taxSensitivity", label: "Taxes matter", value: "Not Sensitive",
    });
  });

  it.each([
    "Low tax is important to me.",
    "I want a tax-free destination.",
    "Tax optimization is a priority.",
    "I am tax sensitive, but nightlife is not a priority.",
    "Not only taxes matter; safety matters too.",
  ])("retains affirmative tax signals: %s", (text) => {
    expect(normalizeProfileHeuristic(text, "London").inputs.taxSensitivity)
      .toBe("very-sensitive");
  });

  it.each(["I prefer taxis to driving.", "I work remotely near the beach."])(
    "does not infer a tax preference from unrelated text: %s", (text) => {
      expect(normalizeProfileHeuristic(text, "").inputs.taxSensitivity).toBeUndefined();
    },
  );
});
