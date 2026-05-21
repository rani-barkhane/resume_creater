import type { Experience, Project } from "@/types/resume";

/** Parse plain text or newline-separated lines into bullet strings */
export function getBulletsFromText(text: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n+/)
    .map((s) => s.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

/** Store bullets as newline-separated text for backward compatibility */
export function bulletsToDescription(bullets: string[]): string {
  return bullets.filter((b) => b.trim()).join("\n");
}

/** Non-empty bullets for resume preview, PDF, and pagination */
export function getExperienceBullets(exp: Experience): string[] {
  if (Array.isArray(exp.bullets)) {
    return exp.bullets.map((b) => b.trim()).filter(Boolean);
  }
  return getBulletsFromText(exp.description);
}

export function getProjectBullets(proj: Project): string[] {
  if (Array.isArray(proj.bullets)) {
    return proj.bullets.map((b) => b.trim()).filter(Boolean);
  }
  return getBulletsFromText(proj.description);
}

/** Includes empty rows while editing in the form */
export function getFormExperienceBullets(exp: Experience): string[] {
  if (Array.isArray(exp.bullets)) return exp.bullets;
  return getBulletsFromText(exp.description);
}

export function getFormProjectBullets(proj: Project): string[] {
  if (Array.isArray(proj.bullets)) return proj.bullets;
  return getBulletsFromText(proj.description);
}
