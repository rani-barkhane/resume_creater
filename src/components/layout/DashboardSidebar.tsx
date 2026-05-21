"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Palette,
  Settings,
  Shield,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { toast } from "sonner";

const links = [
  { href: "/dashboard", label: "Resumes", icon: LayoutDashboard },
  { href: "/dashboard/templates", label: "Templates", icon: Palette },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/admin", label: "Admin", icon: Shield, admin: true },
];

export function DashboardSidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-40 transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-[72px]"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {sidebarOpen && (
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </span>
            ResumeForge
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links
          .filter((l) => !l.admin || isAdmin)
          .map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && link.label}
              </Link>
            );
          })}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
}
