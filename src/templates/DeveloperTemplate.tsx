"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import {
  fontClasses,
  renderSection,
  useOrderedSections,
} from "./shared";

export function DeveloperTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const order = useOrderedSections(data);
  const font = fontClasses[theme.fontFamily];

  return (
    <div className={`w-[210mm] min-h-[297mm] flex ${font} text-sm`}>
      <aside
        className="w-[72mm] p-6 text-white shrink-0"
        style={{ backgroundColor: "#0f172a" }}
      >
        <h1 className="text-xl font-bold leading-tight">
          {data.personal.fullName || "Your Name"}
        </h1>
        <p className="text-sm mt-1" style={{ color: theme.accentColor }}>
          {data.personal.jobTitle || "Developer"}
        </p>
        <div className="mt-6 space-y-3 text-xs text-slate-400">
          {data.personal.email && <p>{data.personal.email}</p>}
          {data.personal.phone && <p>{data.personal.phone}</p>}
          {data.personal.location && <p>{data.personal.location}</p>}
          {data.personal.website && (
            <p className="break-all">{data.personal.website}</p>
          )}
        </div>
        {data.skills.length > 0 && (
          <div className="mt-8">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: theme.accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.social.length > 0 && (
          <div className="mt-6 space-y-1">
            {data.social.map((s) => (
              <p key={s.id} className="text-[10px] text-slate-500 truncate">
                {s.platform}
              </p>
            ))}
          </div>
        )}
      </aside>
      <main className="flex-1 p-8 bg-white">
        {order
          .filter((k) => k !== "skills")
          .map((key) => (
            <div key={key}>{renderSection(key, data, theme)}</div>
          ))}
      </main>
    </div>
  );
}
