"use client";

import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { PaginationEngine } from "./PaginationEngine";

export interface PaginatedResumeViewProps {
  templateId: TemplateId;
  resumeData: ResumeData;
  theme: ResumeTheme;
  onPageCountChange?: (count: number) => void;
  /** Legacy single-page templates fallback */
  forceSinglePage?: boolean;
}

/**
 * Multi-page resume renderer — primary preview entry point.
 */
export function PaginatedResumeView({
  templateId,
  resumeData,
  theme,
  onPageCountChange,
}: PaginatedResumeViewProps) {
  return (
    <PaginationEngine
      templateId={templateId}
      resumeData={resumeData}
      theme={theme}
      onPageCountChange={onPageCountChange}
    />
  );
}
