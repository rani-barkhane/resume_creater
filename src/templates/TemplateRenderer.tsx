"use client";

import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { TEMPLATE_MAP, getTemplateDefinition } from "./registry";
import { MinimalTemplate } from "./MinimalTemplate";

export interface TemplateRendererProps {
  templateId: TemplateId;
  resumeData: ResumeData;
  theme?: ResumeTheme;
  scale?: number;
  className?: string;
}

/**
 * Dynamic template renderer — all templates consume the same resumeData JSON.
 *
 * @example
 * <TemplateRenderer templateId="professional" resumeData={data} theme={theme} />
 */
export function TemplateRenderer({
  templateId,
  resumeData,
  theme,
  scale = 100,
  className = "",
}: TemplateRendererProps) {
  const Template = TEMPLATE_MAP[templateId] || MinimalTemplate;
  const resolvedTheme = theme ?? getTemplateDefinition(templateId).defaultTheme;

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

/** Backward-compatible alias */
export const ResumeRenderer = TemplateRenderer;
