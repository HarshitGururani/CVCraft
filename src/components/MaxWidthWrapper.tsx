import { cn } from "@/lib/utils";
import React from "react";

interface MaxWidthWrapper {
  className?: string;
  children: React.ReactNode;
}
const MaxWidthWrapper = ({ className, children }: MaxWidthWrapper) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto h-full w-full px-4 md:px-16", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
