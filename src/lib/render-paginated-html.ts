import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import type { ContentBlock } from "@/types/pagination";
import { resumeDataToBlocks } from "@/utils/resume-blocks";
import { escapeHtml } from "@/utils/pdf-html-blocks";
import { pdfIconLink, pdfIconMail, pdfIconPhone } from "@/lib/pdf-icons";
import {
  renderSkillsHtml,
  skillsDisplayStyles,
} from "@/lib/skills-display-html";
import {
  getPdfTemplateStyles,
  pdfBulletListClass,
  pdfFontFamily,
  renderPdfHeader,
  renderPdfSectionHeading,
} from "@/lib/pdf-template-styles";
import type { SkillsDisplayMode } from "@/types/resume";

const GOLD = "#A68946";
const GOLD_DARK = "#8B7340";
const TEXT = "#1e293b";
const TEXT_MUTED = "#64748b";
const TEXT_BODY = "#334155";

function professionalStyles(primary: string) {
  return `
    body.resume-professional {
      font-family: Georgia, 'Times New Roman', serif;
      color: ${TEXT_BODY};
    }
    body.resume-professional h1 {
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: ${primary};
      margin-bottom: 2px;
      line-height: 1.15;
    }
    body.resume-professional .job-title-line {
      font-size: 15px;
      font-style: italic;
      color: ${primary};
      margin-bottom: 12px;
    }
    body.resume-professional .contact-box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px 24px;
      margin-top: 0;
      margin-bottom: 14px;
      padding: 10px 14px;
      border: 1px solid ${primary};
      font-size: 11px;
      color: ${TEXT_MUTED};
    }
    body.resume-professional .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    body.resume-professional h2 {
      font-family: Georgia, serif;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${primary};
      border-bottom: 1.5px solid ${primary};
      padding-bottom: 4px;
      margin: 14px 0 10px;
    }
    body.resume-professional .summary-text {
      font-size: 13px;
      line-height: 1.6;
      text-align: justify;
      color: ${TEXT_BODY};
      margin-bottom: 4px;
    }
    body.resume-professional .summary-text strong {
      color: ${TEXT};
      font-weight: 700;
    }
    body.resume-professional .exp-entry {
      margin-bottom: 14px;
    }
    body.resume-professional .exp-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 4px;
    }
    body.resume-professional .exp-company {
      font-weight: 700;
      font-size: 14px;
      color: ${TEXT};
    }
    body.resume-professional .exp-date {
      font-size: 12px;
      font-style: italic;
      color: ${primary};
      white-space: nowrap;
      flex-shrink: 0;
    }
    body.resume-professional .timeline {
      position: relative;
      padding-left: 20px;
      margin-top: 2px;
    }
    body.resume-professional .timeline-marker {
      position: absolute;
      left: 0;
      top: 6px;
      width: 8px;
      height: 8px;
      background: ${primary};
      border-radius: 50%;
    }
    body.resume-professional .timeline-vline {
      position: absolute;
      left: 3px;
      top: 16px;
      bottom: 0;
      width: 1px;
      background: ${primary}55;
    }
    body.resume-professional .timeline-title {
      font-weight: 600;
      font-size: 13px;
      color: ${TEXT};
      margin: 0;
    }
    body.resume-professional .timeline-subtitle {
      font-size: 12px;
      font-weight: 500;
      color: ${primary};
      margin: 2px 0 0 0;
    }
    body.resume-professional .tech-line {
      font-size: 12px;
      margin-top: 4px;
      color: ${TEXT_BODY};
    }
    body.resume-professional .tech-label {
      font-weight: 600;
      color: ${primary};
    }
    body.resume-professional ul.gold-bullets {
      list-style: none;
      margin: 8px 0 0 0;
      padding: 0;
    }
    body.resume-professional ul.gold-bullets li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 6px;
      font-size: 12.5px;
      line-height: 1.55;
      color: ${TEXT_BODY};
    }
    body.resume-professional ul.gold-bullets li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      width: 5px;
      height: 5px;
      background: ${primary};
      border-radius: 50%;
    }
    body.resume-professional .edu-degree {
      font-weight: 700;
      font-size: 13px;
      color: ${TEXT};
    }
    body.resume-professional .skills-line,
    body.resume-professional .languages-line {
      font-size: 12.5px;
      font-weight: 700;
      color: ${TEXT};
      line-height: 1.55;
    }
    ${skillsDisplayStyles(primary)}
  `;
}

function proContactHtml(
  personal: ResumeData["personal"],
  social: ResumeData["social"],
  primary: string
): string {
  const linkedIn = social.find((s) =>
    s.platform.toLowerCase().includes("linkedin")
  );
  const link = linkedIn?.url || personal.website;
  const items: string[] = [];

  if (personal.email) {
    items.push(
      `<span class="contact-item">${pdfIconMail(primary)}${escapeHtml(personal.email)}</span>`
    );
  }
  if (personal.phone) {
    items.push(
      `<span class="contact-item">${pdfIconPhone(primary)}${escapeHtml(personal.phone)}</span>`
    );
  }
  if (link) {
    items.push(
      `<span class="contact-item">${pdfIconLink(primary)}${escapeHtml(link)}</span>`
    );
  } else if (personal.location) {
    items.push(
      `<span class="contact-item">${escapeHtml(personal.location)}</span>`
    );
  }

  return items.length
    ? `<div class="contact-box">${items.join("")}</div>`
    : "";
}

function proTimelineHtml(
  title: string,
  opts: {
    subtitle?: string;
    techStack?: string;
    bullets?: string[];
  }
): string {
  const bullets = opts.bullets?.length
    ? `<ul class="gold-bullets">${opts.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
    : "";

  return `
    <div class="timeline">
      <span class="timeline-marker"></span>
      <span class="timeline-vline"></span>
      <p class="timeline-title">${escapeHtml(title)}</p>
      ${opts.subtitle ? `<p class="timeline-subtitle">${escapeHtml(opts.subtitle)}</p>` : ""}
      ${opts.techStack ? `<p class="tech-line"><span class="tech-label">Tech Stack: </span>${escapeHtml(opts.techStack)}</p>` : ""}
      ${bullets}
    </div>`;
}

function parseSummaryHtml(text: string): string {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? `<strong>${escapeHtml(part.slice(2, -2))}</strong>`
        : escapeHtml(part)
    )
    .join("");
}

/**
 * PDF HTML: single flowing document — Puppeteer paginates at A4.
 */
export function renderPaginatedResumeHtml({
  templateId,
  data,
  theme,
}: {
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
}): string {
  const blocks = resumeDataToBlocks(data);
  const primary = theme.primaryColor || GOLD;
  const accent = theme.accentColor || primary;
  const isPro = templateId === "professional";
  const font = pdfFontFamily(templateId, theme);

  const fontSize =
    theme.fontSize === "sm" ? "13px" : theme.fontSize === "lg" ? "15px" : "14px";

  const bodyHtml = renderBlocksHtml(blocks, primary, theme, templateId);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page { size: A4; margin: 18mm 16mm; }
    body {
      font-family: ${font};
      font-size: ${fontSize};
      color: ${TEXT_BODY};
      background: white;
    }
    .resume-document {
      width: 100%;
      max-width: 178mm;
      margin: 0 auto;
      padding: 0;
      overflow: visible;
    }
    h1 { font-size: 26px; margin-bottom: 4px; line-height: 1.2; color: ${TEXT}; }
    h2 {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 16px 0 8px;
      color: ${primary};
      border-bottom: 1.5px solid ${primary};
      padding-bottom: 4px;
      break-after: avoid;
      page-break-after: avoid;
    }
    .block {
      margin-bottom: 12px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .section-bundle {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 12px;
    }
    .section-bundle h2 {
      margin-top: 0;
    }
    .block-skills,
    .block-languages {
      break-inside: auto;
      page-break-inside: auto;
    }
    ul { margin: 6px 0 0 18px; padding: 0; }
    li { margin-bottom: 5px; line-height: 1.5; color: ${TEXT_BODY}; }
    .contact {
      font-size: 11px;
      color: ${TEXT_MUTED};
      margin-top: 10px;
      padding: 8px 12px;
      border: 1px solid ${primary};
    }
    .muted { color: ${TEXT_MUTED}; font-size: 12px; }
    .tech { font-size: 11px; margin-top: 4px; }
    ${isPro ? professionalStyles(primary) : getPdfTemplateStyles(templateId, primary, accent)}
  </style>
</head>
<body class="resume-${templateId}">
  <div class="resume-document">
    ${bodyHtml}
  </div>
</body>
</html>`;
}

/** Group section headings with their first item so PDF does not split title from content */
function renderBlocksHtml(
  blocks: ContentBlock[],
  primary: string,
  theme: ResumeTheme,
  templateId: TemplateId
): string {
  let html = "";
  let isFirst = true;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1];

    const bundleWithNext =
      next &&
      (next.type === "skills" ||
        next.type === "languages" ||
        next.type === "certification");

    if (
      block.type === "section-heading" &&
      block.keepWithNext &&
      bundleWithNext
    ) {
      html += `<div class="section-bundle">`;
      html += blockToHtml(block, primary, theme, templateId, isFirst);
      html += blockToHtml(next, primary, theme, templateId, false);
      html += `</div>`;
      isFirst = false;
      i += 1;
      continue;
    }

    html += blockToHtml(block, primary, theme, templateId, isFirst);
    isFirst = false;
  }

  return html;
}

function blockToHtml(
  block: ContentBlock,
  primary: string,
  theme: ResumeTheme,
  templateId: TemplateId,
  isFirstBlock: boolean
): string {
  const isPro = templateId === "professional";
  const isFirstPage = isFirstBlock || block.type === "header";

  switch (block.type) {
    case "header": {
      const personal = block.payload.personal as ResumeData["personal"];
      const social = (block.payload.social as ResumeData["social"]) || [];
      const linkedIn = social.find((s) =>
        s.platform.toLowerCase().includes("linkedin")
      );
      const contactParts = [
        personal.email,
        personal.phone,
        personal.location,
        linkedIn?.url || personal.website,
      ]
        .filter((x): x is string => Boolean(x))
        .map(escapeHtml);

      if (!isFirstPage) {
        return `<div class="block"><strong style="color:${primary}">${escapeHtml(personal.fullName)}</strong><br/><span class="muted">${escapeHtml(personal.jobTitle)}</span></div>`;
      }

      if (isPro) {
        return `
        <div class="block header-block">
          <h1>${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p class="job-title-line">${escapeHtml(personal.jobTitle || "")}</p>
          ${proContactHtml(personal, social, primary)}
        </div>`;
      }

      const templateHeader = renderPdfHeader(
        templateId,
        personal,
        social,
        primary,
        isFirstPage
      );
      if (templateHeader) return templateHeader;

      return `
        <div class="block">
          <h1 style="color:${primary}">${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p class="muted" style="font-style:italic">${escapeHtml(personal.jobTitle || "")}</p>
          ${contactParts.length ? `<p class="contact">${contactParts.join(" · ")}</p>` : ""}
        </div>`;
    }
    case "summary": {
      const text = block.payload.text as string;
      if (isPro) {
        return `<div class="block"><p class="summary-text">${parseSummaryHtml(text)}</p></div>`;
      }
      return `<div class="block"><p>${escapeHtml(text)}</p></div>`;
    }
    case "section-heading":
      return renderPdfSectionHeading(
        templateId,
        String(block.payload.title)
      );
    case "experience": {
      const exp = block.payload as Record<string, unknown>;
      const bullets = (exp.bullets as string[]) || [];
      const date = [exp.startDate, exp.current ? "Present" : exp.endDate]
        .filter(Boolean)
        .join(" – ");
      const bulletClass = pdfBulletListClass(templateId);
      const bulletList = bullets.length
        ? `<ul class="${bulletClass}">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
        : "";

      if (isPro) {
        const company = String(exp.company || "");
        const position = String(exp.position || "");
        return `
        <div class="block exp-entry">
          <div class="exp-row">
            <span class="exp-company">${escapeHtml(company || position)}</span>
            ${date ? `<span class="exp-date">${escapeHtml(date)}</span>` : ""}
          </div>
          ${position && company ? proTimelineHtml(position, { subtitle: exp.location ? String(exp.location) : undefined, techStack: exp.techStack ? String(exp.techStack) : undefined, bullets }) : ""}
          ${!company || !position ? bulletList : ""}
        </div>`;
      }

      return `
        <div class="block exp-item">
          <p style="display:flex;justify-content:space-between;gap:12px"><strong>${escapeHtml(String(exp.position || exp.company))}</strong>${date ? `<span class="muted">${escapeHtml(date)}</span>` : ""}</p>
          ${exp.company && exp.position ? `<p class="muted">${escapeHtml(String(exp.company))}${exp.location ? ` · ${escapeHtml(String(exp.location))}` : ""}</p>` : ""}
          ${exp.techStack ? `<p class="tech"><strong style="color:${primary}">Tech Stack:</strong> ${escapeHtml(String(exp.techStack))}</p>` : ""}
          ${bulletList}
        </div>`;
    }
    case "education": {
      const edu = block.payload as Record<string, unknown>;
      const date =
        edu.startDate || edu.endDate
          ? `(${escapeHtml(String(edu.startDate))} – ${escapeHtml(String(edu.endDate))})`
          : "";

      if (isPro) {
        return `<div class="block exp-entry">
          <div class="exp-row">
            <span class="edu-degree">${escapeHtml(String(edu.degree))}</span>
            ${date ? `<span class="exp-date">${date}</span>` : ""}
          </div>
          <div class="timeline">
            <span class="timeline-marker"></span>
            <span class="timeline-vline"></span>
            <p class="timeline-subtitle" style="margin-top:0">${escapeHtml(String(edu.institution))}</p>
            ${edu.description ? `<p class="tech-line">${escapeHtml(String(edu.description))}</p>` : ""}
          </div>
        </div>`;
      }

      return `<div class="block">
        <p style="display:flex;justify-content:space-between;gap:12px"><strong>${escapeHtml(String(edu.degree))}</strong><span class="muted">${date}</span></p>
        <p class="muted">${escapeHtml(String(edu.institution))}</p>
      </div>`;
    }
    case "project": {
      const proj = block.payload as Record<string, unknown>;
      const bullets = (proj.bullets as string[]) || [];
      const techs = (proj.technologies as string[]) || [];
      const bulletHtml =
        bullets.length > 0
          ? `<ul class="${pdfBulletListClass(templateId)}">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
          : proj.description
            ? `<p>${escapeHtml(String(proj.description))}</p>`
            : "";

      if (isPro) {
        const bulletArr = bullets.length ? bullets : [];
        return `<div class="block exp-entry">
          ${proTimelineHtml(String(proj.name), {
            techStack: techs.length ? techs.join(", ") : undefined,
            bullets: bulletArr.length ? bulletArr : undefined,
          })}
          ${!bulletArr.length && proj.description ? `<p style="margin-left:20px;font-size:12.5px;color:${TEXT_BODY}">${escapeHtml(String(proj.description))}</p>` : ""}
        </div>`;
      }

      return `<div class="block">
        <p><strong>${escapeHtml(String(proj.name))}</strong></p>
        ${techs.length ? `<p class="tech"><strong>Tech Stack:</strong> ${escapeHtml(techs.join(", "))}</p>` : ""}
        ${bulletHtml}
      </div>`;
    }
    case "skills": {
      const skills = (block.payload.skills as string[]) || [];
      const display = block.payload.skillsDisplay as
        | SkillsDisplayMode
        | undefined;
      return `<div class="block block-skills">${renderSkillsHtml(skills, display, primary, pdfBulletListClass(templateId))}</div>`;
    }
    case "certification":
      return `<div class="block"><p><strong style="color:${TEXT}">${escapeHtml(String(block.payload.name))}</strong> <span style="color:${TEXT_BODY}">— ${escapeHtml(String(block.payload.issuer))} (${escapeHtml(String(block.payload.date))})</span></p></div>`;
    case "languages":
      return `<div class="block block-languages"><p class="${isPro ? "languages-line" : ""}">${((block.payload.languages as { name: string; proficiency: string }[]) || []).map((l) => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join(" · ")}</p></div>`;
    default:
      return "";
  }
}
