"use client";

import { useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Save,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ResumeFormSections } from "@/components/ResumeForm";
import { ThemeCustomizer, SectionOrderDnd } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview/ResumePreview";
import { TemplateSwitcher } from "@/components/ResumePreview/TemplateSwitcher";
import { ATSScoreMeter } from "@/components/resume/ATSScoreMeter";
import { useResumeStore } from "@/store/resume-store";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useATS } from "@/hooks/useATS";
import { FORM_STEPS } from "@/constants/templates";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { toast } from "sonner";

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    title,
    templateId,
    data,
    theme,
    currentStep,
    isDirty,
    isSaving,
    loadResume,
    setTitle,
    setCurrentStep,
    setIsSaving,
    markClean,
  } = useResumeStore();

  useAutoSave();
  const { result: atsResult } = useATS(data.personal.jobTitle);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/resumes/${id}`);
      const json = await res.json();
      if (json.success) {
        loadResume(json.data.resume);
      } else {
        toast.error("Resume not found");
        router.push("/dashboard");
      }
    }
    load();
  }, [id, loadResume, router]);

  const saveNow = async () => {
    setIsSaving(true);
    const state = useResumeStore.getState();
    const res = await fetch(`/api/resumes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: state.title,
        data: state.data,
        theme: state.theme,
        templateId: state.templateId,
      }),
    });
    setIsSaving(false);
    if (res.ok) {
      markClean();
      toast.success("Saved");
    }
  };

  const downloadPdf = async () => {
    const state = useResumeStore.getState();
    const res = await fetch("/api/pdf/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeId: id,
        data: state.data,
        theme: state.theme,
        templateId: state.templateId,
        filename: `${state.data.personal.fullName || "resume"}.pdf`,
      }),
    });
    if (!res.ok) {
      toast.error("PDF generation failed");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.data.personal.fullName || "resume"}.pdf`;
    a.click();
    toast.success("PDF downloaded");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ title, data, theme, templateId }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.json`;
    a.click();
  };

  const sharePublic = async () => {
    await fetch(`/api/resumes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublic: true }),
    });
    const slug = useResumeStore.getState().slug;
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveNow();
      }
    },
    [id]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const step = FORM_STEPS[currentStep];

  return (
    <div className="flex flex-col h-[calc(100vh)]">
      {/* Toolbar */}
      <header className="no-print h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 rounded-lg px-2 py-1 text-sm text-slate-900 dark:text-slate-100 max-w-[200px] sm:max-w-xs truncate"
          />
          {isDirty && (
            <span className="text-xs text-amber-600">
              {isSaving ? "Saving..." : "Unsaved"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="icon" />
          <Button variant="ghost" size="sm" onClick={exportJson}>
            JSON
          </Button>
          <Button variant="ghost" size="sm" onClick={sharePublic}>
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={saveNow} loading={isSaving}>
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={downloadPdf}>
            <Download className="w-4 h-4" /> PDF
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div className="editor-form-panel no-print w-full lg:w-[45%] xl:w-[40%] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
          {/* Stepper */}
          <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-slate-100 dark:border-slate-800 shrink-0">
            {FORM_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  currentStep === i
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                {step?.label}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentStep >= FORM_STEPS.length - 1}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <ResumeFormSections />

            {currentStep === 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <TemplateSwitcher />
                <ThemeCustomizer />
                <SectionOrderDnd />
              </div>
            )}

            <ATSScoreMeter result={atsResult} />
          </div>
        </div>

        <ResumePreview className="hidden lg:flex flex-1" />
      </div>
    </div>
  );
}
