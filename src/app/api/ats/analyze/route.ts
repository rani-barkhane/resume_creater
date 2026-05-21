import { analyzeATS } from "@/lib/ats-analyzer";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { ResumeData } from "@/types/resume";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { data, targetRole } = await req.json();
  if (!data) return jsonError("Resume data required");

  const result = analyzeATS(data as ResumeData, targetRole);
  return jsonOk({ result });
}
