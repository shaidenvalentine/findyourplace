import { redirect } from "next/navigation";
import { getCurrentCreator } from "@/lib/creators/session";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "@/components/portal/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const creator = await getCurrentCreator();
  if (!creator) redirect("/portal/login");

  return (
    <PortalShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Profile, payout method, and social handles.</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Your profile</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm creator={creator} />
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Your link</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your code <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">{creator.code}</code> is permanent — once claimed, links and metrics stay tied to it forever.
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Rev share</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You earn <strong className="text-foreground">{creator.revSharePct}%</strong> of every unlock attributed to your code. Paid monthly via Wise.
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
