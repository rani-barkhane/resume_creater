"use client";

import { createContext, useContext } from "react";
import type { TemplateId } from "@/types/resume";

export interface TemplateStyleClasses {
  templateId: TemplateId;
  pageClass: string;
  contentClass: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  itemClass: string;
  skillChip: string;
  sectionTitleClass: string;
  isProfessional: boolean;
}

const STYLES: Record<TemplateId, Omit<TemplateStyleClasses, "templateId" | "isProfessional">> = {
  minimal: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-700",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-slate-100 text-slate-800",
    sectionTitleClass:
      "text-[11px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-3 text-slate-900",
  },
  professional: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-serif",
    headingText: "text-slate-900",
    bodyText: "text-slate-700 font-serif",
    mutedText: "text-slate-500 italic font-serif",
    itemClass: "",
    skillChip: "",
    sectionTitleClass:
      "text-[13px] font-serif font-bold uppercase tracking-[0.1em] mb-2 pb-1.5 w-full border-b",
  },
  corporate: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-serif",
    headingText: "text-slate-900",
    bodyText: "text-slate-700",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-blue-50",
    sectionTitleClass: "text-[11px] font-bold uppercase tracking-wide mb-3",
  },
  developer: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-600",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-slate-100",
    sectionTitleClass: "text-[10px] font-bold uppercase tracking-wider mb-3",
  },
  creative: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-600",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-violet-50 text-violet-800",
    sectionTitleClass: "text-sm font-bold mb-3",
  },
};

const Ctx = createContext<TemplateStyleClasses>({
  templateId: "minimal",
  ...STYLES.minimal,
  isProfessional: false,
});

export function TemplateStyleProvider({
  templateId,
  children,
}: {
  templateId: TemplateId;
  children: React.ReactNode;
}) {
  const base = STYLES[templateId] || STYLES.minimal;
  const value: TemplateStyleClasses = {
    templateId,
    ...base,
    isProfessional: templateId === "professional",
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTemplateStyles() {
  return useContext(Ctx);
}

export function getTemplateStyles(templateId: TemplateId) {
  const base = STYLES[templateId] || STYLES.minimal;
  return {
    templateId,
    ...base,
    isProfessional: templateId === "professional",
  };
}
