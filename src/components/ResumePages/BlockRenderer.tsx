"use client";

import { Mail, Phone, Link2 } from "lucide-react";
import type { ContentBlock } from "@/types/pagination";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { useTemplateStyles } from "./TemplateStyleContext";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

interface BlockRendererProps {
  block: ContentBlock;
  theme: ResumeTheme;
  templateId?: TemplateId;
  /** Show full header (page 1) or compact continuation */
  isFirstPage?: boolean;
}

export function BlockRenderer({
  block,
  theme,
  templateId = "professional",
  isFirstPage = true,
}: BlockRendererProps) {
  const styles = useTemplateStyles();

  switch (block.type) {
    case "header": {
      const personal = block.payload.personal as ResumeData["personal"];
      const social = (block.payload.social as ResumeData["social"]) || [];
      const linkedIn = social.find((s) =>
        s.platform.toLowerCase().includes("linkedin")
      );
      const gold = theme.primaryColor;

      if (!isFirstPage) {
        return (
          <div
            className="mb-4 pb-2 border-b border-slate-200"
            style={{ breakInside: "avoid" }}
          >
            <p className="font-bold text-sm" style={{ color: gold }}>
              {personal.fullName}
            </p>
            <p className="text-xs text-slate-500">{personal.jobTitle}</p>
          </div>
        );
      }

      if (templateId === "minimal") {
        return (
          <header
            className="mb-4 text-center border-b-2 border-slate-900 pb-3 resume-block-header"
            data-block-id={block.id}
            style={{ breakInside: "avoid" }}
          >
            <h1 className="text-2xl font-bold uppercase text-slate-900">
              {personal.fullName || "Your Name"}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{personal.jobTitle}</p>
            <p className="text-[11px] text-slate-500 mt-2">
              {[personal.email, personal.phone, personal.location]
                .filter(Boolean)
                .join(" | ")}
            </p>
          </header>
        );
      }

      if (templateId === "corporate") {
        return (
          <header
            className="mb-4 px-4 py-4 rounded-lg text-white resume-block-header"
            style={{ backgroundColor: theme.primaryColor, breakInside: "avoid" }}
            data-block-id={block.id}
          >
            <h1 className="text-xl font-bold">{personal.fullName}</h1>
            <p className="text-blue-100 text-sm mt-0.5">{personal.jobTitle}</p>
            <p className="text-[11px] text-blue-50/90 mt-2">
              {[personal.email, personal.phone].filter(Boolean).join(" · ")}
            </p>
          </header>
        );
      }

      return (
        <header
          className="mb-4 resume-block-header"
          style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
          data-block-id={block.id}
        >
          <h1
            className="text-[28px] font-serif font-bold leading-tight"
            style={{ color: gold }}
          >
            {personal.fullName || "Your Name"}
          </h1>
          <p className="text-[15px] italic text-slate-700 mt-0.5">
            {personal.jobTitle || "Job Title"}
          </p>
          <div
            className="mt-3 flex flex-wrap gap-4 px-3 py-2 text-[11px] text-slate-600"
            style={{ border: `1px solid ${gold}` }}
          >
            {personal.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" style={{ color: gold }} />
                {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" style={{ color: gold }} />
                {personal.phone}
              </span>
            )}
            {(linkedIn?.url || personal.website) && (
              <span className="flex items-center gap-1">
                <Link2 className="w-3 h-3" style={{ color: gold }} />
                {linkedIn?.url || personal.website}
              </span>
            )}
          </div>
        </header>
      );
    }

    case "summary":
      return (
        <section
          className={`mb-4 resume-block-summary ${styles.bodyText}`}
          data-block-id={block.id}
          style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
        >
          <p className="text-[13px] leading-relaxed text-justify">
            {block.payload.text as string}
          </p>
        </section>
      );

    case "section-heading":
      return (
        <h2
          className={styles.sectionTitleClass}
          style={{
            color: theme.primaryColor,
            breakAfter: "avoid",
            pageBreakAfter: "avoid",
            ...(templateId === "professional"
              ? { fontFamily: "Georgia, serif" }
              : {}),
          }}
          data-block-id={block.id}
        >
          {block.payload.title as string}
        </h2>
      );

    case "experience":
      return (
        <div data-block-id={block.id}>
          <ExperienceSection
            payload={block.payload as never}
            theme={theme}
          />
        </div>
      );

    case "education":
      return (
        <div data-block-id={block.id}>
          <EducationSection payload={block.payload as never} />
        </div>
      );

    case "project":
      return (
        <div data-block-id={block.id}>
          <ProjectsSection
            payload={block.payload as never}
            theme={theme}
          />
        </div>
      );

    case "skills":
      return (
        <div data-block-id={block.id}>
          <SkillsSection
            skills={block.payload.skills as string[]}
            theme={theme}
          />
        </div>
      );

    case "certification":
      return (
        <p
          data-block-id={block.id}
          className={`text-[12px] mb-1.5 ${styles.bodyText}`}
          style={{ breakInside: "avoid" }}
        >
          <span className="font-medium">{block.payload.name as string}</span>
          {" — "}
          {block.payload.issuer as string} ({block.payload.date as string})
        </p>
      );

    case "languages":
      return (
        <p
          data-block-id={block.id}
          className={`text-[12px] ${styles.bodyText}`}
          style={{ breakInside: "avoid" }}
        >
          {(block.payload.languages as { name: string; proficiency: string }[])
            .map((l) => `${l.name} (${l.proficiency})`)
            .join(" · ")}
        </p>
      );

    default:
      return null;
  }
}
