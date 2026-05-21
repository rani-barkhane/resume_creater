import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError, serializeDoc } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { id } = await params;
  await connectDB();
  const resume = await ResumeModel.findOne({ _id: id, userId: auth.userId });
  if (!resume) return jsonError("Resume not found", 404);

  return jsonOk({ resume: serializeDoc(resume) });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { id } = await params;
  const body = await req.json();

  await connectDB();
  const resume = await ResumeModel.findOneAndUpdate(
    { _id: id, userId: auth.userId },
    {
      ...(body.title && { title: body.title }),
      ...(body.templateId && { templateId: body.templateId }),
      ...(body.data && { data: body.data }),
      ...(body.theme && { theme: body.theme }),
      ...(body.isPublic !== undefined && { isPublic: body.isPublic }),
      ...(body.sharePassword !== undefined && {
        sharePassword: body.sharePassword,
      }),
      ...(body.slug && { slug: body.slug }),
    },
    { new: true }
  );

  if (!resume) return jsonError("Resume not found", 404);
  return jsonOk({ resume: serializeDoc(resume) });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const { id } = await params;
  await connectDB();
  const result = await ResumeModel.deleteOne({ _id: id, userId: auth.userId });
  if (result.deletedCount === 0) return jsonError("Resume not found", 404);

  return jsonOk({ message: "Deleted" });
}
