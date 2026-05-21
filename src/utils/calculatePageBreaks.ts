import type { ContentBlock, MeasuredBlock, PaginatedResume } from "@/types/pagination";
import type { SkillsDisplayMode } from "@/types/resume";
import { DEFAULT_SKILLS_DISPLAY } from "@/constants/skills-display";
import { PAGE_CONTENT_HEIGHT_PX } from "@/constants/a4";

/** Small buffer when using real DOM measurements */
const MEASURED_BUFFER_PX = 8;
/** Slightly larger buffer when height is estimated */
const ESTIMATE_BUFFER_PX = 14;

/** Fallback heights (px) when measurement not yet available */
const ESTIMATED_HEIGHTS: Record<string, number> = {
  header: 130,
  summary: 90,
  "section-heading": 32,
  experience: 100,
  education: 60,
  project: 80,
  skills: 56,
  certification: 36,
  languages: 40,
  social: 40,
};

export function estimateBlockHeight(block: ContentBlock): number {
  if (block.type === "summary") {
    const text = (block.payload.text as string) || "";
    return Math.min(220, 44 + Math.ceil(text.length / 75) * 20);
  }
  if (block.type === "experience" || block.type === "project") {
    const bullets = (block.payload.bullets as string[]) || [];
    const base = block.type === "experience" ? 76 : 52;
    const bulletH = bullets.reduce(
      (sum, b) => sum + 22 + Math.ceil((b?.length || 0) / 65) * 18,
      0
    );
    return base + bulletH;
  }
  if (block.type === "skills") {
    const skills = (block.payload.skills as string[]) || [];
    const display =
      (block.payload.skillsDisplay as SkillsDisplayMode) ??
      DEFAULT_SKILLS_DISPLAY;
    const n = skills.length;
    if (display === "table") {
      return Math.max(48, 24 + Math.ceil(n / 2) * 28);
    }
    if (display === "cards") {
      return Math.max(56, 24 + Math.ceil(n / 2) * 34);
    }
    if (display === "bullets") {
      return Math.max(48, 20 + n * 22);
    }
    const line = skills.join(" · ");
    return Math.max(48, 28 + Math.ceil(line.length / 70) * 22);
  }
  if (block.type === "languages") {
    const langs = (block.payload.languages as { name: string }[]) || [];
    const line = langs.map((l) => l.name).join(" · ");
    return Math.max(36, 24 + Math.ceil(line.length / 80) * 20);
  }
  return ESTIMATED_HEIGHTS[block.type] ?? 48;
}

function getBuffer(
  block: ContentBlock,
  heightMap: Map<string, number>
): number {
  return heightMap.has(block.id) ? MEASURED_BUFFER_PX : ESTIMATE_BUFFER_PX;
}

function fitsOnPage(
  currentHeight: number,
  blockHeight: number,
  pageHeight: number,
  buffer: number
): boolean {
  return currentHeight + blockHeight <= pageHeight - buffer;
}

/**
 * Assign blocks to pages using measured heights.
 * Respects keepWithNext (section title + first item) and page capacity.
 */
export function calculatePageBreaks(
  blocks: ContentBlock[],
  measured: MeasuredBlock[],
  pageHeight: number = PAGE_CONTENT_HEIGHT_PX
): PaginatedResume {
  if (!blocks.length) {
    return { pages: [[]], pageCount: 1 };
  }

  const heightMap = new Map<string, number>();
  measured.forEach((m) => heightMap.set(m.id, m.height));

  const getHeight = (b: ContentBlock) =>
    heightMap.get(b.id) ?? estimateBlockHeight(b);

  const pages: ContentBlock[][] = [[]];
  let currentHeight = 0;

  const startNewPage = () => {
    pages.push([]);
    currentHeight = 0;
  };

  const pageHasContent = () => pages[pages.length - 1].length > 0;

  const addBlock = (block: ContentBlock, height: number) => {
    pages[pages.length - 1].push(block);
    currentHeight += height;
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const h = getHeight(block);
    const buf = getBuffer(block, heightMap);
    const next = blocks[i + 1];
    const nextH = next ? getHeight(next) : 0;
    const nextBuf = next ? getBuffer(next, heightMap) : 0;

    if (block.type === "header" && pages[0].length === 0) {
      if (!fitsOnPage(0, h, pageHeight, buf)) {
        addBlock(block, h);
        startNewPage();
      } else {
        addBlock(block, h);
      }
      continue;
    }

    // Keep section heading with the block that follows it
    if (block.type === "section-heading" && block.keepWithNext && next) {
      const bundleH = h + nextH;
      const bundleBuf = Math.max(buf, nextBuf);
      if (
        pageHasContent() &&
        !fitsOnPage(currentHeight, bundleH, pageHeight, bundleBuf)
      ) {
        startNewPage();
      }
      addBlock(block, h);
      continue;
    }

    if (block.keepTogether && h > pageHeight - buf) {
      if (pageHasContent()) startNewPage();
      addBlock(block, h);
      startNewPage();
      continue;
    }

    if (pageHasContent() && !fitsOnPage(currentHeight, h, pageHeight, buf)) {
      startNewPage();
    }

    addBlock(block, h);
  }

  const filtered = pages.filter((p) => p.length > 0);
  return {
    pages: filtered.length ? filtered : [blocks],
    pageCount: filtered.length || 1,
  };
}
