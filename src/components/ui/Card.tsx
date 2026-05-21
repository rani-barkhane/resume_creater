import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900",
        hover && "hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
