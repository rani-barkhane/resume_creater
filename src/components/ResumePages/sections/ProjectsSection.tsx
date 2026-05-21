"use client";

import type { ResumeTheme } from "@/types/resume";
import { useTemplateStyles } from "../TemplateStyleContext";

export interface ProjectBlockPayload {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export function ProjectsSection({
  payload,
  theme,
}: {
  payload: ProjectBlockPayload;
  theme: ResumeTheme;
}) {
  const styles = useTemplateStyles();

  return (
    <div
      className={`resume-block-project mb-2.5 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <p className={`font-semibold text-[13px] ${styles.headingText}`}>
        {payload.name}
      </p>
      <p className={`text-[12px] mt-0.5 leading-relaxed ${styles.bodyText}`}>
        {payload.description}
      </p>
      {payload.technologies?.length > 0 && (
        <p
          className="text-[11px] mt-0.5"
          style={{ color: theme.accentColor }}
        >
          {payload.technologies.join(" · ")}
        </p>
      )}
    </div>
  );
}
