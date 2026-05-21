import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ResumeData,
  ResumeTheme,
  TemplateId,
  SectionKey,
} from "@/types/resume";
import {
  EMPTY_RESUME_DATA,
  DEFAULT_THEME,
  DEFAULT_SECTION_ORDER,
} from "@/types/resume";

interface ResumeEditorState {
  resumeId: string | null;
  title: string;
  slug: string;
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
  isDirty: boolean;
  isSaving: boolean;
  previewZoom: number;
  currentStep: number;
  setResumeId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setTemplateId: (id: TemplateId) => void;
  setData: (data: Partial<ResumeData>) => void;
  setTheme: (theme: Partial<ResumeTheme>) => void;
  setSectionOrder: (order: SectionKey[]) => void;
  setPreviewZoom: (zoom: number) => void;
  setCurrentStep: (step: number) => void;
  setIsSaving: (saving: boolean) => void;
  markDirty: () => void;
  markClean: () => void;
  loadResume: (payload: {
    _id: string;
    title: string;
    slug: string;
    templateId: TemplateId;
    data: ResumeData;
    theme: ResumeTheme;
  }) => void;
  reset: () => void;
}

const initialState = {
  resumeId: null,
  title: "Untitled Resume",
  slug: "",
  templateId: "minimal" as TemplateId,
  data: { ...EMPTY_RESUME_DATA, sectionOrder: [...DEFAULT_SECTION_ORDER] },
  theme: { ...DEFAULT_THEME },
  isDirty: false,
  isSaving: false,
  previewZoom: 100,
  currentStep: 0,
};

export const useResumeStore = create<ResumeEditorState>()(
  persist(
    (set) => ({
      ...initialState,
      setResumeId: (id) => set({ resumeId: id }),
      setTitle: (title) => set({ title, isDirty: true }),
      setSlug: (slug) => set({ slug, isDirty: true }),
      setTemplateId: (templateId) => set({ templateId, isDirty: true }),
      setData: (partial) =>
        set((s) => ({
          data: { ...s.data, ...partial },
          isDirty: true,
        })),
      setTheme: (partial) =>
        set((s) => ({
          theme: { ...s.theme, ...partial },
          isDirty: true,
        })),
      setSectionOrder: (sectionOrder) =>
        set((s) => ({
          data: { ...s.data, sectionOrder },
          isDirty: true,
        })),
      setPreviewZoom: (previewZoom) => set({ previewZoom }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setIsSaving: (isSaving) => set({ isSaving }),
      markDirty: () => set({ isDirty: true }),
      markClean: () => set({ isDirty: false }),
      loadResume: (payload) =>
        set({
          resumeId: payload._id,
          title: payload.title,
          slug: payload.slug,
          templateId: payload.templateId,
          data: payload.data,
          theme: payload.theme,
          isDirty: false,
          currentStep: 0,
        }),
      reset: () => set({ ...initialState, data: { ...EMPTY_RESUME_DATA, sectionOrder: [...DEFAULT_SECTION_ORDER] }, theme: { ...DEFAULT_THEME } }),
    }),
    {
      name: "resumeforge-editor",
      partialize: (s) => ({
        resumeId: s.resumeId,
        title: s.title,
        data: s.data,
        theme: s.theme,
        templateId: s.templateId,
      }),
    }
  )
);
