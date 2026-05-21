"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TemplateRenderer } from "@/templates/TemplateRenderer";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Resume } from "@/types/resume";
import { FileText } from "lucide-react";

export default function PublicResumePage() {
  const { slug } = useParams();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);

  const load = async (pwd?: string) => {
    const res = await fetch(`/api/resumes/public/${slug}`, {
      headers: pwd ? { "x-share-password": pwd } : {},
    });
    const json = await res.json();
    if (json.success) {
      setResume(json.data.resume);
      setNeedsPassword(false);
    } else if (res.status === 403) {
      setNeedsPassword(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <Skeleton className="w-[210mm] h-[297mm] max-w-full" />
      </main>
    );
  }

  if (needsPassword) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(password);
          }}
          className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full space-y-4"
        >
          <FileText className="w-8 h-8 text-indigo-600 mx-auto" />
          <h1 className="text-center font-semibold">Password Protected</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium"
          >
            View Resume
          </button>
        </form>
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Resume not found or not public</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 flex justify-center px-4">
      <div className="shadow-2xl">
        <TemplateRenderer
          templateId={resume.templateId}
          resumeData={resume.data}
          theme={resume.theme}
        />
      </div>
    </main>
  );
}
