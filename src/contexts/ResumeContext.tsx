"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ResumeData } from "@/types/resume";

interface ResumeContextType {
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData | null) => void;
  rawText: string | null;
  setRawText: (text: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RESUME_DATA: "cvcraft_resume_data",
  RAW_TEXT: "cvcraft_raw_text",
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeDataState] = useState<ResumeData | null>(null);
  const [rawText, setRawTextState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedResumeData = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
      const savedRawText = localStorage.getItem(STORAGE_KEYS.RAW_TEXT);

      if (savedResumeData) {
        setResumeDataState(JSON.parse(savedResumeData));
        console.log("✅ Loaded resume data from localStorage");
      }

      if (savedRawText) {
        setRawTextState(savedRawText);
        console.log("✅ Loaded raw text from localStorage");
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Wrapper functions to sync with localStorage
  const setResumeData = React.useCallback((data: ResumeData | null) => {
    setResumeDataState(data);
    if (data) {
      localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(data));
      console.log("💾 Saved resume data to localStorage");
    } else {
      localStorage.removeItem(STORAGE_KEYS.RESUME_DATA);
    }
  }, []);

  const setRawText = React.useCallback((text: string | null) => {
    setRawTextState(text);
    if (text) {
      localStorage.setItem(STORAGE_KEYS.RAW_TEXT, text);
      console.log("💾 Saved raw text to localStorage");
    } else {
      localStorage.removeItem(STORAGE_KEYS.RAW_TEXT);
    }
  }, []);

  const clearData = React.useCallback(() => {
    setResumeDataState(null);
    setRawTextState(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEYS.RESUME_DATA);
    localStorage.removeItem(STORAGE_KEYS.RAW_TEXT);
    console.log("🗑️ Cleared all resume data");
  }, []);

  // Don't render children until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        rawText,
        setRawText,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
