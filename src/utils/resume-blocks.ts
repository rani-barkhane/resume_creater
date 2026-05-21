import { nanoid } from "nanoid";
import type { ResumeData, SectionKey } from "@/types/resume";
import type { ContentBlock } from "@/types/pagination";
import { getExperienceBullets } from "@/templates/primitives/utils";

const SECTION_LABELS: Record<SectionKey, string> = {
  personal: "Personal",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  social: "Links",
};

export function resumeDataToBlocks(data: ResumeData): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const order = data.sectionOrder?.length
    ? data.sectionOrder
    : ["summary", "experience", "education", "skills", "projects"];

  blocks.push({
    id: "header",
    type: "header",
    keepTogether: true,
    payload: { personal: data.personal, social: data.social },
  });

  for (const key of order) {
    if (key === "personal") continue;

    switch (key) {
      case "summary":
        if (data.summary?.trim()) {
          blocks.push({
            id: `summary-${nanoid(4)}`,
            type: "summary",
            section: "summary",
            keepTogether: true,
            payload: { text: data.summary },
          });
        }
        break;

      case "experience":
        if (data.experience.length) {
          const headingId = `h-exp-${nanoid(4)}`;
          blocks.push({
            id: headingId,
            type: "section-heading",
            section: "experience",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.experience },
          });
          data.experience.forEach((exp, i) => {
            blocks.push({
              id: exp.id || `exp-${i}`,
              type: "experience",
              section: "experience",
              keepTogether: false,
              payload: {
                ...exp,
                bullets: getExperienceBullets(exp),
              },
            });
          });
        }
        break;

      case "education":
        if (data.education.length) {
          blocks.push({
            id: `h-edu-${nanoid(4)}`,
            type: "section-heading",
            section: "education",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.education },
          });
          data.education.forEach((edu, i) => {
            blocks.push({
              id: edu.id || `edu-${i}`,
              type: "education",
              section: "education",
              keepTogether: true,
              payload: { ...edu },
            });
          });
        }
        break;

      case "skills":
        if (data.skills.length) {
          blocks.push({
            id: `h-skills-${nanoid(4)}`,
            type: "section-heading",
            section: "skills",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.skills },
          });
          blocks.push({
            id: `skills-${nanoid(4)}`,
            type: "skills",
            section: "skills",
            keepTogether: true,
            payload: { skills: data.skills },
          });
        }
        break;

      case "projects":
        if (data.projects.length) {
          blocks.push({
            id: `h-proj-${nanoid(4)}`,
            type: "section-heading",
            section: "projects",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.projects },
          });
          data.projects.forEach((proj, i) => {
            blocks.push({
              id: proj.id || `proj-${i}`,
              type: "project",
              section: "projects",
              keepTogether: true,
              payload: { ...proj },
            });
          });
        }
        break;

      case "certifications":
        if (data.certifications.length) {
          blocks.push({
            id: `h-cert-${nanoid(4)}`,
            type: "section-heading",
            section: "certifications",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.certifications },
          });
          data.certifications.forEach((c, i) => {
            blocks.push({
              id: c.id || `cert-${i}`,
              type: "certification",
              section: "certifications",
              keepTogether: true,
              payload: { ...c },
            });
          });
        }
        break;

      case "languages":
        if (data.languages.length) {
          blocks.push({
            id: `h-lang-${nanoid(4)}`,
            type: "section-heading",
            section: "languages",
            keepWithNext: true,
            payload: { title: SECTION_LABELS.languages },
          });
          blocks.push({
            id: `lang-${nanoid(4)}`,
            type: "languages",
            section: "languages",
            keepTogether: true,
            payload: { languages: data.languages },
          });
        }
        break;

      case "social":
        if (data.social.length) {
          blocks.push({
            id: `social-${nanoid(4)}`,
            type: "social",
            section: "social",
            keepTogether: true,
            payload: { social: data.social },
          });
        }
        break;
    }
  }

  return blocks;
}
