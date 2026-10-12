/** Only public campaign labels are kept; never retain raw URLs or query values. */
export type AcquisitionSource = "instagram" | "instagram/story" | "instagram/carousel";
const KEY = "fyp_acquisition_source";
const SOURCES: AcquisitionSource[] = ["instagram", "instagram/story", "instagram/carousel"];

export function classifyAcquisition(search: string): AcquisitionSource | null {
  const params = new URLSearchParams(search);
  if (params.get("utm_source")?.toLowerCase() !== "instagram") return null;
  const content = params.get("utm_content")?.toLowerCase() ?? "";
  if (/^story(?:_\d+)?$/.test(content)) return "instagram/story";
  if (/^carousel(?:_\d+)?$/.test(content)) return "instagram/carousel";
  return "instagram";
}

export function acquisitionSource(): AcquisitionSource | null {
  if (typeof window === "undefined") return null;
  const current = classifyAcquisition(window.location.search);
  try {
    if (current) {
      sessionStorage.setItem(KEY, current);
      return current;
    }
    const stored = sessionStorage.getItem(KEY);
    return SOURCES.includes(stored as AcquisitionSource) ? stored as AcquisitionSource : null;
  } catch {
    return current;
  }
}
