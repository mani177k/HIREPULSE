import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Job, Application, ApplicationStage, RecruitmentStats } from './src/types/job.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initial Seed Data
const initialJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer',
    company: 'PulseStream Cloud',
    companyLogo: '⚡',
    department: 'Engineering',
    type: 'Full-time',
    locationType: 'Remote',
    location: 'San Francisco, CA (or Remote US)',
    experienceLevel: 'Senior',
    salaryMin: 145000,
    salaryMax: 185000,
    currency: 'USD',
    description: 'We are seeking an experienced Senior Full-Stack Engineer to lead the architecture and development of our real-time collaborative workspace. You will build high-throughput backend services and refined, accessible web interfaces.',
    responsibilities: [
      'Architect robust Node.js and TypeScript microservices handling millions of events daily',
      'Build responsive, high-performance UI components with React, Tailwind CSS, and state management',
      'Drive engineering excellence through code reviews, automated testing, and CI/CD enhancements',
      'Collaborate closely with product managers, UX designers, and platform architects'
    ],
    requirements: [
      '5+ years professional experience building web applications at scale',
      'Deep proficiency in modern TypeScript, Node.js, and React',
      'Solid experience with RESTful APIs, WebSockets, and relational databases (PostgreSQL/SQL)',
      'Demonstrated track record of shipping production-grade software with observability'
    ],
    benefits: [
      'Competitive equity package and 401(k) matching with immediate vesting',
      '100% company-paid comprehensive health, dental, and vision insurance',
      '$3,000 annual home-office and continuous learning stipend',
      'Flexible PTO policy and mandatory wellness recharge days'
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'REST API'],
    status: 'active',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 14,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Lead Product Designer',
    company: 'Aura Systems',
    companyLogo: '✦',
    department: 'Design',
    type: 'Full-time',
    locationType: 'Hybrid',
    location: 'New York, NY',
    experienceLevel: 'Lead / Principal',
    salaryMin: 160000,
    salaryMax: 200000,
    currency: 'USD',
    description: 'Aura Systems is seeking a visionary Lead Product Designer to define our design system, unify complex developer workflows, and craft elegant user journeys across our enterprise portfolio.',
    responsibilities: [
      'Own end-to-end design strategy from discovery and wireframing to high-fidelity prototypes and design systems',
      'Conduct user research sessions with enterprise technical users and synthesize actionable insights',
      'Partner with engineering leads to ensure pixel-perfect fidelity and smooth interaction states',
      'Mentor junior designers and elevate design culture across the organization'
    ],
    requirements: [
      '6+ years of UX/UI design experience in B2B SaaS or developer tools',
      'Mastery of Figma, component token systems, and interaction design principles',
      'Strong portfolio showcasing complex desktop software simplified into intuitive experiences',
      'Comfortable with frontend basics (HTML/CSS mental models)'
    ],
    benefits: [
      'Annual equity grant and discretionary performance bonus',
      'Comprehensive wellness benefits including gym reimbursement',
      'Generous parental leave (16 weeks fully paid)',
      'Central Manhattan office with catered lunches and rooftop terrace'
    ],
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility (WCAG)'],
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 9,
    featured: true
  },
  {
    id: 'job-3',
    title: 'Cloud DevOps & Infrastructure Specialist',
    company: 'Kestrel Infrastructure',
    companyLogo: '☁',
    department: 'Infrastructure',
    type: 'Full-time',
    locationType: 'Remote',
    location: 'Austin, TX (Remote Worldwide)',
    experienceLevel: 'Senior',
    salaryMin: 140000,
    salaryMax: 175000,
    currency: 'USD',
    description: 'Help scale our global distributed infrastructure across multi-cloud environments. You will optimize Terraform pipelines, Kubernetes clusters, and zero-downtime deployment workflows.',
    responsibilities: [
      'Manage production Kubernetes clusters (EKS/GKE) with high availability and automated failover',
      'Implement and refine Infrastructure as Code (IaC) using Terraform and GitOps practices',
      'Strengthen platform security, automated vulnerability scans, and secret rotation',
      'Participate in on-call rotations with an emphasis on blameless postmortems'
    ],
    requirements: [
      '4+ years of hands-on Cloud Infrastructure and DevOps experience',
      'Proficiency with Kubernetes, Terraform, Helm, and GitHub Actions / GitLab CI',
      'Solid foundation in networking, VPC peering, and Linux systems administration',
      'Familiarity with Prometheus, Grafana, and OpenTelemetry instrumentation'
    ],
    benefits: [
      'Flexible remote schedule with asynchronous communication culture',
      'Top-tier medical coverage with health savings account (HSA)',
      'Home workstation budget updated every two years ($2,500)',
      'Annual company international retreats'
    ],
    skills: ['Kubernetes', 'Terraform', 'AWS', 'GCP', 'CI/CD', 'Prometheus'],
    status: 'active',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 18,
    featured: false
  },
  {
    id: 'job-4',
    title: 'Frontend React Engineer',
    company: 'Veloce Labs',
    companyLogo: '◆',
    department: 'Engineering',
    type: 'Full-time',
    locationType: 'Remote',
    location: 'San Francisco, CA (Remote)',
    experienceLevel: 'Mid-level',
    salaryMin: 115000,
    salaryMax: 140000,
    currency: 'USD',
    description: 'Join our customer-facing web team to craft lightning-fast web applications. You will work on animations, state management, and reusable UI components with unmatched attention to typography and responsiveness.',
    responsibilities: [
      'Implement accessible, responsive UI interfaces from Figma designs using React and Tailwind',
      'Optimize web performance, Core Web Vitals, and client-side rendering speeds',
      'Write comprehensive unit and integration tests with Vitest and Playwright',
      'Integrate with GraphQL and REST endpoints with resilient offline fallbacks'
    ],
    requirements: [
      '3+ years of professional React and TypeScript development experience',
      'Strong eye for micro-interactions, responsive CSS layouts, and semantic HTML',
      'Experience with state management solutions and server state caching',
      'Self-driven with strong async written communication skills'
    ],
    benefits: [
      'Equity options in high-growth seed stage company',
      'Full health, dental, and vision coverage',
      'Unlimited book purchasing program',
      'Co-working space pass anywhere in the world'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vitest', 'REST API'],
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 22,
    featured: true
  },
  {
    id: 'job-5',
    title: 'Technical Product Manager',
    company: 'FinApex Technologies',
    companyLogo: '◬',
    department: 'Product',
    type: 'Full-time',
    locationType: 'Hybrid',
    location: 'Chicago, IL',
    experienceLevel: 'Senior',
    salaryMin: 135000,
    salaryMax: 170000,
    currency: 'USD',
    description: 'Lead the roadmap for our core transaction reconciliation APIs. You will bridge technical architecture with enterprise client requirements and guide quarterly feature deliveries.',
    responsibilities: [
      'Define product specifications, user stories, and acceptance criteria for API products',
      'Collaborate with quantitative engineers, risk teams, and enterprise banking partners',
      'Track feature adoption metrics and prioritize backlog based on quantitative business impact',
      'Lead sprint plannings, stakeholder retrospectives, and customer feedback loops'
    ],
    requirements: [
      '4+ years of technical product management experience in FinTech or Developer Platforms',
      'Ability to read API documentation, write SQL queries, and validate system contracts',
      'Proven track record of translating complex regulations into streamlined workflows',
      'Exceptional stakeholder presentation and consensus-building skills'
    ],
    benefits: [
      'Competitive base + performance bonus + company equity',
      'Hybrid office setup (2 days in office, 3 days remote)',
      'Subsidized transit pass and on-site gym access',
      'Generous 401(k) matching at 6%'
    ],
    skills: ['Product Strategy', 'SQL', 'API Design', 'Scrum / Agile', 'Roadmapping'],
    status: 'active',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 7,
    featured: false
  },
  {
    id: 'job-6',
    title: 'Growth Marketing & Data Analyst',
    company: 'MetricFlow Media',
    companyLogo: '◎',
    department: 'Marketing',
    type: 'Full-time',
    locationType: 'Remote',
    location: 'Remote US / Canada',
    experienceLevel: 'Mid-level',
    salaryMin: 95000,
    salaryMax: 125000,
    currency: 'USD',
    description: 'Analyze inbound acquisition funnels, run A/B conversion experiments, and optimize our programmatic recruitment campaigns to scale organic reach.',
    responsibilities: [
      'Build automated reporting dashboards in Looker/Metabase tracking CAC, LTV, and churn',
      'Design, execute, and analyze conversion rate optimization experiments across web funnels',
      'Collaborate with content marketing and growth engineering on landing page performance',
      'Conduct cohort retention analyses and identify high-value customer expansion drivers'
    ],
    requirements: [
      '2-4 years of experience in growth analytics, marketing ops, or data analytics',
      'Strong SQL querying skills and experience with modern data stacks (Snowflake/BigQuery/dbt)',
      'Deep understanding of statistical significance and experimentation methodology',
      'Familiarity with Google Analytics 4, Mixpanel, and customer data platforms'
    ],
    benefits: [
      'Flexible remote schedule with asynchronous communication culture',
      'Health, dental, and vision insurance with employer contribution',
      'Annual $2,000 professional growth conference stipend',
      'Home office hardware package'
    ],
    skills: ['SQL', 'Data Analytics', 'A/B Testing', 'Growth Marketing', 'Tableau / Looker'],
    status: 'active',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 5,
    featured: false
  }
];

const initialApplications: Application[] = [
  {
    id: 'app-101',
    jobId: 'job-1',
    jobTitle: 'Senior Full-Stack Engineer',
    company: 'PulseStream Cloud',
    candidateName: 'Alex Mercer',
    candidateEmail: 'alex.mercer@example.com',
    candidatePhone: '+1 (555) 234-8901',
    candidateLocation: 'San Francisco, CA',
    portfolioUrl: 'https://alexmercer.dev',
    linkedInUrl: 'https://linkedin.com/in/alex-mercer-dev',
    githubUrl: 'https://github.com/alexmercer',
    resumeFileName: 'Alex_Mercer_Senior_Engineer_Resume.pdf',
    resumeText: 'Senior Full-Stack Engineer with 6 years experience specializing in TypeScript, Node.js microservices, and high-performance React architectures. Previously built real-time WebSocket messaging backend supporting 80k concurrent sessions at WaveScale. Maintained 99.98% service uptime and reduced API latency by 42%.',
    coverLetter: 'I have followed PulseStream Cloud since your launch and admire your emphasis on low-latency infrastructure. My background building distributed WebSocket microservices in TypeScript directly aligns with your real-time workspace goals.',
    experienceYears: 6,
    currentRole: 'Senior Software Engineer',
    currentCompany: 'WaveScale Systems',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    screeningAnswers: {
      noticePeriod: '2 weeks',
      expectedSalary: '$170,000',
      workAuthorization: 'Authorized to work in US without sponsorship'
    },
    stage: 'interview',
    rating: 5,
    interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: [
      {
        id: 'n-1',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Strong architectural answers during screen. Experience with Redis clusters and distributed events makes him a stellar fit for the PulseStream core team.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), note: 'Application received through careers portal' },
      { stage: 'screening', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Resume reviewed and approved by recruiter' },
      { stage: 'interview', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Technical deep-dive interview scheduled' }
    ],
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/src/assets/images/avatar_candidate_alex_1794038197060.jpg'
  },
  {
    id: 'app-102',
    jobId: 'job-2',
    jobTitle: 'Lead Product Designer',
    company: 'Aura Systems',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.design@example.com',
    candidatePhone: '+1 (555) 789-4321',
    candidateLocation: 'Brooklyn, NY',
    portfolioUrl: 'https://elenarostova.design',
    linkedInUrl: 'https://linkedin.com/in/elena-rostova',
    githubUrl: '',
    resumeFileName: 'Elena_Rostova_Lead_Product_Designer.pdf',
    resumeText: 'Staff Product Designer with 7+ years of experience crafting enterprise B2B SaaS design systems and developer tools. Led complete redesign of CloudVantage monitoring console, increasing task completion rate by 34%. Created Figma design token library adopted by 40+ engineers.',
    coverLetter: 'Leading design at Aura Systems is an exciting challenge. I specialize in taking highly dense technical data and organizing it into harmonious, intuitive desktop viewports.',
    experienceYears: 7,
    currentRole: 'Principal Product Designer',
    currentCompany: 'CloudVantage',
    skills: ['Figma', 'Design Systems', 'User Research', 'Typography', 'Prototyping'],
    screeningAnswers: {
      noticePeriod: '3 weeks',
      expectedSalary: '$185,000',
      workAuthorization: 'Authorized to work in US'
    },
    stage: 'offer',
    rating: 5,
    notes: [
      {
        id: 'n-2',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Portfolio review was unanimous 5/5. The design system showcase was best in class. Offer package extended.',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Applied online' },
      { stage: 'screening', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), note: 'Passed recruiter screen' },
      { stage: 'interview', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Completed final design presentation' },
      { stage: 'offer', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), note: 'Formal offer package extended' }
    ],
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/src/assets/images/avatar_candidate_elena_1794038197734.jpg'
  },
  {
    id: 'app-103',
    jobId: 'job-3',
    jobTitle: 'Cloud DevOps & Infrastructure Specialist',
    company: 'Kestrel Infrastructure',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@example.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateLocation: 'Austin, TX',
    portfolioUrl: 'https://marcusvance.tech',
    linkedInUrl: 'https://linkedin.com/in/marcus-vance-cloud',
    githubUrl: 'https://github.com/marcusvance',
    resumeFileName: 'Marcus_Vance_DevOps_Resume.pdf',
    resumeText: 'Cloud Architect with 5 years managing AWS/GCP Kubernetes clusters, Terraform modules, and automated incident recovery. Cut cloud infrastructure spend by 28% via automated spot instance provisioning and ARM migration.',
    coverLetter: 'I have deep hands-on expertise building multi-region Kubernetes clusters with zero-downtime blue/green deployment strategies.',
    experienceYears: 5,
    currentRole: 'Senior Site Reliability Engineer',
    currentCompany: 'Apex Networks',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Linux', 'Prometheus'],
    screeningAnswers: {
      noticePeriod: 'Immediate',
      expectedSalary: '$160,000',
      workAuthorization: 'US Citizen'
    },
    stage: 'screening',
    rating: 4,
    notes: [
      {
        id: 'n-3',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Impressive Terraform modules on GitHub. Scheduled for technical screen with infrastructure lead.',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Application submitted' },
      { stage: 'screening', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), note: 'Moved to phone screen review' }
    ],
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    avatarUrl: '/src/assets/images/avatar_candidate_marcus_1794038196994.jpg'
  },
  {
    id: 'app-104',
    jobId: 'job-4',
    jobTitle: 'Frontend React Engineer',
    company: 'Veloce Labs',
    candidateName: 'David Chen',
    candidateEmail: 'david.chen@example.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateLocation: 'Seattle, WA',
    portfolioUrl: 'https://davidchen.io',
    linkedInUrl: 'https://linkedin.com/in/david-chen-frontend',
    githubUrl: 'https://github.com/dchen-code',
    resumeFileName: 'David_Chen_Frontend_Developer.pdf',
    resumeText: 'Frontend developer with 4 years building reactive, high-performance web applications using React, Next.js, and TypeScript. Spearheaded design system implementation with 100% WCAG 2.1 AA compliance.',
    coverLetter: 'Passionate about typography, layout stability, and delivering joyful interactive experiences.',
    experienceYears: 4,
    currentRole: 'Frontend Developer',
    currentCompany: 'Nordic Creative Tech',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vitest'],
    screeningAnswers: {
      noticePeriod: '2 weeks',
      expectedSalary: '$130,000',
      workAuthorization: 'Authorized to work in US'
    },
    stage: 'applied',
    rating: 4,
    notes: [],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), note: 'Applied via careers site' }
    ],
    appliedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-105',
    jobId: 'job-1',
    jobTitle: 'Senior Full-Stack Engineer',
    company: 'PulseStream Cloud',
    candidateName: 'Sophia Miller',
    candidateEmail: 'sophia.m@example.com',
    candidatePhone: '+1 (555) 901-2345',
    candidateLocation: 'Toronto, ON (Remote)',
    portfolioUrl: 'https://sophiamiller.ca',
    linkedInUrl: 'https://linkedin.com/in/sophia-m-engineer',
    githubUrl: 'https://github.com/sophiam',
    resumeFileName: 'Sophia_Miller_FullStack_Engineer.pdf',
    resumeText: 'Full Stack Engineer with 5 years experience across Node.js, GraphQL, PostgreSQL, and modern React. Built payment checkout flows processing $12M annually.',
    coverLetter: 'Excited about the scalable architecture opportunities at PulseStream Cloud.',
    experienceYears: 5,
    currentRole: 'Full-Stack Developer',
    currentCompany: 'FinTech Canada',
    skills: ['TypeScript', 'Node.js', 'React', 'GraphQL', 'PostgreSQL'],
    screeningAnswers: {
      noticePeriod: '1 month',
      expectedSalary: '$150,000',
      workAuthorization: 'Canadian citizen (Remote NA)'
    },
    stage: 'hired',
    rating: 5,
    notes: [
      {
        id: 'n-5',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Offer accepted! Start date confirmed for next month. Onboarding equipment shipped.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
      { stage: 'screening', timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { stage: 'interview', timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { stage: 'offer', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { stage: 'hired', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Candidate formally accepted offer' }
    ],
    appliedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Memory Data Store
let jobs: Job[] = JSON.parse(JSON.stringify(initialJobs));
let applications: Application[] = JSON.parse(JSON.stringify(initialApplications));

// ==================== RESTful API Routes ====================

// 1. GET /api/jobs - Query jobs with filtering & sorting
app.get('/api/jobs', (req: Request, res: Response) => {
  const {
    search,
    department,
    type,
    locationType,
    experienceLevel,
    status,
    minSalary,
    sort
  } = req.query;

  let results = [...jobs];

  if (status) {
    results = results.filter(j => j.status === status);
  } else {
    // Default to active jobs unless recruiter views all
    // results = results.filter(j => j.status === 'active');
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    results = results.filter(j => 
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.department.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q)) ||
      j.description.toLowerCase().includes(q)
    );
  }

  if (department && department !== 'All') {
    results = results.filter(j => j.department.toLowerCase() === String(department).toLowerCase());
  }

  if (type && type !== 'All') {
    results = results.filter(j => j.type.toLowerCase() === String(type).toLowerCase());
  }

  if (locationType && locationType !== 'All') {
    results = results.filter(j => j.locationType.toLowerCase() === String(locationType).toLowerCase());
  }

  if (experienceLevel && experienceLevel !== 'All') {
    results = results.filter(j => j.experienceLevel.toLowerCase() === String(experienceLevel).toLowerCase());
  }

  if (minSalary && !isNaN(Number(minSalary))) {
    results = results.filter(j => j.salaryMax >= Number(minSalary));
  }

  // Sorting
  if (sort === 'salary-high') {
    results.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sort === 'salary-low') {
    results.sort((a, b) => a.salaryMin - b.salaryMin);
  } else if (sort === 'applicants') {
    results.sort((a, b) => b.applicantCount - a.applicantCount);
  } else {
    // Default newest
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  res.json({ success: true, count: results.length, data: results });
});

// 2. GET /api/jobs/:id - Get single job
app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }
  res.json({ success: true, data: job });
});

// 3. POST /api/jobs - Recruiter creates new job
app.post('/api/jobs', (req: Request, res: Response) => {
  const {
    title,
    company,
    companyLogo,
    department,
    type,
    locationType,
    location,
    experienceLevel,
    salaryMin,
    salaryMax,
    currency = 'USD',
    description,
    responsibilities = [],
    requirements = [],
    benefits = [],
    skills = [],
    status = 'active',
    featured = false
  } = req.body;

  if (!title || !company || !department || !location) {
    return res.status(400).json({
      success: false,
      message: 'Title, company, department, and location are required fields'
    });
  }

  const newJob: Job = {
    id: `job-${Date.now()}`,
    title: title.trim(),
    company: company.trim(),
    companyLogo: companyLogo || '🏢',
    department: department.trim(),
    type: type || 'Full-time',
    locationType: locationType || 'Remote',
    location: location.trim(),
    experienceLevel: experienceLevel || 'Mid-level',
    salaryMin: Number(salaryMin) || 80000,
    salaryMax: Number(salaryMax) || 120000,
    currency,
    description: description || 'Exciting career opportunity joining our team.',
    responsibilities: Array.isArray(responsibilities) && responsibilities.length > 0 
      ? responsibilities 
      : ['Lead technical execution', 'Collaborate with cross-functional team', 'Maintain quality standards'],
    requirements: Array.isArray(requirements) && requirements.length > 0
      ? requirements
      : ['Relevant industry experience', 'Demonstrated problem solving', 'Strong teamwork skills'],
    benefits: Array.isArray(benefits) && benefits.length > 0
      ? benefits
      : ['Competitive compensation', 'Comprehensive health coverage', 'Flexible PTO'],
    skills: Array.isArray(skills) && skills.length > 0 ? skills : ['Problem Solving', 'Communication'],
    status: status as 'active' | 'draft' | 'closed',
    createdAt: new Date().toISOString(),
    applicantCount: 0,
    featured: Boolean(featured)
  };

  jobs.unshift(newJob);
  res.status(201).json({ success: true, message: 'Job created successfully', data: newJob });
});

// 4. PUT /api/jobs/:id - Recruiter updates job
app.put('/api/jobs/:id', (req: Request, res: Response) => {
  const index = jobs.findIndex(j => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  const existing = jobs[index];
  const updatedJob: Job = {
    ...existing,
    ...req.body,
    id: existing.id,
    createdAt: existing.createdAt,
    applicantCount: existing.applicantCount
  };

  jobs[index] = updatedJob;
  res.json({ success: true, message: 'Job updated successfully', data: updatedJob });
});

// 5. DELETE /api/jobs/:id - Recruiter deletes or closes job
app.delete('/api/jobs/:id', (req: Request, res: Response) => {
  const index = jobs.findIndex(j => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }
  const removed = jobs.splice(index, 1);
  res.json({ success: true, message: 'Job removed successfully', data: removed[0] });
});

// 6. GET /api/applications - Recruiter ATS Pipeline
app.get('/api/applications', (req: Request, res: Response) => {
  const { jobId, stage, search } = req.query;

  let results = [...applications];

  if (jobId && jobId !== 'all') {
    results = results.filter(a => a.jobId === jobId);
  }

  if (stage && stage !== 'all') {
    results = results.filter(a => a.stage === stage);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    results = results.filter(a =>
      a.candidateName.toLowerCase().includes(q) ||
      a.candidateEmail.toLowerCase().includes(q) ||
      a.jobTitle.toLowerCase().includes(q) ||
      a.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  results.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  res.json({ success: true, count: results.length, data: results });
});

// 7. GET /api/applications/:id - Single application details
app.get('/api/applications/:id', (req: Request, res: Response) => {
  const appItem = applications.find(a => a.id === req.params.id);
  if (!appItem) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  res.json({ success: true, data: appItem });
});

// 8. POST /api/applications - Candidate submits application
app.post('/api/applications', (req: Request, res: Response) => {
  const {
    jobId,
    candidateName,
    candidateEmail,
    candidatePhone,
    candidateLocation,
    portfolioUrl,
    linkedInUrl,
    githubUrl,
    resumeFileName,
    resumeText,
    coverLetter,
    experienceYears,
    currentRole,
    currentCompany,
    skills = [],
    screeningAnswers = {}
  } = req.body;

  if (!jobId || !candidateName || !candidateEmail || !candidatePhone) {
    return res.status(400).json({
      success: false,
      message: 'Job ID, candidate name, email, and phone number are required.'
    });
  }

  const job = jobs.find(j => j.id === jobId);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found' });
  }

  // Prevent duplicate submissions for same email and job
  const existingApp = applications.find(
    a => a.jobId === jobId && a.candidateEmail.toLowerCase() === candidateEmail.toLowerCase().trim()
  );
  if (existingApp) {
    return res.status(409).json({
      success: false,
      message: 'You have already submitted an application for this position.'
    });
  }

  const newApp: Application = {
    id: `app-${Date.now()}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    candidateName: candidateName.trim(),
    candidateEmail: candidateEmail.toLowerCase().trim(),
    candidatePhone: candidatePhone.trim(),
    candidateLocation: candidateLocation?.trim() || 'Not specified',
    portfolioUrl: portfolioUrl?.trim() || '',
    linkedInUrl: linkedInUrl?.trim() || '',
    githubUrl: githubUrl?.trim() || '',
    resumeFileName: resumeFileName || `${candidateName.replace(/\s+/g, '_')}_Resume.pdf`,
    resumeText: resumeText || `${candidateName} - Professional application submission for ${job.title}`,
    coverLetter: coverLetter?.trim() || '',
    experienceYears: Number(experienceYears) || 0,
    currentRole: currentRole?.trim() || 'Software Professional',
    currentCompany: currentCompany?.trim() || 'Independent',
    skills: Array.isArray(skills) ? skills : [],
    screeningAnswers: screeningAnswers || {},
    stage: 'applied',
    rating: 3,
    notes: [],
    timeline: [
      {
        stage: 'applied',
        timestamp: new Date().toISOString(),
        note: 'Application successfully received via web portal'
      }
    ],
    appliedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  applications.unshift(newApp);

  // Increment applicant count on job
  job.applicantCount = (job.applicantCount || 0) + 1;

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Your tracking ID is ' + newApp.id,
    data: newApp
  });
});

// 9. PATCH /api/applications/:id - Recruiter modifies candidate stage, rating, note, or interview
app.patch('/api/applications/:id', (req: Request, res: Response) => {
  const appItem = applications.find(a => a.id === req.params.id);
  if (!appItem) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  const { stage, rating, note, interviewDate } = req.body;

  if (stage && stage !== appItem.stage) {
    const validStages: ApplicationStage[] = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ success: false, message: 'Invalid stage' });
    }
    appItem.stage = stage;
    appItem.timeline.push({
      stage,
      timestamp: new Date().toISOString(),
      note: note || `Candidate transitioned to ${stage} stage`
    });
  }

  if (rating !== undefined && !isNaN(Number(rating))) {
    appItem.rating = Math.max(1, Math.min(5, Number(rating)));
  }

  if (interviewDate) {
    appItem.interviewDate = interviewDate;
  }

  if (note && typeof note === 'string' && note.trim()) {
    appItem.notes.unshift({
      id: `n-${Date.now()}`,
      author: 'Recruiter Admin',
      text: note.trim(),
      date: new Date().toISOString()
    });
  }

  appItem.updatedAt = new Date().toISOString();

  res.json({ success: true, message: 'Application updated successfully', data: appItem });
});

// 10. GET /api/applications/candidate/:email - Candidate tracking dashboard
app.get('/api/applications/candidate/:email', (req: Request, res: Response) => {
  const email = req.params.email.toLowerCase().trim();
  const candidateApps = applications.filter(a => a.candidateEmail.toLowerCase() === email);
  res.json({ success: true, count: candidateApps.length, data: candidateApps });
});

// 11. DELETE /api/applications/:id - Candidate withdraws application
app.delete('/api/applications/:id', (req: Request, res: Response) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  const removed = applications.splice(index, 1)[0];
  const job = jobs.find(j => j.id === removed.jobId);
  if (job && job.applicantCount > 0) {
    job.applicantCount -= 1;
  }
  res.json({ success: true, message: 'Application withdrawn successfully', data: removed });
});

// 12. GET /api/stats - ATS Recruitment Analytics
app.get('/api/stats', (_req: Request, res: Response) => {
  const stageDistribution: Record<ApplicationStage, number> = {
    applied: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    hired: 0,
    rejected: 0
  };

  applications.forEach(a => {
    if (stageDistribution[a.stage] !== undefined) {
      stageDistribution[a.stage]++;
    }
  });

  const departmentMap: Record<string, number> = {};
  jobs.forEach(j => {
    departmentMap[j.department] = (departmentMap[j.department] || 0) + 1;
  });

  const skillMap: Record<string, number> = {};
  jobs.forEach(j => {
    j.skills.forEach(s => {
      skillMap[s] = (skillMap[s] || 0) + 1;
    });
  });

  const stats: RecruitmentStats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'active').length,
    totalApplications: applications.length,
    hiredCount: stageDistribution.hired,
    inInterviewCount: stageDistribution.interview,
    stageDistribution,
    departmentBreakdown: Object.entries(departmentMap).map(([department, count]) => ({ department, count })),
    topSkills: Object.entries(skillMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([skill, demand]) => ({ skill, demand }))
  };

  res.json({ success: true, data: stats });
});

// 13. POST /api/seed - Reset to clean seed data
app.post('/api/seed', (_req: Request, res: Response) => {
  jobs = JSON.parse(JSON.stringify(initialJobs));
  applications = JSON.parse(JSON.stringify(initialApplications));
  res.json({ success: true, message: 'Portal data successfully reset to seed state' });
});

// ==================== Dev & Production Vite Server ====================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HirePulse Job Portal server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
