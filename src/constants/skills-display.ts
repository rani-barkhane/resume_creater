import type { SkillsDisplayMode } from "@/types/resume";

export const SKILLS_DISPLAY_OPTIONS: {
  value: SkillsDisplayMode;
  label: string;
  description: string;
}[] = [
  {
    value: "inline",
    label: "Inline",
    description: "Skills in one line separated by dots",
  },
  {
    value: "bullets",
    label: "Bullet list",
    description: "Vertical list with gold square bullets",
  },
  {
    value: "table",
    label: "Table",
    description: "Two-column table with bullets",
  },
  {
    value: "cards",
    label: "Cards",
    description: "Grid of bordered skill cards",
  },
];

export const DEFAULT_SKILLS_DISPLAY: SkillsDisplayMode = "bullets";
