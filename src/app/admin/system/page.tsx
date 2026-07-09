import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/session";
import { integrationStatuses, paymentSummary } from "@/lib/admin/config";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, CircleDashed } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SystemPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const statuses = integrationStatuses();
  const pay = paymentSummary();
  const criticalMissing = statuses.filter((s) => s.critical && !s.configured);

  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">System</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What&apos;s wired, what&apos;s missing, and what it costs you. Presence checks only — no
          secret values are ever shown.
        </p>

        {criticalMissing.length > 0 ? (
          <div className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
            <div className="flex items-center gap-2 font-semibold text-destructive">
              <AlertTriangle className="size-4" /> {criticalMissing.length} critical{" "}
              {criticalMissing.length === 1 ? "integration is" : "integrations are"} not configured
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              The funnel can lose paying customers until this is fixed. Details below.
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-success/40 bg-success/10 p-4">
            <div className="flex items-center gap-2 font-semibold text-success">
              <CheckCircle2 className="size-4" /> All critical systems configured
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Active payment rail: <span className="font-semibold capitalize">{pay.provider}</span>
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-4">
          {statuses.map((s) => (
            <Card key={s.key} className={!s.configured && s.critical ? "border-destructive/40" : undefined}>
              <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  {s.configured ? (
                    <CheckCircle2 className="size-4 shrink-0 text-success" />
                  ) : (
                    <CircleDashed className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  {s.name}
                </CardTitle>
                <div className="flex shrink-0 gap-1.5">
                  {s.critical && <Badge variant="outline">critical</Badge>}
                  <Badge variant={s.configured ? "success" : "secondary"}>
                    {s.configured ? "configured" : "missing"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
                {s.fix && (
                  <p className="mt-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                    <span className="font-semibold">Fix:</span> {s.fix}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Env vars live in Vercel → Project → Settings → Environment Variables. Changes apply on the
          next deploy — redeploy after saving.
        </p>
      </div>
    </AdminShell>
  );
}
