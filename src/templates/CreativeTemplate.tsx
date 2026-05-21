"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import {
  fontClasses,
  ContactLine,
  renderSection,
  useOrderedSections,
} from "./shared";

export function CreativeTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const order = useOrderedSections(data);
  const font = fontClasses[theme.fontFamily];

  return (
    <div className={`w-[210mm] min-h-[297mm] bg-white ${font} text-sm`}>
      <header
        className="px-10 py-10 text-white"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          {data.personal.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-white/90 mt-1">{data.personal.jobTitle}</p>
        <div className="mt-4 text-white/80 text-xs">
          <ContactLine data={data} />
        </div>
      </header>
      <div className="flex">
        <div
          className="w-2 shrink-0"
          style={{
            background: `linear-gradient(180deg, ${theme.primaryColor}, ${theme.accentColor})`,
          }}
        />
        <div className="flex-1 p-10">
          {order.map((key) => (
            <div key={key}>{renderSection(key, data, theme)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
