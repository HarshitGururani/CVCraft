"use client";
import dynamic from "next/dynamic";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import WhatYouGet from "@/components/WhatYouGet";
import React from "react";

const FileUpload = dynamic(() => import("@/components/FileUpload"), {
  ssr: false,
});

const page = () => {
  return (
    <main className="w-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 lg:pt-16 lg:pb-20">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[48px_48px]"></div>

        {/* Decorative Blurs and Frames */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[900px] h-[500px] border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/30 rounded-xl shadow-2xl -z-10 -rotate-2 scale-90 opacity-40 backdrop-blur-sm">
            <div className="h-12 border-b border-gray-100 dark:border-gray-700 flex items-center px-6 gap-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-xl">
              <div className="w-3 h-3 rounded-full bg-red-400/30"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/30"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/30"></div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <MaxWidthWrapper className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-balance">
              Craft your resume into a{" "}
              <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                portfolio
              </span>
            </h1>
            <p className="mt-6 text-lg leading-6 text-gray-600 dark:text-gray-300 max-w-2xl">
              Instantly convert your static PDF CV into a stunning, live website
              to showcase your work to the world. No coding required.
            </p>
          </div>

          <div className="mt-10">
            <FileUpload />
          </div>
        </MaxWidthWrapper>
      </section>

      <HowItWorks />
      <WhatYouGet />
      <Benefits />
    </main>
  );
};

export default page;
