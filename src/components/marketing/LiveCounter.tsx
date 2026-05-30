"use client";

import { useEffect, useState } from "react";

/**
 * Social-proof live counter. Reads from /api/live-count when available and
 * otherwise shows a stable seeded baseline so the surface never looks empty.
 * (Wired to the real `quiz_completions` table in Phase 5.)
 */
export function LiveCounter({ baseline = 14213 }: { baseline?: number }) {
  const [count, setCount] = useState(baseline);

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

  return (
    <span className="tabular-nums font-semibold text-foreground">{count.toLocaleString()}</span>
  );
}
