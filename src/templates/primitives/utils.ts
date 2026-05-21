import type { ResumeData, ResumeTheme, SectionKey } from "@/types/resume";

export { getExperienceBullets, getProjectBullets } from "@/lib/bullet-utils";

export function getOrderedSections(data: ResumeData): SectionKey[] {
  return data.sectionOrder?.length
    ? data.sectionOrder
    : ["summary", "experience", "education", "skills", "projects"];
}

export function accent(theme: ResumeTheme) {
  return theme.primaryColor || "#4f46e5";
}

export function formatDateRange(
  start: string,
  end: string,
  current?: boolean
): string {
  const endLabel = current || end?.toLowerCase() === "present" ? "Current" : end;
  return `${start} – ${endLabel}`;
}
