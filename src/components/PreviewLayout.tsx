"use client";

import { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Smartphone,
  Download,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import ResumeFormEditor from "./ResumeFormEditor";
import { useSession, signIn } from "next-auth/react";

import { ResumeData } from "@/types/resume";

interface PreviewLayoutProps {
  children: React.ReactNode;
  onDownload?: () => void;
  onPublish?: () => Promise<void>;
  isPublished?: boolean;
  isSaved?: boolean;
  onBack?: () => void;
  resumeData: ResumeData;
  onDataChange?: (data: ResumeData) => void;
  templateName?: string;
}

// A dedicated sub-component to handle the internal flex logic
function PreviewLayoutContent({
  children,
  onDownload,
  onPublish,
  isPublished,
  isSaved,
  onBack,
  resumeData,
  onDataChange,
  templateName,
}: PreviewLayoutProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isSaving, setIsSaving] = useState(false);
  // "saved" = persisted in DB, "success" = just saved (flash), "idle" = unsaved changes
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saved" | "success" | "error"
  >(isSaved ? "saved" : "idle");
  // "published" = live, "success" = just published (flash), "idle" = not published / has changes
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "publishing" | "published" | "success"
  >(isPublished ? "published" : "idle");
  const { open, setOpen } = useSidebar();
  const { data: session } = useSession();

  const resumeDataRef = useRef(resumeData);
  useEffect(() => {
    resumeDataRef.current = resumeData;
  }, [resumeData]);

  // Sync saveStatus with isSaved prop from parent
  useEffect(() => {
    if (isSaved) {
      setSaveStatus("saved");
    } else {
      setSaveStatus("idle");
    }
  }, [isSaved]);

  const handleSave = async () => {
    if (!session) {
      signIn("google", { callbackUrl: window.location.href });
      return;
    }
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const response = await fetch("/api/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Use ref to guarantee latest data — avoids any stale closure issue
        body: JSON.stringify({
          ...resumeDataRef.current,
          templateId: templateName,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const data = await response.json();
      if (data.resume) {
        onDataChange?.(data.resume);
      }

      // Flash "Saved!" then settle on "saved" (persisted state)
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("saved"), 2000);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDataChange = (newData: ResumeData) => {
    // Any edit marks the resume as having unsaved changes
    setSaveStatus("idle");
    setPublishStatus("idle");
    console.log(
      `[PreviewLayout] handleDataChange title=${newData.personalInfo?.title}`,
    );
    onDataChange?.(newData);
  };

  const handlePublish = async () => {
    if (!onPublish) return;
    setPublishStatus("publishing");
    try {
      await onPublish();
      // Flash "Published!" then settle on "published"
      setPublishStatus("success");
      setTimeout(() => setPublishStatus("published"), 2000);
    } catch {
      setPublishStatus("idle");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* 1. THE EDITOR COLUMN (The Sidebar) */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shrink-0 ${
          open ? "w-[360px]" : "w-0"
        } overflow-hidden`}
      >
        <ResumeFormEditor
          data={resumeData}
          onChange={handleDataChange}
          templateName={templateName}
        />
      </aside>

      {/* 2. THE PREVIEW COLUMN */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Toggle Button for when sidebar is closed - more visible tab */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white pl-3 pr-4 py-3 rounded-r-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-y border-r border-white/10 transition-all hover:scale-105 active:scale-95 group"
          >
            <ChevronRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            <span className="text-xs font-bold uppercase tracking-widest">
              Edit
            </span>
          </button>
        )}

        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-40">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-8 px-2"
            >
              <ChevronLeft size={16} />
              <span className="text-xs">All Templates</span>
            </Button>
            <div className="h-4 w-px bg-gray-200" />

            <Button
              variant={open ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setOpen(!open)}
              className={`h-8 gap-2 px-3 transition-colors ${
                open
                  ? "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              <span className="text-xs font-bold uppercase tracking-tighter shrink-0">
                {open ? "Hide Editor" : "Open Editor"}
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-lg p-1">
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("desktop")}
              className={`h-7 px-3 text-[11px] font-medium transition-all ${
                viewMode === "desktop"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Monitor size={12} />
              Desktop
            </Button>
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("mobile")}
              className={`h-7 px-3 text-[11px] font-medium transition-all ${
                viewMode === "mobile"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Smartphone size={12} />
              Mobile
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || saveStatus === "saved"}
              className={`h-8 transition-all ${
                saveStatus === "success" || saveStatus === "saved"
                  ? "border-green-500 text-green-600 bg-green-50 hover:bg-green-50"
                  : saveStatus === "error"
                    ? "border-red-400 text-red-600 bg-red-50 hover:bg-red-50"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              } text-[11px] font-medium`}
            >
              {isSaving ? (
                <Loader2 size={12} className="mr-2 animate-spin" />
              ) : saveStatus === "success" || saveStatus === "saved" ? (
                <CheckCircle2 size={12} className="mr-2" />
              ) : (
                <Save size={12} className="mr-2" />
              )}
              {isSaving
                ? "Saving..."
                : saveStatus === "success"
                  ? "Saved!"
                  : saveStatus === "saved"
                    ? "Saved"
                    : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="h-8 border-gray-300 bg-white text-gray-700 text-[11px] font-medium hover:bg-gray-50"
            >
              <Download size={12} className="mr-2" />
              Download ZIP
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={
                publishStatus === "publishing" || publishStatus === "published"
              }
              className={`h-8 ${
                publishStatus === "success" || publishStatus === "published"
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-primary hover:bg-primary/90"
              } text-white text-[11px] px-4 font-bold shadow-sm transition-all`}
            >
              {publishStatus === "publishing" ? (
                <Loader2 size={12} className="mr-2 animate-spin" />
              ) : publishStatus === "success" ||
                publishStatus === "published" ? (
                <CheckCircle2 size={12} className="mr-2" />
              ) : (
                <Monitor size={12} className="mr-2" />
              )}
              {publishStatus === "publishing"
                ? "Publishing..."
                : publishStatus === "success"
                  ? "Published!"
                  : publishStatus === "published"
                    ? "Published"
                    : "Publish"}
            </Button>
          </div>
        </header>

        {/* The Viewport Container */}
        <main className="flex-1 bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {/* Background grid effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

          <div
            className={`bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out overflow-hidden rounded-xl border border-gray-200 ${
              viewMode === "desktop"
                ? "w-[calc(100%-3rem)] h-[calc(100%-3rem)] max-w-[1300px] max-h-[90vh]"
                : "w-[400px] h-[667px] rounded-2xl"
            }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PreviewLayout(props: PreviewLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <PreviewLayoutContent {...props} />
    </SidebarProvider>
  );
}
