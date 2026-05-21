"use client";

import { useMemo } from "react";
import type { ResumeData } from "@/types/resume";
import { resumeDataToBlocks } from "@/utils/resume-blocks";
import { calculatePageBreaks } from "@/utils/calculatePageBreaks";

/**
 * Estimate page count without DOM measurement (SSR / quick hint).
 */
export function useEstimatedPageCount(data: ResumeData): number {
  return useMemo(() => {
    const blocks = resumeDataToBlocks(data);
    const { pageCount } = calculatePageBreaks(blocks, []);
    return pageCount;
  }, [data]);
}
