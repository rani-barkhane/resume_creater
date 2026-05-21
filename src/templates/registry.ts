import type { ResumeTheme, TemplateId } from "@/types/resume";
import { DEFAULT_THEME } from "@/types/resume";
import type { TemplateDefinition } from "./types";
import { MinimalTemplate } from "./MinimalTemplate";
import { DeveloperTemplate } from "./DeveloperTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { ProfessionalTemplate } from "./ProfessionalTemplate";

const themes: Record<TemplateId, Partial<ResumeTheme>> = {
  minimal: {
    fontFamily: "inter",
    primaryColor: "#0f172a",
    accentColor: "#334155",
    fontSize: "md",
    sectionSpacing: "normal",
    headingStyle: "caps",
  },
  developer: {
    fontFamily: "roboto",
    primaryColor: "#0f172a",
    accentColor: "#22d3ee",
    fontSize: "md",
    sectionSpacing: "normal",
    headingStyle: "bold",
  },
  corporate: {
    fontFamily: "georgia",
    primaryColor: "#1e40af",
    accentColor: "#3b82f6",
    fontSize: "md",
    sectionSpacing: "relaxed",
    headingStyle: "bold",
  },
  creative: {
    fontFamily: "playfair",
    primaryColor: "#7c3aed",
    accentColor: "#ec4899",
    fontSize: "md",
    sectionSpacing: "normal",
    headingStyle: "bold",
  },
  professional: {
    fontFamily: "playfair",
    primaryColor: "#A68946",
    accentColor: "#8B7340",
    fontSize: "md",
    sectionSpacing: "relaxed",
    headingStyle: "bold",
  },
};

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  {
    id: "professional",
    name: "Professional Gold",
    description: "Elegant serif layout with gold accents — like executive resumes",
    category: "Featured",
    tags: ["ATS", "Timeline", "Gold"],
    previewGradient: "from-amber-50 to-stone-100",
    accentColor: "#A68946",
    isPremium: false,
    component: ProfessionalTemplate,
    defaultTheme: { ...DEFAULT_THEME, ...themes.professional },
  },
  {
    id: "minimal",
    name: "ATS Minimal",
    description: "Clean black & white single-column — maximum ATS compatibility",
    category: "Professional",
    tags: ["ATS", "Simple"],
    previewGradient: "from-white to-slate-100",
    accentColor: "#0f172a",
    isPremium: false,
    component: MinimalTemplate,
    defaultTheme: { ...DEFAULT_THEME, ...themes.minimal },
  },
  {
    id: "developer",
    name: "Modern Developer",
    description: "Dark sidebar with skill badges and tech stack emphasis",
    category: "Tech",
    tags: ["Dark", "Tech"],
    previewGradient: "from-slate-800 to-slate-950",
    accentColor: "#22d3ee",
    isPremium: false,
    component: DeveloperTemplate,
    defaultTheme: { ...DEFAULT_THEME, ...themes.developer },
  },
  {
    id: "corporate",
    name: "Corporate Blue",
    description: "Professional business style with blue header band",
    category: "Business",
    tags: ["Executive", "Formal"],
    previewGradient: "from-blue-600 to-blue-800",
    accentColor: "#1e40af",
    isPremium: false,
    component: CorporateTemplate,
    defaultTheme: { ...DEFAULT_THEME, ...themes.corporate },
  },
  {
    id: "creative",
    name: "Creative Gradient",
    description: "Bold gradient sidebar with portfolio-style layout",
    category: "Creative",
    tags: ["Gradient", "Portfolio"],
    previewGradient: "from-violet-600 to-fuchsia-500",
    accentColor: "#7c3aed",
    isPremium: false,
    component: CreativeTemplate,
    defaultTheme: { ...DEFAULT_THEME, ...themes.creative },
  },
];

export const TEMPLATE_MAP = Object.fromEntries(
  TEMPLATE_REGISTRY.map((t) => [t.id, t.component])
) as Record<TemplateId, TemplateDefinition["component"]>;

export function getTemplateDefinition(id: TemplateId): TemplateDefinition {
  return (
    TEMPLATE_REGISTRY.find((t) => t.id === id) ?? TEMPLATE_REGISTRY[0]
  );
}

export function getDefaultThemeForTemplate(id: TemplateId): ResumeTheme {
  return getTemplateDefinition(id).defaultTheme;
}
