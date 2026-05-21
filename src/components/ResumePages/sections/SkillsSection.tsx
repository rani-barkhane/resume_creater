"use client";

import type { ReactNode } from "react";
import type { ResumeTheme, SkillsDisplayMode } from "@/types/resume";
import { DEFAULT_SKILLS_DISPLAY } from "@/constants/skills-display";
import { useTemplateStyles } from "../TemplateStyleContext";
import { ProGoldBullets } from "./professional-layout";

function SkillDot({ color }: { color: string }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
      style={{ backgroundColor: color }}
    />
  );
}

function SkillsTable({
  skills,
  color,
  className = "",
}: {
  skills: string[];
  color: string;
  className?: string;
}) {
  const cols = 2;
  const rows = Math.ceil(skills.length / cols);

  return (
    <table className={`w-full text-[12.5px] font-serif ${className}`}>
      <tbody>
        {Array.from({ length: rows }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: cols }).map((_, col) => {
              const skill = skills[row * cols + col];
              return (
                <td key={col} className="py-1 pr-4 align-top w-1/2">
                  {skill ? (
                    <span className="flex gap-2 font-semibold text-slate-800 leading-[1.55]">
                      <SkillDot color={color} />
                      {skill}
                    </span>
                  ) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SkillsCards({
  skills,
  color,
}: {
  skills: string[];
  color: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {skills.map((skill) => (
        <div
          key={skill}
          className="flex items-start gap-2 px-2.5 py-1.5 rounded border font-serif"
          style={{ borderColor: `${color}44` }}
        >
          <SkillDot color={color} />
          <span className="text-[12px] font-semibold text-slate-800 leading-[1.45]">
            {skill}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SkillsSection({
  skills,
  theme,
  display = DEFAULT_SKILLS_DISPLAY,
}: {
  skills: string[];
  theme: ResumeTheme;
  display?: SkillsDisplayMode;
}) {
  const styles = useTemplateStyles();
  const gold = theme.primaryColor || "#A68946";

  if (!skills.length) return null;

  const wrap = (children: ReactNode) => (
    <div
      className="resume-block-skills mb-2"
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      {children}
    </div>
  );

  if (styles.isProfessional) {
    switch (display) {
      case "inline":
        return wrap(
          <p className="text-[12.5px] font-bold text-slate-800 font-serif leading-[1.55]">
            {skills.join(" · ")}
          </p>
        );
      case "table":
        return wrap(<SkillsTable skills={skills} color={gold} />);
      case "cards":
        return wrap(<SkillsCards skills={skills} color={gold} />);
      case "bullets":
      default:
        return wrap(<ProGoldBullets bullets={skills} color={gold} />);
    }
  }

  switch (display) {
    case "inline":
      return (
        <div
          className="resume-block-skills flex flex-wrap gap-1.5 mb-2"
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
    case "table":
      return wrap(
        <SkillsTable
          skills={skills}
          color={theme.primaryColor}
          className={styles.bodyText}
        />
      );
    case "cards":
      return wrap(<SkillsCards skills={skills} color={theme.primaryColor} />);
    case "bullets":
    default:
      return wrap(
        <ul className={`space-y-1 ${styles.bodyText}`}>
          {skills.map((skill) => (
            <li key={skill} className="flex gap-2 text-[12px] leading-[1.5]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: theme.primaryColor }}
              />
              {skill}
            </li>
          ))}
        </ul>
      );
  }
}
