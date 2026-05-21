import { getAuthFromRequest } from "@/lib/auth";
import { generateSummary } from "@/lib/openai";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { jobTitle, skills, experience } = await req.json();
  const summary = await generateSummary(
    jobTitle || "Professional",
    skills || [],
    experience || ""
  );
  return jsonOk({ summary });
}
