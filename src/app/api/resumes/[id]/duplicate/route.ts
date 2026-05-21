import { nanoid } from "nanoid";
import slugify from "slugify";
import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { id } = await params;
  await connectDB();
  const original = await ResumeModel.findOne({ _id: id, userId: auth.userId });
  if (!original) return jsonError("Resume not found", 404);

  const title = `${original.title} (Copy)`;
  const slug = `${slugify(title, { lower: true, strict: true })}-${nanoid(6)}`;

  const copy = await ResumeModel.create({
    userId: auth.userId,
    title,
    slug,
    templateId: original.templateId,
    data: original.data,
    theme: original.theme,
    isPublic: false,
  });

  return jsonOk({ resume: serializeDoc(copy) }, 201);
}
