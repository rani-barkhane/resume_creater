import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const password = req.headers.get("x-share-password");

  await connectDB();
  const resume = await ResumeModel.findOne({ slug, isPublic: true }).lean();
  if (!resume) return jsonError("Resume not found", 404);

  if (resume.sharePassword && resume.sharePassword !== password) {
    return jsonError("Password required", 403);
  }

  await ResumeModel.updateOne(
    { _id: resume._id },
    { $inc: { "analytics.views": 1 } }
  );

  return jsonOk({
    resume: {
      ...resume,
      _id: String(resume._id),
      userId: String(resume.userId),
      sharePassword: undefined,
    },
  });
}
