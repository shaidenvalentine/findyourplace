import type { Location } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";
import { Wallet, Home, Check, X, MapPin, Users } from "lucide-react";

/** The depth layer for a single place — the "this app really knows here" content. */
export function PlaceProfile({ location }: { location: Location }) {
  return (
    <div className="flex flex-col gap-5">
      {location.lowdown && <p className="text-sm leading-relaxed text-muted-foreground">{location.lowdown}</p>}

      {/* Cost */}
      {(location.monthly_budget_usd || location.rent_1br_usd) && (
        <div className="grid grid-cols-2 gap-3">
          {location.monthly_budget_usd ? (
            <CostTile
              icon={<Wallet className="size-4" />}
              value={`$${location.monthly_budget_usd.toLocaleString()}`}
              label="comfortable monthly budget"
            />
          ) : null}
          {location.rent_1br_usd ? (
            <CostTile
              icon={<Home className="size-4" />}
              value={`$${location.rent_1br_usd.toLocaleString()}`}
              label="1-bed rent, good area"
            />
          ) : null}
        </div>
      )}

      {/* Best for / not for */}
      {(location.best_for?.length || location.not_for?.length) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {location.best_for?.length ? (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-success">
                <Check className="size-3.5" /> Best for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {location.best_for.map((b) => (
                  <Badge key={b} variant="success">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          {location.not_for?.length ? (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <X className="size-3.5" /> Not for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {location.not_for.map((b) => (
                  <Badge key={b} variant="outline">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Scene */}
      {location.scene && (
        <div className="flex items-start gap-2 rounded-lg bg-muted/40 p-3">
          <Users className="mt-0.5 size-4 shrink-0 text-secondary" />
          <p className="text-sm text-muted-foreground">{location.scene}</p>
        </div>
      )}

      {/* Neighborhoods */}
      {location.neighborhoods?.length ? (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="size-3.5" /> Where to land
          </p>
          <div className="flex flex-wrap gap-1.5">
            {location.neighborhoods.map((n) => (
              <Badge key={n} variant="default">
                {n}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CostTile({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-1 flex items-center gap-1.5 text-accent">{icon}</div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
