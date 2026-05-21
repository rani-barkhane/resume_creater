"use client";

import { ResumeRenderer } from "@/templates/ResumeRenderer";
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
        "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white aspect-[210/297]",
        className
      )}
    >
      <div className="absolute inset-0 origin-top-left scale-[0.22] w-[210mm] pointer-events-none">
        <ResumeRenderer
          templateId={resume.templateId}
          data={resume.data}
          theme={resume.theme}
          scale={100}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-slate-950/60 pointer-events-none" />
    </div>
  );
}
