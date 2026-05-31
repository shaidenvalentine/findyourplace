import { redirect } from "next/navigation";
import { getCurrentCreator } from "@/lib/creators/session";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyLinkButton } from "@/components/portal/CopyLinkButton";

export const dynamic = "force-dynamic";

const COPY_TEMPLATES = [
  {
    title: "Soft + curious",
    body:
      "An AI quiz just told me the one place on Earth that actually fits me. Took 60 seconds. Genuinely worth it. {{LINK}}",
  },
  {
    title: "Tax / money angle",
    body:
      "Where you live decides what you keep. There's a real chance you're paying 30%+ more in tax than you need to. This quiz finds your ideal place + the tax math. {{LINK}}",
  },
  {
    title: "Identity / personality",
    body:
      "I took this. It read me. {{LINK}} ← see what your ideal place is",
  },
  {
    title: "Comparison hook",
    body:
      "Your city, scored honestly. The place that actually fits you, side by side. 60 seconds. {{LINK}}",
  },
];

export default async function LinksPage() {
  const creator = await getCurrentCreator();
  if (!creator) redirect("/portal/login");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://findyourplace.app";
  const refLink = `${siteUrl}/c/${creator.code}`;
  const queryLink = `${siteUrl}?ref=${creator.code}`;

  return (
    <PortalShell>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Share kit</h1>
        <p className="mt-1 text-sm text-muted-foreground">Everything you need to share Find Your Place — your way.</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Your links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LinkRow label="Co-branded landing" value={refLink} hint="Has your name at the top. Best for stories, bios, captions." />
            <LinkRow label="Short link" value={queryLink} hint="The cleanest version. Drops users straight on the homepage with attribution." />
            <LinkRow label="Promo code" value={creator.code.toUpperCase()} hint="Use when links aren't allowed (TikTok bios, some platforms)." />
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Caption starters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground">
              Templates with <code className="rounded bg-muted px-1.5 py-0.5">{`{{LINK}}`}</code> auto-replaced
              with your short link. Tap copy and tweak however you like.
            </p>
            {COPY_TEMPLATES.map((t) => {
              const text = t.body.replace("{{LINK}}", queryLink);
              return (
                <div key={t.title} className="rounded-lg border border-border bg-surface p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.title}</span>
                    <CopyLinkButton text={text} />
                  </div>
                  <p className="text-sm leading-relaxed">{text}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="text-base">Hook ideas for video</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2 text-sm">
              <li>&quot;I let AI tell me where to live. Here&apos;s what it said.&quot;</li>
              <li>&quot;You don&apos;t pick a city. A city picks you. Let me prove it.&quot;</li>
              <li>&quot;What if you&apos;ve been living in the wrong place this whole time?&quot;</li>
              <li>&quot;I took this quiz and the answer shocked me.&quot;</li>
              <li>&quot;Same income, six times the lifestyle, depending on where you spend it.&quot;</li>
              <li>&quot;Quick — answer this one question and I&apos;ll tell you where you should live.&quot;</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}

function LinkRow({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <code className="flex-1 truncate rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs sm:text-sm">{value}</code>
        <CopyLinkButton text={value} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
