import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Template from "@/models/Templates";
import { auth } from "@/lib/auth";

const ADMIN_EMAIL = "harshit15gg@gmail.com";

export async function GET() {
  try {
    await dbConnect();

    const templates = await Template.find(
      {},
      {
        templateId: 1,
        name: 1,
        description: 1,
        tags: 1,
        preview: 1,
        category: 1,
      },
    )
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ templates });
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return NextResponse.json(
      { error: "Failed to load templates" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (session?.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    const template = await Template.findOneAndUpdate(
      { templateId: body.templateId },
      body,
      { upsert: true, new: true },
    );

    return NextResponse.json({
      message: "Template saved successfully",
      template,
    });
  } catch (error) {
    console.error("Failed to save template:", error);
    return NextResponse.json(
      { error: "Failed to save template" },
      { status: 500 },
    );
  }
}
