"use client";

import { useEffect } from "react";

/**
 * Fires once on mount to record this visit. Lets the parent page stay a pure server
 * component (so it can be statically generated when the creator data is known).
 */
export function RecordClick({ code, source }: { code: string; source: "landing" | "link" | "code" }) {
  useEffect(() => {
    fetch("/api/creators/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, source }),
    }).catch(() => {});
  }, [code, source]);
  return null;
}
