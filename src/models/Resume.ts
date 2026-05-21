import mongoose, { Schema, models } from "mongoose";
import type { ResumeData, ResumeTheme, TemplateId } from "@/types/resume";
import { DEFAULT_SECTION_ORDER, DEFAULT_THEME } from "@/types/resume";

export interface IResumeDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  templateId: TemplateId;
  data: ResumeData;
  theme: ResumeTheme;
  isPublic: boolean;
  sharePassword?: string;
  analytics: {
    views: number;
    downloads: number;
    shareClicks: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResumeDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    templateId: {
      type: String,
      enum: ["minimal", "developer", "corporate", "creative", "professional"],
      default: "minimal",
    },
    data: {
      personal: {
        fullName: String,
        jobTitle: String,
        email: String,
        phone: String,
        location: String,
        website: String,
      },
      summary: { type: String, default: "" },
      education: { type: Array, default: [] },
      experience: { type: Array, default: [] },
      skills: { type: [String], default: [] },
      projects: { type: Array, default: [] },
      certifications: { type: Array, default: [] },
      languages: { type: Array, default: [] },
      social: { type: Array, default: [] },
      sectionOrder: {
        type: [String],
        default: DEFAULT_SECTION_ORDER,
      },
    },
    theme: {
      type: Object,
      default: DEFAULT_THEME,
    },
    isPublic: { type: Boolean, default: false },
    sharePassword: { type: String },
    analytics: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      shareClicks: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

ResumeSchema.index({ userId: 1, updatedAt: -1 });
ResumeSchema.index({ slug: 1 }, { unique: true });

export const ResumeModel =
  models.Resume || mongoose.model<IResumeDocument>("Resume", ResumeSchema);
