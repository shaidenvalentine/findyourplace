import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CategoryBars({ items, title = "Your category fit" }: { items: { label: string; score: number }[]; title?: string }) {
  return (
    <Card>
      <CardHeader className="flex-row items-baseline justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/60">
          {items.length} dimensions
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {items.map((c) => (
          <div key={c.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <span className="text-base font-light tabular-nums tracking-tight">{Math.round(c.score)}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)))]"
                style={{ width: `${Math.max(4, Math.min(100, c.score))}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
