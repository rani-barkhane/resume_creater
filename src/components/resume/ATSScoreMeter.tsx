"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import type { ATSResult } from "@/types/resume";

export function ATSScoreMeter({ result }: { result: ATSResult | null }) {
  if (!result) {
    return (
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm text-slate-500">
        Fill in your resume to see ATS score
      </div>
    );
  }

  const color =
    result.score >= 80
      ? "text-emerald-600"
      : result.score >= 60
        ? "text-amber-600"
        : "text-red-600";

  const barColor =
    result.score >= 80
      ? "bg-emerald-500"
      : result.score >= 60
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span className="font-semibold text-sm">ATS Score</span>
        </div>
        <motion.span
          key={result.score}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`text-2xl font-bold ${color}`}
        >
          {result.score}%
        </motion.span>
      </div>

      <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Complete", value: result.completeness },
          { label: "Keywords", value: result.keywordScore },
          { label: "Readable", value: result.readability },
        ].map((m) => (
          <div
            key={m.label}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs"
          >
            <p className="font-semibold">{m.value}%</p>
            <p className="text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>

      {result.missingSections.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Missing
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {result.missingSections.join(", ")}
          </p>
        </div>
      )}

      {result.missingKeywords.length > 0 && (
        <div>
          <p className="text-xs font-medium text-amber-600 mb-1">
            Suggested keywords
          </p>
          <div className="flex flex-wrap gap-1">
            {result.missingKeywords.slice(0, 5).map((kw) => (
              <span
                key={kw}
                className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      <ul className="space-y-1">
        {result.suggestions.slice(0, 3).map((s, i) => (
          <li
            key={i}
            className="text-xs text-slate-600 dark:text-slate-400 flex gap-1.5"
          >
            <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
