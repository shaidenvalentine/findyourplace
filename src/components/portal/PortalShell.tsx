"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Link as LinkIcon, BarChart3, Settings, LogOut } from "lucide-react";

const NAV = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/links", label: "Links", icon: LinkIcon },
  { href: "/portal/conversions", label: "Conversions", icon: BarChart3 },
  { href: "/portal/settings", label: "Settings", icon: Settings },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  async function signOut() {
    await fetch("/api/creators/logout", { method: "POST" });
    router.push("/portal/login");
  }
  return (
    <main className="flex min-h-dvh">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-60 flex-col border-r border-border bg-surface/40 px-3 py-5 sm:flex">
        <Link href="/" className="px-3 pb-6">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={signOut}
          className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>

      {/* Top bar (mobile) */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-4 sm:hidden">
          <Logo />
          <button onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground">
            Sign out
          </button>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 sm:hidden">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium",
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
