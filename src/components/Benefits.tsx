import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Layout, Link, Sparkles, Zap } from "lucide-react";

const Benefits = () => {
  const features = [
    {
      title: "Stand Out Immediately",
      description:
        "A live portfolio catches attention in a stack of plain text resumes. You're a professional with presence, not just another PDF.",
      icon: Sparkles,
    },
    {
      title: "Let Your Work Speak",
      description:
        "Show real projects and achievements that prove your capabilities. Skills on paper need context.",
      icon: Layout,
    },
    {
      title: "One Link, All Platforms",
      description:
        "One portfolio link works everywhere—LinkedIn, email, applications, networking. No more digging through folders.",
      icon: Link,
    },
    {
      title: "Always Ready to Impress",
      description:
        "Your portfolio is live and up-to-date, ready to share instantly for any opportunity.",
      icon: Zap,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24 border-t border-gray-100 dark:border-gray-800">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-balance">
            Why you should have a portfolio?
          </h2>
          <p className="mt-4 text-md text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Stand out from the crowd with a professional online presence that
            highlights your skills beyond a static document.
          </p>
        </div>

        <div className="mx-auto mt-12 lg:mt-16">
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
              >
                <dt className="text-base font-bold text-gray-900 dark:text-white">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 transition-all duration-300 shadow-sm text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  <p>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Benefits;
