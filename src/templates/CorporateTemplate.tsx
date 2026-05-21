"use client";

import type { ResumeData, ResumeTheme } from "@/types/resume";
import {
  fontClasses,
  ContactLine,
  renderSection,
  useOrderedSections,
} from "./shared";

export function CorporateTemplate({
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
        className="px-10 py-8 text-white"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <h1 className="text-2xl font-bold">
          {data.personal.fullName || "Your Name"}
        </h1>
        <p className="text-blue-100 mt-1">{data.personal.jobTitle}</p>
        <div className="mt-3 text-blue-100 text-xs opacity-90">
          {[data.personal.email, data.personal.phone, data.personal.location]
            .filter(Boolean)
            .join(" · ")}
        </div>
      </header>
      <div className="p-10">
        {order.map((key) => (
          <div key={key}>{renderSection(key, data, theme)}</div>
        ))}
      </div>
    </div>
  );
}
