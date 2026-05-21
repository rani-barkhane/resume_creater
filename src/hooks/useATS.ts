"use client";

import { useEffect, useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import type { ATSResult } from "@/types/resume";

export function useATS(targetRole?: string) {
  const data = useResumeStore((s) => s.data);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ats/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data, targetRole }),
        });
        const json = await res.json();
        if (json.success) setResult(json.data.result);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [data, targetRole]);

  return { result, loading };
}
