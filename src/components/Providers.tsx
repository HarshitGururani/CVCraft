"use client";

import { SessionProvider } from "next-auth/react";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ResumeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ResumeProvider>
    </SessionProvider>
  );
}
