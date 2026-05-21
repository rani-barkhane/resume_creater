import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { escapeHtml } from "@/utils/pdf-html-blocks";
import { pdfIconLink, pdfIconMail, pdfIconPhone } from "@/lib/pdf-icons";
import { skillsDisplayStyles } from "@/lib/skills-display-html";

const TEXT_BODY = "#334155";
const TEXT_MUTED = "#64748b";

const fontMap: Record<string, string> = {
  inter: "'Inter', system-ui, sans-serif",
  georgia: "Georgia, 'Times New Roman', serif",
  roboto: "'Roboto', sans-serif",
  playfair: "'Playfair Display', Georgia, serif",
};

export function pdfFontFamily(
  templateId: TemplateId,
  theme: ResumeTheme
): string {
  if (templateId === "professional" || templateId === "corporate") {
    return fontMap.georgia;
  }
  return fontMap[theme.fontFamily] || fontMap.inter;
}

/** Shared circular bullets using theme primary (non-professional templates) */
export function themeBulletStyles(primary: string): string {
  return `
    ul.theme-bullets {
      list-style: none;
      margin: 8px 0 0 0;
      padding: 0;
    }
    ul.theme-bullets li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 6px;
      font-size: 12.5px;
      line-height: 1.55;
      color: ${TEXT_BODY};
    }
    ul.theme-bullets li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      width: 5px;
      height: 5px;
      background: ${primary};
      border-radius: 50%;
    }
  `;
}

export function getPdfTemplateStyles(
  templateId: TemplateId,
  primary: string,
  accent: string
): string {
  const bullets = themeBulletStyles(primary);

  switch (templateId) {
    case "corporate":
      return `
        ${bullets}
        body.resume-corporate h1 { color: #fff; font-size: 26px; margin-bottom: 4px; }
        body.resume-corporate h2 {
          color: ${primary};
          border: none;
          border-bottom: none;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.06em;
          margin: 18px 0 10px;
          padding: 0;
        }
        body.resume-corporate .corp-header {
          background: ${primary};
          color: #fff;
          padding: 22px 18px;
          margin: 0 0 18px;
          border-radius: 8px;
        }
        body.resume-corporate .corp-header .corp-title {
          color: rgba(255,255,255,0.85);
          font-size: 16px;
          margin-top: 4px;
        }
        body.resume-corporate .corp-header .corp-contact {
          margin-top: 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.9);
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
        }
        body.resume-corporate .exp-item {
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        body.resume-corporate .exp-item:last-child {
          border-bottom: none;
        }
        ${skillsDisplayStyles(primary)}
      `;

    case "minimal":
      return `
        ${bullets}
        body.resume-minimal h1 {
          color: #0f172a;
          text-transform: uppercase;
          text-align: center;
          font-size: 24px;
        }
        body.resume-minimal h2 {
          color: #0f172a;
          border-bottom: 1px solid #cbd5e1;
          letter-spacing: 0.12em;
          font-size: 11px;
        }
        body.resume-minimal .min-header {
          text-align: center;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        body.resume-minimal .min-header .contact {
          border: none;
          padding: 0;
          margin-top: 8px;
          justify-content: center;
        }
        ${skillsDisplayStyles(primary)}
      `;

    case "developer":
      return `
        ${bullets}
        body.resume-developer {
          background: #0f172a;
          color: #e2e8f0;
        }
        body.resume-developer .resume-document { color: #cbd5e1; }
        body.resume-developer h1 { color: #fff; }
        body.resume-developer h2 {
          color: ${accent};
          border-color: ${accent};
        }
        body.resume-developer p,
        body.resume-developer li { color: #cbd5e1; }
        body.resume-developer .muted { color: #94a3b8; }
        body.resume-developer .dev-header {
          border-left: 4px solid ${accent};
          padding-left: 14px;
          margin-bottom: 16px;
        }
        body.resume-developer .dev-header .title {
          color: ${accent};
        }
        ${skillsDisplayStyles(accent)}
      `;

    case "creative":
      return `
        ${bullets}
        body.resume-creative .creative-header {
          background: linear-gradient(135deg, ${primary}, ${accent});
          color: #fff;
          padding: 22px 18px;
          margin: 0 0 18px;
          border-radius: 8px;
        }
        body.resume-creative .creative-header h1,
        body.resume-creative .creative-header p { color: #fff; }
        body.resume-creative h2 {
          color: ${primary};
          border-color: ${accent};
        }
        ${skillsDisplayStyles(primary)}
      `;

    default:
      return bullets + skillsDisplayStyles(primary);
  }
}

export function renderPdfHeader(
  templateId: TemplateId,
  personal: ResumeData["personal"],
  social: ResumeData["social"],
  primary: string,
  isFirstPage: boolean
): string {
  if (!isFirstPage) {
    return `<div class="block"><strong style="color:${primary}">${escapeHtml(personal.fullName)}</strong><br/><span class="muted">${escapeHtml(personal.jobTitle)}</span></div>`;
  }

  const linkedIn = social.find((s) =>
    s.platform.toLowerCase().includes("linkedin")
  );
  const link = linkedIn?.url || personal.website;

  switch (templateId) {
    case "corporate": {
      const contact = [personal.email, personal.phone, personal.location, link]
        .filter((x): x is string => Boolean(x))
        .map((c) => `<span>${escapeHtml(String(c))}</span>`)
        .join("");
      return `
        <div class="block corp-header">
          <h1>${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p class="corp-title">${escapeHtml(personal.jobTitle || "")}</p>
          ${contact ? `<div class="corp-contact">${contact}</div>` : ""}
        </div>`;
    }

    case "minimal": {
      const contact = [personal.email, personal.phone, personal.location, link]
        .filter((x): x is string => Boolean(x))
        .map(escapeHtml)
        .join(" | ");
      return `
        <div class="block min-header">
          <h1>${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p class="muted" style="margin-top:6px">${escapeHtml(personal.jobTitle || "")}</p>
          ${contact ? `<p class="contact" style="display:block;text-align:center">${contact}</p>` : ""}
        </div>`;
    }

    case "developer": {
      const contact = [personal.email, personal.phone, personal.location, link]
        .filter((x): x is string => Boolean(x))
        .map(escapeHtml)
        .join(" · ");
      return `
        <div class="block dev-header">
          <h1>${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p class="title">${escapeHtml(personal.jobTitle || "")}</p>
          ${contact ? `<p class="contact muted" style="margin-top:8px">${contact}</p>` : ""}
        </div>`;
    }

    case "creative": {
      const contact = [personal.email, personal.phone, link || personal.location]
        .filter((x): x is string => Boolean(x))
        .map(escapeHtml)
        .join(" · ");
      return `
        <div class="block creative-header">
          <h1>${escapeHtml(personal.fullName || "Your Name")}</h1>
          <p style="margin-top:4px;opacity:0.9">${escapeHtml(personal.jobTitle || "")}</p>
          ${contact ? `<p style="margin-top:10px;font-size:11px;opacity:0.85">${contact}</p>` : ""}
        </div>`;
    }

    default:
      return "";
  }
}

export function renderPdfSectionHeading(
  templateId: TemplateId,
  title: string
): string {
  const text =
    templateId === "professional" || templateId === "minimal"
      ? title.toUpperCase()
      : title;
  return `<h2>${escapeHtml(text)}</h2>`;
}

export function pdfBulletListClass(templateId: TemplateId): string {
  return templateId === "professional" ? "gold-bullets" : "theme-bullets";
}
