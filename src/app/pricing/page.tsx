"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for getting started",
    features: [
      "3 resumes",
      "All 4 templates",
      "Live preview",
      "ATS checker",
      "PDF export (5/mo)",
      "AI rewrite (10/mo)",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "For serious job seekers",
    features: [
      "Unlimited resumes",
      "All templates + themes",
      "Unlimited PDF exports",
      "Unlimited AI features",
      "Public share links",
      "Resume analytics",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/signup",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    desc: "For career coaches & agencies",
    features: [
      "Everything in Pro",
      "5 team members",
      "Client resume management",
      "White-label sharing",
      "Admin analytics",
      "API access",
    ],
    cta: "Contact Sales",
    href: "/signup",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`p-8 h-full relative ${
                  plan.popular
                    ? "ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/10"
                    : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-medium">
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{plan.desc}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-500">{plan.period}</span>
                  )}
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block mt-8">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
