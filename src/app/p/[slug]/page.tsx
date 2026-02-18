import { Metadata } from "next";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Resume from "@/models/Resume";
import TemplatePreview from "@/components/TemplatePreview";
import { ResumeData } from "@/types/resume";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PublicPortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const resume = await Resume.findOne({ slug, isPublished: true });

  if (!resume) {
    return {
      title: "Portfolio Not Found - CV Craft",
    };
  }

  const title = `${resume.personalInfo.name}'s Portfolio - CV Craft`;
  const description =
    resume.summary ||
    `Professional portfolio of ${resume.personalInfo.name}. Built with CV Craft.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      firstName: resume.personalInfo.name.split(" ")[0],
      lastName: resume.personalInfo.name.split(" ").slice(1).join(" "),
      username: slug,
      images: [
        {
          url: "/og-image.png", // Or a dynamic one if available
          width: 1200,
          height: 630,
          alt: `${resume.personalInfo.name}'s Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: PublicPortfolioPageProps) {
  const { slug } = await params;
  await dbConnect();

  interface PortfolioDocument extends ResumeData {
    publishedData?: ResumeData;
  }

  // Use .lean() to get a plain JS object that matches our interface
  const resume = (await Resume.findOne({
    slug,
    isPublished: true,
  }).lean()) as PortfolioDocument | null;

  if (!resume) {
    notFound();
  }

  // userData should be the snapshot of data at the time of publishing
  // fallback to CURRENT data if for some reason publishedData is missing
  const userData = resume.publishedData || (resume as ResumeData);

  return (
    <div className="fixed inset-0 w-full h-full">
      <TemplatePreview
        templateName={resume.templateId || "brutalist"}
        userData={userData}
      />
    </div>
  );
}
