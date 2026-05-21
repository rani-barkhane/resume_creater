"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import {
  getDefaultThemeForTemplate,
  TEMPLATE_REGISTRY,
} from "@/templates/registry";
import { TemplateThumbnailPreview } from "@/components/TemplateCards/TemplateThumbnailPreview";
import type { TemplateId } from "@/types/resume";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function TemplateSwitcher() {
  const [open, setOpen] = useState(false);
  const templateId = useResumeStore((s) => s.templateId);
  const data = useResumeStore((s) => s.data);
  const setTemplateId = useResumeStore((s) => s.setTemplateId);
  const setTheme = useResumeStore((s) => s.setTheme);

  const switchTemplate = (id: TemplateId) => {
    if (id === templateId) {
      setOpen(false);
      return;
    }
    setTemplateId(id);
    setTheme(getDefaultThemeForTemplate(id));
    setOpen(false);
    toast.success(
      `Switched to ${TEMPLATE_REGISTRY.find((t) => t.id === id)?.name}`
    );
  };

  const current = TEMPLATE_REGISTRY.find((t) => t.id === templateId);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors w-full"
      >
        <LayoutTemplate className="w-4 h-4 text-indigo-600 shrink-0" />
        <span className="truncate flex-1 text-left">
          {current?.name ?? "Template"}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute left-0 right-0 top-full mt-2 z-50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl max-h-[420px] overflow-y-auto"
            >
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
                Switch template — data preserved
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATE_REGISTRY.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => switchTemplate(t.id)}
                    className={cn(
                      "rounded-xl border-2 overflow-hidden text-left transition-all bg-white dark:bg-slate-900",
                      templateId === t.id
                        ? "border-indigo-500 ring-2 ring-indigo-500/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300"
                    )}
                  >
                    <TemplateThumbnailPreview
                      templateId={t.id}
                      resumeData={data}
                      theme={t.defaultTheme}
                      height={112}
                    />
                    <p className="text-[11px] font-medium px-2 py-1.5 truncate text-slate-800 dark:text-slate-200">
                      {t.name}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
