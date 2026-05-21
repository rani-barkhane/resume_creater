"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import { A4Page } from "./primitives/A4Page";
import {
  formatDateRange,
  getExperienceBullets,
  getOrderedSections,
} from "./primitives/utils";

export function CreativeTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const p = data.personal;
  const primary = theme.primaryColor || "#7c3aed";
  const accent = theme.accentColor || "#ec4899";
  const order = getOrderedSections(data);

  return (
    <A4Page className="flex min-h-[297mm] text-sm overflow-hidden">
      <aside
        className="w-[78mm] shrink-0 p-7 text-white"
        style={{
          background: `linear-gradient(180deg, ${primary} 0%, ${accent} 100%)`,
        }}
      >
        <h1 className="text-2xl font-bold leading-tight">
          {p.fullName || "Your Name"}
        </h1>
        <p className="text-white/90 mt-2 text-[13px]">{p.jobTitle}</p>

        <div className="mt-10 space-y-4 text-[11px] text-white/85">
          {p.email && (
            <div>
              <p className="text-[9px] uppercase tracking-widest opacity-70">
                Email
              </p>
              <p className="break-all">{p.email}</p>
            </div>
          )}
          {p.phone && (
            <div>
              <p className="text-[9px] uppercase tracking-widest opacity-70">
                Phone
              </p>
              <p>{p.phone}</p>
            </div>
          )}
          {p.location && (
            <div>
              <p className="text-[9px] uppercase tracking-widest opacity-70">
                Location
              </p>
              <p>{p.location}</p>
            </div>
          )}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-10">
            <p className="text-[9px] uppercase tracking-widest opacity-70 mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 p-8 bg-white">
        {data.summary && (
          <section className="mb-6">
            <h2
              className="text-lg font-bold mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${primary}, ${accent})`,
                WebkitBackgroundClip: "text",
              }}
            >
              Profile
            </h2>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {order.includes("experience") && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-slate-800 mb-3">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4 relative pl-4">
                <span
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
                />
                <div className="flex justify-between">
                  <p className="font-semibold">{exp.position}</p>
                  <span className="text-[11px] text-slate-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500">{exp.company}</p>
                <ul className="mt-1 text-[12px] text-slate-600 space-y-0.5">
                  {getExperienceBullets(exp).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {order.includes("projects") && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold mb-2">Projects</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <p className="font-medium">{proj.name}</p>
                <p className="text-[12px] text-slate-500">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {order.includes("education") && data.education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold mb-2">Education</h2>
            {data.education.map((edu) => (
              <p key={edu.id} className="text-[12px] text-slate-600 mb-1">
                <strong>{edu.degree}</strong> — {edu.institution}
              </p>
            ))}
          </section>
        )}
      </main>
    </A4Page>
  );
}
