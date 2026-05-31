import { redirect } from "next/navigation";
import { getCurrentCreator } from "@/lib/creators/session";
import { getCreatorStore } from "@/lib/creators/store";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function ConversionsPage() {
  const creator = await getCurrentCreator();
  if (!creator) redirect("/portal/login");
  const conversions = await getCreatorStore().listConversions(creator.id, 200);
  const payouts = await getCreatorStore().listPayouts(creator.id);

  return (
    <PortalShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Conversions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every sale attributed to your code.</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Sales ({conversions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {conversions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-surface/40 p-8 text-center">
                <p className="text-sm font-medium">No conversions yet.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  When someone buys via your link, they show up here in real time.
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {conversions.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-3 last:border-0">
                    <div className="col-span-5">
                      <div className="text-sm font-medium tabular-nums">{money(c.amountCents)}</div>
                      <div className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="col-span-4 truncate text-xs text-muted-foreground">
                      {c.email ?? <span className="italic">no email</span>}
                    </div>
                    <div className="col-span-1">
                      <Badge variant={c.status === "paid" ? "success" : c.status === "refunded" ? "outline" : "default"}>
                        {c.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-right text-sm font-bold tabular-nums text-success">
                      +{money(c.creatorCutCents)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Payouts ({payouts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {payouts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No payouts yet. We pay out monthly via Wise on the 1st — your pending balance becomes a payout.
              </p>
            ) : (
              <div className="flex flex-col">
                {payouts.map((p) => (
                  <div key={p.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-3 last:border-0">
                    <div className="col-span-6 text-sm">
                      {p.periodStart} → {p.periodEnd}
                      <div className="text-xs text-muted-foreground">{p.conversionCount} conversions</div>
                    </div>
                    <div className="col-span-3">
                      <Badge variant={p.status === "paid" ? "success" : "outline"}>{p.status}</Badge>
                    </div>
                    <div className="col-span-3 text-right text-sm font-bold tabular-nums">{money(p.totalCents)}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
