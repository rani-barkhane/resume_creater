"use client";

import { A4_HEIGHT_PX, A4_WIDTH_PX, PAGE_CONTENT_HEIGHT_PX } from "@/constants/a4";
import { cn } from "@/lib/utils";

interface ResumePageProps {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  className?: string;
  contentClassName?: string;
  showPageNumber?: boolean;
}

export function ResumePage({
  children,
  pageNumber,
  totalPages,
  className,
  contentClassName,
  showPageNumber = true,
}: ResumePageProps) {
  return (
    <div
      className={cn(
        "resume-page relative bg-white shadow-lg print:shadow-none shrink-0",
        className
      )}
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        breakAfter: "page",
        pageBreakAfter: "always",
      }}
      data-page={pageNumber}
    >
      <div
        className={cn(
          "mx-auto box-border px-[16mm] py-[18mm] overflow-hidden print:overflow-visible",
          contentClassName
        )}
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${PAGE_CONTENT_HEIGHT_PX}px`,
          maxHeight: `${PAGE_CONTENT_HEIGHT_PX}px`,
        }}
      >
        {children}
      </div>
      {showPageNumber && totalPages > 1 && (
        <span className="absolute bottom-3 right-4 text-[9px] text-slate-400 tabular-nums print:hidden">
          {pageNumber} / {totalPages}
        </span>
      )}
    </div>
  );
}
