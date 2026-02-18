import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Pencil,
  LayoutGrid,
  Download,
  Code2,
  Palette,
  Smartphone,
  Link2,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    title: "Live Editing",
    description: "Update content anytime",
    icon: Pencil,
    fill: false,
  },
  {
    title: "Professional Templates",
    description: "Multiple clean designs",
    icon: LayoutGrid,
    fill: true,
  },
  {
    title: "HTML Export",
    description: "Host anywhere you want",
    icon: Download,
    fill: false,
  },
  {
    title: "React Project",
    description: "Full source code",
    icon: Code2,
    fill: false,
  },
  {
    title: "Custom Styling",
    description: "Your colors and sections",
    icon: Palette,
    fill: true,
  },
  {
    title: "Mobile Responsive",
    description: "Perfect on any device",
    icon: Smartphone,
    fill: true,
  },
  {
    title: "Shareable Link",
    description: "Optional permanent URL",
    icon: Link2,
    fill: false,
  },
  {
    title: "Always Editable",
    description: "Update as you grow",
    icon: RefreshCw,
    fill: false,
  },
];

const WhatYouGet = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24 my-3">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            What You Get
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Everything you need to build your portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-6 flex h-12 w-12 items-center justify-center text-primary">
                <feature.icon
                  className="h-8 w-8"
                  strokeWidth={2.5}
                  fill={feature.fill ? "currentColor" : "none"}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default WhatYouGet;
