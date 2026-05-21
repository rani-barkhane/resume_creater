"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, status, isAuthenticated, logout } = useAuth();
  const isMarketing = !pathname.startsWith("/dashboard");

  if (!isMarketing) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg"
          title="Home"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white">
            <FileText className="w-4 h-4" />
          </span>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ResumeForge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle variant="icon" />
          {status === "loading" ? (
            <div className="w-24 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ) : isAuthenticated && user ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-400 max-w-[140px] truncate hidden lg:inline">
                {user.name}
              </span>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                <LogOut className="w-4 h-4" /> Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 bg-white dark:bg-slate-950">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pb-2">
            <span className="text-xs text-slate-500">Theme</span>
            <ThemeToggle variant="segmented" />
          </div>
          <div className="flex gap-2 pt-2">
            {isAuthenticated && user ? (
              <>
                <p className="text-sm text-slate-600 dark:text-slate-400 w-full pb-1">
                  Signed in as <strong>{user.name}</strong>
                </p>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full" size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.header>
  );
}
