"use client";

import { Link2, Mail, MapPin, Phone } from "lucide-react";
import type { ResumeData, ResumeTheme } from "@/types/resume";
import { A4Page } from "./primitives/A4Page";
import {
  accent,
  formatDateRange,
  getExperienceBullets,
  getOrderedSections,
} from "./primitives/utils";

export function DeveloperTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const p = data.personal;
  const accentColor = theme.accentColor || "#22d3ee";
  const order = getOrderedSections(data).filter((k) => k !== "skills");

  return (
    <A4Page className="flex min-h-[297mm] text-sm">
      <aside className="w-[68mm] bg-[#0f172a] text-slate-300 p-6 shrink-0">
        <h1 className="text-xl font-bold text-white leading-tight">
          {p.fullName || "Your Name"}
        </h1>
        <p className="text-sm mt-1 font-medium" style={{ color: accentColor }}>
          {p.jobTitle || "Developer"}
        </p>

        <div className="mt-8 space-y-3 text-[11px]">
          {p.email && (
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              <span className="break-all">{p.email}</span>
            </p>
          )}
          {p.phone && (
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {p.phone}
            </p>
          )}
          {p.location && (
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
              {p.location}
            </p>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-8">
            <h2
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.social.length > 0 && (
          <div className="mt-6 space-y-2 text-[10px]">
            {data.social.map((s) => (
              <p key={s.id} className="flex items-center gap-2 truncate">
                <Link2 className="w-3 h-3 shrink-0" style={{ color: accentColor }} />
                {s.platform}
              </p>
            ))}
          </div>
        )}
      </aside>

      <main className="flex-1 p-8 bg-white text-slate-800">
        {data.summary && (
          <section className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: accent(theme) }}
            >
              About
            </h2>
            <p className="text-[13px] leading-relaxed text-slate-600">
              {data.summary}
            </p>
          </section>
        )}

        {order.includes("experience") && data.experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent(theme) }}
            >
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <p className="font-semibold">{exp.position}</p>
                  <span className="text-[11px] text-slate-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">
                  {exp.company} · {exp.location}
                </p>
                {exp.techStack && (
                  <p className="text-[11px] mt-1 text-cyan-700 font-medium">
                    {exp.techStack}
                  </p>
                )}
                <ul className="mt-2 space-y-1 text-[12px] text-slate-600">
                  {getExperienceBullets(exp).map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: accentColor }}>▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && data.projects.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent(theme) }}
            >
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <p className="font-semibold">{proj.name}</p>
                <p className="text-[12px] text-slate-600">{proj.description}</p>
                <p className="text-[11px] mt-0.5" style={{ color: accentColor }}>
                  {proj.technologies.join(" · ")}
                </p>
              </div>
            ))}
          </section>
        )}

        {order.includes("education") && data.education.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent(theme) }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-semibold text-[13px]">{edu.degree}</p>
                <p className="text-[12px] text-slate-500">
                  {edu.institution} · {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </A4Page>
  );
}
