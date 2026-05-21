"use client";

import type { ResumeData, ResumeTheme, SectionKey } from "@/types/resume";

export const fontClasses: Record<ResumeTheme["fontFamily"], string> = {
  inter: "font-sans",
  georgia: "font-serif",
  roboto: "font-sans",
  playfair: "font-serif",
};

export const spacingClasses: Record<ResumeTheme["sectionSpacing"], string> = {
  compact: "space-y-3",
  normal: "space-y-5",
  relaxed: "space-y-7",
};

export function useOrderedSections(data: ResumeData) {
  const order = data.sectionOrder || [];
  return order;
}

export function SectionTitle({
  children,
  theme,
  dark = false,
}: {
  children: React.ReactNode;
  theme: ResumeTheme;
  dark?: boolean;
}) {
  const style =
    theme.headingStyle === "underline"
      ? { borderBottom: `2px solid ${theme.primaryColor}` }
      : theme.headingStyle === "caps"
        ? {}
        : {};

  return (
    <h2
      className={`text-xs font-bold tracking-wider ${
        theme.headingStyle === "caps" ? "uppercase" : ""
      } ${dark ? "text-white" : ""}`}
      style={{
        color: dark ? undefined : theme.primaryColor,
        ...style,
        ...(theme.headingStyle === "underline"
          ? { paddingBottom: "4px" }
          : {}),
      }}
    >
      {children}
    </h2>
  );
}

export function ContactLine({ data }: { data: ResumeData }) {
  const p = data.personal;
  const items = [p.email, p.phone, p.location, p.website].filter(Boolean);
  return (
    <p className="text-xs text-slate-500 dark:text-slate-400">
      {items.join(" · ")}
    </p>
  );
}

export function renderSection(
  key: SectionKey,
  data: ResumeData,
  theme: ResumeTheme,
  dark = false
): React.ReactNode {
  const spacing = spacingClasses[theme.sectionSpacing];

  switch (key) {
    case "summary":
      if (!data.summary) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Summary
          </SectionTitle>
          <p className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {data.summary}
          </p>
        </section>
      );
    case "experience":
      if (!data.experience.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Experience
          </SectionTitle>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className={`font-semibold text-sm ${dark ? "text-white" : "text-slate-800"}`}>
                      {exp.position}
                    </p>
                    <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <span className={`text-xs shrink-0 ${dark ? "text-slate-500" : "text-slate-400"}`}>
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className={`text-sm mt-1 leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    case "education":
      if (!data.education.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Education
          </SectionTitle>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <p className={`font-semibold text-sm ${dark ? "text-white" : "text-slate-800"}`}>
                  {edu.degree} — {edu.institution}
                </p>
                <p className={`text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    case "skills":
      if (!data.skills.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Skills
          </SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${theme.primaryColor}15`,
                  color: theme.primaryColor,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      );
    case "projects":
      if (!data.projects.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Projects
          </SectionTitle>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <p className={`font-semibold text-sm ${dark ? "text-white" : "text-slate-800"}`}>
                  {proj.name}
                </p>
                <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>
                  {proj.description}
                </p>
                <p className="text-xs mt-0.5" style={{ color: theme.accentColor }}>
                  {proj.technologies.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    case "certifications":
      if (!data.certifications.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Certifications
          </SectionTitle>
          <div className="space-y-2">
            {data.certifications.map((c) => (
              <p key={c.id} className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>
                <span className="font-medium">{c.name}</span> — {c.issuer} ({c.date})
              </p>
            ))}
          </div>
        </section>
      );
    case "languages":
      if (!data.languages.length) return null;
      return (
        <section className={spacing}>
          <SectionTitle theme={theme} dark={dark}>
            Languages
          </SectionTitle>
          <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {data.languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}
          </p>
        </section>
      );
    default:
      return null;
  }
}
