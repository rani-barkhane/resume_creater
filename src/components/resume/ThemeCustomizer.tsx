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
  "#0f172a",
];

export function ThemeCustomizer() {
  const theme = useResumeStore((s) => s.theme);
  const setTheme = useResumeStore((s) => s.setTheme);

  return (
    <div className="space-y-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-semibold">Theme</h3>

      <div>
        <label className="text-xs text-slate-500 mb-2 block">Font</label>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f}
              onClick={() => setTheme({ fontFamily: f })}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize border ${
                theme.fontFamily === f
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-500 mb-2 block">Primary color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setTheme({ primaryColor: c, accentColor: c })}
              className={`w-8 h-8 rounded-full border-2 ${
                theme.primaryColor === c
                  ? "border-slate-900 dark:border-white scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-500 mb-2 block">Spacing</label>
        <select
          value={theme.sectionSpacing}
          onChange={(e) =>
            setTheme({
              sectionSpacing: e.target.value as ResumeTheme["sectionSpacing"],
            })
          }
          className="w-full text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Relaxed</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-slate-500 mb-2 block">Font size</label>
        <select
          value={theme.fontSize}
          onChange={(e) =>
            setTheme({ fontSize: e.target.value as ResumeTheme["fontSize"] })
          }
          className="w-full text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
    </div>
  );
}
