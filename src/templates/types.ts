import type { ComponentType } from "react";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";

export interface TemplateComponentProps {
  data: ResumeData;
  theme: ResumeTheme;
  /** Scale preview inside thumbnails (default 1 = full A4) */
  preview?: boolean;
}

export type TemplateComponent = ComponentType<TemplateComponentProps>;

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  tags: string[];
  previewGradient: string;
  accentColor: string;
  isPremium: boolean;
  component: TemplateComponent;
  defaultTheme: ResumeTheme;
}
