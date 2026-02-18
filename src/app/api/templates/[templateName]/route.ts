import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Template from "@/models/Templates";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ templateName: string }> },
) {
  try {
    const { templateName } = await params;
    const { userData } = await req.json();

    if (!userData) {
      return NextResponse.json(
        { error: "userData is required" },
        { status: 400 },
      );
    }

    await dbConnect();

    // Fetch stored template strings from MongoDB
    const template = await Template.findOne(
      { templateId: templateName },
      { html: 1, css: 1, js: 1 }, // only fetch what we need
    ).lean();

    if (!template) {
      return NextResponse.json(
        { error: `Template "${templateName}" not found` },
        { status: 404 },
      );
    }

    // Inject userData into the HTML
    const html = template.html.replace(
      /window\.__PORTFOLIO_DATA__\s*=\s*[^;]*;?/,
      () => `window.__PORTFOLIO_DATA__ = ${JSON.stringify(userData)};`,
    );

    // FIX: Ensure the JS prioritizes data.json for downloads
    const loadDataRegex =
      /(?:async\s+)?function\s+loadData\s*\(\)\s*\{[\s\S]*?\}/i;

    const fixedJs = template.js.replace(
      loadDataRegex,
      `async function loadData() {
    // 1. Check if external data.js has been loaded (for local/offline edits)
    if (window.__EXTERNAL_DATA__) return window.__EXTERNAL_DATA__;

    // 2. Fallback to inlined data
    return window.__PORTFOLIO_DATA__;
}`,
    );

    return NextResponse.json({
      html,
      css: template.css,
      js: fixedJs,
    });
  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
