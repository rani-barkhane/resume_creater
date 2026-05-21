import { nanoid } from "nanoid";
import type { ResumeData } from "@/types/resume";
import { DEFAULT_SECTION_ORDER } from "@/types/resume";

/** Dummy data modeled after the Professional Gold template example */
export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Rani Barkhane",
    jobTitle: "Full Stack Developer",
    email: "rani.barkhane@email.com",
    phone: "+91 98765 43210",
    location: "India",
    website: "https://linkedin.com/in/rani-barkhane",
  },
  summary:
    "Motivated **Full Stack Developer** with 2+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud deployment. Strong problem-solver with a track record of delivering user-centric products in agile environments.",
  education: [
    {
      id: nanoid(),
      institution: "Savitribai Phule Pune University",
      degree: "Bachelor of Engineering — Computer Science",
      field: "Computer Engineering",
      startDate: "2018",
      endDate: "2022",
      description: "CGPA: 8.2/10",
    },
  ],
  experience: [
    {
      id: nanoid(),
      company: "Logikview Analytics",
      position: "Patient Registry System",
      location: "Remote",
      startDate: "July 2023",
      endDate: "Present",
      current: true,
      techStack:
        "Node.js, Strapi, SQL, React.js, Redux, REST APIs, JWT Authentication",
      description: "",
      bullets: [
        "Developed and maintained a full-stack patient registry platform serving healthcare providers with secure data management.",
        "Built RESTful APIs with Node.js and Strapi, integrating SQL databases for reliable patient record storage.",
        "Implemented React.js frontend with Redux state management, improving form completion rates by 35%.",
        "Designed JWT-based authentication and role-based access control for HIPAA-aligned workflows.",
      ],
    },
    {
      id: nanoid(),
      company: "Logikview Analytics",
      position: "Bail Management System (BMS)",
      location: "Remote",
      startDate: "Jan 2024",
      endDate: "Present",
      current: true,
      techStack: "React.js, Node.js, MongoDB, Express, Tailwind CSS",
      description: "",
      bullets: [
        "Engineered a bail management dashboard streamlining case tracking and document workflows for legal teams.",
        "Optimized MongoDB queries and API response times, reducing average load time by 40%.",
        "Collaborated with cross-functional stakeholders to deliver features on two-week sprint cycles.",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "REST APIs",
    "Git",
    "Tailwind CSS",
    "Strapi",
  ],
  projects: [
    {
      id: nanoid(),
      name: "ResumeForge",
      url: "https://github.com/rani-barkhane/resume_creater",
      description:
        "AI-powered resume builder with live preview, ATS scoring, template switching, and PDF export.",
      technologies: ["Next.js", "MongoDB", "OpenAI", "Puppeteer", "Zustand"],
    },
  ],
  certifications: [
    {
      id: nanoid(),
      name: "Meta Front-End Developer",
      issuer: "Meta / Coursera",
      date: "2023",
    },
  ],
  languages: [
    { id: nanoid(), name: "English", proficiency: "Professional" },
    { id: nanoid(), name: "Hindi", proficiency: "Native" },
    { id: nanoid(), name: "Marathi", proficiency: "Native" },
  ],
  social: [
    {
      id: nanoid(),
      platform: "LinkedIn",
      url: "https://linkedin.com/in/rani-barkhane",
    },
    {
      id: nanoid(),
      platform: "GitHub",
      url: "https://github.com/rani-barkhane",
    },
  ],
  sectionOrder: DEFAULT_SECTION_ORDER,
};

export const SAMPLE_RESUMES_META = [
  {
    title: "Professional Resume",
    templateId: "professional" as const,
    slug: "rani-barkhane-developer",
  },
  {
    title: "ATS Minimal Resume",
    templateId: "minimal" as const,
    slug: "rani-ats-minimal",
  },
  {
    title: "Developer Resume",
    templateId: "developer" as const,
    slug: "rani-developer-dark",
  },
];
