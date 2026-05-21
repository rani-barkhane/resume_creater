"use client";

import Link from "next/link";
import { TEMPLATES } from "@/constants/templates";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function TemplatesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Template Gallery</h1>
      <p className="text-sm text-slate-500 mb-8">
        Choose a template when creating or editing a resume
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((t) => (
          <Card key={t.id} hover className="overflow-hidden">
            <div
              className={`h-56 bg-gradient-to-br ${t.previewGradient} p-6 flex items-end`}
            >
              <div className="w-full bg-white/95 dark:bg-slate-900/95 rounded-lg p-4 shadow h-36 space-y-2">
                <div className="h-3 w-3/4 bg-slate-300 rounded" />
                <div className="h-2 w-1/2 bg-slate-200 rounded" />
                <div className="space-y-1 mt-3">
                  <div className="h-1.5 bg-slate-100 rounded w-full" />
                  <div className="h-1.5 bg-slate-100 rounded w-5/6" />
                  <div className="h-1.5 bg-slate-100 rounded w-4/6" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs text-indigo-600 font-medium">
                {t.category}
              </span>
              <h3 className="font-semibold mt-1">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{t.description}</p>
              <Link href="/dashboard" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
