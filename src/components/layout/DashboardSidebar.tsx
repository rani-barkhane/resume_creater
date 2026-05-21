"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Palette, Settings, Shield, LogOut, PanelLeftClose, PanelLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Resumes", icon: LayoutDashboard },
  { href: "/dashboard/templates", label: "Templates", icon: Palette },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/admin", label: "Admin", icon: Shield, admin: true },
];

export function DashboardSidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuth();

  return (
    <aside className={cn("fixed left-0 top-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-40 transition-all duration-300 flex flex-col", sidebarOpen ? "w-64" : "w-[72px]")}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {sidebarOpen && (
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white"><FileText className="w-4 h-4" /></span>
            ResumeForge
          </Link>
        )}
        <button type="button" onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.filter((l) => !l.admin || isAdmin).map((link) => {
          const Icon = link.icon;
          const active = link.href !== "/" && (pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href)));
          return (
            <Link key={link.href} href={link.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", active ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900")}>
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {sidebarOpen && user && (
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
          </div>
        )}
        <div className={cn("flex items-center gap-2", sidebarOpen ? "px-3" : "justify-center")}>
          {sidebarOpen && <span className="text-xs text-slate-500 dark:text-slate-400 flex-1">Theme</span>}
          <ThemeToggle variant="icon" />
        </div>
        <button type="button" onClick={() => logout()} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors">
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
}
