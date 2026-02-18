/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/resumeParser.ts
import mammoth from "mammoth";

export async function parseResume(file: File): Promise<string> {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  if (fileType === "pdf") {
    return await parsePDF(file);
  } else if (fileType === "docx") {
    return await parseDOCX(file);
  } else {
    throw new Error("Unsupported file type. Only PDF and DOCX are supported.");
  }
}

async function parsePDF(file: File): Promise<string> {
  if (typeof window === "undefined") return "";

  try {
    // Dynamic import of pdfjs-dist
    const pdfjsLib = await import("pdfjs-dist");

    // Configure worker using local public folder
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => (item as { str: string }).str)
        .join(" ")
        .replace(/\s+/g, " ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to parse PDF file");
  }
}

async function parseDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("DOCX parsing error:", error);
    throw new Error("Failed to parse DOCX file");
  }
}
