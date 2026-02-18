import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import { auth } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { templateId, resumeData } = body;

    if (!templateId || !resumeData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const resume = await Resume.findOne({ _id: id, userId: session.user.id });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Generate slug if not present
    let slug = resume.slug;
    if (!slug) {
      const baseSlug = resume.personalInfo.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");

      // Check for uniqueness and append random string if needed
      let uniqueSlug = baseSlug;
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 5) {
        const existing = await Resume.findOne({ slug: uniqueSlug });
        if (!existing) {
          isUnique = true;
        } else {
          uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
          attempts++;
        }
      }
      slug = uniqueSlug;
    }

    resume.isPublished = true;
    resume.slug = slug;
    resume.templateId = templateId;
    resume.publishedAt = new Date();
    resume.publishedData = resumeData;

    await resume.save();

    return NextResponse.json({
      success: true,
      url: `/p/${slug}`,
      slug,
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
