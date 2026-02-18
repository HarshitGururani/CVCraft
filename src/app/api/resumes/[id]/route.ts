import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const dbName = mongoose.connection.db?.databaseName;
    const maskedUri = process.env.MONGODB_URI?.replace(/\/\/.*@/, "//***:***@");
    console.log(
      `DIAGNOSTIC (resumes/[id]): Connected to DB: "${dbName}", URI: "${maskedUri}"`,
    );

    const resume = await Resume.findOne({
      _id: id,
      userId: session.user.id,
    }).lean();

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const deletedResume = await Resume.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
