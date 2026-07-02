"use client";

import { useEffect, useState } from "react";

/**
 * Social-proof live counter — renders the whole "· 1,234 matched" segment, and renders
 * NOTHING until /api/live-count returns a real number (Supabase-backed count past its
 * floor). No fabricated baseline: the claim only appears once it's true.
 */
export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/live-count")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (active && d && typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (count === null) return null;
  return (
    <>
      {" · "}
      <span className="tabular-nums font-semibold text-foreground">{count.toLocaleString()}</span> matched
    </>
  );
}
