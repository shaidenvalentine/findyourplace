"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "./ScoreRing";
import type { RankedPlace } from "@/lib/run";
import type { AnnualCircuit } from "@/lib/circuitGenerator";
import { getMonthAbbrev } from "@/lib/circuitGenerator";
import { LOCATIONS } from "@/data/locations";
import { Check, Trophy, Coins, Plane, Globe2, ChevronDown } from "lucide-react";

export function PaidReveal({ ranking, circuit }: { ranking: RankedPlace[]; circuit: AnnualCircuit | null }) {
  const top = ranking[0];
  return (
    <div className="flex flex-col gap-5">
      <TopMatchHero place={top} />
      <TaxDeepDive place={top} />
      {circuit && circuit.stops.length > 0 && <CircuitSection circuit={circuit} />}
      <FullRanking ranking={ranking} />
    </div>
  );
}

function TopMatchHero({ place }: { place: RankedPlace }) {
  return (
    <div className="bg-aurora animate-fade-up rounded-2xl border border-primary/30 p-6 text-center">
      <Badge variant="primary" className="mx-auto mb-3 w-fit">
        <Trophy className="size-3" /> Your #1 match
      </Badge>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{place.name}</h2>
      <p className="text-muted-foreground">
        {place.region ? `${place.region} · ` : ""}
        {place.country}
      </p>
      <div className="my-4 grid place-items-center">
        <ScoreRing score={place.totalScore} size={150} label="match" />
      </div>
      {place.reasons.length > 0 && (
        <ul className="mx-auto flex max-w-md flex-col gap-2 text-left">
          {place.reasons.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}
      {place.tradeoffs.length > 0 && (
        <p className="mx-auto mt-4 max-w-md text-left text-xs text-muted-foreground">
          <span className="font-semibold">Worth knowing:</span> {place.tradeoffs.join(" · ")}
        </p>
      )}
    </div>
  );
}

function TaxDeepDive({ place }: { place: RankedPlace }) {
  const loc = LOCATIONS.find((l) => l.id === place.id);
  if (!loc) return null;
  const rows = [
    { label: "Personal income tax", value: fmtPct(loc.personal_income_tax_rate) },
    { label: "Corporate tax", value: fmtPct(loc.corporate_tax_rate) },
    { label: "Capital gains tax", value: fmtPct(loc.capital_gains_tax_rate) },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Coins className="size-4 text-accent" /> Tax deep-dive — {place.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {rows.map((r) => (
            <div key={r.label} className="rounded-lg bg-muted/50 p-3 text-center">
              <div className="text-lg font-bold tabular-nums">{r.value}</div>
              <div className="text-[11px] text-muted-foreground">{r.label}</div>
            </div>
          ))}
        </div>
        {loc.tax_notes && <p className="mt-3 text-sm text-muted-foreground">{loc.tax_notes}</p>}
      </CardContent>
    </Card>
  );
}

function CircuitSection({ circuit }: { circuit: AnnualCircuit }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Plane className="size-4 text-secondary" /> Your annual circuit
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {circuit.stops.length} stops · {circuit.totalCountries} countries · follows your ideal weather.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {circuit.stops.map((s, i) => (
          <div key={i} className="flex gap-3 rounded-lg border border-border bg-surface p-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary/15 text-sm font-bold text-secondary">
              {getMonthAbbrev(s.months[0])}
            </div>
            <div className="min-w-0">
              <div className="font-semibold">
                {s.location.name}
                <span className="ml-2 text-xs font-normal text-muted-foreground">{s.location.country}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {getMonthAbbrev(s.months[0])}–{getMonthAbbrev(s.months[s.months.length - 1])}
                {s.reasons[0] ? ` · ${s.reasons[0]}` : ""}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function FullRanking({ ranking }: { ranking: RankedPlace[] }) {
  const [limit, setLimit] = useState(25);
  const shown = ranking.slice(0, limit);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Globe2 className="size-4 text-primary" /> Full ranking — all {ranking.length} places
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        {shown.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/40">
            <span className="w-7 shrink-0 text-right text-sm font-semibold tabular-nums text-muted-foreground">
              {p.rank}
            </span>
            <span className="min-w-0 flex-1 truncate">
              <span className="font-medium">{p.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">{p.country}</span>
            </span>
            <span className="shrink-0 text-sm font-bold tabular-nums">{p.totalScore}</span>
          </div>
        ))}
        {limit < ranking.length && (
          <button
            onClick={() => setLimit((l) => l + 50)}
            className="mt-2 flex items-center justify-center gap-1 rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:bg-muted/40"
          >
            Show more <ChevronDown className="size-4" />
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function fmtPct(v: number | null): string {
  if (v === null || v === undefined) return "—";
  return v === 0 ? "0%" : `${v}%`;
}
