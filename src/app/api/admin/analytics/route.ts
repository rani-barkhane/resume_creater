import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== "admin")
    return jsonError("Admin access required", 403);

  await connectDB();
  const [userCount, resumeCount, resumes] = await Promise.all([
    User.countDocuments(),
    ResumeModel.countDocuments(),
    ResumeModel.find().select("analytics templateId title").lean(),
  ]);

  const totalViews = resumes.reduce((s, r) => s + (r.analytics?.views || 0), 0);
  const totalDownloads = resumes.reduce(
    (s, r) => s + (r.analytics?.downloads || 0),
    0
  );
  const templateUsage: Record<string, number> = {};
  resumes.forEach((r) => {
    templateUsage[r.templateId] = (templateUsage[r.templateId] || 0) + 1;
  });

  return jsonOk({
    users: userCount,
    resumes: resumeCount,
    totalViews,
    totalDownloads,
    templateUsage,
    recentResumes: resumes.slice(-10).map((r) => ({
      title: r.title,
      templateId: r.templateId,
      views: r.analytics?.views,
    })),
  });
}
