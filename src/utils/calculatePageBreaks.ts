import type { ContentBlock, MeasuredBlock, PaginatedResume } from "@/types/pagination";
import { PAGE_CONTENT_HEIGHT_PX } from "@/constants/a4";

/** Fallback heights (px) when measurement not yet available */
const ESTIMATED_HEIGHTS: Record<string, number> = {
  header: 120,
  summary: 80,
  "section-heading": 28,
  experience: 100,
  education: 56,
  project: 72,
  skills: 48,
  certification: 32,
  languages: 36,
  social: 40,
};

export function estimateBlockHeight(block: ContentBlock): number {
  if (block.type === "summary") {
    const text = (block.payload.text as string) || "";
    return Math.min(200, 40 + Math.ceil(text.length / 80) * 18);
  }
  if (block.type === "experience") {
    const bullets = (block.payload.bullets as string[]) || [];
    return 56 + bullets.length * 22;
  }
  return ESTIMATED_HEIGHTS[block.type] ?? 48;
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

  const addToPage = (block: ContentBlock, height: number) => {
    pages[pages.length - 1].push(block);
    currentHeight += height;
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const h = getHeight(block);
    const next = blocks[i + 1];
    const nextH = next ? getHeight(next) : 0;

    if (block.type === "header" && pages[0].length === 0) {
      if (h > pageHeight) {
        addToPage(block, h);
        startNewPage();
      } else {
        addToPage(block, h);
      }
      continue;
    }

    const needsKeepWithNext =
      block.keepWithNext && next && currentHeight + h + nextH > pageHeight;

    if (currentHeight + h > pageHeight && pages[pages.length - 1].length > 0) {
      startNewPage();
    }

    if (needsKeepWithNext && currentHeight + h + nextH > pageHeight) {
      if (pages[pages.length - 1].length > 0) {
        startNewPage();
      }
    }

    if (block.keepTogether && h > pageHeight) {
      if (pages[pages.length - 1].length > 0) startNewPage();
      addToPage(block, h);
      startNewPage();
      continue;
    }

    if (currentHeight + h > pageHeight && pages[pages.length - 1].length > 0) {
      startNewPage();
    }

    addToPage(block, h);
  }

  const filtered = pages.filter((p) => p.length > 0);
  return {
    pages: filtered.length ? filtered : [blocks],
    pageCount: filtered.length || 1,
  };
}
