"use client";

import { useResumeStore } from "@/store/resume-store";
import type { ResumeTheme } from "@/types/resume";

const FONTS: ResumeTheme["fontFamily"][] = [
  "inter",
  "georgia",
  "roboto",
  "playfair",
];
const COLORS = [
  "#4f46e5",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#dc2626",
  "#A68946",
];

const selectClass =
  "w-full text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2";

const labelClass = "text-xs text-slate-600 dark:text-slate-400 mb-2 block";

export function ThemeCustomizer() {
  const theme = useResumeStore((s) => s.theme);
  const setTheme = useResumeStore((s) => s.setTheme);

  return (
    <div className="space-y-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Theme
      </h3>

      <div>
        <label className={labelClass}>Font</label>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTheme({ fontFamily: f })}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize border text-slate-800 dark:text-slate-200 ${
                theme.fontFamily === f
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50"
                  : "border-slate-200 dark:border-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Primary color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setTheme({ primaryColor: c, accentColor: c })}
              className={`w-8 h-8 rounded-full border-2 ${
                theme.primaryColor === c
                  ? "border-slate-900 dark:border-white scale-110"
                  : "border-slate-300 dark:border-slate-600"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Spacing</label>
        <select
          value={theme.sectionSpacing}
          onChange={(e) =>
            setTheme({
              sectionSpacing: e.target.value as ResumeTheme["sectionSpacing"],
            })
          }
          className={selectClass}
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Font size</label>
        <select
          value={theme.fontSize}
          onChange={(e) =>
            setTheme({ fontSize: e.target.value as ResumeTheme["fontSize"] })
          }
          className={selectClass}
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  );
}
