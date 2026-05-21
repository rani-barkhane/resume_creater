"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setUser(j.data.user);
      });
  }, []);

  const importResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const res = await fetch("/api/resumes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: parsed.data || parsed,
          title: parsed.title,
          templateId: parsed.templateId,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Resume imported!");
        router.push(`/dashboard/resumes/${json.data.resume._id}`);
      } else toast.error(json.error);
    } catch {
      toast.error("Invalid JSON file");
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Profile</h2>
        {user && (
          <>
            <Input label="Name" value={user.name} readOnly />
            <Input label="Email" value={user.email} readOnly />
          </>
        )}
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Appearance</h2>
        <div className="flex gap-2">
          <Button
            variant={theme === "light" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
          >
            <Sun className="w-4 h-4" /> Light
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
          >
            <Moon className="w-4 h-4" /> Dark
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold">Import / Export</h2>
        <p className="text-sm text-slate-500">
          Import resume data from a JSON file exported from ResumeForge
        </p>
        <label className="inline-flex cursor-pointer">
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={importResume}
          />
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Upload className="w-4 h-4" /> Import JSON
          </span>
        </label>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-2">Keyboard Shortcuts</h2>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <li>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">
              Ctrl+S
            </kbd>{" "}
            — Save resume
          </li>
        </ul>
      </Card>
    </div>
  );
}
