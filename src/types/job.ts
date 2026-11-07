export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type LocationType = 'Remote' | 'On-site' | 'Hybrid';
export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead / Principal';
export type JobStatus = 'active' | 'draft' | 'closed';

export type ApplicationStage = 
  | 'applied' 
  | 'screening' 
  | 'interview' 
  | 'offer' 
  | 'hired' 
  | 'rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  department: string;
  type: JobType;
  locationType: LocationType;
  location: string;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  status: JobStatus;
  createdAt: string;
  applicantCount: number;
  featured?: boolean;
}

export interface RecruiterNote {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface ApplicationTimeline {
  stage: ApplicationStage;
  timestamp: string;
  note?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateLocation: string;
  portfolioUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  resumeFileName: string;
  resumeUrl?: string;
  resumeText?: string;
  coverLetter?: string;
  experienceYears: number;
  currentRole?: string;
  currentCompany?: string;
  skills: string[];
  screeningAnswers?: Record<string, string>;
  stage: ApplicationStage;
  rating?: number;
  interviewDate?: string;
  notes: RecruiterNote[];
  timeline: ApplicationTimeline[];
  appliedAt: string;
  updatedAt: string;
  avatarUrl?: string;
}

export interface RecruitmentStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  hiredCount: number;
  inInterviewCount: number;
  stageDistribution: Record<ApplicationStage, number>;
  departmentBreakdown: { department: string; count: number }[];
  topSkills: { skill: string; demand: number }[];
}
