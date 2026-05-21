"use client";

import { nanoid } from "nanoid";
import { useResumeStore } from "@/store/resume-store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { FORM_STEPS } from "@/constants/templates";

export function ResumeFormSections() {
  const currentStep = useResumeStore((s) => s.currentStep);
  const data = useResumeStore((s) => s.data);
  const setData = useResumeStore((s) => s.setData);
  const step = FORM_STEPS[currentStep];

  const aiRewrite = async (text: string, index: number) => {
    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, context: data.personal.jobTitle }),
    });
    const json = await res.json();
    if (json.success) {
      const exp = [...data.experience];
      exp[index] = { ...exp[index], description: json.data.rewritten };
      setData({ experience: exp });
      toast.success("AI enhanced!");
    }
  };

  const aiSummary = async () => {
    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle: data.personal.jobTitle,
        skills: data.skills,
        experience: data.experience.map((e) => e.description).join(" "),
      }),
    });
    const json = await res.json();
    if (json.success) {
      setData({ summary: json.data.summary });
      toast.success("Summary generated!");
    }
  };

  if (!step) return null;

  switch (step.id) {
    case "personal":
      return (
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={data.personal.fullName}
            onChange={(e) =>
              setData({
                personal: { ...data.personal, fullName: e.target.value },
              })
            }
          />
          <Input
            label="Job Title"
            value={data.personal.jobTitle}
            onChange={(e) =>
              setData({
                personal: { ...data.personal, jobTitle: e.target.value },
              })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={data.personal.email}
              onChange={(e) =>
                setData({
                  personal: { ...data.personal, email: e.target.value },
                })
              }
            />
            <Input
              label="Phone"
              value={data.personal.phone}
              onChange={(e) =>
                setData({
                  personal: { ...data.personal, phone: e.target.value },
                })
              }
            />
          </div>
          <Input
            label="Location"
            value={data.personal.location}
            onChange={(e) =>
              setData({
                personal: { ...data.personal, location: e.target.value },
              })
            }
          />
          <Input
            label="Website"
            value={data.personal.website || ""}
            onChange={(e) =>
              setData({
                personal: { ...data.personal, website: e.target.value },
              })
            }
          />
        </div>
      );

    case "summary":
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Professional Summary
            </label>
            <Button variant="outline" size="sm" onClick={aiSummary}>
              <Sparkles className="w-3 h-3" /> AI Generate
            </Button>
          </div>
          <textarea
            value={data.summary}
            onChange={(e) => setData({ summary: e.target.value.slice(0, 600) })}
            rows={6}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
            placeholder="Write a compelling professional summary..."
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {data.summary.length}/600
          </p>
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Experience {i + 1}
                </span>
                <button
                  onClick={() =>
                    setData({
                      experience: data.experience.filter((e) => e.id !== exp.id),
                    })
                  }
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Position"
                value={exp.position}
                onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...exp, position: e.target.value };
                  setData({ experience });
                }}
              />
              <Input
                label="Company"
                value={exp.company}
                onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...exp, company: e.target.value };
                  setData({ experience });
                }}
              />
              <Input
                label="Tech Stack (optional)"
                placeholder="React, Node.js, MongoDB..."
                value={exp.techStack || ""}
                onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = { ...exp, techStack: e.target.value };
                  setData({ experience });
                }}
              />
              <textarea
                value={exp.description}
                onChange={(e) => {
                  const experience = [...data.experience];
                  experience[i] = {
                    ...exp,
                    description: e.target.value.slice(0, 800),
                  };
                  setData({ experience });
                }}
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Describe your achievements..."
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => aiRewrite(exp.description, i)}
              >
                <Wand2 className="w-3 h-3" /> AI Rewrite
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setData({
                experience: [
                  ...data.experience,
                  {
                    id: nanoid(),
                    company: "",
                    position: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                  },
                ],
              })
            }
          >
            <Plus className="w-4 h-4" /> Add Experience
          </Button>
        </div>
      );

    case "education":
      return (
        <div className="space-y-6">
          {data.education.map((edu, i) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...edu, institution: e.target.value };
                  setData({ education });
                }}
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const education = [...data.education];
                  education[i] = { ...edu, degree: e.target.value };
                  setData({ education });
                }}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start"
                  value={edu.startDate}
                  onChange={(e) => {
                    const education = [...data.education];
                    education[i] = { ...edu, startDate: e.target.value };
                    setData({ education });
                  }}
                />
                <Input
                  label="End"
                  value={edu.endDate}
                  onChange={(e) => {
                    const education = [...data.education];
                    education[i] = { ...edu, endDate: e.target.value };
                    setData({ education });
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setData({
                education: [
                  ...data.education,
                  {
                    id: nanoid(),
                    institution: "",
                    degree: "",
                    field: "",
                    startDate: "",
                    endDate: "",
                  },
                ],
              })
            }
          >
            <Plus className="w-4 h-4" /> Add Education
          </Button>
        </div>
      );

    case "skills":
      return (
        <div className="space-y-4">
          <Input
            label="Add skill (press Enter)"
            placeholder="e.g. React, TypeScript"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = (e.target as HTMLInputElement).value.trim();
                if (val && !data.skills.includes(val)) {
                  setData({ skills: [...data.skills, val] });
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-sm"
              >
                {skill}
                <button
                  onClick={() =>
                    setData({ skills: data.skills.filter((s) => s !== skill) })
                  }
                  className="hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const res = await fetch("/api/ai/skills", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  jobTitle: data.personal.jobTitle,
                  existing: data.skills,
                }),
              });
              const json = await res.json();
              if (json.success) {
                const merged = [
                  ...new Set([...data.skills, ...json.data.skills]),
                ];
                setData({ skills: merged });
                toast.success("Skills suggested!");
              }
            }}
          >
            <Sparkles className="w-3 h-3" /> AI Suggest Skills
          </Button>
        </div>
      );

    case "projects":
      return (
        <div className="space-y-6">
          {data.projects.map((proj, i) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <Input
                label="Project Name"
                value={proj.name}
                onChange={(e) => {
                  const projects = [...data.projects];
                  projects[i] = { ...proj, name: e.target.value };
                  setData({ projects });
                }}
              />
              <textarea
                value={proj.description}
                onChange={(e) => {
                  const projects = [...data.projects];
                  projects[i] = { ...proj, description: e.target.value };
                  setData({ projects });
                }}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <Input
                label="Technologies (comma-separated)"
                value={proj.technologies.join(", ")}
                onChange={(e) => {
                  const projects = [...data.projects];
                  projects[i] = {
                    ...proj,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  };
                  setData({ projects });
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setData({
                projects: [
                  ...data.projects,
                  {
                    id: nanoid(),
                    name: "",
                    description: "",
                    technologies: [],
                  },
                ],
              })
            }
          >
            <Plus className="w-4 h-4" /> Add Project
          </Button>
        </div>
      );

    case "certifications":
      return (
        <div className="space-y-6">
          {data.certifications.map((cert, i) => (
            <div key={cert.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Input label="Name" value={cert.name} onChange={(e) => {
                const certifications = [...data.certifications];
                certifications[i] = { ...cert, name: e.target.value };
                setData({ certifications });
              }} />
              <Input label="Issuer" value={cert.issuer} onChange={(e) => {
                const certifications = [...data.certifications];
                certifications[i] = { ...cert, issuer: e.target.value };
                setData({ certifications });
              }} />
              <Input label="Date" value={cert.date} onChange={(e) => {
                const certifications = [...data.certifications];
                certifications[i] = { ...cert, date: e.target.value };
                setData({ certifications });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => setData({ certifications: [...data.certifications, { id: nanoid(), name: "", issuer: "", date: "" }] })}>
            <Plus className="w-4 h-4" /> Add Certification
          </Button>
        </div>
      );

    case "languages":
      return (
        <div className="space-y-4">
          {data.languages.map((lang, i) => (
            <div key={lang.id} className="grid grid-cols-2 gap-3">
              <Input label="Language" value={lang.name} onChange={(e) => {
                const languages = [...data.languages];
                languages[i] = { ...lang, name: e.target.value };
                setData({ languages });
              }} />
              <Input label="Proficiency" value={lang.proficiency} onChange={(e) => {
                const languages = [...data.languages];
                languages[i] = { ...lang, proficiency: e.target.value };
                setData({ languages });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => setData({ languages: [...data.languages, { id: nanoid(), name: "", proficiency: "Fluent" }] })}>
            <Plus className="w-4 h-4" /> Add Language
          </Button>
        </div>
      );

    case "social":
      return (
        <div className="space-y-4">
          {data.social.map((link, i) => (
            <div key={link.id} className="grid grid-cols-2 gap-3">
              <Input label="Platform" value={link.platform} onChange={(e) => {
                const social = [...data.social];
                social[i] = { ...link, platform: e.target.value };
                setData({ social });
              }} />
              <Input label="URL" value={link.url} onChange={(e) => {
                const social = [...data.social];
                social[i] = { ...link, url: e.target.value };
                setData({ social });
              }} />
            </div>
          ))}
          <Button variant="outline" onClick={() => setData({ social: [...data.social, { id: nanoid(), platform: "LinkedIn", url: "" }] })}>
            <Plus className="w-4 h-4" /> Add Link
          </Button>
        </div>
      );

    default:
      return null;
  }
}
