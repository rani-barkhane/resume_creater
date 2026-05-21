import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";

interface RenderOptions {
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
}

const fontMap: Record<string, string> = {
  inter: "'Inter', system-ui, sans-serif",
  georgia: "Georgia, serif",
  roboto: "'Roboto', sans-serif",
  playfair: "'Playfair Display', serif",
};

export function renderResumeHtml({ templateId, data, theme }: RenderOptions): string {
  const font = fontMap[theme.fontFamily] || fontMap.inter;
  const primary = theme.primaryColor;
  const accent = theme.accentColor;
  const spacing =
    theme.sectionSpacing === "compact"
      ? "12px"
      : theme.sectionSpacing === "relaxed"
        ? "28px"
        : "20px";
  const fontSize =
    theme.fontSize === "sm" ? "13px" : theme.fontSize === "lg" ? "15px" : "14px";

  const sections = buildSectionsHtml(data, primary, accent, spacing);
  const header = buildHeaderHtml(data, templateId, primary, accent);

  const templateStyles = getTemplateStyles(templateId, primary, accent);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 0; }
    body { font-family: ${font}; font-size: ${fontSize}; color: #1e293b; background: white; }
    .page { width: 210mm; min-height: 297mm; padding: 20mm 18mm; }
    ${templateStyles}
  </style>
</head>
<body>
  <div class="page resume-${templateId}">
    ${header}
    ${sections}
  </div>
</body>
</html>`;
}

function buildHeaderHtml(
  data: ResumeData,
  templateId: TemplateId,
  primary: string,
  accent: string
): string {
  const p = data.personal;
  const contact = [p.email, p.phone, p.location, p.website]
    .filter(Boolean)
    .join(" · ");

  if (templateId === "developer") {
    return `
      <div class="header-dev">
        <h1>${escape(p.fullName)}</h1>
        <p class="title" style="color:${accent}">${escape(p.jobTitle)}</p>
        <p class="contact">${escape(contact)}</p>
      </div>`;
  }

  return `
    <div class="header">
      <h1 style="color:${primary}">${escape(p.fullName)}</h1>
      <p class="title">${escape(p.jobTitle)}</p>
      <p class="contact">${escape(contact)}</p>
    </div>`;
}

function buildSectionsHtml(
  data: ResumeData,
  primary: string,
  accent: string,
  spacing: string
): string {
  const order = data.sectionOrder || [];
  const parts: string[] = [];

  const renderers: Record<string, () => string> = {
    summary: () =>
      data.summary
        ? section("Summary", `<p>${escape(data.summary)}</p>`, primary, spacing)
        : "",
    experience: () =>
      data.experience.length
        ? section(
            "Experience",
            data.experience
              .map(
                (e) => `
              <div class="item" style="margin-bottom:${spacing}">
                <div class="item-head">
                  <strong>${escape(e.position)}</strong> — ${escape(e.company)}
                  <span class="date">${escape(e.startDate)} – ${e.current ? "Present" : escape(e.endDate)}</span>
                </div>
                <p>${escape(e.description)}</p>
              </div>`
              )
              .join(""),
            primary,
            spacing
          )
        : "",
    education: () =>
      data.education.length
        ? section(
            "Education",
            data.education
              .map(
                (e) => `
              <div class="item">
                <strong>${escape(e.degree)}</strong> — ${escape(e.institution)}
                <span class="date">${escape(e.startDate)} – ${escape(e.endDate)}</span>
              </div>`
              )
              .join(""),
            primary,
            spacing
          )
        : "",
    skills: () =>
      data.skills.length
        ? section(
            "Skills",
            `<p>${data.skills.map(escape).join(" · ")}</p>`,
            primary,
            spacing
          )
        : "",
    projects: () =>
      data.projects.length
        ? section(
            "Projects",
            data.projects
              .map(
                (p) => `
              <div class="item">
                <strong>${escape(p.name)}</strong>
                <p>${escape(p.description)}</p>
                <p class="tech" style="color:${accent}">${p.technologies.map(escape).join(", ")}</p>
              </div>`
              )
              .join(""),
            primary,
            spacing
          )
        : "",
    certifications: () =>
      data.certifications.length
        ? section(
            "Certifications",
            data.certifications
              .map(
                (c) =>
                  `<p><strong>${escape(c.name)}</strong> — ${escape(c.issuer)} (${escape(c.date)})</p>`
              )
              .join(""),
            primary,
            spacing
          )
        : "",
    languages: () =>
      data.languages.length
        ? section(
            "Languages",
            `<p>${data.languages.map((l) => `${escape(l.name)} (${escape(l.proficiency)})`).join(" · ")}</p>`,
            primary,
            spacing
          )
        : "",
  };

  for (const key of order) {
    if (renderers[key]) parts.push(renderers[key]());
  }

  return parts.join("");
}

function section(
  title: string,
  content: string,
  color: string,
  spacing: string
): string {
  return `
    <div class="section" style="margin-bottom:${spacing}">
      <h2 style="color:${color};border-color:${color}">${title}</h2>
      ${content}
    </div>`;
}

function escape(s: string): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTemplateStyles(
  templateId: TemplateId,
  primary: string,
  accent: string
): string {
  const base = `
    h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
    .title { font-size: 15px; color: #64748b; margin-bottom: 6px; }
    .contact { font-size: 12px; color: #64748b; }
    h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
         border-bottom: 2px solid; padding-bottom: 4px; margin-bottom: 10px; }
    .item-head { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .date { color: #94a3b8; font-size: 12px; }
    p { line-height: 1.55; color: #334155; }
  `;

  if (templateId === "developer") {
    return (
      base +
      `
      .resume-developer { background: #0f172a; color: #e2e8f0; }
      .resume-developer .header-dev h1 { color: white; }
      .resume-developer h2 { color: ${accent}; border-color: ${accent}; }
      .resume-developer p { color: #cbd5e1; }
    `
    );
  }
  if (templateId === "corporate") {
    return (
      base +
      `
      .resume-corporate .header { border-left: 4px solid ${primary}; padding-left: 16px; }
    `
    );
  }
  if (templateId === "creative") {
    return (
      base +
      `
      .resume-creative .header { background: linear-gradient(135deg, ${primary}, ${accent});
        color: white; padding: 20px; margin: -20mm -18mm 20px; padding-left: 18mm; padding-right: 18mm; }
      .resume-creative .header h1, .resume-creative .header .title, .resume-creative .header .contact { color: white; }
    `
    );
  }
  return base;
}
