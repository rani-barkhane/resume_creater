"use client";

import type { ResumeTheme } from "@/types/resume";
import { formatDateRange } from "@/templates/primitives/utils";
import { useTemplateStyles } from "../TemplateStyleContext";
import { ProGoldBullets, ProTimelineBlock } from "./professional-layout";

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
  const gold = theme.primaryColor || "#A68946";
  const dateLabel = formatDateRange(p.startDate, p.endDate, p.current);

  if (styles.isProfessional) {
    return (
      <div
        className="resume-block-experience mb-5"
        style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
      >
        <div className="flex justify-between items-baseline gap-3 mb-1.5">
          <p className="font-bold text-[14px] text-slate-900 font-serif">
            {p.company || p.position}
          </p>
          {dateLabel && (
            <p className="text-[12px] italic text-slate-500 shrink-0 font-serif">
              {dateLabel}
            </p>
          )}
        </div>
        {p.position && (
          <ProTimelineBlock
            title={p.position}
            subtitle={p.location || undefined}
            gold={gold}
          >
      {p.techStack && (
        <p className="text-[12px] mt-1 font-serif text-slate-700">
          <span className="font-semibold" style={{ color: gold }}>
            Tech Stack:{" "}
          </span>
          {p.techStack}
        </p>
      )}
            <ProGoldBullets bullets={p.bullets || []} color={gold} />
          </ProTimelineBlock>
        )}
        {!p.position && (
          <>
            {p.location && (
              <p className="text-[12px] text-slate-600 font-serif">{p.location}</p>
            )}
            {p.techStack && (
              <p className="text-[12px] mt-1 font-serif text-slate-700">
                <span className="font-semibold" style={{ color: gold }}>
                  Tech Stack:{" "}
                </span>
                {p.techStack}
              </p>
            )}
            <ProGoldBullets bullets={p.bullets || []} color={gold} />
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`resume-block-experience mb-4 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <div className="flex justify-between items-baseline gap-2">
        <p className={`font-bold text-[13px] ${styles.headingText}`}>
          {p.position || p.company}
        </p>
        {dateLabel && (
          <span className={`text-[11px] shrink-0 ${styles.mutedText}`}>
            {dateLabel}
          </span>
        )}
      </div>
      {(p.company || p.location) && (
        <p className={`text-[12px] mt-0.5 ${styles.mutedText}`}>
          {[p.company, p.location].filter(Boolean).join(" · ")}
        </p>
      )}
      {p.techStack && (
        <p
          className="text-[11px] mt-1 font-medium"
          style={{ color: theme.accentColor }}
        >
          Tech Stack: {p.techStack}
        </p>
      )}
      {p.bullets?.length > 0 && (
        <ul className={`mt-2 space-y-1.5 ${styles.bodyText}`}>
          {p.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-[1.5]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
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
