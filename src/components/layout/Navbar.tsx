"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMarketing = !pathname.startsWith("/dashboard");

  if (!isMarketing) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
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
          <div className="flex gap-2 pt-2">
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
          </div>
        </div>
      )}
    </motion.header>
  );
}
