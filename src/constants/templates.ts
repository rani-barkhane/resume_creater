import type { TemplateId } from "@/types/resume";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  category: string;
  previewGradient: string;
  isPremium: boolean;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "minimal",
    name: "ATS Minimal",
    description: "Clean, ATS-friendly layout with maximum readability",
    category: "Professional",
    previewGradient: "from-slate-100 to-slate-200",
    isPremium: false,
  },
  {
    id: "developer",
    name: "Modern Developer",
    description: "Dark sidebar with tech-focused styling",
    category: "Tech",
    previewGradient: "from-slate-800 to-slate-900",
    isPremium: false,
  },
  {
    id: "corporate",
    name: "Corporate Pro",
    description: "Blue and white professional business template",
    category: "Business",
    previewGradient: "from-blue-50 to-indigo-100",
    isPremium: false,
  },
  {
    id: "creative",
    name: "Creative Gradient",
    description: "Bold gradients with modern sidebar layout",
    category: "Creative",
    previewGradient: "from-violet-500 to-fuchsia-500",
    isPremium: false,
  },
];

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
