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
  AlertTriangle,
  Eye,
  Pencil,
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
  onSwitchTemplate?: () => void;
  publishedTemplateId?: string | null;
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
  onSwitchTemplate,
  publishedTemplateId,
}: PreviewLayoutProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  // Mobile tab: "edit" shows editor full-screen, "preview" shows the template
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saved" | "success" | "error"
  >(isSaved ? "saved" : "idle");
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "publishing" | "published" | "success"
  >(isPublished ? "published" : "idle");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const templateChangedFromPublished =
    !bannerDismissed &&
    !!publishedTemplateId &&
    templateName !== publishedTemplateId;
  const { open, setOpen } = useSidebar();
  const { data: session } = useSession();

  const resumeDataRef = useRef(resumeData);
  useEffect(() => {
    resumeDataRef.current = resumeData;
  }, [resumeData]);

  useEffect(() => {
    if (isSaved) {
      setSaveStatus("saved");
    } else {
      setSaveStatus("idle");
    }
  }, [isSaved]);

  useEffect(() => {
    if (templateChangedFromPublished) {
      setPublishStatus("idle");
      setSaveStatus("idle");
    }
  }, [templateChangedFromPublished]);

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
    setSaveStatus("idle");
    setPublishStatus("idle");
    onDataChange?.(newData);
  };

  const handlePublish = async () => {
    if (!onPublish) return;
    setPublishStatus("publishing");
    try {
      await onPublish();
      setPublishStatus("success");
      setTimeout(() => setPublishStatus("published"), 2000);
    } catch {
      setPublishStatus("idle");
    }
  };

  // ── Reusable action buttons (used in both desktop top-bar and mobile bottom-bar) ──
  const saveBtn = (
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
        <Loader2 size={12} className="mr-1 animate-spin" />
      ) : saveStatus === "success" || saveStatus === "saved" ? (
        <CheckCircle2 size={12} className="mr-1" />
      ) : (
        <Save size={12} className="mr-1" />
      )}
      {isSaving
        ? "Saving..."
        : saveStatus === "success"
          ? "Saved!"
          : saveStatus === "saved"
            ? "Saved"
            : "Save"}
    </Button>
  );

  const publishBtn = (
    <Button
      size="sm"
      onClick={handlePublish}
      disabled={publishStatus === "publishing" || publishStatus === "published"}
      className={`h-8 ${
        publishStatus === "success" || publishStatus === "published"
          ? "bg-green-600 hover:bg-green-600"
          : "bg-primary hover:bg-primary/90"
      } text-white text-[11px] px-4 font-bold shadow-sm transition-all`}
    >
      {publishStatus === "publishing" ? (
        <Loader2 size={12} className="mr-1 animate-spin" />
      ) : publishStatus === "success" || publishStatus === "published" ? (
        <CheckCircle2 size={12} className="mr-1" />
      ) : (
        <Monitor size={12} className="mr-1" />
      )}
      {publishStatus === "publishing"
        ? "Publishing..."
        : publishStatus === "success"
          ? "Published!"
          : publishStatus === "published"
            ? "Published"
            : "Publish"}
    </Button>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-gray-50 overflow-hidden">
      {/* ── DESKTOP SIDEBAR (hidden on mobile) ── */}
      <aside
        className={`hidden lg:flex bg-white border-r border-gray-200 transition-all duration-300 flex-col shrink-0 ${
          open ? "w-[360px]" : "w-0"
        } overflow-hidden`}
      >
        <ResumeFormEditor
          data={resumeData}
          onChange={handleDataChange}
          templateName={templateName}
          onSwitchTemplate={onSwitchTemplate}
        />
      </aside>

      {/* ── MAIN COLUMN (preview + top-bar) ── */}
      <div className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-hidden relative">
        {/* Desktop floating "Edit" tab (only when sidebar is closed) */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-50 items-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white pl-3 pr-4 py-3 rounded-r-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-y border-r border-white/10 transition-all hover:scale-105 active:scale-95 group"
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

        {/* ── TOP BAR ── */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-4 shrink-0 z-40">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-8 px-2"
            >
              <ChevronLeft size={16} />
              <span className="text-xs hidden sm:inline">All Templates</span>
            </Button>

            {/* Desktop sidebar toggle */}
            <div className="hidden lg:flex items-center gap-2">
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
          </div>

          {/* Center: viewport toggle (desktop only) */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-lg p-1">
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

          {/* Right: action buttons */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Download — hide on very small screens */}
            <Button
              variant="outline"
              size="sm"
              onClick={onDownload}
              className="hidden sm:flex h-8 border-gray-300 bg-white text-gray-700 text-[11px] font-medium hover:bg-gray-50"
            >
              <Download size={12} className="mr-1" />
              <span className="hidden md:inline">Download ZIP</span>
              <span className="inline md:hidden">ZIP</span>
            </Button>
            {saveBtn}
            {publishBtn}
          </div>
        </header>

        {/* Template Changed Banner */}
        {templateChangedFromPublished && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-3 shrink-0 z-30">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                Template changed — your live portfolio will update once you
                re-publish.
              </p>
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-amber-400 hover:text-amber-600 text-xs font-bold shrink-0"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── MOBILE: Editor or Preview (full-screen) ── */}
        <div className="flex-1 flex flex-col overflow-hidden lg:hidden">
          {mobileTab === "edit" ? (
            <div className="flex-1 bg-white overflow-y-auto">
              <ResumeFormEditor
                data={resumeData}
                onChange={handleDataChange}
                templateName={templateName}
                onSwitchTemplate={onSwitchTemplate}
              />
            </div>
          ) : (
            <main className="flex-1 bg-gray-100 overflow-auto">
              <div className="w-full h-full overflow-auto">{children}</div>
            </main>
          )}

          {/* Mobile bottom tab bar */}
          <div className="bg-white border-t border-gray-200 flex shrink-0 safe-area-pb">
            <button
              onClick={() => setMobileTab("edit")}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                mobileTab === "edit"
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Pencil size={18} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Edit
              </span>
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                mobileTab === "preview"
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Eye size={18} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Preview
              </span>
            </button>
          </div>
        </div>

        {/* ── DESKTOP: The Viewport Container ── */}
        <main className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center relative overflow-hidden">
          {/* Background grid */}
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
