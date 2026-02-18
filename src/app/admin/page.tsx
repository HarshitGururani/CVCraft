"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    templateId: "",
    name: "",
    description: "",
    tags: "",
    preview: "",
    category: "Professional",
    html: "",
    css: "",
    js: "",
  });

  const isAdmin = session?.user?.email === "harshit15gg@gmail.com";

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (status === "authenticated" && !isAdmin)
    ) {
      router.push("/");
    }
  }, [status, isAdmin, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        toast.success("Template uploaded successfully!");
        setFormData({
          templateId: "",
          name: "",
          description: "",
          tags: "",
          preview: "",
          category: "Professional",
          html: "",
          css: "",
          js: "",
        });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to upload template");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0a0a0c]">
      <Navbar />
      <MaxWidthWrapper className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your portfolio templates
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111114] rounded-3xl border border-border shadow-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <div className="p-8 border-b border-border bg-gray-50/50">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Plus className="text-primary" size={20} />
              Upload New Template
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Template ID
                </label>
                <input
                  name="templateId"
                  value={formData.templateId}
                  onChange={handleChange}
                  placeholder="e.g. brutalist"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Modern Brutalist"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                >
                  <option value="Professional">Professional</option>
                  <option value="Creative">Creative</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Developer">Developer</option>
                  <option value="Premium / Executive">
                    Premium / Executive
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. modern, bold, clean"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe the template..."
                className="w-full h-24 p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Preview Image URL
              </label>
              <input
                name="preview"
                value={formData.preview}
                onChange={handleChange}
                placeholder="https://example.com/preview.png"
                className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  HTML Structure
                </label>
                <textarea
                  name="html"
                  value={formData.html}
                  onChange={handleChange}
                  placeholder="<!-- HTML structure here -->"
                  className="w-full h-48 p-4 rounded-xl border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  CSS Styles
                </label>
                <textarea
                  name="css"
                  value={formData.css}
                  onChange={handleChange}
                  placeholder="/* CSS styles here */"
                  className="w-full h-48 p-4 rounded-xl border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  JS Logic
                </label>
                <textarea
                  name="js"
                  value={formData.js}
                  onChange={handleChange}
                  placeholder="// JS logic here"
                  className="w-full h-48 p-4 rounded-xl border border-border bg-background font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-border">
              <Button
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-3 shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                Upload Template
              </Button>
            </div>
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
