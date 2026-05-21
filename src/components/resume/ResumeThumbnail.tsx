"use client";

import { TemplateThumbnailPreview } from "@/components/TemplateCards/TemplateThumbnailPreview";
import type { Resume } from "@/types/resume";
import { cn } from "@/lib/utils";

export function ResumeThumbnail({
  resume,
  className,
}: {
  resume: Pick<Resume, "templateId" | "data" | "theme" | "title">;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-[210/297]",
        className
      )}
    >
      <TemplateThumbnailPreview
        templateId={resume.templateId}
        resumeData={resume.data}
        theme={resume.theme}
        height={280}
        className="h-full min-h-[200px]"
      />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-950/90 pointer-events-none" />
    </div>
  );
}
