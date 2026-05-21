import type { SkillsDisplayMode } from "@/types/resume";
import { escapeHtml } from "@/utils/pdf-html-blocks";
import { DEFAULT_SKILLS_DISPLAY } from "@/constants/skills-display";

export function resolveSkillsDisplay(
  display?: SkillsDisplayMode
): SkillsDisplayMode {
  return display ?? DEFAULT_SKILLS_DISPLAY;
}

export function renderSkillsHtml(
  skills: string[],
  display: SkillsDisplayMode | undefined,
  primary: string,
  bulletClass = "theme-bullets"
): string {
  const mode = resolveSkillsDisplay(display);
  if (!skills.length) return "";

  switch (mode) {
    case "bullets":
      return `<ul class="${bulletClass} skills-display-list">${skills
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join("")}</ul>`;

    case "table": {
      const cols = 2;
      const rows = Math.ceil(skills.length / cols);
      let rowsHtml = "";
      for (let r = 0; r < rows; r++) {
        let cells = "";
        for (let c = 0; c < cols; c++) {
          const skill = skills[r * cols + c];
          cells += skill
            ? `<td><span class="skill-cell"><span class="skill-dot" style="background:${primary}"></span>${escapeHtml(skill)}</span></td>`
            : "<td></td>";
        }
        rowsHtml += `<tr>${cells}</tr>`;
      }
      return `<table class="skills-table"><tbody>${rowsHtml}</tbody></table>`;
    }

    case "cards":
      return `<div class="skills-cards">${skills
        .map(
          (s) =>
            `<div class="skill-card" style="border-color:${primary}44"><span class="skill-dot" style="background:${primary}"></span><span>${escapeHtml(s)}</span></div>`
        )
        .join("")}</div>`;

    default:
      return `<p class="skills-line">${skills.map(escapeHtml).join(" · ")}</p>`;
  }
}

export function skillsDisplayStyles(primary: string): string {
  return `
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
      margin-top: 2px;
    }
    .skills-table td {
      width: 50%;
      vertical-align: top;
      padding: 3px 12px 3px 0;
      color: #334155;
    }
    .skill-cell {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.55;
      font-weight: 600;
    }
    .skill-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 7px;
    }
    .skills-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 2px;
    }
    .skill-card {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 6px 10px;
      border: 1px solid ${primary}44;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.45;
    }
    .skills-display-list {
      margin-top: 2px;
    }
  `;
}
