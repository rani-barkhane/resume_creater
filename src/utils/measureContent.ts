import type { ContentBlock, MeasuredBlock } from "@/types/pagination";

/**
 * Read block heights from a measurement container DOM node.
 */
export function measureContentBlocks(
  container: HTMLElement
): MeasuredBlock[] {
  const measured: MeasuredBlock[] = [];
  const containerTop = container.getBoundingClientRect().top;

  container.querySelectorAll("[data-block-id]").forEach((el) => {
    const id = el.getAttribute("data-block-id");
    if (!id) return;
    const rect = el.getBoundingClientRect();
    measured.push({
      id,
      height: rect.height + 6,
      top: rect.top - containerTop,
    });
  });

  return measured;
}

export type { ContentBlock, MeasuredBlock };
