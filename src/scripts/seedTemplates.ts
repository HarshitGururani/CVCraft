/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Template from "../models/Templates";
import { maverickTemplate } from "../lib/portfolio-templates/maverick";
import { brutalistTemplate } from "../lib/portfolio-templates/brutalist";
import { eliteNarrativeTemplate } from "../lib/portfolio-templates/elite-narrative";
import { terminalTemplate } from "../lib/portfolio-templates/terminal";
import { minimalSuperiorTemplate } from "../lib/portfolio-templates/minimal";
import { magazineTemplate } from "../lib/portfolio-templates/magazine";

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
  {
    templateId: "elite-narrative",
    name: "Elite Narrative",
    description:
      "Elegant and professional layout focusing on your story and accomplishments.",
    tags: ["Elegant", "Professional", "Clean"],
    category: "Classic",
    preview: "/templates/elite-narrative-preview.png",
    html: prepareHTML(eliteNarrativeTemplate),
    css: eliteNarrativeTemplate.getCSS(),
    js: eliteNarrativeTemplate.getJS(),
  },
  {
    templateId: "minimal",
    name: "Minimal",
    description:
      "Super clean and focused design that lets your work speak for itself.",
    tags: ["Minimal", "Sleek", "Modern"],
    category: "Minimal",
    preview: "/templates/minimal-preview.png",
    html: prepareHTML(minimalSuperiorTemplate),
    css: minimalSuperiorTemplate.getCSS(),
    js: minimalSuperiorTemplate.getJS(),
  },
  {
    templateId: "terminal",
    name: "Terminal",
    description:
      "A command-line interface inspired portfolio for the true power user.",
    tags: ["Developer", "Tech", "Interactive"],
    category: "Creative",
    preview: "/templates/terminal-preview.png",
    html: prepareHTML(terminalTemplate),
    css: terminalTemplate.getCSS(),
    js: terminalTemplate.getJS(),
  },
  {
    templateId: "magazine",
    name: "Magazine",
    description:
      "Editorial-style layout that reads like a professional publication.",
    tags: ["Editorial", "Vibrant", "Modern"],
    category: "Classic",
    preview: "/templates/magazine-preview.png",
    html: prepareHTML(magazineTemplate),
    css: magazineTemplate.getCSS(),
    js: magazineTemplate.getJS(),
  },
  {
    templateId: "brutalist",
    name: "Brutalist",
    description:
      "Raw, high-contrast design with bold typography and a developer aesthetic.",
    tags: ["Raw", "High Contrast", "Bold"],
    category: "Brutalist",
    preview: "/templates/brutalist-preview.png",
    html: prepareHTML(brutalistTemplate),
    css: brutalistTemplate.getCSS(),
    js: brutalistTemplate.getJS(),
  },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "cvcraft_dev",
  });
  console.log("Connected to MongoDB for seeding...");

  // Clear existing templates to ensure the order is correct based on createdAt
  await Template.deleteMany({});
  console.log("Cleared existing templates.");

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
