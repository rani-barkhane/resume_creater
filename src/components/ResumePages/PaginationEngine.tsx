"use client";

import { useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import type { ContentBlock, MeasuredBlock } from "@/types/pagination";
import { PAGE_CONTENT_WIDTH_PX } from "@/constants/a4";
import { resumeDataToBlocks } from "@/utils/resume-blocks";
import { calculatePageBreaks } from "@/utils/calculatePageBreaks";
import { TemplateStyleProvider } from "./TemplateStyleContext";
import { BlockRenderer } from "./BlockRenderer";
import { ResumePage } from "./ResumePage";
import { PageContainer } from "./PageContainer";

interface PaginationEngineProps {
  templateId: TemplateId;
  resumeData: ResumeData;
  theme: ResumeTheme;
  onPageCountChange?: (count: number) => void;
  showPageNumbers?: boolean;
}

export function PaginationEngine({
  templateId,
  resumeData,
  theme,
  onPageCountChange,
  showPageNumbers = true,
}: PaginationEngineProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<ContentBlock[][]>([[]]);
  const [ready, setReady] = useState(false);

  const blocks = useMemo(() => resumeDataToBlocks(resumeData), [resumeData]);

  const measureBlocks = useCallback(() => {
    const container = measureRef.current;
    if (!container) return;

    const elements = container.querySelectorAll("[data-block-id]");
    const measured: MeasuredBlock[] = [];
    const containerTop = container.getBoundingClientRect().top;

    elements.forEach((el) => {
      const id = el.getAttribute("data-block-id");
      if (!id) return;
      const rect = el.getBoundingClientRect();
      measured.push({
        id,
        height: rect.height + 4,
        top: rect.top - containerTop,
      });
    });

    const result = calculatePageBreaks(blocks, measured);
    setPages(result.pages);
    onPageCountChange?.(result.pageCount);
    setReady(true);
  }, [blocks, onPageCountChange]);

  useLayoutEffect(() => {
    setReady(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(measureBlocks);
    });
    return () => cancelAnimationFrame(t);
  }, [measureBlocks, templateId, theme.fontSize, theme.sectionSpacing]);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => measureBlocks());
    if (measureRef.current) ro.observe(measureRef.current);
    return () => ro.disconnect();
  }, [measureBlocks]);

  const totalPages = pages.length;

  return (
    <TemplateStyleProvider templateId={templateId}>
      {/* Hidden measurement layer */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0 opacity-0 overflow-visible"
        style={{ width: PAGE_CONTENT_WIDTH_PX }}
      >
        <div ref={measureRef} className="w-full">
          {blocks.map((block) => (
            <BlockRenderer
              key={`m-${block.id}`}
              block={block}
              theme={theme}
              templateId={templateId}
              isFirstPage
            />
          ))}
        </div>
      </div>

      <PageContainer>
        {pages.map((pageBlocks, pageIndex) => (
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: ready ? 1 : 0.6, y: 0 }}
            transition={{ duration: 0.25, delay: pageIndex * 0.05 }}
          >
            <ResumePage
              pageNumber={pageIndex + 1}
              totalPages={totalPages}
              showPageNumber={showPageNumbers}
            >
              {pageIndex > 0 &&
                !pageBlocks.some((b) => b.type === "header") && (
                  <BlockRenderer
                    block={{
                      id: "continued-header",
                      type: "header",
                      payload: {
                        personal: resumeData.personal,
                        social: resumeData.social,
                      },
                    }}
                    theme={theme}
                    templateId={templateId}
                    isFirstPage={false}
                  />
                )}
              {pageBlocks.map((block) => (
                <BlockRenderer
                  key={`${pageIndex}-${block.id}`}
                  block={block}
                  theme={theme}
                  templateId={templateId}
                  isFirstPage={pageIndex === 0}
                />
              ))}
            </ResumePage>
          </motion.div>
        ))}
      </PageContainer>
    </TemplateStyleProvider>
  );
}
