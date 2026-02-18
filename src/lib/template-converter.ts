import JSZip from "jszip";
import { saveAs } from "file-saver";
import { portfolioTemplates } from "./portfolio-templates";
import { ResumeData } from "@/types/resume";
import { toast } from "sonner";

export async function downloadPortfolioTemplate(
  templateName: string,
  userData: ResumeData,
) {
  const zip = new JSZip();

  let html = "";
  let css = "";
  let js = "";

  const template = portfolioTemplates[templateName];

  if (template) {
    // Generate files using the hardcoded template definition
    html = template.getHTML(userData);
    css = template.getCSS();
    js = template.getJS();
  } else {
    // Fallback: Fetch from API for dynamic templates stored in MongoDB
    try {
      const res = await fetch(`/api/templates/${templateName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData }),
      });

      if (!res.ok) throw new Error("Template not found in API");

      const data = await res.json();
      html = data.html;
      css = data.css;
      js = data.js;
    } catch (error) {
      console.error("Template fetch error:", error);
      toast.error(
        `Template "${templateName}" is not implemented for download yet (and was not found in database).`,
      );
      return;
    }
  }

  // Add files to ZIP
  // We use data.js instead of data.json to allow local file editing without CORS issues
  const dataJsContent = `window.__EXTERNAL_DATA__ = ${JSON.stringify(userData, null, 2)};`;

  // Prepend a global data override to script.js.
  // This ensures that even if the template doesn't have a loadData() function,
  // it will still use the updated data from data.js.
  const jsWithOverride = `
/**
 * CV CRAFT - DATA OVERRIDE
 * This block ensures that if you edit data.js, the changes reflect here.
 */
if (typeof window !== 'undefined' && window.__EXTERNAL_DATA__) {
    window.__PORTFOLIO_DATA__ = window.__EXTERNAL_DATA__;
}

${js}`;

  // Inject the data.js script into HTML before script.js using a more flexible regex
  const htmlWithDataScript = html.replace(
    /<script\s+[^>]*src=["'](?:.\/)?script\.js["'][^>]*><\/script>/i,
    `<script src="data.js"></script>\n    <script src="script.js"></script>`,
  );

  zip.file("index.html", htmlWithDataScript);
  zip.file("styles.css", css);
  zip.file("script.js", jsWithOverride);
  zip.file("data.js", dataJsContent);

  zip.file(
    "README.txt",
    `Portfolio Template: ${templateName}
  
Instructions for Editing:
1. To update your portfolio, simply open 'data.js' in any text editor (like Notepad or VS Code).
2. Change the information inside the curly braces.
3. Save the file and refresh 'index.html' in your browser.

Note: Unlike a .json file, this .js file allows you to see changes even if you are just opening the files directly from your computer (no local server required).

Built with CV Craft.`,
  );

  // Create a clean filename from the user's name
  const userName = userData.personalInfo?.name || "my-portfolio";
  const slugifiedName = userName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
  const fileName = `${slugifiedName}-portfolio.zip`;

  // Generate and save
  try {
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, fileName);
  } catch (error) {
    console.error("Download failed:", error);
    toast.error(
      "Failed to generate download. Please check console for details.",
    );
  }
}
