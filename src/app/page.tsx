"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Zap,
  Shield,
  Download,
  BarChart3,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TEMPLATES } from "@/constants/templates";

const features = [
  {
    icon: Zap,
    title: "Live Preview",
    desc: "See changes instantly as you type. Split-screen editor with A4 layout.",
  },
  {
    icon: Sparkles,
    title: "AI Resume Writer",
    desc: "Transform weak bullets into powerful, ATS-optimized achievements.",
  },
  {
    icon: BarChart3,
    title: "ATS Score Meter",
    desc: "Real-time compatibility score with keyword and section analysis.",
  },
  {
    icon: Download,
    title: "PDF Export",
    desc: "High-quality Puppeteer PDFs. Multi-page, print-ready, ATS-friendly.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "JWT auth, encrypted sessions. Optional password-protected sharing.",
  },
  {
    icon: FileText,
    title: "4 Pro Templates",
    desc: "Minimal, Developer, Corporate, and Creative — switch instantly.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    text: "ResumeForge helped me land 3 interviews in 2 weeks. The AI rewriter is incredible.",
    stars: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    text: "Best resume builder I've used. ATS score went from 62% to 89%.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    text: "The live preview and theme customizer feel like Canva for resumes.",
    stars: 5,
  },
];

export default function LandingPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-slate-950 dark:to-violet-950/20" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Resume Builder
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
              Build resumes that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                get you hired
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create ATS-optimized resumes with live preview, AI writing tools,
              drag-and-drop sections, and professional PDF export.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Building Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#templates">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Templates
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              No credit card · Sample data included · Export PDF instantly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to stand out
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Professional SaaS features built for modern job seekers
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 h-full hover">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {f.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Beautiful ATS-friendly templates
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.map((t) => (
              <Card key={t.id} hover className="overflow-hidden">
                <div
                  className={`h-48 bg-gradient-to-br ${t.previewGradient} flex items-end p-4`}
                >
                  <div className="w-full h-32 bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-sm p-3 space-y-1">
                    <div className="h-2 w-2/3 bg-slate-300 rounded" />
                    <div className="h-1.5 w-1/2 bg-slate-200 rounded" />
                    <div className="h-1 w-full bg-slate-100 rounded mt-2" />
                    <div className="h-1 w-4/5 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{t.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Loved by job seekers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-12 text-white">
            <h2 className="text-3xl font-bold">Ready to land your dream job?</h2>
            <p className="mt-4 text-indigo-100">
              Join thousands building professional resumes with ResumeForge
            </p>
            <Link href="/signup" className="inline-block mt-8">
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ResumeForge. Built with Next.js & MongoDB.
      </footer>
    </main>
  );
}
