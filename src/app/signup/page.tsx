"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error(json.error || "Signup failed");
        return;
      }
      toast.success("Account created!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </span>
            ResumeForge
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-slate-500 mt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm"
        >
          <Input
            label="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>
      </motion.div>
    </main>
  );
}
