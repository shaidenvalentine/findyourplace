import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PersonalityRead } from "@/lib/run";
import { Sparkles } from "lucide-react";

export function PersonalityProfile({ read }: { read: PersonalityRead }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <Badge variant="primary" className="w-fit">
          <Sparkles className="size-3" /> Your read
        </Badge>
        <h2 className="text-xl font-bold tracking-tight">{read.archetype}</h2>
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
