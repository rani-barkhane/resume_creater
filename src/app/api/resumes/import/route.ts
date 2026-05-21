import { nanoid } from "nanoid";
import slugify from "slugify";
import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";
import { DEFAULT_THEME } from "@/types/resume";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { data, title, templateId } = await req.json();
  if (!data) return jsonError("Resume JSON data required");

  const resumeTitle = title || data.personal?.fullName || "Imported Resume";
  const slug = `${slugify(resumeTitle, { lower: true, strict: true })}-${nanoid(6)}`;

  await connectDB();
  const resume = await ResumeModel.create({
    userId: auth.userId,
    title: resumeTitle,
    slug,
    templateId: templateId || "minimal",
    data,
    theme: DEFAULT_THEME,
  });

  return jsonOk({ resume: serializeDoc(resume) }, 201);
}
