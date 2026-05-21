"use client";

import { TemplateRenderer } from "@/templates/TemplateRenderer";
import { SAMPLE_RESUME_DATA } from "@/data/sample-resume";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";

/** A4 dimensions at ~96dpi for reliable CSS scaling */
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/** Use sample content when the editor is still empty so thumbnails never look blank */
export function getThumbnailResumeData(data: ResumeData): ResumeData {
  const hasContent =
    data.personal?.fullName?.trim() ||
    data.summary?.trim() ||
    data.experience?.length > 0 ||
    data.skills?.length > 0;

  return hasContent ? data : SAMPLE_RESUME_DATA;
}

interface TemplateThumbnailPreviewProps {
  templateId: TemplateId;
  resumeData: ResumeData;
  theme: ResumeTheme;
  /** Visible preview area height in px */
  height?: number;
  className?: string;
}

export function TemplateThumbnailPreview({
  templateId,
  resumeData,
  theme,
  height = 96,
  className = "",
}: TemplateThumbnailPreviewProps) {
  const previewData = getThumbnailResumeData(resumeData);
  const scale = height / A4_HEIGHT_PX;
  const scaledWidth = A4_WIDTH_PX * scale;

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${className}`}
      style={{ height, width: "100%" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <TemplateRenderer
          templateId={templateId}
          resumeData={previewData}
          theme={theme}
          scale={100}
          singlePage
        />
      </div>
    </div>
  );
}
