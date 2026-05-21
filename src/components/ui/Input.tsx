"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700",
          "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500",
          "transition-all text-sm",
          error && "border-red-500 focus:ring-red-500/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
