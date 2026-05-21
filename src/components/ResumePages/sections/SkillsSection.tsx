"use client";

import type { ResumeTheme } from "@/types/resume";
import { useTemplateStyles } from "../TemplateStyleContext";

export function SkillsSection({
  skills,
  theme,
}: {
  skills: string[];
  theme: ResumeTheme;
}) {
  const styles = useTemplateStyles();

  return (
    <div
      className="resume-block-skills flex flex-wrap gap-1.5"
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      {skills.map((skill) => (
        <span
          key={skill}
          className={`text-[11px] px-2 py-0.5 rounded-full ${styles.skillChip}`}
          style={{
            backgroundColor: `${theme.primaryColor}18`,
            color: theme.primaryColor,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
