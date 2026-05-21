"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="resumeforge-theme"
      disableTransitionOnChange={false}
    >
      <AuthProvider>{children}</AuthProvider>
      <Toaster
        position="bottom-right"
        theme="system"
        toastOptions={{
          classNames: {
            toast:
              "rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-lg",
          },
        }}
      />
    </ThemeProvider>
  );
}
