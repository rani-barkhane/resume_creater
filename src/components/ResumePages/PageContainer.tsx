"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

export function PageContainer({
  children,
  className,
  gap = 24,
}: PageContainerProps) {
  return (
    <div
      className={cn("flex flex-col items-center", className)}
      style={{ gap }}
    >
      <AnimatePresence mode="popLayout">{children}</AnimatePresence>
    </div>
  );
}
