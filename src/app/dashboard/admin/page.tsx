"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Users, FileText, Eye, Download } from "lucide-react";

interface Analytics {
  users: number;
  resumes: number;
  totalViews: number;
  totalDownloads: number;
  templateUsage: Record<string, number>;
}

export default function AdminPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data);
        else setError(j.error || "Access denied");
      });
  }, []);

  if (error) {
    return (
      <div className="p-10 text-center text-slate-500">
        {error}. Set ADMIN_EMAILS in .env to grant admin access.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  const stats = [
    { label: "Users", value: data.users, icon: Users },
    { label: "Resumes", value: data.resumes, icon: FileText },
    { label: "Total Views", value: data.totalViews, icon: Eye },
    { label: "Downloads", value: data.totalDownloads, icon: Download },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Admin Analytics</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-semibold mb-4">Template Usage</h2>
        <div className="space-y-3">
          {Object.entries(data.templateUsage).map(([id, count]) => (
            <div key={id} className="flex items-center gap-4">
              <span className="text-sm capitalize w-24">{id}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{
                    width: `${(count / data.resumes) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-slate-500">{count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
