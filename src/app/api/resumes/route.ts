import { nanoid } from "nanoid";
import slugify from "slugify";
import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";
import { EMPTY_RESUME_DATA, DEFAULT_THEME } from "@/types/resume";
import { SAMPLE_RESUME_DATA } from "@/data/sample-resume";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  await connectDB();
  const filter: Record<string, unknown> = { userId: auth.userId };
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { slug: { $regex: q, $options: "i" } },
    ];
  }

  const resumes = await ResumeModel.find(filter)
    .sort({ updatedAt: -1 })
    .lean();

  return jsonOk({
    resumes: resumes.map((r) => ({
      ...r,
      _id: String(r._id),
      userId: String(r.userId),
    })),
  });
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const body = await req.json().catch(() => ({}));
  const title = body.title || "Untitled Resume";
  const useSample = body.useSample === true;
  const templateId = body.templateId || "minimal";

  const baseSlug = slugify(title, { lower: true, strict: true }) || "resume";
  const slug = `${baseSlug}-${nanoid(6)}`;

  await connectDB();
  const resume = await ResumeModel.create({
    userId: auth.userId,
    title,
    slug,
    templateId,
    data: useSample ? SAMPLE_RESUME_DATA : EMPTY_RESUME_DATA,
    theme: DEFAULT_THEME,
  });

  return jsonOk({ resume: serializeDoc(resume) }, 201);
}
