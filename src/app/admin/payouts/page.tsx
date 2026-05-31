import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { getCreatorStore } from "@/lib/creators/store";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayoutRunner } from "@/components/admin/PayoutRunner";

export const dynamic = "force-dynamic";

function money(cents: number): string {
  return `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminPayouts() {
  if (!(await isAdmin())) redirect("/admin/login");
  const store = getCreatorStore();
  const pending = await store.listPendingByCreator();
  const total = pending.reduce((s, p) => s + p.pendingCents, 0);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Payouts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {money(total)} owed across {pending.length} creators. Send via Wise, then mark paid here.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Owed now</CardTitle>
          </CardHeader>
          <CardContent>
            {pending.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted-foreground">
                All caught up — no pending payouts.
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-3 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="col-span-5">Creator</span>
                  <span className="col-span-3">Wise email</span>
                  <span className="col-span-1 text-right">Sales</span>
                  <span className="col-span-1 text-right">Owed</span>
                  <span className="col-span-2 text-right">Action</span>
                </div>
                {pending.map((p) => (
                  <div key={p.creator.id} className="grid grid-cols-12 items-center gap-3 border-b border-border py-3 last:border-0">
                    <div className="col-span-5 min-w-0">
                      <Link href={`/admin/creators/${p.creator.id}`} className="truncate font-medium hover:underline">
                        {p.creator.displayName}
                      </Link>
                      <div className="truncate text-xs text-muted-foreground">{p.creator.code}</div>
                    </div>
                    <span className="col-span-3 truncate text-xs text-muted-foreground">
                      {p.creator.payoutEmail ?? p.creator.email}
                    </span>
                    <span className="col-span-1 text-right text-sm tabular-nums">{p.pendingCount}</span>
                    <span className="col-span-1 text-right text-sm font-bold tabular-nums text-success">
                      {money(p.pendingCents)}
                    </span>
                    <span className="col-span-2 flex justify-end">
                      <PayoutRunner creatorId={p.creator.id} amountCents={p.pendingCents} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-4 text-xs text-muted-foreground">
          Workflow: send the Wise transfer to the creator&apos;s payout email, then click &quot;Mark paid&quot; here to
          record it and clear their pending balance. Once Supabase + Stripe Connect are wired, this can be automated.
        </p>
      </div>
    </AdminShell>
  );
}
