"use client";

import { useState } from "react";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { getTemplateDefinition } from "./registry";
import { PaginatedResumeView } from "@/components/ResumePages/PaginatedResumeView";
import { MinimalTemplate } from "./MinimalTemplate";

export interface TemplateRendererProps {
  templateId: TemplateId;
  resumeData: ResumeData;
  theme?: ResumeTheme;
  scale?: number;
  className?: string;
  /** Use legacy single-page template (thumbnails only) */
  singlePage?: boolean;
  onPageCountChange?: (count: number) => void;
}

/**
 * Dynamic template renderer with automatic multi-page pagination.
 */
export function TemplateRenderer({
  templateId,
  resumeData,
  theme,
  scale = 100,
  className = "",
  singlePage = false,
  onPageCountChange,
}: TemplateRendererProps) {
  const resolvedTheme = theme ?? getTemplateDefinition(templateId).defaultTheme;
  const [pageCount, setPageCount] = useState(1);

  const handlePages = (n: number) => {
    setPageCount(n);
    onPageCountChange?.(n);
  };

  if (singlePage) {
    const Template = MinimalTemplate;
    return (
      <div
        className={`resume-preview-root ${className}`}
        style={{
          transform: scale === 100 ? undefined : `scale(${scale / 100})`,
          transformOrigin: "top center",
        }}
      >
        <Template data={resumeData} theme={resolvedTheme} />
      </div>
    );
  }

  return (
    <div
      className={`resume-preview-root ${className}`}
      style={{
        transform: scale === 100 ? undefined : `scale(${scale / 100})`,
        transformOrigin: "top center",
      }}
      data-page-count={pageCount}
    >
      <PaginatedResumeView
        templateId={templateId}
        resumeData={resumeData}
        theme={resolvedTheme}
        onPageCountChange={handlePages}
      />
    </div>
  );
}

export const ResumeRenderer = TemplateRenderer;
