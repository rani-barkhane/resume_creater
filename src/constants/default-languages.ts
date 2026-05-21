import { nanoid } from "nanoid";
import type { Language } from "@/types/resume";

/** First two language rows are defaults and cannot be removed */
export const DEFAULT_LANGUAGE_COUNT = 2;

export function createDefaultLanguages(): Language[] {
  return [
    { id: nanoid(), name: "English", proficiency: "Professional" },
    { id: nanoid(), name: "Hindi", proficiency: "Native" },
  ];
}
