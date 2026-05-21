import { connectDB } from "@/lib/mongodb";
import { ResumeModel } from "@/models/Resume";
import { getAuthFromRequest } from "@/lib/auth";
import { generatePdfFromHtml, pdfResponse } from "@/lib/pdf";
import { renderPaginatedResumeHtml } from "@/lib/render-paginated-html";
import { jsonError } from "@/lib/api-utils";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  const body = await req.json();
  const { resumeId, filename } = body;

  let templateId = body.templateId;
  let data = body.data;
  let theme = body.theme;

  if (resumeId) {
    await connectDB();
    const resume = await ResumeModel.findOne({
      _id: resumeId,
      userId: auth.userId,
    });
    if (!resume) return jsonError("Resume not found", 404);
    // Prefer live editor state from the client so PDF matches preview
    templateId = body.templateId ?? resume.templateId;
    data = body.data ?? resume.data;
    theme = body.theme ?? resume.theme;
    await ResumeModel.updateOne(
      { _id: resumeId },
      { $inc: { "analytics.downloads": 1 } }
    );
  }

  if (!data) return jsonError("Resume data required");
  if (!templateId) templateId = "professional";

  const html = renderPaginatedResumeHtml({ templateId, data, theme });
  const name =
    filename ||
    `${data.personal?.fullName || "resume"}`.replace(/\s+/g, "-") + ".pdf";

  try {
    const buffer = await generatePdfFromHtml(html, name);
    return pdfResponse(buffer, name);
  } catch (e) {
    console.error("PDF error:", e);
    return jsonError("PDF generation failed", 500);
  }
}
