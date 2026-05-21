"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import { A4Page } from "./primitives/A4Page";
import {
  accent,
  formatDateRange,
  getExperienceBullets,
  getOrderedSections,
} from "./primitives/utils";

export function MinimalTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const p = data.personal;
  const color = accent(theme);
  const order = getOrderedSections(data);
  const textSize =
    theme.fontSize === "sm"
      ? "text-[12px]"
      : theme.fontSize === "lg"
        ? "text-[14px]"
        : "text-[13px]";

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="mb-5">
      <h2
        className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2 pb-1 border-b border-slate-300"
        style={{ color }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <A4Page className={`px-12 py-10 ${textSize} text-slate-800`}>
      <header className="mb-6 text-center border-b-2 border-slate-900 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {p.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-slate-600 mt-1">{p.jobTitle}</p>
        <p className="text-[11px] text-slate-500 mt-2">
          {[p.email, p.phone, p.location, p.website].filter(Boolean).join(" | ")}
        </p>
      </header>

      {order.includes("summary") && data.summary && (
        <Section title="Professional Summary">
          <p className="leading-relaxed text-justify">{data.summary}</p>
        </Section>
      )}

      {order.includes("experience") && data.experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-semibold">
                  <span>
                    {exp.position} — {exp.company}
                  </span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <ul className="mt-1.5 list-disc list-inside space-y-0.5 text-slate-700">
                  {getExperienceBullets(exp).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {order.includes("education") && data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <span>
                <strong>{edu.degree}</strong>, {edu.institution}
              </span>
              <span className="text-slate-500">
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
          ))}
        </Section>
      )}

      {order.includes("skills") && data.skills.length > 0 && (
        <Section title="Skills">
          <p>{data.skills.join(" · ")}</p>
        </Section>
      )}

      {order.includes("projects") && data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              <p className="text-slate-600">{proj.description}</p>
            </div>
          ))}
        </Section>
      )}
    </A4Page>
  );
}
