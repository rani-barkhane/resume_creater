import { TEMPLATE_REGISTRY } from "@/templates/registry";
import type { TemplateId } from "@/types/resume";

export type { TemplateDefinition } from "@/templates/types";

export const TEMPLATES = TEMPLATE_REGISTRY.map(
  ({ component: _c, defaultTheme: _d, ...meta }) => meta
);

export const FORM_STEPS = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "summary", label: "Summary", icon: "FileText" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "skills", label: "Skills", icon: "Sparkles" },
  { id: "projects", label: "Projects", icon: "Folder" },
  { id: "certifications", label: "Certs", icon: "Award" },
  { id: "languages", label: "Languages", icon: "Globe" },
  { id: "social", label: "Social", icon: "Link" },
] as const;

export function getTemplateById(id: TemplateId) {
  return TEMPLATE_REGISTRY.find((t) => t.id === id);
}
