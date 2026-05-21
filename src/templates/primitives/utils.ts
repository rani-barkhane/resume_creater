import type { Experience, ResumeData, ResumeTheme, SectionKey } from "@/types/resume";

export function getExperienceBullets(exp: Experience): string[] {
  if (exp.bullets?.length) return exp.bullets.filter(Boolean);
  if (!exp.description?.trim()) return [];
  return exp.description
    .split(/\n+/)
    .map((s) => s.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

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
