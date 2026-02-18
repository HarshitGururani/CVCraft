/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { userRateLimiter } from "@/lib/rateLimiter";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import { auth } from "@/lib/auth";
import { ResumeData } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const resumeData: ResumeData & { isNewUpload?: boolean } =
      await request.json();

    if (!resumeData?.personalInfo?.email) {
      return NextResponse.json(
        { error: "Valid resume data is required (missing personal info)" },
        { status: 400 },
      );
    }

    // Rate limiting
    const userIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const rateLimitResult = userRateLimiter.check(userIp);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: rateLimitResult.message,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 },
      );
    }

    await dbConnect();

    const isNewUpload = resumeData.isNewUpload;
    const resumeId = resumeData._id;

    // Build the fields to save
    const {
      _id,
      slug,
      isPublished,
      publishedAt,
      publishedData,
      userId: _uid,
      isNewUpload: _nu,
      ...dataToSave
    } = resumeData as unknown as Record<string, unknown>;
    void _id;
    void _uid;
    void slug;
    void isPublished;
    void publishedAt;
    void publishedData;
    void _nu;

    let savedResume;

    if (resumeId && mongoose.Types.ObjectId.isValid(resumeId as string)) {
      // CASE 1: Updating an existing resume record
      const updateOp: Record<string, any> = {
        $set: { ...dataToSave, userId },
      };

      // If this specific record is being replaced by a new upload, reset its publish state
      if (isNewUpload) {
        updateOp.$set.isPublished = false;
        updateOp.$unset = { slug: "", publishedAt: "", publishedData: "" };
      }

      savedResume = await Resume.findOneAndUpdate(
        { _id: resumeId, userId },
        updateOp,
        { new: true },
      );
    }

    if (!savedResume) {
      // CASE 2: Creating a NEW resume record
      // (Either no _id was provided, or the provided _id wasn't found for this user)
      savedResume = await Resume.create({
        ...dataToSave,
        userId,
        isPublished: false, // New records start unpublished
      });
    }

    const resumeObj: any = savedResume.toObject
      ? savedResume.toObject()
      : savedResume;
    resumeObj._id = resumeObj._id?.toString();

    return NextResponse.json(
      {
        message: "Resume saved successfully",
        id: resumeObj._id,
        resume: resumeObj,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database save error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
