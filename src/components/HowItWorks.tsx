import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { CloudUpload, FileCheck2, Palette, Share2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Upload Your Resume",
      description:
        "Upload your PDF or DOCX resume. Processing happens in your browser.",
      icon: CloudUpload,
    },
    {
      title: "2. Content Extraction",
      description:
        "We automatically extract your skills, experience, and projects.",
      icon: FileCheck2,
    },
    {
      title: "3. Edit & Style",
      description:
        "Customize your content and choose from professional templates.",
      icon: Palette,
    },
    {
      title: "4. Export or Publish",
      description:
        "Download as HTML/React code, or publish instantly with a shareable link.",
      icon: Share2,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24 mb-5">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            How it Works
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Four simple steps to your portfolio
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div
            className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200 dark:bg-gray-800 hidden lg:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 dark:border-primary bg-white dark:bg-primary shadow-sm transition-all duration-300 group-hover:border-primary">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-[240px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default HowItWorks;
