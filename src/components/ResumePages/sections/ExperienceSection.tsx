"use client";

import type { ResumeTheme } from "@/types/resume";
import { formatDateRange } from "@/templates/primitives/utils";
import { useTemplateStyles } from "../TemplateStyleContext";

export interface ExperienceBlockPayload {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  techStack?: string;
  bullets: string[];
}

export function ExperienceSection({
  payload,
  theme,
}: {
  payload: ExperienceBlockPayload;
  theme: ResumeTheme;
}) {
  const styles = useTemplateStyles();
  const p = payload;

  return (
    <div
      className={`resume-block-experience mb-3 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <div className="flex justify-between items-baseline gap-2">
        <p className={`font-semibold text-[13px] ${styles.headingText}`}>
          {p.position || p.company}
        </p>
        <span className={`text-[11px] shrink-0 italic ${styles.mutedText}`}>
          {formatDateRange(p.startDate, p.endDate, p.current)}
        </span>
      </div>
      {p.company && p.position && (
        <p className={`text-[12px] ${styles.mutedText}`}>
          {p.company}
          {p.location ? ` · ${p.location}` : ""}
        </p>
      )}
      {p.techStack && (
        <p
          className="text-[11px] mt-0.5 font-medium"
          style={{ color: theme.accentColor }}
        >
          Tech Stack: {p.techStack}
        </p>
      )}
      {p.bullets?.length > 0 && (
        <ul className={`mt-1.5 space-y-1 ${styles.bodyText}`}>
          {p.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-relaxed">
              <span
                className="w-1.5 h-1.5 rounded-sm shrink-0 mt-1.5"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
