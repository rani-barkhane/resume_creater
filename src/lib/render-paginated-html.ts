import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import type { ContentBlock } from "@/types/pagination";
import { resumeDataToBlocks } from "@/utils/resume-blocks";
import { calculatePageBreaks } from "@/utils/calculatePageBreaks";
import { escapeHtml } from "@/utils/pdf-html-blocks";

const fontMap: Record<string, string> = {
  inter: "'Inter', system-ui, sans-serif",
  georgia: "Georgia, serif",
  roboto: "'Roboto', sans-serif",
  playfair: "'Playfair Display', serif",
};

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
  const { pages } = calculatePageBreaks(blocks, []);
  const font = fontMap[theme.fontFamily] || fontMap.inter;
  const primary = theme.primaryColor;

  const fontSize =
    theme.fontSize === "sm" ? "13px" : theme.fontSize === "lg" ? "15px" : "14px";

  const pageHtml = pages
    .map(
      (pageBlocks, i) => `
    <div class="resume-page">
      ${pageBlocks.map((b) => blockToHtml(b, primary, theme, i === 0)).join("")}
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 0; }
    body { font-family: ${font}; font-size: ${fontSize}; color: #1e293b; background: white; }
    .resume-page {
      width: 210mm;
      min-height: 297mm;
      max-height: 297mm;
      padding: 18mm 16mm;
      page-break-after: always;
      break-after: page;
      overflow: hidden;
    }
    .resume-page:last-child { page-break-after: auto; }
    h1 { font-size: 26px; margin-bottom: 4px; }
    h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 14px 0 8px; color: ${primary}; border-bottom: 2px solid ${primary}; padding-bottom: 4px; break-after: avoid; }
    .block { margin-bottom: 10px; break-inside: avoid; page-break-inside: avoid; }
    ul { margin: 6px 0 0 16px; }
    li { margin-bottom: 4px; line-height: 1.45; }
    .contact { font-size: 11px; color: #64748b; margin-top: 8px; padding: 8px; border: 1px solid ${primary}; }
    .muted { color: #64748b; font-size: 12px; }
    .tech { font-size: 11px; color: ${theme.accentColor}; margin-top: 4px; }
  </style>
</head>
<body class="resume-${templateId}">
  ${pageHtml}
</body>
</html>`;
}

function blockToHtml(
  block: ContentBlock,
  primary: string,
  theme: ResumeTheme,
  isFirstPage: boolean
): string {
  switch (block.type) {
    case "header": {
      const personal = block.payload.personal as ResumeData["personal"];
      if (!isFirstPage) {
        return `<div class="block"><strong style="color:${primary}">${escapeHtml(personal.fullName)}</strong><br/><span class="muted">${escapeHtml(personal.jobTitle)}</span></div>`;
      }
      const contact = [personal.email, personal.phone, personal.location]
        .filter(Boolean)
        .map(escapeHtml)
        .join(" · ");
      return `
        <div class="block">
          <h1 style="color:${primary}">${escapeHtml(personal.fullName)}</h1>
          <p class="muted" style="font-style:italic">${escapeHtml(personal.jobTitle)}</p>
          <p class="contact">${contact}</p>
        </div>`;
    }
    case "summary":
      return `<div class="block"><p>${escapeHtml(block.payload.text as string)}</p></div>`;
    case "section-heading":
      return `<h2>${escapeHtml(block.payload.title as string)}</h2>`;
    case "experience": {
      const exp = block.payload as Record<string, unknown>;
      const bullets = (exp.bullets as string[]) || [];
      return `
        <div class="block">
          <p><strong>${escapeHtml(String(exp.position))}</strong> <span class="muted">— ${escapeHtml(String(exp.company))}</span></p>
          ${exp.techStack ? `<p class="tech">Tech Stack: ${escapeHtml(String(exp.techStack))}</p>` : ""}
          <ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>`;
    }
    case "education": {
      const edu = block.payload as Record<string, unknown>;
      return `<div class="block"><p><strong>${escapeHtml(String(edu.degree))}</strong> — ${escapeHtml(String(edu.institution))} <span class="muted">(${escapeHtml(String(edu.startDate))} – ${escapeHtml(String(edu.endDate))})</span></p></div>`;
    }
    case "project": {
      const proj = block.payload as Record<string, unknown>;
      return `<div class="block"><p><strong>${escapeHtml(String(proj.name))}</strong></p><p>${escapeHtml(String(proj.description))}</p></div>`;
    }
    case "skills":
      return `<div class="block"><p>${((block.payload.skills as string[]) || []).map(escapeHtml).join(" · ")}</p></div>`;
    case "certification":
      return `<div class="block"><p><strong>${escapeHtml(String(block.payload.name))}</strong> — ${escapeHtml(String(block.payload.issuer))}</p></div>`;
    case "languages":
      return `<div class="block"><p>${((block.payload.languages as { name: string; proficiency: string }[]) || []).map((l) => `${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})`).join(" · ")}</p></div>`;
    default:
      return "";
  }
}
