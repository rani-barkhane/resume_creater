"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, Files } from "lucide-react";
import { TemplateRenderer } from "@/templates/TemplateRenderer";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  className?: string;
  sticky?: boolean;
  showZoom?: boolean;
}

export function ResumePreview({
  className,
  sticky = true,
  showZoom = true,
}: ResumePreviewProps) {
  const templateId = useResumeStore((s) => s.templateId);
  const data = useResumeStore((s) => s.data);
  const theme = useResumeStore((s) => s.theme);
  const previewZoom = useResumeStore((s) => s.previewZoom);
  const setPreviewZoom = useResumeStore((s) => s.setPreviewZoom);
  const [pageCount, setPageCount] = useState(1);

  return (
    <div
      className={cn(
        "resume-print-root flex flex-col bg-slate-100 dark:bg-slate-900/50 overflow-hidden",
        sticky && "lg:sticky lg:top-0 lg:h-[calc(100vh-3.5rem)]",
        className
      )}
    >
      {showZoom && (
        <div className="no-print flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur shrink-0">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5" />
            Live Preview · A4
            {pageCount > 1 && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                <Files className="w-3 h-3" />
                {pageCount} pages
              </span>
            )}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewZoom(Math.max(50, previewZoom - 10))}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs text-slate-500 dark:text-slate-400 w-10 text-center tabular-nums">
              {previewZoom}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewZoom(Math.min(150, previewZoom + 10))}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start min-h-0 print:overflow-visible print:p-0">
        <div className="shadow-2xl rounded-sm ring-1 ring-slate-200/50 dark:ring-slate-700 transition-transform duration-200 print:shadow-none print:ring-0">
          <TemplateRenderer
            templateId={templateId}
            resumeData={data}
            theme={theme}
            scale={previewZoom}
            onPageCountChange={setPageCount}
          />
        </div>
      </div>
    </div>
  );
}
