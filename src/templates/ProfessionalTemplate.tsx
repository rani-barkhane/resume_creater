"use client";

import { Mail, Phone, Link2 } from "lucide-react";
import type { ResumeData, ResumeTheme } from "@/types/resume";
import { A4Page } from "./primitives/A4Page";
import {
  accent,
  formatDateRange,
  getExperienceBullets,
  getOrderedSections,
} from "./primitives/utils";

const GOLD = "#A68946";

function GoldSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[15px] font-serif font-bold mb-3"
      style={{ color: GOLD }}
    >
      {children}
    </h2>
  );
}

function TimelineBlock({
  title,
  subtitle,
  date,
  children,
}: {
  title: string;
  subtitle?: string;
  date?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative pl-5 mb-4">
      <span
        className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
        style={{ backgroundColor: GOLD }}
      />
      <span
        className="absolute left-[3px] top-4 bottom-0 w-px"
        style={{ backgroundColor: `${GOLD}55` }}
      />
      <div className="flex justify-between items-baseline gap-4">
        <p className="font-semibold text-[13px] text-slate-800">{title}</p>
        {date && (
          <p className="text-[12px] italic text-slate-500 shrink-0">{date}</p>
        )}
      </div>
      {subtitle && (
        <p className="text-[12px] text-slate-600 mt-0.5 font-medium">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

export function ProfessionalTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const p = data.personal;
  const gold = theme.primaryColor || GOLD;
  const order = getOrderedSections(data);
  const linkedIn = data.social.find((s) =>
    s.platform.toLowerCase().includes("linkedin")
  );

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        if (!data.summary) return null;
        return (
          <section className="mb-6">
            <p className="text-[13px] leading-relaxed text-slate-700 text-justify">
              {data.summary.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </section>
        );

      case "experience":
        if (!data.experience.length) return null;
        return (
          <section className="mb-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline mb-2">
                  <p className="font-bold text-[14px] text-slate-900">
                    {exp.company}
                  </p>
                  <p className="text-[12px] italic text-slate-500">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </p>
                </div>
                {exp.position && (
                  <TimelineBlock title={exp.position}>
                    {exp.techStack && (
                      <p className="text-[12px] text-slate-600 mt-1">
                        <span className="font-semibold">Tech Stack: </span>
                        {exp.techStack}
                      </p>
                    )}
                    <ul className="mt-2 space-y-1.5">
                      {getExperienceBullets(exp).map((b, i) => (
                        <li
                          key={i}
                          className="text-[12.5px] text-slate-700 leading-relaxed flex gap-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                            style={{ backgroundColor: gold }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </TimelineBlock>
                )}
              </div>
            ))}
          </section>
        );

      case "projects":
        if (!data.projects.length) return null;
        return (
          <section className="mb-6">
            {data.projects.map((proj) => (
              <TimelineBlock
                key={proj.id}
                title={proj.name}
                subtitle={
                  proj.technologies.length
                    ? `Tech Stack: ${proj.technologies.join(", ")}`
                    : undefined
                }
              >
                <p className="text-[12.5px] text-slate-700 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </TimelineBlock>
            ))}
          </section>
        );

      case "education":
        if (!data.education.length) return null;
        return (
          <section className="mb-6">
            <GoldSectionTitle>Education</GoldSectionTitle>
            {data.education.map((edu) => (
              <TimelineBlock
                key={edu.id}
                title={edu.degree}
                date={`${edu.startDate} – ${edu.endDate}`}
              >
                <p className="text-[12.5px] text-slate-700">{edu.institution}</p>
                {edu.description && (
                  <ul className="mt-1 space-y-0.5">
                    <li className="text-[12px] text-slate-600 flex gap-2">
                      <span className="text-slate-400">•</span>
                      {edu.description}
                    </li>
                  </ul>
                )}
              </TimelineBlock>
            ))}
          </section>
        );

      case "skills":
        if (!data.skills.length) return null;
        return (
          <section className="mb-4">
            <GoldSectionTitle>Skills</GoldSectionTitle>
            <ul className="space-y-1 pl-1">
              {data.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-[12.5px] text-slate-700 flex gap-2"
                >
                  <span className="text-slate-500">•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <A4Page className="px-10 py-9 font-sans">
      <header className="mb-5">
        <h1
          className="text-[32px] font-serif font-bold leading-tight"
          style={{ color: gold }}
        >
          {p.fullName || "Your Name"}
        </h1>
        <p className="text-[15px] italic font-serif text-slate-700 mt-0.5">
          {p.jobTitle || "Job Title"}
        </p>
        <div
          className="mt-4 flex flex-wrap items-center gap-6 px-4 py-2.5 text-[11.5px] text-slate-600"
          style={{ border: `1px solid ${gold}` }}
        >
          {p.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color: gold }} />
              {p.email}
            </span>
          )}
          {p.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: gold }} />
              {p.phone}
            </span>
          )}
          {(linkedIn?.url || p.website) && (
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5" style={{ color: gold }} />
              {linkedIn?.url || p.website}
            </span>
          )}
        </div>
      </header>

      {order.map((key) => (
        <div key={key}>{renderSection(key)}</div>
      ))}
    </A4Page>
  );
}
