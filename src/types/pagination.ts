import type { SectionKey } from "./resume";

export type ContentBlockType =
  | "header"
  | "summary"
  | "section-heading"
  | "experience"
  | "education"
  | "project"
  | "skills"
  | "certification"
  | "languages"
  | "social";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  /** Section key for headings and grouping */
  section?: SectionKey;
  /** Keep with next block (section title + first item) */
  keepWithNext?: boolean;
  /** Avoid splitting inside this block */
  keepTogether?: boolean;
  /** Payload varies by type — see BlockPayload in resume-blocks */
  payload: Record<string, unknown>;
}

export interface MeasuredBlock {
  id: string;
  height: number;
  top: number;
}

export interface PaginatedResume {
  pages: ContentBlock[][];
  pageCount: number;
}
