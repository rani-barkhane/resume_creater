"use client";

import { cn } from "@/lib/utils";

export function A4Page({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-sm print:shadow-none",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
