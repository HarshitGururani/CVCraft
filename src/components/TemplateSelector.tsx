/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  tags: string[];
}

// Hardcoded templates removed. Now using API.

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative group w-full text-left transition-all duration-300 rounded-xl overflow-hidden ${
        isSelected
          ? "ring-2 ring-primary shadow-lg"
          : "ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md"
      }`}
    >
      {/* Preview Area */}
      <div className="aspect-4/3 bg-linear-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Placeholder design - you can replace with actual template previews */}
        <div className="absolute inset-0 p-6 flex items-center justify-center">
          <div className="w-full h-full rounded-lg border-2 border-gray-300 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-400 mb-2">
                {template.name?.split(" ")[0] || "Template"}
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center px-4">
                {template.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
          {template.category}
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5 shadow-lg">
            <Check size={16} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-5 bg-white">
        <h3
          className={`text-lg font-semibold mb-2 ${isSelected ? "text-primary" : "text-gray-900"}`}
        >
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {template.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-bold uppercase tracking-tighter text-primary bg-primary/5 px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplate?: string;
  onNext?: () => void;
}

export default function TemplateSelector({
  onSelectTemplate,
  selectedTemplate,
  onNext,
}: TemplateSelectorProps) {
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(selectedTemplate || "");

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates");
        const data = await response.json();

        const fetchedTemplates = data.templates.map((t: any) => ({
          id: t.templateId,
          name: t.name || "Untitled",
          description: t.description,
          preview: t.preview || "",
          category: t.category || "General",
          tags: t.tags || [],
        }));

        setAvailableTemplates(fetchedTemplates);
        if (!selected && fetchedTemplates.length > 0) {
          const firstId = fetchedTemplates[0].id;
          setSelected(firstId);
          onSelectTemplate(firstId);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [onSelectTemplate, selectedTemplate, selected]);

  const handleSelect = (templateId: string) => {
    setSelected(templateId);
    onSelectTemplate(templateId);
  };

  if (loading) {
    return (
      <div className="w-full pb-32">
        <div className="mb-10 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-3"></div>
          <div className="h-6 w-96 bg-gray-100 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-4/3 bg-gray-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-32 animate-fadeIn">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Choose Your Style
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Select a premium design that best represents your professional brand.
          All templates are fully responsive and customizable.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selected === template.id}
            onSelect={() => handleSelect(template.id)}
          />
        ))}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              Next Step
            </span>
            <span className="text-lg font-semibold text-gray-900">
              Customization
            </span>
          </div>

          <button
            onClick={onNext}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Create my portfolio now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
