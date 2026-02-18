import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    console.log(`🔍 Fetching resumes for user: ${session.user.id}`);

    // Fetch resumes belonging to the logged-in user, sorted by newest first
    const resumes = await Resume.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .select("personalInfo createdAt updatedAt templateId isPublished slug") // Only select needed fields
      .lean();

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
