import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/session";
import { listRuns } from "@/lib/admin/runs";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<string, string> = {
  quiz: "Quiz",
  "ai-profile": "AI profile",
  words: "Words",
};

export default async function RunsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const runs = await listRuns(150);
  const unlocked = runs.filter((r) => r.unlocked).length;

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Runs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The latest scored runs — entry path, current city, top match, and whether they unlocked.
        </p>

        <div className="mt-4 flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{runs.length}</span> runs
          </span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-success">{unlocked}</span> unlocked
          </span>
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            {runs.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">
                No runs yet — or Supabase isn&apos;t configured on this environment.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">When</th>
                      <th className="px-4 py-3 font-medium">Path</th>
                      <th className="px-4 py-3 font-medium">Current city</th>
                      <th className="px-4 py-3 font-medium">Top match</th>
                      <th className="px-4 py-3 text-right font-medium">Score</th>
                      <th className="px-4 py-3 text-right font-medium">Unlocked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runs.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">
                          {new Date(r.createdAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge variant="outline">{SOURCE_LABEL[r.source] ?? r.source}</Badge>
                        </td>
                        <td className="max-w-[160px] truncate px-4 py-2.5">{r.currentCity || "—"}</td>
                        <td className="max-w-[160px] truncate px-4 py-2.5 font-medium">{r.topMatch || "—"}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{r.topScore ?? "—"}</td>
                        <td className="px-4 py-2.5 text-right">
                          {r.unlocked ? (
                            <Badge variant="success">
                              {r.amountCents ? `$${(r.amountCents / 100).toFixed(0)}` : "yes"}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
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
