"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { TemplateCard } from "./TemplateCard";
import { TEMPLATE_REGISTRY } from "@/templates/registry";
import { Button } from "@/components/ui/Button";
import type { TemplateId } from "@/types/resume";
import { toast } from "sonner";

interface TemplateGalleryProps {
  mode?: "picker" | "gallery";
  selectedId?: TemplateId;
  onSelect?: (id: TemplateId) => void;
  showCreateButton?: boolean;
}

export function TemplateGallery({
  mode = "gallery",
  selectedId: controlledId,
  onSelect,
  showCreateButton = true,
}: TemplateGalleryProps) {
  const router = useRouter();
  const [internalId, setInternalId] = useState<TemplateId>(
    controlledId ?? "professional"
  );
  const [loading, setLoading] = useState(false);

  const selectedId = controlledId ?? internalId;

  const handleSelect = (id: TemplateId) => {
    if (onSelect) onSelect(id);
    else setInternalId(id);
  };

  const createWithTemplate = async (useSample = false) => {
    setLoading(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: useSample ? "My Professional Resume" : "Untitled Resume",
          templateId: selectedId,
          useSample,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Resume created!");
        router.push(`/dashboard/resumes/${json.data.resume._id}`);
      } else toast.error(json.error);
    } catch {
      toast.error("Failed to create resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {TEMPLATE_REGISTRY.map((t, i) => (
          <TemplateCard
            key={t.id}
            templateId={t.id}
            selected={selectedId === t.id}
            onSelect={handleSelect}
            index={i}
          />
        ))}
      </div>

      {showCreateButton && mode === "gallery" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            onClick={() => createWithTemplate(true)}
            loading={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Start with Sample Data <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => createWithTemplate(false)}
            disabled={loading}
          >
            Blank Resume
          </Button>
        </motion.div>
      )}
    </div>
  );
}
