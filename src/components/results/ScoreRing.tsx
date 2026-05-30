"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScoreRing({
  score,
  size = 140,
  label,
  blurred = false,
}: {
  score: number;
  size?: number;
  label?: string;
  blurred?: boolean;
}) {
  const stroke = size * 0.08;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  const offset = circ - (shown / 100) * circ;

  return (
    <div className={cn("relative inline-grid place-items-center", blurred && "blur-[6px]")} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.2,0.8,0.2,1)" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-3xl font-extrabold tabular-nums leading-none">{Math.round(shown)}</div>
          {label && <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>}
        </div>
      </div>
    </div>
  );
}
