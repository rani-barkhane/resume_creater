"use client";

import { useEffect, useRef } from "react";
import { Plus, Trash2, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface BulletListEditorProps {
  label?: string;
  bullets: string[];
  onChange: (bullets: string[]) => void;
  placeholder?: string;
  maxBullets?: number;
  maxLengthPerBullet?: number;
  className?: string;
}

export function BulletListEditor({
  label = "Bullet points",
  bullets,
  onChange,
  placeholder = "Describe an achievement or responsibility...",
  maxBullets = 12,
  maxLengthPerBullet = 400,
  className,
}: BulletListEditorProps) {
  const lastAddedRef = useRef<HTMLTextAreaElement | null>(null);
  const prevLengthRef = useRef(bullets.length);

  useEffect(() => {
    if (bullets.length > prevLengthRef.current) {
      lastAddedRef.current?.focus();
    }
    prevLengthRef.current = bullets.length;
  }, [bullets.length]);

  const updateBullet = (index: number, value: string) => {
    const next = [...bullets];
    next[index] = value.slice(0, maxLengthPerBullet);
    onChange(next);
  };

  const removeBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  const addBullet = () => {
    if (bullets.length >= maxBullets) return;
    onChange([...bullets, ""]);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <List className="w-3.5 h-3.5 text-indigo-500" />
          {label}
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addBullet}
          disabled={bullets.length >= maxBullets}
        >
          <Plus className="w-3 h-3" /> Add bullet
        </Button>
      </div>

      {bullets.length === 0 ? (
        <button
          type="button"
          onClick={addBullet}
          className="w-full py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          + Add your first bullet point
        </button>
      ) : (
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2 items-start">
              <span
                className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"
                aria-hidden
              />
              <textarea
                ref={
                  index === bullets.length - 1
                    ? lastAddedRef
                    : undefined
                }
                value={bullet}
                onChange={(e) => updateBullet(index, e.target.value)}
                rows={2}
                placeholder={placeholder}
                className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm resize-y placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeBullet(index)}
                className="p-2 mt-1 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                aria-label="Remove bullet"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Each line appears as a bullet on your resume preview and PDF.
      </p>
    </div>
  );
}
