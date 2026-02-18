import mongoose, { Schema, Document } from "mongoose";
import { ResumeData } from "@/types/resume";

export interface IResume extends Document {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    title?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
    location?: string;
  };
  summary?: string;
  skills: {
    languages?: string[];
    technologies?: string[];
    tools?: string[];
    other?: string[];
  };
  experience?: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
    marks?: string;
  }>;
  certificates?: string[];
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  isPublished: boolean;
  slug?: string;
  templateId?: string;
  publishedAt?: Date;
  publishedData?: ResumeData;
}

const ResumeSchema: Schema = new Schema(
  {
    userId: { type: String, index: true },
    personalInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      title: { type: String },
      github: { type: String },
      linkedin: { type: String },
      portfolio: { type: String },
      location: { type: String },
    },
    summary: { type: String },
    skills: {
      languages: [{ type: String }],
      technologies: [{ type: String }],
      tools: [{ type: String }],
      other: [{ type: String }],
    },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: [{ type: String }],
      },
    ],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        liveUrl: { type: String },
        githubUrl: { type: String },
        highlights: [{ type: String }],
      },
    ],
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
        marks: { type: String },
      },
    ],
    certificates: [{ type: String }],
    interests: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true, index: true },
    templateId: { type: String },
    publishedAt: { type: Date },
    publishedData: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);

// Delete cached model to force re-registration with updated schema on hot-reload
// This is needed when schema fields are added/changed during development
delete (mongoose.models as Record<string, unknown>).Resume;

export default mongoose.model<IResume>("Resume", ResumeSchema);
