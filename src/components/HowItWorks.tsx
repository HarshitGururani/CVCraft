/* eslint-disable react-hooks/set-state-in-effect */
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// ─── Swap these with your real MacBook mockup PNGs ───────────────────────────
const STEP_IMAGES = ["/step1.png", "/step2.png", "/step3.png", "/step4.png"];

const PLACEHOLDER_META = [
  { emoji: "📤", label: "Upload Your Resume" },
  { emoji: "🎨", label: "Choose Your Template" },
  { emoji: "✏️", label: "Edit & Personalise" },
  { emoji: "🚀", label: "Export or Publish" },
];

const steps = [
  {
    number: "01",
    heading: "Upload Your Resume",
    description:
      "Drop your PDF or DOCX resume. Our parser extracts every detail instantly — no manual entry, no formatting headaches.",
  },
  {
    number: "02",
    heading: "Choose Your Template",
    description:
      "Select from our curated collection of professional templates. Find the style that best perfectly represents your personal brand.",
  },
  {
    number: "03",
    heading: "Edit & Personalise",
    description:
      "Refine your content, swap templates, and tune every detail. Your portfolio, your way — with professional design built in.",
  },
  {
    number: "04",
    heading: "Export or Publish",
    description:
      "Ship your portfolio instantly with a shareable link or download clean React / HTML code. Zero lock-in, full ownership.",
  },
];

// ─── Placeholder card ────────────────────────────────────────────────────────
const Placeholder = ({ index }: { index: number }) => {
  const m = PLACEHOLDER_META[index];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--secondary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 32,
          background: "var(--background)",
          borderBottom: "1px solid oklch(0.9 0.007 247.896)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
          gap: 6,
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div
            key={c}
            style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
          />
        ))}
      </div>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: "var(--background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          boxShadow: "0 4px 16px oklch(0 0 0 / 0.08)",
          border: "1px solid oklch(0.9 0.007 247.896)",
        }}
      >
        {m.emoji}
      </div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 700,
            color: "var(--foreground)",
          }}
        >
          {m.label}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 11,
            color: "var(--muted-foreground)",
          }}
        >
          Replace with your PNG mockup
        </p>
      </div>
    </div>
  );
};

// ─── Image panel with fade + slide-up transition ──────────────────────────────
const MockupPanel = ({ activeStep }: { activeStep: number }) => {
  const [bottomStep, setBottomStep] = useState(activeStep);
  const [topStep, setTopStep] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevRef = useRef(activeStep);

  useEffect(() => {
    if (activeStep === prevRef.current) return;
    prevRef.current = activeStep;

    // 1. Set the new step but keep it invisible (opacity 0)
    setTopStep(activeStep);
    setIsTransitioning(false); // Ensure it starts at 0

    // 2. Wait a tiny bit so the browser registers the "hidden" state
    const startTimer = setTimeout(() => {
      setIsTransitioning(true); // Now animate to opacity 1
    }, 20);

    // 3. After the animation finishes, clean up the layers
    const finishTimer = setTimeout(() => {
      setBottomStep(activeStep);
      setTopStep(null);
      setIsTransitioning(false);
    }, 450); // Slightly longer than the 0.4s transition

    return () => {
      clearTimeout(startTimer);
      clearTimeout(finishTimer);
    };
  }, [activeStep]);

  const isPlaceholder = (src: string) => src.startsWith("/mockups/");

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "var(--card)",
        border: "1px solid oklch(0.9 0.007 247.896)",
        boxShadow:
          "0 1px 3px oklch(0 0 0 / 0.06), 0 16px 48px oklch(0 0 0 / 0.09)",
        position: "relative",
      }}
    >
      {/* Bottom Layer (Current/Previous) */}
      <div style={{ position: "absolute", inset: 0 }}>
        {isPlaceholder(STEP_IMAGES[bottomStep]) ? (
          <Placeholder index={bottomStep} />
        ) : (
          <Image
            src={STEP_IMAGES[bottomStep]}
            alt=""
            fill
            unoptimized
            priority
            style={{ objectFit: "contain", display: "block" }}
          />
        )}
      </div>

      {/* Top Layer (Incoming) */}
      {topStep !== null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: isTransitioning ? 1 : 0,
            transform: isTransitioning ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {isPlaceholder(STEP_IMAGES[topStep]) ? (
            <Placeholder index={topStep} />
          ) : (
            <Image
              src={STEP_IMAGES[topStep]}
              alt=""
              fill
              unoptimized
              priority
              style={{ objectFit: "contain", display: "block" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function HowItWorksScroll() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.9999, -top / scrollable));
      const next = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length),
      );
      setActiveStep(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .hiw-step { transition: opacity 0.38s ease; }
        .hiw-step.active   { opacity: 1; }
        .hiw-step.inactive { opacity: 0.28; }

        .hiw-bubble {
          width: 38px; height: 38px;
          border-radius: 10px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; letter-spacing: -0.2px;
          transition: background 0.38s ease, color 0.38s ease,
                      box-shadow 0.38s ease, transform 0.38s ease;
        }
        .hiw-bubble.active {
          background: var(--primary);
          color: var(--primary-foreground);
          box-shadow: 0 4px 16px oklch(0.18 0.09 265 / 0.25);
          transform: scale(1.06);
        }
        .hiw-bubble.done {
          background: var(--primary);
          color: var(--primary-foreground);
        }
        .hiw-bubble.upcoming {
          background: var(--muted);
          color: var(--muted-foreground);
        }

        .hiw-connector { transition: background 0.38s ease; }

        .hiw-dot {
          height: 5px; border-radius: 3px;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease;
        }
      `}</style>

      <div
        ref={sectionRef}
        className="relative"
        style={{
          // Only apply the ultra-tall scroll height on desktop
          height:
            typeof window !== "undefined" && window.innerWidth >= 1024
              ? `calc(100vh + ${(steps.length - 1) * 200}px)`
              : "auto",
        }}
      >
        <div className="lg:sticky lg:top-0 lg:h-screen flex items-center overflow-hidden py-16 lg:py-0">
          <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
            {/* ── LEFT column ── */}
            <div>
              <p className="m-0 mb-1 text-[11px] font-bold text-muted-foreground uppercase tracking-[2px]">
                How it works
              </p>

              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-balance mb-12">
                Four steps to your <span>perfect portfolio</span>
              </h2>

              <div className="flex flex-col gap-0">
                {steps.map((step, i) => {
                  // On mobile, everything is "active". On desktop, follow scroll.
                  const isDesktop =
                    typeof window !== "undefined" && window.innerWidth >= 1024;
                  const isActive = !isDesktop || activeStep === i;
                  const isDone = isDesktop && activeStep > i;

                  return (
                    <div
                      key={i}
                      className={`hiw-step flex gap-4 items-start ${isActive ? "active" : "inactive"}`}
                    >
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={`hiw-bubble ${isActive ? "active" : isDone ? "done" : "upcoming"}`}
                        >
                          {isDone ? (
                            <svg
                              width="13"
                              height="13"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.8"
                              viewBox="0 0 24 24"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            step.number
                          )}
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className="hiw-connector w-[2px] h-8 lg:h-8 mt-1 rounded-[2px]"
                            style={{
                              background: isDone
                                ? "var(--primary)"
                                : "var(--muted)",
                            }}
                          />
                        )}
                      </div>

                      <div className={`pb-8 lg:pb-8 pt-1.5`}>
                        <h3
                          className="m-0 mb-1 text-xl font-bold tracking-[-0.2px] transition-colors duration-300"
                          style={{
                            color: isActive
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                          }}
                        >
                          {step.heading}
                        </h3>
                        <p
                          className="m-0 text-sm leading-relaxed max-w-[300px] transition-colors duration-300"
                          style={{
                            color: isActive
                              ? "var(--muted-foreground)"
                              : "oklch(0.78 0.02 257)",
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT column (Desktop Only) ── */}
            <div className="hidden lg:flex flex-col items-center gap-4">
              <MockupPanel activeStep={activeStep} />
              <div className="flex gap-1.5 items-center">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="hiw-dot"
                    style={{
                      width: i === activeStep ? 20 : 6,
                      background:
                        i === activeStep
                          ? "var(--primary)"
                          : i < activeStep
                            ? "oklch(0.45 0.07 265)"
                            : "var(--muted)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
