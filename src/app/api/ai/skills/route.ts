import { getAuthFromRequest } from "@/lib/auth";
import { suggestSkills } from "@/lib/openai";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { jobTitle, existing } = await req.json();
  const skills = await suggestSkills(jobTitle || "Developer", existing || []);
  return jsonOk({ skills });
}
