/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Template from "../models/Templates";
import { maverickTemplate } from "../lib/portfolio-templates/maverick";

// Helper to prepare HTML for seeding
const prepareHTML = (template: any) => {
  return template
    .getHTML({ personalInfo: { name: "Portfolio" } })
    .replace(
      /window\.__PORTFOLIO_DATA__ = {.*?};/,
      "window.__PORTFOLIO_DATA__ = null;",
    );
};

const allTemplates = [
  {
    templateId: "maverick",
    name: "Maverick",
    description:
      "Ultra-modern, indigo-themed layout with high-impact typography.",
    tags: ["Modern", "Dark", "Indigo"],
    category: "Bold",
    preview: "/templates/maverick-preview.png",
    html: prepareHTML(maverickTemplate),
    css: maverickTemplate.getCSS(),
    js: maverickTemplate.getJS(),
  },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for seeding...");

  for (const template of allTemplates) {
    await Template.findOneAndUpdate(
      { templateId: template.templateId },
      template,
      { upsert: true, new: true },
    );
    console.log(`✓ Seeded: ${template.templateId}`);
  }

  console.log("Seeding complete!");
  await mongoose.disconnect();
}

seed().catch(console.error);
