/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Layout,
  Brain,
  Plus,
  Trash2,
  CheckCircle,
  Sparkles,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ResumeData } from "@/types/resume";

interface ResumeFormEditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  templateName?: string;
  onSwitchTemplate?: () => void;
}

const TABS = [
  { id: "personal", icon: User, label: "Personal Info" },
  { id: "summary", icon: Sparkles, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: Layout, label: "Projects" },
  { id: "skills", icon: Brain, label: "Skills" },
  { id: "education", icon: GraduationCap, label: "Education" },
];

export default function ResumeFormEditor({
  data,
  onChange,
  templateName,
  onSwitchTemplate,
}: ResumeFormEditorProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateData = (path: string, value: any) => {
    // Deep clone to avoid mutating nested objects (shallow copy breaks React change detection)
    const newData = JSON.parse(JSON.stringify(data)) as any;
    const keys = path.split(".");
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    console.log(
      `[Editor] updateData path=${path} value=${value} → personalInfo.title=${newData.personalInfo?.title}`,
    );
    onChange(newData as ResumeData);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoSection
            data={data.personalInfo}
            update={(k: string, v: any) => updateData(`personalInfo.${k}`, v)}
          />
        );
      case "summary":
        return (
          <div className="space-y-6">
            <header>
              <h2 className="text-xl font-bold text-gray-900">
                About / Profile
              </h2>
              <p className="text-xs text-gray-400">
                Write a professional summary or profile description.
              </p>
            </header>
            <textarea
              value={data.summary || ""}
              onChange={(e) => updateData("summary", e.target.value)}
              className={cn(
                "w-full h-40 border rounded-lg p-3 text-sm transition-colors resize-none shadow-sm focus:outline-none",
                templateName?.toLowerCase() === "terminal"
                  ? "bg-[#0d1117] text-[#56d364] border-[#30363d] font-mono focus:border-[#56d364]"
                  : "bg-white border-gray-200 text-gray-700 focus:border-primary/50",
              )}
              placeholder={
                templateName?.toLowerCase() === "terminal"
                  ? "> Write your mission statement here..."
                  : templateName?.toLowerCase() === "maverick"
                    ? "Pushing the boundaries of digital design and development with a focus on high-impact creativity."
                    : "Breaking boundaries through creative innovation and strategic design..."
              }
            />
          </div>
        );
      case "experience":
        return (
          <ExperienceSection
            items={data.experience || []}
            update={(val: any[]) => updateData("experience", val)}
          />
        );
      case "projects":
        return (
          <ProjectsSection
            items={data.projects || []}
            update={(val: any[]) => updateData("projects", val)}
          />
        );
      case "skills":
        return (
          <SkillsSection
            data={data.skills || {}}
            update={(val: any) => updateData("skills", val)}
          />
        );
      case "education":
        return (
          <EducationSection
            items={data.education || []}
            update={(val: any[]) => updateData("education", val)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar Navigation */}
      <div className="w-16 border-r border-gray-200 flex flex-col items-center py-6 gap-6 bg-gray-50">
        {TABS.filter((tab) => {
          // Always show core sections
          if (
            [
              "personal",
              "skills",
              "experience",
              "education",
              "summary",
            ].includes(tab.id)
          )
            return true;
          // Only show optional sections if they have data
          if (tab.id === "projects")
            return data.projects && data.projects.length > 0;
          return true;
        }).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-200"
            }`}
            title={tab.label}
          >
            <tab.icon size={20} />
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-gray-200 w-full flex flex-col items-center gap-4">
          <button
            onClick={onSwitchTemplate}
            className="p-3 rounded-xl transition-all text-gray-400 hover:text-primary hover:bg-primary/5 group"
            title="Change Template"
          >
            <Palette
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="mx-auto max-w-2xl">{renderSection()}</div>
        </div>

        {/* Fixed Save Footer - Hidden if already a saved resume to avoid redundancy */}
        {!data._id && (
          <div className="p-4 border-t border-gray-200 bg-white z-10">
            <Button
              onClick={handleSave}
              className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold h-10 shadow-lg shadow-primary/10 transition-transform active:scale-95"
            >
              <CheckCircle size={16} />
              Save Changes
            </Button>
          </div>
        )}

        {/* Toast Notification */}
        <div
          className={cn(
            "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform",
            showToast
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none",
          )}
        >
          <div className="bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl border border-green-500/30">
            <CheckCircle size={14} className="animate-bounce" />
            <span className="text-xs font-bold tracking-tight">
              Changes saved successfully!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  onAdd,
}: {
  title: string;
  description: string;
  onAdd?: () => void;
}) {
  return (
    <header className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-gray-400 font-medium">{description}</p>
      </div>
      {onAdd && (
        <Button
          onClick={onAdd}
          variant="outline"
          size="sm"
          className="border-gray-200 bg-white text-gray-500 hover:text-primary hover:border-primary/20 gap-2 h-7 text-xs px-2 shadow-sm"
        >
          <Plus size={12} />
          Add
        </Button>
      )}
    </header>
  );
}

function PersonalInfoSection({ data, update }: any) {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Personal Info"
        description="Your contact details."
      />

      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            Full Name
          </label>
          <Input
            value={data.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            Professional Title
          </label>
          <Input
            value={data.title || ""}
            onChange={(e) => update("title", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            Email
          </label>
          <Input
            value={data.email || ""}
            onChange={(e) => update("email", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            Phone
          </label>
          <Input
            value={data.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            Location
          </label>
          <Input
            value={data.location || ""}
            onChange={(e) => update("location", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <Separator className="bg-gray-100 my-2" />

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            GitHub URL
          </label>
          <Input
            value={data.github || ""}
            onChange={(e) => update("github", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
            LinkedIn URL
          </label>
          <Input
            value={data.linkedin || ""}
            onChange={(e) => update("linkedin", e.target.value)}
            className="bg-white border-gray-200 focus:border-primary/50 text-gray-700 h-9 text-sm shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceSection({ items, update }: any) {
  const addItem = () => {
    const newItem = {
      title: "New Position",
      company: "New Company",
      startDate: "Jan 2024",
      endDate: "Present",
      description: ["Job responsibility..."],
      location: "Remote",
    };
    update([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    update(newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    update(newItems);
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Experience"
        description="Professional history."
        onAdd={addItem}
      />

      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="group relative bg-white border border-gray-200 rounded-xl p-3 transition-all hover:border-primary/20 shadow-sm"
          >
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Job Title
                </label>
                <Input
                  value={item.title || ""}
                  onChange={(e) => updateItem(idx, "title", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Company
                </label>
                <Input
                  value={item.company || ""}
                  onChange={(e) => updateItem(idx, "company", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Dates
                </label>
                <div className="flex gap-2">
                  <Input
                    value={item.startDate || ""}
                    onChange={(e) =>
                      updateItem(idx, "startDate", e.target.value)
                    }
                    placeholder="Start"
                    className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                  />
                  <Input
                    value={item.endDate || ""}
                    onChange={(e) => updateItem(idx, "endDate", e.target.value)}
                    placeholder="End"
                    className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Location
                </label>
                <Input
                  value={item.location || ""}
                  onChange={(e) => updateItem(idx, "location", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Description
                </label>
                <textarea
                  value={
                    Array.isArray(item.description)
                      ? item.description.join("\n")
                      : item.description || ""
                  }
                  onChange={(e) =>
                    updateItem(idx, "description", e.target.value.split("\n"))
                  }
                  className="w-full h-24 bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 focus:border-primary/50 transition-colors resize-none shadow-xs"
                  placeholder="Points per line..."
                />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl text-gray-600">
            No work experience added yet.
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsSection({ items, update }: any) {
  const addItem = () => {
    const newItem = {
      name: "New Project",
      description: "Project description...",
      highlights: ["Key achievement..."],
      technologies: ["React"],
      liveUrl: "",
      githubUrl: "",
    };
    update([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    update(newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    update(newItems);
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Projects"
        description="Your best work."
        onAdd={addItem}
      />

      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="group relative bg-white border border-gray-200 rounded-xl p-3 transition-all hover:border-primary/20 shadow-sm"
          >
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Project Name
                </label>
                <Input
                  value={item.name || ""}
                  onChange={(e) => updateItem(idx, "name", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Description
                </label>
                <textarea
                  value={item.description || ""}
                  onChange={(e) =>
                    updateItem(idx, "description", e.target.value)
                  }
                  className="w-full h-16 bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 focus:outline-none focus:border-primary/50 transition-colors resize-none shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Key Highlights
                </label>
                <textarea
                  value={
                    Array.isArray(item.highlights)
                      ? item.highlights.join("\n")
                      : item.highlights || ""
                  }
                  onChange={(e) =>
                    updateItem(idx, "highlights", e.target.value.split("\n"))
                  }
                  className="w-full h-24 bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 focus:outline-none focus:border-primary/50 transition-colors resize-none shadow-xs"
                  placeholder="Bullet points (one per line)..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
                  Technologies
                </label>
                <Input
                  value={(item.technologies || []).join(", ")}
                  onChange={(e) =>
                    updateItem(
                      idx,
                      "technologies",
                      e.target.value.split(",").map((s) => s.trim()),
                    )
                  }
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                  placeholder="React, Tailwind, Node.js..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Live URL
                </label>
                <Input
                  value={item.liveUrl || ""}
                  onChange={(e) => updateItem(idx, "liveUrl", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs placeholder:text-gray-300 font-mono focus:border-primary/50"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  GitHub URL
                </label>
                <Input
                  value={item.githubUrl || ""}
                  onChange={(e) => updateItem(idx, "githubUrl", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs placeholder:text-gray-300 font-mono focus:border-primary/50"
                  placeholder="https://github..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection({ data, update }: any) {
  const updateList = (type: string, val: string) => {
    const list = val
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    update({ ...data, [type]: list });
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Skills"
        description="Categorize your technical expertise."
      />

      <div className="space-y-6">
        {["languages", "technologies", "tools", "other"].map((skillType) => (
          <div key={skillType} className="space-y-2">
            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest pl-1">
              {skillType === "languages"
                ? "Programming Languages"
                : skillType === "technologies"
                  ? "Frameworks & Libs"
                  : skillType.charAt(0).toUpperCase() + skillType.slice(1)}
            </label>
            <Input
              value={(data[skillType] || []).join(", ")}
              onChange={(e) => updateList(skillType, e.target.value)}
              className="bg-white border-gray-200 text-gray-700 shadow-sm focus:border-primary/50"
              placeholder="React, TypeScript, Node.js..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ items, update }: any) {
  const addItem = () => {
    const newItem = {
      degree: "Bachelors",
      institution: "University",
      year: "2020 - 2024",
      marks: "",
    };
    update([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    update(newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    update(newItems);
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Education"
        description="Academic record."
        onAdd={addItem}
      />

      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="group relative bg-white border border-gray-200 rounded-xl p-3 transition-all hover:border-primary/20 shadow-sm"
          >
            <button
              onClick={() => removeItem(idx)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Degree / Major
                </label>
                <Input
                  value={item.degree || ""}
                  onChange={(e) => updateItem(idx, "degree", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Institution
                </label>
                <Input
                  value={item.institution || ""}
                  onChange={(e) =>
                    updateItem(idx, "institution", e.target.value)
                  }
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Year
                </label>
                <Input
                  value={item.year || ""}
                  onChange={(e) => updateItem(idx, "year", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs font-mono focus:border-primary/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">
                  Marks (Optional)
                </label>
                <Input
                  value={item.marks || ""}
                  onChange={(e) => updateItem(idx, "marks", e.target.value)}
                  className="bg-white border-gray-200 text-gray-700 h-8 text-xs focus:border-primary/50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
