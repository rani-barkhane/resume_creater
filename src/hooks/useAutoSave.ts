"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/resume-store";
import { toast } from "sonner";

export function useAutoSave(intervalMs = 8000) {
  const { resumeId, title, templateId, data, theme, isDirty, setIsSaving, markClean } =
    useResumeStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!resumeId || !isDirty) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(async () => {
      const state = useResumeStore.getState();
      if (!state.isDirty || !state.resumeId) return;

      setIsSaving(true);
      try {
        const res = await fetch(`/api/resumes/${state.resumeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: state.title,
            data: state.data,
            theme: state.theme,
            templateId: state.templateId,
          }),
        });
        if (res.ok) {
          markClean();
        }
      } catch {
        toast.error("Auto-save failed");
      } finally {
        setIsSaving(false);
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resumeId, isDirty, intervalMs, setIsSaving, markClean]);
}
