"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SAMPLE_RESUME_DATA } from "@/data/sample-resume";
import { getTemplateDefinition } from "@/templates/registry";
import { TemplateThumbnailPreview } from "./TemplateThumbnailPreview";
import type { TemplateId } from "@/types/resume";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  templateId: TemplateId;
  selected?: boolean;
  onSelect: (id: TemplateId) => void;
  index?: number;
  compact?: boolean;
}

export function TemplateCard({
  templateId,
  selected,
  onSelect,
  index = 0,
  compact = false,
}: TemplateCardProps) {
  const meta = getTemplateDefinition(templateId);
  const theme = meta.defaultTheme;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(templateId)}
      className={cn(
        "group text-left w-full rounded-2xl border-2 overflow-hidden bg-white dark:bg-slate-900 transition-shadow duration-300",
        selected
          ? "border-indigo-500 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-500/30"
          : "border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10"
      )}
    >
      <div className="relative">
        <TemplateThumbnailPreview
          templateId={templateId}
          resumeData={SAMPLE_RESUME_DATA}
          theme={theme}
          height={compact ? 160 : 200}
        />
        {/* Subtle bottom fade only — do not cover entire preview */}
        <div
          className="absolute inset-x-0 bottom-0 h-8 pointer-events-none bg-gradient-to-t from-slate-100/80 to-transparent dark:from-slate-900/80"
        />
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg z-10"
          >
            <Check className="w-4 h-4" />
          </motion.span>
        )}
        {meta.id === "professional" && (
          <span className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        )}
      </div>

      <div className={cn("p-4", compact && "p-3")}>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: meta.accentColor }}
        >
          {meta.category}
        </span>
        <h3 className="font-semibold text-slate-900 dark:text-white mt-0.5 group-hover:text-indigo-600 transition-colors">
          {meta.name}
        </h3>
        {!compact && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {meta.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {meta.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
