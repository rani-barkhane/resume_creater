export type TemplateId =
  | "minimal"
  | "developer"
  | "corporate"
  | "creative"
  | "professional";

export type SectionKey =
  | "personal"
  | "summary"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "social";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  /** Optional structured bullets; falls back to splitting description by newlines */
  bullets?: string[];
  techStack?: string;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
  description: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ResumeTheme {
  fontFamily: "inter" | "georgia" | "roboto" | "playfair";
  primaryColor: string;
  accentColor: string;
  fontSize: "sm" | "md" | "lg";
  sectionSpacing: "compact" | "normal" | "relaxed";
  headingStyle: "bold" | "underline" | "caps";
}

export interface ResumeAnalytics {
  views: number;
  downloads: number;
  shareClicks: number;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  social: SocialLink[];
  sectionOrder: SectionKey[];
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  slug: string;
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
  isPublic: boolean;
  sharePassword?: string;
  analytics: ResumeAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface ATSResult {
  score: number;
  completeness: number;
  keywordScore: number;
  readability: number;
  missingSections: string[];
  weakSections: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
];

export const DEFAULT_THEME: ResumeTheme = {
  fontFamily: "inter",
  primaryColor: "#4f46e5",
  accentColor: "#7c3aed",
  fontSize: "md",
  sectionSpacing: "normal",
  headingStyle: "bold",
};

export const EMPTY_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  social: [],
  sectionOrder: DEFAULT_SECTION_ORDER,
};
