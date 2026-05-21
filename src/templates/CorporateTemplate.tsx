"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import { A4Page } from "./primitives/A4Page";
import {
  accent,
  formatDateRange,
  getExperienceBullets,
  getOrderedSections,
} from "./primitives/utils";

export function CorporateTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const p = data.personal;
  const primary = theme.primaryColor || "#1e40af";
  const order = getOrderedSections(data);

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="mb-5">
      <h2
        className="text-[12px] font-bold uppercase tracking-wide mb-2 text-white px-2 py-1 inline-block"
        style={{ backgroundColor: primary }}
      >
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );

  return (
    <A4Page className="text-[13px]">
      <header
        className="px-10 py-8 text-white"
        style={{ backgroundColor: primary }}
      >
        <h1 className="text-[28px] font-bold tracking-tight">
          {p.fullName || "Your Name"}
        </h1>
        <p className="text-blue-100 text-lg mt-1">{p.jobTitle}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-[11px] text-blue-50/90">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </header>

      <div className="px-10 py-8">
        {order.includes("summary") && data.summary && (
          <Section title="Executive Summary">
            <p className="leading-relaxed text-slate-700 text-justify">
              {data.summary}
            </p>
          </Section>
        )}

        {order.includes("experience") && data.experience.length > 0 && (
          <Section title="Professional Experience">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-4 pb-4 border-b border-slate-100 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{exp.position}</p>
                    <p className="text-slate-600">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 italic shrink-0">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <ul className="mt-2 list-disc list-inside text-slate-700 space-y-0.5">
                  {getExperienceBullets(exp).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {order.includes("education") && data.education.length > 0 && (
            <Section title="Education">
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-slate-600 text-[12px]">{edu.institution}</p>
                  <p className="text-[11px] text-slate-400">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {order.includes("skills") && data.skills.length > 0 && (
            <Section title="Core Competencies">
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.skills.map((s) => (
                  <li key={s} className="text-slate-700 flex gap-1.5">
                    <span style={{ color: primary }}>■</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </A4Page>
  );
}
