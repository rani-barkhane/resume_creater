"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import {
  fontClasses,
  ContactLine,
  renderSection,
  useOrderedSections,
} from "./shared";

export function MinimalTemplate({
  data,
  theme,
}: {
  data: ResumeData;
  theme: ResumeTheme;
}) {
  const order = useOrderedSections(data);
  const font = fontClasses[theme.fontFamily];
  const textSize =
    theme.fontSize === "sm"
      ? "text-[13px]"
      : theme.fontSize === "lg"
        ? "text-[15px]"
        : "text-sm";

  return (
    <div
      className={`w-[210mm] min-h-[297mm] bg-white p-10 shadow-sm ${font} ${textSize} print:shadow-none`}
    >
      <header className="mb-6 pb-4 border-b border-slate-200">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: theme.primaryColor }}
        >
          {data.personal.fullName || "Your Name"}
        </h1>
        <p className="text-base text-slate-600 mt-0.5">
          {data.personal.jobTitle || "Job Title"}
        </p>
        <ContactLine data={data} />
      </header>
      <div className="space-y-1">
        {order.map((key) => (
          <div key={key}>{renderSection(key, data, theme)}</div>
        ))}
      </div>
    </div>
  );
}
