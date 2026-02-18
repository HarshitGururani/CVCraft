export interface ResumeData {
  _id?: string;
  userId?: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    title?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
    location?: string;
  };
  summary?: string;
  skills: {
    languages?: string[];
    technologies?: string[];
    tools?: string[];
    other?: string[];
  };
  experience?: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
    marks?: string;
  }>;
  certificates?: string[];
  interests?: string[];
  isPublished?: boolean;
  slug?: string;
  isSaved?: boolean;
  templateId?: string;
}
