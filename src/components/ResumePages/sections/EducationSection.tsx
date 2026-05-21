"use client";

import type { ResumeTheme } from "@/types/resume";
import { useTemplateStyles } from "../TemplateStyleContext";
import { ProTimelineBlock } from "./professional-layout";

export interface EducationBlockPayload {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export function EducationSection({
  payload,
  theme,
}: {
  payload: EducationBlockPayload;
  theme?: ResumeTheme;
}) {
  const styles = useTemplateStyles();
  const gold = theme?.primaryColor || "#A68946";
  const dateLabel =
    payload.startDate || payload.endDate
      ? `${payload.startDate} – ${payload.endDate}`
      : "";

  if (styles.isProfessional) {
    return (
      <div
        className="resume-block-education mb-4"
        style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
      >
        <ProTimelineBlock
          title={payload.degree}
          date={dateLabel}
          subtitle={payload.institution}
          gold={gold}
        >
          {payload.description && (
            <p className="text-[12.5px] text-slate-700 mt-1 font-serif leading-[1.5]">
              {payload.description}
            </p>
          )}
        </ProTimelineBlock>
      </div>
    );
  }

  return (
    <div
      className={`resume-block-education mb-3 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <div className="flex justify-between gap-2">
        <p className={`font-semibold text-[13px] ${styles.headingText}`}>
          {payload.degree}
          {payload.institution ? ` — ${payload.institution}` : ""}
        </p>
        {dateLabel && (
          <span className={`text-[11px] shrink-0 ${styles.mutedText}`}>
            {dateLabel}
          </span>
        )}
      </div>
      {payload.description && (
        <p className={`text-[12px] mt-1 leading-[1.5] ${styles.bodyText}`}>
          {payload.description}
        </p>
      )}
    </div>
  );
}
