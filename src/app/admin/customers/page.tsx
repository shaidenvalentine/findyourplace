import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/session";
import { listBuyers } from "@/lib/admin/insights";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { ResendResultsButton } from "@/components/admin/ResendResultsButton";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

function money(cents: number | null): string {
  return cents == null ? "—" : `$${(cents / 100).toFixed(0)}`;
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { q } = await searchParams;
  const all = await listBuyers(200);
  const query = (q ?? "").trim().toLowerCase();
  const buyers = query
    ? all.filter(
        (b) =>
          (b.email ?? "").toLowerCase().includes(query) ||
          (b.topMatch ?? "").toLowerCase().includes(query) ||
          b.runId.startsWith(query),
      )
    : all;

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone who paid — with their match and a one-click results-link resend for &ldquo;I lost
          my results&rdquo; support.
        </p>

        <form className="mt-4" action="/admin/customers" method="get">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by email, top match, or run id…"
            className="h-11 w-full max-w-md rounded-xl border border-border bg-input/70 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </form>

        <Card className="mt-4">
          <CardContent className="p-0">
            {buyers.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">
                {query
                  ? "No customers match that search."
                  : "No purchases yet — or Supabase isn't configured, so purchases can't be listed."}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Unlocked</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Top match</th>
                      <th className="px-4 py-3 text-right font-medium">Paid</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyers.map((b) => (
                      <tr key={b.runId} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                          {new Date(b.unlockedAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="max-w-[220px] truncate px-4 py-2.5">{b.email ?? "—"}</td>
                        <td className="max-w-[160px] truncate px-4 py-2.5 font-medium">{b.topMatch ?? "—"}</td>
                        <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-success">
                          {money(b.amountCents)}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="inline-flex items-center gap-2">
                            {b.email ? (
                              <ResendResultsButton email={b.email} runId={b.runId} />
                            ) : (
                              <span className="text-xs text-muted-foreground">no email captured</span>
                            )}
                            <Link
                              href={`/results/${b.runId}`}
                              target="_blank"
                              className="inline-flex min-h-8 items-center gap-1 rounded-full border border-border px-3 text-xs font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <ExternalLink className="size-3" /> View
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
