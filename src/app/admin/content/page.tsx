import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/session";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentStudio } from "@/components/admin/ContentStudio";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <AdminShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Content Studio</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          On-brand Instagram carousels + Meta ad copy, generated from the real 250-place dataset.
          Download slides as ready-to-post images.
        </p>
        <ContentStudio />
      </div>
    </AdminShell>
  );
}
