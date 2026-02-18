"use client";
import { Upload, FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AnimatedButton from "./AnimatedButton";
import { parseResume } from "@/lib/resumeParser";
import { useRouter } from "next/navigation";
import { useResume } from "@/contexts/ResumeContext";

import { toast } from "sonner";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { setResumeData, setRawText, setIsLoading, setError } = useResume();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setProgress(0);
    setIsLoading(true);
    setError(null);

    try {
      // Start progress simulation for better UX
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Parse the resume
      console.log(`Starting to parse file: ${file.name}`);
      const text = await parseResume(file);

      console.log("✅ Successfully extracted text:");
      console.log("──────────────────────────────────────────────────");
      console.log(text);
      console.log("──────────────────────────────────────────────────");
      console.log(`Total characters: ${text.length}`);

      // Store raw text in context
      setRawText(text);

      // Send to AI for structuring
      console.log("\n🤖 Sending to AI for structuring...");
      const aiResponse = await fetch("/api/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json();
        throw new Error(errorData.error || "Failed to process resume with AI");
      }

      const { data: structuredData } = await aiResponse.json();

      console.log("\n✅ AI Structured Resume Data:");
      console.log("══════════════════════════════════════════════════");
      console.log(JSON.stringify(structuredData, null, 2));
      console.log("══════════════════════════════════════════════════");

      // Mark as a fresh upload so the save API knows to reset the slug
      setResumeData({ ...structuredData, isNewUpload: true });

      // Finish progress and redirect
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);

      setTimeout(() => {
        router.push("/preview");
      }, 500);
    } catch (error) {
      console.error("Upload/Parsing error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process resume. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setProgress(0);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-gray-300 bg-white/80 dark:bg-gray-800/80"
        } backdrop-blur-sm shadow-xl hover:shadow-2xl cursor-pointer`}
      >
        <input {...getInputProps()} />

        {/* File Type Badges - Hidden on mobile (lg and up only) */}
        {!file && (
          <div className="hidden lg:flex absolute bottom-3 right-4 flex-col gap-3">
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                PDF
              </span>
            </div>
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                DOCX
              </span>
            </div>
          </div>
        )}

        {!file ? (
          <>
            {/* Cloud Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-3 sm:p-4 shadow-lg">
                  <Upload
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                Drop your resume here
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Support for PDF, DOCX (Max 10MB)
              </p>
            </div>
          </>
        ) : (
          /* Selected File Display - Centered with icon */
          <div className="text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="relative bg-gray-700 dark:bg-gray-600 rounded-full p-3 sm:p-4 shadow-lg">
                  <Upload
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 px-4">
              {file.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to process
            </p>
          </div>
        )}
      </div>
      <AnimatedButton
        disabled={!file}
        onClick={handleUpload}
        progress={progress}
      />

      <div className="text-center mt-6 space-y-1">
        <p className="text-gray-500 dark:text-gray-400 text-base">
          Don&apos;t have a resume? No problem!
        </p>
        <button
          onClick={() => {}} // TODO: Add manual creation handler
          className="text-gray-900 dark:text-white font-medium hover:underline flex items-center justify-center gap-1 mx-auto transition-colors"
        >
          Create portfolio manually instead <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
