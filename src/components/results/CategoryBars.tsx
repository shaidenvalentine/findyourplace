import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoryBars({ items, title = "Your category fit" }: { items: { label: string; score: number }[]; title?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.map((c) => (
          <div key={c.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{c.label}</span>
              <span className="font-semibold tabular-nums">{Math.round(c.score)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
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
