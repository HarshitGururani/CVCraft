"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Layout, Link, Sparkles, Zap, GraduationCap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Benefits = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24 border-t border-gray-100 dark:border-gray-800">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-balance">
            Why you should have a portfolio?
          </h2>
          <p className="mt-4 text-md text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Stand out from the crowd with a professional online presence that
            highlights your skills beyond a static document.
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={
              <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Stand Out Immediately"
            description="A live portfolio catches attention in a stack of plain text resumes. You're a professional with presence, not just another PDF."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Zap className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="Always Ready to Impress"
            description="Your portfolio is live and up-to-date, ready to share instantly for any opportunity that comes your way."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={
              <Layout className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Let Your Work Speak"
            description="Show real projects and achievements that prove your capabilities. Skills on paper need context — your portfolio provides it."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Link className="h-4 w-4 text-black dark:text-neutral-400" />}
            title="One Link, All Platforms"
            description="One portfolio link works everywhere — LinkedIn, email, and applications. No more digging through folders."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={
              <GraduationCap className="h-4 w-4 text-black dark:text-neutral-400" />
            }
            title="Built for Professionals"
            description="Crafted with care to ensure your career progression is highlighted with the best architectural patterns."
          />
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-56 list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 border-gray-200 dark:border-gray-800">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-900 p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-200 dark:border-gray-600 p-2 bg-white dark:bg-gray-800">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-gray-500 dark:text-neutral-400 md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Benefits;
