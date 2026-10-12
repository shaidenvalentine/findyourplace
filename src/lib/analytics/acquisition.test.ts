import { expect, it } from "vitest";
import { classifyAcquisition } from "./acquisition";

it("distinguishes the founder's two launch placements", () => {
  expect(classifyAcquisition("?utm_source=instagram&utm_content=story")).toBe("instagram/story");
  expect(classifyAcquisition("?utm_source=instagram&utm_content=carousel")).toBe("instagram/carousel");
  expect(classifyAcquisition("?utm_source=instagram&utm_content=story_3")).toBe("instagram/story");
});
it("does not store arbitrary content or query data", () => {
  expect(classifyAcquisition("?utm_source=instagram&utm_content=person%40example.com")).toBe("instagram");
  expect(classifyAcquisition("?utm_source=person%40example.com")).toBeNull();
  expect(classifyAcquisition("")).toBeNull();
});
