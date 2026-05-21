"use client";

import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { MinimalTemplate } from "./MinimalTemplate";
import { DeveloperTemplate } from "./DeveloperTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { CreativeTemplate } from "./CreativeTemplate";

interface Props {
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
  scale?: number;
  className?: string;
}

const TEMPLATE_MAP = {
  minimal: MinimalTemplate,
  developer: DeveloperTemplate,
  corporate: CorporateTemplate,
  creative: CreativeTemplate,
};

export function ResumeRenderer({
  templateId,
  data,
  theme,
  scale = 1,
  className = "",
}: Props) {
  const Template = TEMPLATE_MAP[templateId] || MinimalTemplate;

  return (
    <div
      className={`resume-preview-root ${className}`}
      style={{
        transform: `scale(${scale / 100})`,
        transformOrigin: "top center",
      }}
    >
      <Template data={data} theme={theme} />
    </div>
  );
}
