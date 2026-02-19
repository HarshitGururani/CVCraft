"use client";
import { useSession, signIn } from "next-auth/react";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect, useState, Suspense } from "react";
import TemplateSelector from "@/components/TemplateSelector";
import TemplatePreview from "@/components/TemplatePreview";
import PreviewLayout from "@/components/PreviewLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, CheckCircle2, Globe, Github } from "lucide-react";
import { toast } from "sonner";

const PreviewContent = () => {
  const { resumeData, setResumeData } = useResume();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplateSelector, setShowTemplateSelector] = useState(!resumeId);
  const [loading, setLoading] = useState(!!resumeId);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  // True only when resume was confirmed fetched from DB (URL has ?id=...) or just saved
  const [hasDbRecord, setHasDbRecord] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  // Track the template that is currently LIVE (published)
  const [publishedTemplateId, setPublishedTemplateId] = useState<string | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (resumeId) {
      const fetchResume = async () => {
        try {
          const res = await fetch(`/api/resumes/${resumeId}`);
          const data = await res.json();
          if (data.resume) {
            setResumeData(data.resume);
            if (data.resume.templateId) {
              setSelectedTemplate(data.resume.templateId);
            }
            if (data.resume.isPublished && data.resume.templateId) {
              setPublishedTemplateId(data.resume.templateId);
            }
            setShowTemplateSelector(false);
            setHasDbRecord(true); // Confirmed this resume exists in DB
            setIsDirty(false); // Fresh from DB
          }
        } catch (error) {
          console.error("Error loading resume:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResume();
    }
  }, [resumeId, setResumeData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!resumeData && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Resume Data Found
          </h1>
          <p className="text-gray-600 mb-6">
            Please upload a resume first to see the preview.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Go Back to Upload
          </button>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    if (!resumeData) return null;
    return (
      <TemplatePreview templateName={selectedTemplate} userData={resumeData!} />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showTemplateSelector ? (
        // Template Selection View
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Upload
            </button>
          </div>

          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={(id) => {
              setSelectedTemplate(id);
              setIsDirty(true);
            }}
            onNext={() => setShowTemplateSelector(false)}
          />
        </div>
      ) : (
        // Template Preview View with Editor Layout
        <PreviewLayout
          onBack={() => setShowTemplateSelector(true)}
          onDownload={async () => {
            const { downloadPortfolioTemplate } =
              await import("@/lib/template-converter");
            await downloadPortfolioTemplate(selectedTemplate, resumeData!);
          }}
          isPublished={hasDbRecord ? resumeData?.isPublished : false}
          isSaved={!isDirty && hasDbRecord}
          onPublish={async () => {
            if (!session) {
              signIn("google", { callbackUrl: window.location.href });
              // Throwing an error prevents the button from showing "Published!"
              throw new Error("Authentication required");
            }
            // Always save first — never trust _id from localStorage (may be stale/deleted)
            toast.loading("Saving before publish...", { id: "auto-save" });
            const saveRes = await fetch("/api/save-resume", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                // Only pass _id if we are certain it exists in the DB for this user
                ...resumeData,
                _id: hasDbRecord ? resumeData?._id : undefined,
                templateId: selectedTemplate,
              }),
            });
            const saveData = await saveRes.json();
            toast.dismiss("auto-save");
            if (!saveRes.ok || !saveData.id) {
              toast.error("Failed to save before publishing.");
              throw new Error("Auto-save failed");
            }

            const resumeId = saveData.id;
            // Build latest data locally with confirmed DB id
            const latestResumeData = { ...resumeData!, _id: resumeId };
            setResumeData(latestResumeData);
            setHasDbRecord(true);
            setIsDirty(false);

            const res = await fetch(`/api/resumes/${resumeId}/publish`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                templateId: selectedTemplate,
                resumeData: latestResumeData,
              }),
            });
            const data = await res.json();
            if (data.success) {
              const fullUrl = window.location.origin + data.url;
              setPublishedUrl(fullUrl);
              setResumeData({ ...latestResumeData, isPublished: true });
              toast.success("Portfolio published successfully!");
            } else {
              toast.error(data.error || "Failed to publish");
              throw new Error(data.error || "Failed to publish");
            }
          }}
          resumeData={resumeData!}
          onDataChange={(newData) => {
            setResumeData({ ...newData, templateId: selectedTemplate });
            setIsDirty(true);
          }}
          templateName={selectedTemplate}
          onSwitchTemplate={() => setShowTemplateSelector(true)}
          publishedTemplateId={publishedTemplateId}
        >
          {renderTemplate()}

          {publishedUrl && (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">
                  Congratulations!
                </h2>
                <p className="text-gray-500 text-sm text-center mb-6">
                  Your portfolio is live. Find this link anytime on your
                  Dashboard.
                </p>

                {/* Publish Destination Cards */}
                <div className="flex flex-col gap-3 mb-6">
                  {/* Live Portfolio — Active */}
                  <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={16} className="text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        Live Portfolio
                      </span>
                      <span className="ml-auto text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-green-100 rounded-lg px-3 py-2">
                      <input
                        readOnly
                        value={publishedUrl}
                        className="bg-transparent border-none text-xs text-primary font-medium w-full focus:ring-0 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(publishedUrl);
                          toast.success("URL copied!");
                        }}
                        className="text-primary hover:text-primary/80 text-xs font-bold shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* GitHub Pages — Coming Soon */}
                  <div className="border border-gray-200 bg-gray-50 rounded-xl p-4 opacity-60 cursor-not-allowed select-none">
                    <div className="flex items-center gap-2">
                      <Github size={16} className="text-gray-500" />
                      <span className="text-sm font-bold text-gray-600">
                        GitHub Pages
                      </span>
                      <span className="ml-auto text-[10px] font-bold bg-gray-300 text-gray-600 px-2 py-0.5 rounded-full">
                        COMING SOON
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Push your portfolio directly to a GitHub repository.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <a
                    href={publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-white text-center py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Globe size={16} />
                    View Portfolio
                  </a>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => setPublishedUrl(null)}
                    className="w-full text-gray-400 text-sm font-medium py-2 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </PreviewLayout>
      )}
    </div>
  );
};

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
