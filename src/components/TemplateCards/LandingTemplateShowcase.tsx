"use client";

import { useRouter } from "next/navigation";
import { TEMPLATE_REGISTRY } from "@/templates/registry";
import { TemplateCard } from "./TemplateCard";
import type { TemplateId } from "@/types/resume";

export function LandingTemplateShowcase() {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {TEMPLATE_REGISTRY.map((t, i) => (
        <TemplateCard
          key={t.id}
          templateId={t.id}
          index={i}
          compact
          onSelect={() =>
            router.push(`/signup?template=${t.id}`)
          }
        />
      ))}
    </div>
  );
}
