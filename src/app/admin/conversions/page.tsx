import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminConversions() {
  if (!(await isAdmin())) redirect("/admin/login");
  const store = getCreatorStore();
  const conversions = await store.listAllConversions(500);
  const creators = await store.listCreators();
  const nameByID = new Map(creators.map((c) => [c.id, c]));

  const totalRev = conversions.filter((c) => c.status !== "refunded").reduce((s, c) => s + c.amountCents, 0);
  const totalCut = conversions.filter((c) => c.status !== "refunded").reduce((s, c) => s + c.creatorCutCents, 0);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Conversions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {conversions.length} sales · {money(totalRev)} revenue · {money(totalCut)} to creators · {money(totalRev - totalCut)} yours
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">All conversions</CardTitle>
          </CardHeader>
          <CardContent>
            {conversions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No conversions yet.</p>
            ) : (
              <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-3 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="col-span-3">Creator</span>
                  <span className="col-span-3">Buyer</span>
                  <span className="col-span-2">When</span>
                  <span className="col-span-1 text-right">Total</span>
                  <span className="col-span-1 text-center">Status</span>
                  <span className="col-span-2 text-right">Creator cut</span>
                </div>
                {conversions.map((c) => {
                  const creator = nameByID.get(c.creatorId);
                  return (
                    <div key={c.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-2.5 last:border-0">
                      <span className="col-span-3 min-w-0 truncate text-sm">
                        {creator ? (
                          <Link href={`/admin/creators/${creator.id}`} className="font-medium hover:underline">
                            {creator.displayName}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </span>
                      <span className="col-span-3 truncate text-xs text-muted-foreground">{c.email ?? "—"}</span>
                      <span className="col-span-2 truncate text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                      <span className="col-span-1 text-right text-sm tabular-nums">{money(c.amountCents)}</span>
                      <span className="col-span-1 flex justify-center">
                        <Badge variant={c.status === "paid" ? "success" : c.status === "refunded" ? "outline" : "default"}>
                          {c.status}
                        </Badge>
                      </span>
                      <span className="col-span-2 text-right text-sm font-bold tabular-nums text-success">
                        {money(c.creatorCutCents)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
