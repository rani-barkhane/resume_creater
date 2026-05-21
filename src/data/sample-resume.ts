import { nanoid } from "nanoid";
import type { ResumeData } from "@/types/resume";
import { DEFAULT_SECTION_ORDER } from "@/types/resume";

export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Rani Sharma",
    jobTitle: "Full Stack Developer",
    email: "rani.sharma@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://ranisharma.dev",
  },
  summary:
    "Results-driven Full Stack Developer with 5+ years building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, performance optimization, and delivering exceptional user experiences. Proven track record of leading cross-functional teams and shipping products used by 100K+ users.",
  education: [
    {
      id: nanoid(),
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      field: "Software Engineering",
      startDate: "2015",
      endDate: "2019",
      description: "GPA 3.8/4.0 · Dean's List",
    },
  ],
  experience: [
    {
      id: nanoid(),
      company: "TechFlow Inc.",
      position: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      current: true,
      description:
        "Developed responsive frontend interfaces using React and Tailwind CSS, improving user experience and performance by 40%. Architected RESTful APIs with Node.js serving 50K+ daily requests. Led migration to microservices, reducing deployment time by 60%. Mentored 3 junior developers on best practices and code reviews.",
    },
    {
      id: nanoid(),
      company: "StartupLabs",
      position: "Full Stack Developer",
      location: "Remote",
      startDate: "2019",
      endDate: "2022",
      current: false,
      description:
        "Built MERN stack applications from scratch for 5+ client projects. Implemented CI/CD pipelines with GitHub Actions. Optimized database queries reducing page load by 35%. Collaborated with designers using Figma for pixel-perfect implementations.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Tailwind CSS",
    "Git",
  ],
  projects: [
    {
      id: nanoid(),
      name: "ResumeForge",
      url: "https://github.com/rani/resumeforge",
      description:
        "AI-powered resume builder with live preview, ATS scoring, and PDF export. 2K+ GitHub stars.",
      technologies: ["Next.js", "MongoDB", "OpenAI", "Puppeteer"],
    },
    {
      id: nanoid(),
      name: "TaskFlow Pro",
      url: "https://taskflow.app",
      description:
        "Real-time collaboration tool for remote teams with WebSocket sync and offline support.",
      technologies: ["React", "Socket.io", "Redis"],
    },
  ],
  certifications: [
    {
      id: nanoid(),
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      id: nanoid(),
      name: "Meta Front-End Developer",
      issuer: "Meta",
      date: "2022",
    },
  ],
  languages: [
    { id: nanoid(), name: "English", proficiency: "Native" },
    { id: nanoid(), name: "Hindi", proficiency: "Fluent" },
  ],
  social: [
    {
      id: nanoid(),
      platform: "LinkedIn",
      url: "https://linkedin.com/in/ranisharma",
    },
    { id: nanoid(), platform: "GitHub", url: "https://github.com/rani" },
  ],
  sectionOrder: DEFAULT_SECTION_ORDER,
};

export const SAMPLE_RESUMES_META = [
  {
    title: "Frontend Developer Resume",
    templateId: "developer" as const,
    slug: "rani-frontend-developer",
  },
  {
    title: "Full Stack Resume",
    templateId: "minimal" as const,
    slug: "rani-mern-developer",
  },
  {
    title: "Corporate PM Resume",
    templateId: "corporate" as const,
    slug: "rani-corporate-pm",
  },
];
