"use client";
import React, { useEffect, useRef, useState } from "react";

import { ResumeData } from "@/types/resume";

interface TemplatePreviewProps {
  templateName: string;
  userData: ResumeData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateName,
  userData,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [templateContent, setTemplateContent] = useState<{
    html: string;
    css: string;
    js: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch template structure only when templateName changes
  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/templates/${templateName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userData }), // Pass initial data for first render
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`);
        }

        const data = await response.json();
        setTemplateContent(data);
      } catch (err) {
        console.error("Template fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load template",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateName]); // We purposely omit userData to prevent infinite loops; live updates use postMessage

  // 2. Push live updates to the iframe when data changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && !loading) {
      iframeRef.current.contentWindow.postMessage(
        { type: "UPDATE_DATA", payload: userData },
        "*",
      );
    }
  }, [userData, loading]);

  const combinedHtml = React.useMemo(() => {
    if (!templateContent) return "";

    return templateContent.html
      .replace(
        /<link\s+[^>]*href=["']?styles\.css["']?[^>]*>/i,
        `<style>${templateContent.css}</style>`,
      )
      .replace(
        /<script\s+[^>]*src=["']?script\.js["']?[^>]*><\/script>/i,
        `<script>${templateContent.js}</script>`,
      );
  }, [templateContent]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 italic">
            Preparing your masterpiece...
          </p>
        </div>
      </div>
    );
  }

  if (error || !templateContent) {
    return (
      <div className="p-10 text-center text-red-500 bg-red-50/50 rounded-xl border border-red-100 m-4">
        <p className="font-semibold">Oops! Something went wrong</p>
        <p className="text-sm mt-1">{error || "Template not found"}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-white shadow-inner">
      <iframe
        ref={iframeRef}
        title="Portfolio Preview"
        srcDoc={combinedHtml}
        className="block w-full h-full border-none shadow-2xl"
        sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
      />
    </div>
  );
};

export default TemplatePreview;
