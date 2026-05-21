"use client";

import type { ResumeTheme } from "@/types/resume";
import { getBulletsFromText } from "@/lib/bullet-utils";
import { useTemplateStyles } from "../TemplateStyleContext";
import { ProGoldBullets, ProTimelineBlock } from "./professional-layout";

export interface ProjectBlockPayload {
  name: string;
  description: string;
  bullets?: string[];
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
  const gold = theme.primaryColor || "#A68946";
  const bullets = Array.isArray(payload.bullets)
    ? payload.bullets
    : getBulletsFromText(payload.description);

  if (styles.isProfessional) {
    return (
      <div
        className="resume-block-project mb-4"
        style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
      >
        <ProTimelineBlock
          title={payload.name}
          subtitle={undefined}
          gold={gold}
        >
          {payload.technologies?.length > 0 && (
            <p className="text-[12px] mt-1 font-serif text-slate-700">
              <span className="font-semibold" style={{ color: gold }}>
                Tech Stack:{" "}
              </span>
              {payload.technologies.join(", ")}
            </p>
          )}
          <ProGoldBullets bullets={bullets} color={gold} />
        </ProTimelineBlock>
      </div>
    );
  }

  return (
    <div
      className={`resume-block-project mb-3 ${styles.itemClass}`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <p className={`font-semibold text-[13px] ${styles.headingText}`}>
        {payload.name}
      </p>
      {bullets.length > 0 ? (
        <ul className={`mt-2 space-y-1.5 ${styles.bodyText}`}>
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-[1.5]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        payload.description && (
          <p className={`text-[12px] mt-1 leading-[1.5] ${styles.bodyText}`}>
            {payload.description}
          </p>
        )
      )}
      {payload.technologies?.length > 0 && (
        <p
          className="text-[11px] mt-1"
          style={{ color: theme.accentColor }}
        >
          {payload.technologies.join(" · ")}
        </p>
      )}
    </div>
  );
}
