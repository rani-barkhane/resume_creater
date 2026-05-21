"use client";

import { createContext, useContext } from "react";
import type { TemplateId } from "@/types/resume";

export interface TemplateStyleClasses {
  pageClass: string;
  contentClass: string;
  headingText: string;
  bodyText: string;
  mutedText: string;
  itemClass: string;
  skillChip: string;
  sectionTitleClass: string;
}

const STYLES: Record<TemplateId, TemplateStyleClasses> = {
  minimal: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-700",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-slate-100 text-slate-800",
    sectionTitleClass:
      "text-[11px] font-bold uppercase tracking-widest border-b border-slate-300 pb-1 mb-2 text-slate-900",
  },
  professional: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-700",
    mutedText: "text-slate-500 italic",
    itemClass: "",
    skillChip: "",
    sectionTitleClass: "text-[14px] font-serif font-bold mb-2",
  },
  corporate: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-serif",
    headingText: "text-slate-900",
    bodyText: "text-slate-700",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-blue-50",
    sectionTitleClass: "text-[11px] font-bold uppercase tracking-wide mb-2",
  },
  developer: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-600",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-slate-100",
    sectionTitleClass: "text-[10px] font-bold uppercase tracking-wider mb-2",
  },
  creative: {
    pageClass: "bg-white text-slate-800",
    contentClass: "font-sans",
    headingText: "text-slate-900",
    bodyText: "text-slate-600",
    mutedText: "text-slate-500",
    itemClass: "",
    skillChip: "bg-violet-50 text-violet-800",
    sectionTitleClass: "text-sm font-bold mb-2",
  },
};

const Ctx = createContext<TemplateStyleClasses>(STYLES.minimal);

export function TemplateStyleProvider({
  templateId,
  children,
}: {
  templateId: TemplateId;
  children: React.ReactNode;
}) {
  return (
    <Ctx.Provider value={STYLES[templateId] || STYLES.minimal}>
      {children}
    </Ctx.Provider>
  );
}

export function useTemplateStyles() {
  return useContext(Ctx);
}

export function getTemplateStyles(templateId: TemplateId) {
  return STYLES[templateId] || STYLES.minimal;
}
