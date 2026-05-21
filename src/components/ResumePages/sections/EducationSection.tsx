"use client";

import { useTemplateStyles } from "../TemplateStyleContext";

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
}: {
  payload: EducationBlockPayload;
}) {
  const styles = useTemplateStyles();

  return (
    <div
      className={`resume-block-education mb-2.5 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <div className="flex justify-between gap-2">
        <p className={`font-semibold text-[13px] ${styles.headingText}`}>
          {payload.degree}
          {payload.institution ? ` — ${payload.institution}` : ""}
        </p>
        <span className={`text-[11px] italic shrink-0 ${styles.mutedText}`}>
          {payload.startDate} – {payload.endDate}
        </span>
      </div>
      {payload.description && (
        <p className={`text-[12px] mt-0.5 ${styles.bodyText}`}>
          {payload.description}
        </p>
      )}
    </div>
  );
}
