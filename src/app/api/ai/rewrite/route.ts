import { getAuthFromRequest } from "@/lib/auth";
import { rewriteExperienceBullet } from "@/lib/openai";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { text, context } = await req.json();
  if (!text?.trim()) return jsonError("Text is required");

  const rewritten = await rewriteExperienceBullet(text, context);
  return jsonOk({ original: text, rewritten });
}
