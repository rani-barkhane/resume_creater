"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark" | "system";

interface ThemeToggleProps {
  /** Icon-only button for navbars */
  variant?: "icon" | "segmented";
  className?: string;
}

export function ThemeToggle({
  variant = "icon",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          variant === "icon" ? "w-9 h-9" : "h-9 w-[120px]",
          "rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (variant === "segmented") {
    const options: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
      { id: "light", label: "Light", icon: Sun },
      { id: "dark", label: "Dark", icon: Moon },
      { id: "system", label: "System", icon: Monitor },
    ];

    return (
      <div
        className={cn(
          "inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
          className
        )}
        role="group"
        aria-label="Theme"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                active
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "p-2 rounded-lg border border-transparent",
        "text-slate-700 dark:text-slate-200",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        "transition-colors",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
    </button>
  );
}
