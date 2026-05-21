"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Copy,
  Trash2,
  MoreVertical,
  FileDown,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResumeThumbnail } from "@/components/resume/ResumeThumbnail";
import type { Resume } from "@/types/resume";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchResumes = async (q?: string) => {
    const url = q ? `/api/resumes?q=${encodeURIComponent(q)}` : "/api/resumes";
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) setResumes(json.data.resumes);
    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchResumes(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const createResume = async (useSample = false) => {
    const res = await fetch("/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: useSample ? "Sample Resume" : "Untitled Resume",
        useSample,
      }),
    });
    const json = await res.json();
    if (json.success) {
      router.push(`/dashboard/resumes/${json.data.resume._id}`);
    } else toast.error(json.error);
  };

  const duplicate = async (id: string) => {
    const res = await fetch(`/api/resumes/${id}/duplicate`, { method: "POST" });
    const json = await res.json();
    if (json.success) {
      toast.success("Resume duplicated");
      fetchResumes(search);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this resume?")) return;
    await fetch(`/api/resumes/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    fetchResumes(search);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Resumes</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, and manage your resume versions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/templates">
            <Button variant="outline">Browse Templates</Button>
          </Link>
          <Button variant="outline" onClick={() => createResume(true)}>
            Sample Data
          </Button>
          <Button onClick={() => createResume(false)}>
            <Plus className="w-4 h-4" /> New Resume
          </Button>
        </div>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search resumes..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-slate-500 mb-4">No resumes yet. Create your first one!</p>
          <Button onClick={() => createResume(true)}>
            <Plus className="w-4 h-4" /> Create with Sample Data
          </Button>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, i) => (
            <motion.div
              key={resume._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hover className="overflow-hidden group">
                <Link href={`/dashboard/resumes/${resume._id}`}>
                  <ResumeThumbnail resume={resume} />
                </Link>
                <div className="p-4">
                  <Link href={`/dashboard/resumes/${resume._id}`}>
                    <h3 className="font-semibold truncate hover:text-indigo-600 transition-colors">
                      {resume.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">
                    {resume.templateId} template
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {resume.analytics?.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileDown className="w-3 h-3" />
                      {resume.analytics?.downloads || 0}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => duplicate(resume._id)}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => remove(resume._id)}
                      className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
