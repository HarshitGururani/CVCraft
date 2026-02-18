"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Clock,
  ExternalLink,
  Trash2,
  Plus,
  Loader2,
  ChevronRight,
  Layout,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

interface ResumeHistory {
  _id: string;
  personalInfo: {
    name: string;
    email: string;
  };
  templateId?: string;
  isPublished?: boolean;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated") {
      fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      const data = await res.json();
      if (data.resumes) {
        setResumes(data.resumes);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push("/");
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this portfolio?")) return;

    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r._id !== id));
        toast.success("Portfolio deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete resume:", error);
      toast.error("Failed to delete portfolio");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0a0a0c] flex flex-col selection:bg-primary/10 transition-colors duration-500">
      <Navbar />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-5%] right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 flex-1 w-full animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-2 border border-primary/5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              User Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Welcome back,{" "}
              <span className="text-primary italic">
                {session?.user?.name?.split(" ")[0]}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Your professional journey, beautifully organized and ready to
              share.
            </p>
          </div>
          <Button
            onClick={handleCreateNew}
            className="group h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold gap-3 shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Plus
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            New Portfolio
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="relative group overflow-hidden bg-card rounded-[2.5rem] border border-border p-12 md:p-24 text-center shadow-xl shadow-primary/5">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                <FileText className="text-primary/60 w-10 h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Let&apos;s build your masterpiece
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed text-md">
                Transform your static career history into a dynamic, live
                portfolio that speaks volumes.
              </p>
              <Button
                onClick={handleCreateNew}
                size="lg"
                className="rounded-2xl px-10 h-14 text-md font-bold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Start Crafting
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume: ResumeHistory, index: number) => (
              <div
                key={resume._id}
                className="group relative flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Accent Bar */}
                <div className="h-1.5 w-full bg-primary/40 group-hover:bg-primary transition-all duration-500"></div>

                <div className="p-8 pb-4 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-primary/10 transition-colors duration-500">
                      <FileText className="text-muted-foreground group-hover:text-primary w-7 h-7 transition-colors" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(resume._id, e)}
                      className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {resume.personalInfo?.name || "Untitled Portfolio"}
                  </h3>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="p-1.5 rounded-lg bg-secondary">
                        <Clock size={14} className="text-muted-foreground" />
                      </div>
                      <span>
                        Updated{" "}
                        {formatDistanceToNow(new Date(resume.updatedAt))} ago
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="p-1.5 rounded-lg bg-secondary">
                        <Layout size={14} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground italic">
                        {resume.templateId || "Brutalist"} Template
                      </span>
                    </div>

                    {/* Live Portfolio Link */}
                    {resume.isPublished && resume.slug && (
                      <a
                        href={`/p/${resume.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 text-sm text-green-600 hover:text-green-700 group/link"
                      >
                        <div className="p-1.5 rounded-lg bg-green-50 shrink-0">
                          <Globe size={14} className="text-green-500" />
                        </div>
                        <span className="font-medium underline underline-offset-2 decoration-green-300 group-hover/link:decoration-green-600 truncate">
                          /p/{resume.slug}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-8 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-12 text-[11px] font-bold uppercase tracking-wider gap-2 rounded-xl border-border hover:bg-secondary transition-all"
                      onClick={() => router.push(`/preview?id=${resume._id}`)}
                    >
                      Preview
                      <ExternalLink size={14} />
                    </Button>
                    <Button
                      className="h-12 text-[11px] font-bold uppercase tracking-wider gap-2 rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all font-sans"
                      onClick={() => router.push(`/preview?id=${resume._id}`)}
                    >
                      Edit Data
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
