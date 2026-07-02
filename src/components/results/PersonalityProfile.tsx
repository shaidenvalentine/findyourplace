import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PersonalityRead } from "@/lib/run";

export function PersonalityProfile({ read }: { read: PersonalityRead }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Your read
          </span>
        </div>
        <h2 className="text-3xl font-light tracking-[-0.02em]">{read.archetype}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{read.blurb}</p>
        {read.traits.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {read.traits.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
