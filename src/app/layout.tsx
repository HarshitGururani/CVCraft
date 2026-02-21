import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvcraft.vercel.app"),
  title: "CV Craft - Convert your CV into a Live Portfolio",
  alternates: {
    canonical: "/",
  },
  description:
    "Instantly convert your static PDF CV into a stunning, live website. No coding required. The easiest way to showcase your professional journey.",
  keywords: [
    "resume builder",
    "portfolio builder",
    "cv to portfolio",
    "live resume",
    "cv craft",
  ],
  authors: [{ name: "CV Craft Team" }],
  creator: "CV Craft",
  publisher: "CV Craft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cvcraft.vercel.app",
    title: "CV Craft - Convert your CV into a Live Portfolio",
    description:
      "Instantly convert your static PDF CV into a stunning, live website. No coding required.",
    siteName: "CV Craft",
    images: [
      {
        url: "https://cv-craft-kappa.vercel.app/og.png", // Explicit absolute URL
        width: 1200,
        height: 630,
        alt: "CV Craft - Professional Portfolio Builder",
        type: "image/png",
      },
      {
        url: "https://cv-craft-kappa.vercel.app/og.png", // Smaller fallback for WhatsApp
        width: 600,
        height: 600,
        alt: "CV Craft Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Craft - Convert your CV into a Live Portfolio",
    description:
      "Instantly convert your static PDF CV into a stunning, live website.",
    images: ["https://cv-craft-kappa.vercel.app/og.png"],
    creator: "@cvcraft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
