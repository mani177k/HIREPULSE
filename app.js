// HirePulse - Core Recruitment Portal & ATS Engine (Vanilla JS)

const INITIAL_JOBS = [
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
    description: 'We are seeking an experienced Senior Full-Stack Engineer to architect and build real-time collaborative workspace microservices and modern web interfaces.',
    responsibilities: [
      'Architect robust Node.js and TypeScript microservices handling high event throughput',
      'Build responsive, high-performance UI components with Tailwind CSS and clean state management',
      'Drive engineering excellence through code reviews, automated testing, and CI/CD enhancements'
    ],
    requirements: [
      '5+ years professional experience building web applications at scale',
      'Deep proficiency in modern TypeScript, Node.js, and web standards',
      'Solid experience with RESTful APIs, WebSockets, and relational databases'
    ],
    benefits: [
      'Competitive equity package and 401(k) matching with immediate vesting',
      '100% company-paid health, dental, and vision insurance',
      '$3,000 annual home-office and learning stipend'
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 14,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Junior Frontend Developer',
    company: 'PixelCraft Digital',
    companyLogo: '🎨',
    department: 'Engineering',
    type: 'Full-time',
    locationType: 'Remote',
    location: 'Austin, TX (Remote)',
    experienceLevel: 'Entry-level',
    salaryMin: 75000,
    salaryMax: 95000,
    currency: 'USD',
    description: 'Great career launcher for enthusiastic junior engineers. You will build user-facing features using modern JavaScript, HTML, CSS, and Tailwind under senior mentorship.',
    responsibilities: [
      'Implement clean, responsive UI layouts following Figma designs',
      'Collaborate with product designers and backend engineers on API contracts',
      'Write reusable UI components and assist with cross-browser testing'
    ],
    requirements: [
      'Strong grasp of HTML5, CSS3, JavaScript (ES6+), and modern CSS frameworks',
      'Familiarity with Git and component-based UI design',
      'Curiosity, positive attitude, and eagerness to learn in a supportive environment'
    ],
    benefits: [
      'Comprehensive mentorship program and 1-on-1 career coaching',
      'Full health and dental coverage',
      'Flexible remote schedule with learning stipend'
    ],
    skills: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
    status: 'active',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 19,
    featured: true
  },
  {
    id: 'job-3',
    title: 'Associate Cloud QA & DevOps Engineer',
    company: 'Kestrel Infrastructure',
    companyLogo: '☁',
    department: 'Infrastructure',
    type: 'Full-time',
    locationType: 'Hybrid',
    location: 'Seattle, WA',
    experienceLevel: 'Entry-level',
    salaryMin: 72000,
    salaryMax: 90000,
    currency: 'USD',
    description: 'Join our infrastructure reliability team. You will write automated end-to-end tests, inspect CI/CD build pipelines, and monitor test cluster deployments.',
    responsibilities: [
      'Develop automated integration test scripts and validation checks',
      'Assist in monitoring production cluster alerts and staging deployments',
      'Document deployment procedures and bug reproduction steps'
    ],
    requirements: [
      'Degree in Computer Science or equivalent software engineering bootcamp graduate',
      'Basic knowledge of Linux terminal commands and shell scripting',
      'Understanding of Docker containers and REST APIs'
    ],
    benefits: [
      'Hybrid office flexibility with travel allowance',
      'Health insurance and 401(k) retirement plan',
      'Annual tech conference and certification budget'
    ],
    skills: ['Linux', 'Docker', 'Python', 'Git', 'CI/CD Basics'],
    status: 'active',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 11,
    featured: false
  },
  {
    id: 'job-4',
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
    description: 'Aura Systems is seeking a visionary Lead Product Designer to define our design system, unify complex developer workflows, and craft elegant user journeys.',
    responsibilities: [
      'Own end-to-end design strategy from discovery to high-fidelity prototypes and design systems',
      'Conduct user research sessions with enterprise technical users and synthesize actionable insights',
      'Partner with engineering leads to ensure pixel-perfect fidelity and smooth interaction states'
    ],
    requirements: [
      '6+ years of UX/UI design experience in B2B SaaS or developer tools',
      'Mastery of Figma, component token systems, and interaction design principles',
      'Strong portfolio showcasing complex desktop software simplified into intuitive experiences'
    ],
    benefits: [
      'Annual equity grant and discretionary performance bonus',
      'Generous parental leave (16 weeks fully paid)',
      'Manhattan office with catered lunches and rooftop terrace'
    ],
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 9,
    featured: true
  },
  {
    id: 'job-5',
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
    description: 'Help scale our global distributed infrastructure across multi-cloud environments. You will optimize Terraform pipelines, Kubernetes clusters, and deployment workflows.',
    responsibilities: [
      'Manage production Kubernetes clusters (EKS/GKE) with high availability and automated failover',
      'Implement and refine Infrastructure as Code (IaC) using Terraform and GitOps practices',
      'Strengthen platform security, automated vulnerability scans, and secret rotation'
    ],
    requirements: [
      '4+ years of hands-on Cloud Infrastructure and DevOps experience',
      'Proficiency with Kubernetes, Terraform, Helm, and GitHub Actions CI',
      'Solid foundation in networking, VPC peering, and Linux systems administration'
    ],
    benefits: [
      'Flexible remote schedule with asynchronous communication culture',
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
    id: 'job-6',
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
    description: 'Join our customer-facing web team to craft lightning-fast web applications with clean typography, responsive layouts, and robust client state management.',
    responsibilities: [
      'Implement accessible, responsive UI interfaces from Figma designs using modern HTML & CSS',
      'Optimize web performance, Core Web Vitals, and client-side rendering speeds',
      'Write comprehensive unit and integration tests'
    ],
    requirements: [
      '3+ years of professional web and JavaScript / TypeScript development experience',
      'Strong eye for micro-interactions, responsive CSS layouts, and semantic HTML',
      'Experience with state management and server state caching'
    ],
    benefits: [
      'Equity options in high-growth seed stage company',
      'Full health, dental, and vision coverage',
      'Co-working space pass anywhere in the world'
    ],
    skills: ['JavaScript', 'React', 'Tailwind CSS', 'TypeScript', 'REST API'],
    status: 'active',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 22,
    featured: true
  },
  {
    id: 'job-7',
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
      'Track feature adoption metrics and prioritize backlog based on quantitative business impact'
    ],
    requirements: [
      '4+ years of technical product management experience in FinTech or Developer Platforms',
      'Ability to read API documentation, write SQL queries, and validate system contracts',
      'Exceptional stakeholder presentation and consensus-building skills'
    ],
    benefits: [
      'Competitive base + performance bonus + company equity',
      'Hybrid office setup (2 days in office, 3 days remote)',
      'Generous 401(k) matching at 6%'
    ],
    skills: ['Product Strategy', 'SQL', 'API Design', 'Scrum / Agile', 'Roadmapping'],
    status: 'active',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 7,
    featured: false
  },
  {
    id: 'job-8',
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
    description: 'Analyze inbound acquisition funnels, run A/B conversion experiments, and optimize programmatic recruitment campaigns to scale organic reach.',
    responsibilities: [
      'Build automated reporting dashboards tracking CAC, LTV, and churn metrics',
      'Design, execute, and analyze conversion rate optimization experiments',
      'Collaborate with content marketing and growth engineering on landing page performance'
    ],
    requirements: [
      '2-4 years of experience in growth analytics, marketing ops, or data analytics',
      'Strong SQL querying skills and experience with modern data stacks',
      'Deep understanding of statistical significance and experimentation methodology'
    ],
    benefits: [
      'Flexible remote schedule with asynchronous communication culture',
      'Health, dental, and vision insurance with employer contribution',
      'Annual $2,000 professional growth conference stipend'
    ],
    skills: ['SQL', 'Data Analytics', 'A/B Testing', 'Growth Marketing', 'Looker'],
    status: 'active',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    applicantCount: 5,
    featured: false
  }
];

const INITIAL_APPLICATIONS = [
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
    linkedInUrl: 'https://linkedin.com/in/alex-mercer',
    githubUrl: 'https://github.com/alexmercer',
    resumeFileName: 'Alex_Mercer_Resume.pdf',
    resumeText: 'Senior Full-Stack Engineer with 6 years experience in TypeScript, Node.js, and high-performance React architectures. Built WebSocket messaging backend supporting 80k concurrent sessions at WaveScale.',
    coverLetter: 'I have followed PulseStream Cloud since launch and admire your low-latency infrastructure. My background building distributed WebSocket services aligns directly with your goals.',
    experienceYears: 6,
    currentRole: 'Senior Software Engineer',
    currentCompany: 'WaveScale Systems',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    stage: 'interview',
    rating: 5,
    interviewDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: [
      {
        id: 'n-1',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Strong architectural answers during screen. Technical interview scheduled.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), note: 'Application received' },
      { stage: 'screening', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Passed phone screen' },
      { stage: 'interview', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), note: 'Technical interview scheduled' }
    ],
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-102',
    jobId: 'job-4',
    jobTitle: 'Lead Product Designer',
    company: 'Aura Systems',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.design@example.com',
    candidatePhone: '+1 (555) 789-4321',
    candidateLocation: 'Brooklyn, NY',
    portfolioUrl: 'https://elenarostova.design',
    linkedInUrl: 'https://linkedin.com/in/elena-rostova',
    githubUrl: '',
    resumeFileName: 'Elena_Rostova_Design_Portfolio.pdf',
    resumeText: 'Staff Product Designer with 7+ years creating enterprise SaaS design systems and developer tools. Led complete redesign of CloudVantage console, increasing task completion by 34%.',
    coverLetter: 'Leading design at Aura Systems is an exciting challenge. I specialize in taking highly dense technical data and organizing it into harmonious, intuitive desktop viewports.',
    experienceYears: 7,
    currentRole: 'Principal Product Designer',
    currentCompany: 'CloudVantage',
    skills: ['Figma', 'Design Systems', 'User Research', 'Typography'],
    stage: 'offer',
    rating: 5,
    notes: [
      {
        id: 'n-2',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Portfolio review was unanimous 5/5. Offer package extended.',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Applied online' },
      { stage: 'screening', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), note: 'Screening passed' },
      { stage: 'interview', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Interviews completed' },
      { stage: 'offer', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), note: 'Offer extended' }
    ],
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'app-103',
    jobId: 'job-5',
    jobTitle: 'Cloud DevOps & Infrastructure Specialist',
    company: 'Kestrel Infrastructure',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@example.com',
    candidatePhone: '+1 (555) 456-7890',
    candidateLocation: 'Austin, TX',
    portfolioUrl: 'https://marcusvance.tech',
    linkedInUrl: 'https://linkedin.com/in/marcus-vance',
    githubUrl: 'https://github.com/marcusvance',
    resumeFileName: 'Marcus_Vance_Cloud_Resume.pdf',
    resumeText: 'Cloud Architect with 5 years managing AWS/GCP Kubernetes clusters, Terraform modules, and automated incident recovery. Cut cloud infrastructure spend by 28%.',
    coverLetter: 'I have deep hands-on expertise building multi-region Kubernetes clusters with zero-downtime blue/green deployment strategies.',
    experienceYears: 5,
    currentRole: 'Senior SRE',
    currentCompany: 'Apex Networks',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus'],
    stage: 'screening',
    rating: 4,
    notes: [],
    timeline: [
      { stage: 'applied', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Application received' },
      { stage: 'screening', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), note: 'Screening in progress' }
    ],
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  }
];

// App Data Store
class Store {
  constructor() {
    this.jobs = this.load('hp_jobs', INITIAL_JOBS);
    // If jobs was stored previously with fewer items, merge with initial
    if (this.jobs.length < INITIAL_JOBS.length) {
      this.jobs = INITIAL_JOBS;
    }
    this.applications = this.load('hp_applications', INITIAL_APPLICATIONS);
    this.bookmarks = new Set(this.load('hp_bookmarks', []));
    this.candidateEmail = localStorage.getItem('hp_email') || 'alex.mercer@example.com';
    this.activeTab = 'jobs';
    this.filters = {
      search: '',
      department: 'All',
      type: 'All',
      locationType: 'All',
      experience: 'All',
      minSalary: 0,
      sortBy: 'newest',
      bookmarksOnly: false
    };
    this.selectedJobForModal = null;
    this.selectedCandidateForDrawer = null;
    this.atsViewMode = 'kanban';
    this.atsJobFilter = 'all';
    this.atsSearchQuery = '';
  }

  load(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  }

  save() {
    try {
      localStorage.setItem('hp_jobs', JSON.stringify(this.jobs));
      localStorage.setItem('hp_applications', JSON.stringify(this.applications));
      localStorage.setItem('hp_bookmarks', JSON.stringify(Array.from(this.bookmarks)));
      localStorage.setItem('hp_email', this.candidateEmail);
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }

  reset() {
    this.jobs = JSON.parse(JSON.stringify(INITIAL_JOBS));
    this.applications = JSON.parse(JSON.stringify(INITIAL_APPLICATIONS));
    this.bookmarks.clear();
    this.save();
  }
}

const store = new Store();

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (toast && toastMessage) {
    toastMessage.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 3500);
  }
}

function formatSalary(min, max) {
  return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k / yr`;
}

function switchTab(tabId) {
  store.activeTab = tabId;
  document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) targetView.classList.remove('hidden');

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    btn.className = `nav-tab-btn text-sm transition-colors whitespace-nowrap cursor-pointer relative py-2 ${
      isTarget ? 'font-semibold text-indigo-600' : 'font-medium text-slate-600 hover:text-slate-900'
    }`;
    const indicator = btn.querySelector('.tab-indicator');
    if (indicator) indicator.remove();
    if (isTarget) {
      const span = document.createElement('span');
      span.className = 'tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full';
      btn.appendChild(span);
    }
  });

  if (tabId === 'jobs') renderJobBoard();
  if (tabId === 'my-applications') renderCandidateTracker();
  if (tabId === 'recruiter-ats') renderRecruiterATS();
  if (tabId === 'analytics') renderAnalytics();
}

// 1. RENDER JOB BOARD
function renderJobBoard() {
  const grid = document.getElementById('jobsGrid');
  const countEl = document.getElementById('jobsCount');
  const resetBtn = document.getElementById('resetFiltersBtn');
  if (!grid || !countEl) return;

  let filtered = [...store.jobs];

  if (store.filters.search.trim()) {
    const q = store.filters.search.toLowerCase().trim();
    filtered = filtered.filter(j => 
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q)) ||
      j.description.toLowerCase().includes(q)
    );
  }

  if (store.filters.department !== 'All') {
    filtered = filtered.filter(j => j.department.toLowerCase() === store.filters.department.toLowerCase());
  }

  if (store.filters.locationType !== 'All') {
    filtered = filtered.filter(j => j.locationType.toLowerCase() === store.filters.locationType.toLowerCase());
  }

  if (store.filters.type !== 'All') {
    filtered = filtered.filter(j => j.type.toLowerCase() === store.filters.type.toLowerCase());
  }

  if (store.filters.experience !== 'All') {
    filtered = filtered.filter(j => j.experienceLevel.toLowerCase() === store.filters.experience.toLowerCase());
  }

  if (store.filters.minSalary > 0) {
    filtered = filtered.filter(j => j.salaryMax >= store.filters.minSalary);
  }

  if (store.filters.bookmarksOnly) {
    filtered = filtered.filter(j => store.bookmarks.has(j.id));
  }

  if (store.filters.sortBy === 'salary-high') {
    filtered.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (store.filters.sortBy === 'salary-low') {
    filtered.sort((a, b) => a.salaryMin - b.salaryMin);
  } else if (store.filters.sortBy === 'applicants') {
    filtered.sort((a, b) => b.applicantCount - a.applicantCount);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  countEl.textContent = filtered.length;
  document.getElementById('savedCount').textContent = store.bookmarks.size;

  const isFiltering = store.filters.department !== 'All' || store.filters.type !== 'All' || 
                      store.filters.locationType !== 'All' || store.filters.experience !== 'All' ||
                      store.filters.search || store.filters.minSalary > 0 || store.filters.bookmarksOnly;
  if (resetBtn) resetBtn.classList.toggle('hidden', !isFiltering);

  const userAppliedJobIds = new Set(
    store.applications
      .filter(a => a.candidateEmail.toLowerCase() === store.candidateEmail.toLowerCase())
      .map(a => a.jobId)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">🔍</div>
        <h3 class="text-base font-bold text-slate-900">No matching jobs found</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Try resetting filters to view all available career opportunities.</p>
        <button onclick="window.hirepulse.resetFilters()" class="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(job => {
    const isBookmarked = store.bookmarks.has(job.id);
    const hasApplied = userAppliedJobIds.has(job.id);

    return `
      <div class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-lg select-none shrink-0 font-medium text-slate-700">
                ${job.companyLogo || '🏢'}
              </div>
              <div>
                <p class="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                  ${job.company}
                  ${job.featured ? '<span class="text-[11px] font-semibold text-amber-700">· Featured</span>' : ''}
                </p>
                <h3 onclick="window.hirepulse.openJobDetail('${job.id}')" class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-1">
                  ${job.title}
                </h3>
              </div>
            </div>

            <button onclick="window.hirepulse.toggleBookmark('${job.id}')" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" aria-label="Bookmark">
              <svg class="w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          <div class="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-normal">
            <span class="text-slate-700 font-medium">${job.location} (${job.locationType})</span>
            <span aria-hidden="true" class="text-slate-300">·</span>
            <span>${job.department}</span>
            <span aria-hidden="true" class="text-slate-300">·</span>
            <span>${job.type}</span>
            <span aria-hidden="true" class="text-slate-300">·</span>
            <span class="font-semibold text-slate-700">${job.experienceLevel}</span>
          </div>

          <p class="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            ${job.description}
          </p>

          <div class="mt-3.5 flex flex-wrap items-center gap-1.5">
            ${job.skills.slice(0, 4).map(skill => `
              <span class="text-[11px] text-slate-600 bg-slate-100/70 px-2 py-0.5 rounded font-medium">${skill}</span>
            `).join('')}
            ${job.skills.length > 4 ? `<span class="text-[11px] text-slate-400 font-medium">+${job.skills.length - 4} more</span>` : ''}
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div class="text-[11px] text-slate-400">Compensation</div>
            <div class="text-sm font-semibold text-slate-900 font-mono tabular-nums">
              ${formatSalary(job.salaryMin, job.salaryMax)}
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.hirepulse.openJobDetail('${job.id}')" class="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Details
            </button>
            ${hasApplied ? `
              <span class="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg">Applied</span>
            ` : `
              <button onclick="window.hirepulse.openApplyModal('${job.id}')" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer">
                Apply Now
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 2. RENDER CANDIDATE APPLICATION TRACKER
function renderCandidateTracker() {
  const container = document.getElementById('trackerList');
  const emailInput = document.getElementById('trackerEmailInput');
  if (!container || !emailInput) return;

  emailInput.value = store.candidateEmail;
  const userApps = store.applications.filter(
    a => a.candidateEmail.toLowerCase() === store.candidateEmail.toLowerCase().trim()
  );

  const badge = document.getElementById('navAppCount');
  const badgeMobile = document.getElementById('navAppCountMobile');
  if (badge) badge.textContent = userApps.length;
  if (badgeMobile) badgeMobile.textContent = userApps.length;

  if (userApps.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <h3 class="text-base font-bold text-slate-900">No active applications found</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No records found for <strong class="text-slate-700">${store.candidateEmail}</strong>. Try checking with one of the quick demo candidates below.
        </p>
        <button onclick="window.hirepulse.switchTab('jobs')" class="mt-4 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer">
          Explore Open Positions
        </button>
      </div>
    `;
    return;
  }

  const STAGES = ['applied', 'screening', 'interview', 'offer', 'hired'];

  container.innerHTML = userApps.map(app => {
    const currentIdx = STAGES.indexOf(app.stage);
    const isRejected = app.stage === 'rejected';

    return `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
              <span class="font-semibold text-slate-800">${app.company}</span>
              <span>·</span>
              <span class="font-mono">${app.id}</span>
              <span>·</span>
              <span>Applied ${new Date(app.appliedAt).toLocaleDateString()}</span>
            </div>
            <h2 class="text-base font-bold text-slate-900">${app.jobTitle}</h2>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-[11px] text-slate-400 font-medium">Status</div>
              <span class="text-xs font-bold capitalize text-indigo-700">${app.stage}</span>
            </div>
            <button onclick="window.hirepulse.withdrawApplication('${app.id}')" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-xs">
              Withdraw
            </button>
          </div>
        </div>

        ${!isRejected ? `
          <div class="py-2">
            <div class="relative flex items-center justify-between">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-100 rounded-full"></div>
              <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full transition-all" style="width: ${(Math.max(0, currentIdx) / (STAGES.length - 1)) * 100}%"></div>
              ${STAGES.map((s, idx) => `
                <div class="relative z-10 flex flex-col items-center">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    idx <= currentIdx ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
                  } ${idx === currentIdx ? 'ring-4 ring-indigo-100 scale-110' : ''}">
                    ${idx + 1}
                  </div>
                  <span class="text-[11px] font-medium mt-1.5 capitalize ${idx === currentIdx ? 'text-indigo-600 font-bold' : idx <= currentIdx ? 'text-slate-800' : 'text-slate-400'}">${s}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">Application status: Position closed or not moving forward.</div>
        `}

        ${app.stage === 'interview' && app.interviewDate ? `
          <div class="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-medium">
            🗓️ Technical Interview Scheduled for: <strong class="font-mono">${new Date(app.interviewDate).toLocaleString()}</strong>
          </div>
        ` : ''}

        ${app.stage === 'offer' ? `
          <div class="p-4 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-purple-900 font-medium">
            🎉 Formal Employment Offer Extended! Please review email correspondence from talent acquisition.
          </div>
        ` : ''}

        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-1.5">
          <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status & Communication History</div>
          ${app.timeline.map(t => `
            <div class="flex items-center justify-between text-slate-600">
              <span class="capitalize"><strong class="text-slate-800">${t.stage}:</strong> ${t.note || `Transitioned to ${t.stage}`}</span>
              <span class="font-mono text-slate-400 text-[11px]">${new Date(t.timestamp).toLocaleDateString()}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// 3. RENDER RECRUITER ATS PIPELINE
function renderRecruiterATS() {
  const jobSelector = document.getElementById('atsJobSelector');
  const badge = document.getElementById('atsApplicantsBadge');
  const kanbanContainer = document.getElementById('atsKanbanContainer');
  const tableBody = document.getElementById('atsTableBody');

  if (!jobSelector || !badge) return;

  jobSelector.innerHTML = `<option value="all">All Job Requisitions (${store.jobs.length})</option>` +
    store.jobs.map(j => `<option value="${j.id}" ${store.atsJobFilter === j.id ? 'selected' : ''}>${j.title} (${j.applicantCount})</option>`).join('');

  let filtered = [...store.applications];

  if (store.atsJobFilter !== 'all') {
    filtered = filtered.filter(a => a.jobId === store.atsJobFilter);
  }

  if (store.atsSearchQuery.trim()) {
    const q = store.atsSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(a =>
      a.candidateName.toLowerCase().includes(q) ||
      a.candidateEmail.toLowerCase().includes(q) ||
      a.jobTitle.toLowerCase().includes(q) ||
      a.skills.some(s => s.toLowerCase().includes(q))
    );
  }

  badge.textContent = `${filtered.length} Applicants`;

  const STAGES = [
    { id: 'applied', label: 'Applied' },
    { id: 'screening', label: 'Screening' },
    { id: 'interview', label: 'Interview' },
    { id: 'offer', label: 'Offer' },
    { id: 'hired', label: 'Hired' }
  ];

  if (kanbanContainer) {
    kanbanContainer.innerHTML = STAGES.map(s => {
      const stageApps = filtered.filter(a => a.stage === s.id);
      return `
        <div class="bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 flex flex-col min-h-[500px]">
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <span class="text-xs font-bold text-slate-800">${s.label}</span>
            <span class="text-xs font-mono font-semibold text-slate-600 bg-white px-2 py-0.5 rounded shadow-2xs">${stageApps.length}</span>
          </div>
          <div class="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
            ${stageApps.length === 0 ? `
              <div class="text-center py-8 text-xs text-slate-400">No candidates</div>
            ` : stageApps.map(c => `
              <div onclick="window.hirepulse.openCandidateDrawer('${c.id}')" class="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-indigo-400 transition-all cursor-pointer group">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                      ${c.candidateName.charAt(0)}
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900 group-hover:text-indigo-600">${c.candidateName}</h4>
                      <p class="text-[11px] text-slate-500 truncate max-w-[120px]">${c.currentRole}</p>
                    </div>
                  </div>
                  <span class="text-[11px] font-mono text-amber-500 font-bold">★ ${c.rating || 3}</span>
                </div>
                <div class="mt-2 text-[11px] font-medium text-slate-700 bg-slate-50 p-1 rounded truncate">${c.jobTitle}</div>
                <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span class="font-mono tabular-nums">${c.experienceYears}y exp</span>
                  <span class="text-indigo-600 font-semibold group-hover:underline">Review →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  if (tableBody) {
    tableBody.innerHTML = filtered.map(c => `
      <tr onclick="window.hirepulse.openCandidateDrawer('${c.id}')" class="hover:bg-slate-50 cursor-pointer">
        <td class="px-4 py-3 font-bold text-slate-900">${c.candidateName}</td>
        <td class="px-4 py-3 text-slate-800">${c.jobTitle}</td>
        <td class="px-4 py-3 font-mono text-slate-600">${c.experienceYears}y</td>
        <td class="px-4 py-3 text-amber-500 font-bold font-mono">★ ${c.rating || 3}</td>
        <td class="px-4 py-3 capitalize font-semibold">${c.stage}</td>
        <td class="px-4 py-3 text-slate-500 font-mono">${new Date(c.appliedAt).toLocaleDateString()}</td>
        <td class="px-4 py-3 text-right">
          <button class="text-indigo-600 font-semibold hover:underline">Review</button>
        </td>
      </tr>
    `).join('');
  }
}

// 4. RENDER ANALYTICS
function renderAnalytics() {
  const activeJobs = store.jobs.filter(j => j.status === 'active').length;
  const totalApps = store.applications.length;
  const inInterviews = store.applications.filter(a => a.stage === 'interview').length;
  const hires = store.applications.filter(a => a.stage === 'hired').length;

  document.getElementById('statActiveJobs').textContent = activeJobs;
  document.getElementById('statTotalApplicants').textContent = totalApps;
  document.getElementById('statInInterviews').textContent = inInterviews;
  document.getElementById('statHires').textContent = hires;

  const total = Math.max(1, totalApps);
  const screeningCount = store.applications.filter(a => ['screening', 'interview', 'offer', 'hired'].includes(a.stage)).length;
  const interviewCount = store.applications.filter(a => ['interview', 'offer', 'hired'].includes(a.stage)).length;
  const offerCount = store.applications.filter(a => ['offer', 'hired'].includes(a.stage)).length;
  const hiredCount = hires;

  const funnelBars = document.getElementById('funnelBars');
  if (funnelBars) {
    funnelBars.innerHTML = `
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>1. Inbound Applications</span>
          <span class="font-mono tabular-nums">${total} (100%)</span>
        </div>
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="bg-slate-700 h-full" style="width: 100%"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>2. Passed Screening</span>
          <span class="font-mono tabular-nums">${screeningCount} (${((screeningCount/total)*100).toFixed(0)}%)</span>
        </div>
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="bg-amber-500 h-full" style="width: ${(screeningCount/total)*100}%"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>3. Technical Interviews</span>
          <span class="font-mono tabular-nums">${interviewCount} (${((interviewCount/total)*100).toFixed(0)}%)</span>
        </div>
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="bg-indigo-600 h-full" style="width: ${(interviewCount/total)*100}%"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>4. Formal Offers</span>
          <span class="font-mono tabular-nums">${offerCount} (${((offerCount/total)*100).toFixed(0)}%)</span>
        </div>
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="bg-purple-600 h-full" style="width: ${(offerCount/total)*100}%"></div>
        </div>
      </div>
      <div>
        <div class="flex justify-between text-xs mb-1 font-semibold">
          <span>5. Signed Hires</span>
          <span class="font-mono tabular-nums text-emerald-700">${hiredCount} (${((hiredCount/total)*100).toFixed(0)}%)</span>
        </div>
        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="bg-emerald-600 h-full" style="width: ${(hiredCount/total)*100}%"></div>
        </div>
      </div>
    `;
  }

  const deptMap = {};
  store.jobs.forEach(j => { deptMap[j.department] = (deptMap[j.department] || 0) + 1; });
  const deptContainer = document.getElementById('analyticsDepartments');
  if (deptContainer) {
    deptContainer.innerHTML = Object.entries(deptMap).map(([dept, count]) => `
      <div class="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
        <span class="font-semibold text-slate-800">${dept}</span>
        <span class="font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">${count} Positions</span>
      </div>
    `).join('');
  }

  const skillMap = {};
  store.jobs.forEach(j => { j.skills.forEach(s => { skillMap[s] = (skillMap[s] || 0) + 1; }); });
  const skillsContainer = document.getElementById('analyticsSkills');
  if (skillsContainer) {
    skillsContainer.innerHTML = Object.entries(skillMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([s, c], i) => `
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <span class="font-semibold text-slate-800">${i + 1}. ${s}</span>
          <span class="font-mono text-slate-500">${c} Requisitions</span>
        </div>
      `).join('');
  }
}

// Global Actions exposed on window.hirepulse
window.hirepulse = {
  switchTab,

  resetFilters() {
    store.filters = {
      search: '',
      department: 'All',
      type: 'All',
      locationType: 'All',
      experience: 'All',
      minSalary: 0,
      sortBy: 'newest',
      bookmarksOnly: false
    };
    const sInput = document.getElementById('searchInput');
    if (sInput) sInput.value = '';
    const dFilter = document.getElementById('departmentFilter');
    if (dFilter) dFilter.value = 'All';
    const lFilter = document.getElementById('locationTypeFilter');
    if (lFilter) lFilter.value = 'All';
    const tFilter = document.getElementById('typeFilter');
    if (tFilter) tFilter.value = 'All';
    const eFilter = document.getElementById('experienceFilter');
    if (eFilter) eFilter.value = 'All';
    const salFilter = document.getElementById('salaryFilter');
    if (salFilter) salFilter.value = '0';
    const salDisp = document.getElementById('salaryDisplay');
    if (salDisp) salDisp.textContent = 'Any';
    const sortF = document.getElementById('sortFilter');
    if (sortF) sortF.value = 'newest';
    const bToggle = document.getElementById('savedJobsToggle');
    if (bToggle) bToggle.className = 'px-3 py-1 rounded-md font-medium transition-colors cursor-pointer border bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
    renderJobBoard();
    showToast('All filters reset');
  },

  toggleBookmark(jobId) {
    if (store.bookmarks.has(jobId)) {
      store.bookmarks.delete(jobId);
      showToast('Removed from saved jobs');
    } else {
      store.bookmarks.add(jobId);
      showToast('Job saved');
    }
    store.save();
    renderJobBoard();
  },

  openJobDetail(jobId) {
    const job = store.jobs.find(j => j.id === jobId);
    if (!job) return;
    store.selectedJobForModal = job;

    document.getElementById('modalJobCompany').textContent = job.company;
    document.getElementById('modalJobTitle').textContent = job.title;
    document.getElementById('modalJobLogo').textContent = job.companyLogo || '🏢';
    document.getElementById('modalJobLocation').textContent = job.location;
    document.getElementById('modalJobLocationType').textContent = job.locationType;
    document.getElementById('modalJobDepartment').textContent = job.department;
    document.getElementById('modalJobType').textContent = job.type;
    document.getElementById('modalJobExperience').textContent = job.experienceLevel;
    document.getElementById('modalJobApplicants').textContent = `${job.applicantCount} applicants`;
    document.getElementById('modalJobSalary').textContent = formatSalary(job.salaryMin, job.salaryMax);
    document.getElementById('modalJobDescription').textContent = job.description;

    document.getElementById('modalJobResponsibilities').innerHTML = (job.responsibilities || []).map(r => `
      <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span><span>${r}</span></li>
    `).join('');

    document.getElementById('modalJobRequirements').innerHTML = (job.requirements || []).map(r => `
      <li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span><span>${r}</span></li>
    `).join('');

    document.getElementById('modalJobSkills').innerHTML = (job.skills || []).map(s => `
      <span class="text-xs font-medium text-slate-800 bg-slate-100 px-3 py-1 rounded-md">${s}</span>
    `).join('');

    document.getElementById('modalJobBenefits').innerHTML = (job.benefits || []).map(b => `
      <div class="text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">✓ ${b}</div>
    `).join('');

    const modal = document.getElementById('jobDetailModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  openApplyModal(jobId) {
    const job = store.jobs.find(j => j.id === jobId);
    if (!job) return;
    store.selectedJobForModal = job;

    document.getElementById('applyModalJobTitle').textContent = job.title;
    document.getElementById('applyModalJobCompany').textContent = `at ${job.company}`;
    document.getElementById('applyEmail').value = store.candidateEmail;
    document.getElementById('applySkills').value = job.skills.slice(0, 3).join(', ');

    const modal = document.getElementById('applyModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  openCandidateDrawer(appId) {
    const app = store.applications.find(a => a.id === appId);
    if (!app) return;
    store.selectedCandidateForDrawer = app;

    document.getElementById('drawerCandidateName').textContent = app.candidateName;
    document.getElementById('drawerCandidateSub').textContent = `${app.currentRole} · ${app.experienceYears}y experience`;
    document.getElementById('drawerEmail').textContent = app.candidateEmail;
    document.getElementById('drawerPhone').textContent = app.candidatePhone;
    document.getElementById('drawerLocation').textContent = app.candidateLocation || 'Remote';
    document.getElementById('drawerJobTitle').textContent = app.jobTitle;
    document.getElementById('drawerResumeText').textContent = app.resumeText || 'No text extracted.';
    document.getElementById('drawerCoverLetter').textContent = app.coverLetter || 'No cover note attached.';
    document.getElementById('drawerRatingDisplay').textContent = '★'.repeat(app.rating || 3) + '☆'.repeat(5 - (app.rating || 3));

    if (app.interviewDate) {
      document.getElementById('drawerCurrentInterview').textContent = `Current interview: ${new Date(app.interviewDate).toLocaleString()}`;
    } else {
      document.getElementById('drawerCurrentInterview').textContent = '';
    }

    const STAGES = ['applied', 'screening', 'interview', 'offer', 'hired'];
    const stageContainer = document.getElementById('drawerStageButtons');
    stageContainer.innerHTML = STAGES.map(s => `
      <button onclick="window.hirepulse.updateCandidateStage('${app.id}', '${s}')" class="py-1.5 px-2 text-xs font-semibold rounded-md capitalize cursor-pointer ${
        app.stage === s ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
      }">${s}</button>
    `).join('');

    const notesList = document.getElementById('drawerNotesList');
    notesList.innerHTML = (app.notes || []).map(n => `
      <div class="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
        <div class="flex justify-between text-slate-500 font-semibold">
          <span>${n.author}</span>
          <span class="font-mono text-[11px]">${new Date(n.date).toLocaleDateString()}</span>
        </div>
        <p class="text-slate-700">${n.text}</p>
      </div>
    `).join('') || '<p class="text-xs text-slate-400 italic">No notes posted yet.</p>';

    const drawer = document.getElementById('candidateReviewDrawer');
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
  },

  updateCandidateStage(appId, newStage) {
    const app = store.applications.find(a => a.id === appId);
    if (!app) return;
    app.stage = newStage;
    app.timeline.push({
      stage: newStage,
      timestamp: new Date().toISOString(),
      note: `Stage transitioned to ${newStage}`
    });
    store.save();
    showToast(`Candidate moved to ${newStage}`);
    this.openCandidateDrawer(appId);
    renderRecruiterATS();
  },

  withdrawApplication(appId) {
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    store.applications = store.applications.filter(a => a.id !== appId);
    store.save();
    showToast('Application withdrawn');
    renderCandidateTracker();
    renderRecruiterATS();
  }
};

function initApp() {
  document.querySelectorAll('.nav-tab-btn, .nav-tab-btn-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) {
        switchTab(tabId);
        document.getElementById('mobileMenu')?.classList.add('hidden');
      }
    });
  });

  document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('hidden');
  });

  document.getElementById('navBrandBtn')?.addEventListener('click', () => switchTab('jobs'));

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      store.filters.search = e.target.value;
      document.getElementById('clearSearchBtn')?.classList.toggle('hidden', !e.target.value);
      renderJobBoard();
    });
  }

  document.getElementById('clearSearchBtn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    store.filters.search = '';
    document.getElementById('clearSearchBtn')?.classList.add('hidden');
    renderJobBoard();
  });

  document.querySelectorAll('.quick-skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const skill = btn.getAttribute('data-skill');
      if (searchInput && skill) {
        searchInput.value = skill;
        store.filters.search = skill;
        document.getElementById('clearSearchBtn')?.classList.remove('hidden');
        renderJobBoard();
      }
    });
  });

  document.getElementById('departmentFilter')?.addEventListener('change', (e) => {
    store.filters.department = e.target.value;
    renderJobBoard();
  });

  document.getElementById('locationTypeFilter')?.addEventListener('change', (e) => {
    store.filters.locationType = e.target.value;
    renderJobBoard();
  });

  document.getElementById('typeFilter')?.addEventListener('change', (e) => {
    store.filters.type = e.target.value;
    renderJobBoard();
  });

  document.getElementById('experienceFilter')?.addEventListener('change', (e) => {
    store.filters.experience = e.target.value;
    renderJobBoard();
  });

  document.getElementById('salaryFilter')?.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    store.filters.minSalary = val;
    document.getElementById('salaryDisplay').textContent = val === 0 ? 'Any' : `$${(val / 1000).toFixed(0)}k+`;
    renderJobBoard();
  });

  document.getElementById('sortFilter')?.addEventListener('change', (e) => {
    store.filters.sortBy = e.target.value;
    renderJobBoard();
  });

  document.getElementById('savedJobsToggle')?.addEventListener('click', () => {
    store.filters.bookmarksOnly = !store.filters.bookmarksOnly;
    const btn = document.getElementById('savedJobsToggle');
    if (store.filters.bookmarksOnly) {
      btn.className = 'px-3 py-1 rounded-md font-medium transition-colors cursor-pointer border bg-indigo-50 border-indigo-200 text-indigo-700';
    } else {
      btn.className = 'px-3 py-1 rounded-md font-medium transition-colors cursor-pointer border bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
    }
    renderJobBoard();
  });

  document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
    window.hirepulse.resetFilters();
  });

  document.getElementById('trackerEmailForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('trackerEmailInput');
    if (input && input.value.trim()) {
      store.candidateEmail = input.value.trim();
      store.save();
      renderCandidateTracker();
    }
  });

  document.querySelectorAll('.demo-candidate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      if (email) {
        store.candidateEmail = email;
        store.save();
        renderCandidateTracker();
      }
    });
  });

  document.getElementById('atsJobSelector')?.addEventListener('change', (e) => {
    store.atsJobFilter = e.target.value;
    renderRecruiterATS();
  });

  document.getElementById('atsSearchInput')?.addEventListener('input', (e) => {
    store.atsSearchQuery = e.target.value;
    renderRecruiterATS();
  });

  document.getElementById('atsKanbanViewBtn')?.addEventListener('click', () => {
    document.getElementById('atsKanbanContainer')?.classList.remove('hidden');
    document.getElementById('atsTableContainer')?.classList.add('hidden');
    document.getElementById('atsKanbanViewBtn').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white text-slate-900 shadow-xs cursor-pointer';
    document.getElementById('atsTableViewBtn').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 cursor-pointer';
  });

  document.getElementById('atsTableViewBtn')?.addEventListener('click', () => {
    document.getElementById('atsKanbanContainer')?.classList.add('hidden');
    document.getElementById('atsTableContainer')?.classList.remove('hidden');
    document.getElementById('atsTableViewBtn').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white text-slate-900 shadow-xs cursor-pointer';
    document.getElementById('atsKanbanViewBtn').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 hover:text-slate-900 cursor-pointer';
  });

  function closeAllModals() {
    ['jobDetailModal', 'applyModal', 'postJobModal', 'candidateReviewDrawer'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    });
  }

  document.getElementById('closeDetailModalBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('closeDetailModalFooterBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('closeApplyModalBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('cancelApplyBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('closePostJobModalBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('cancelPostJobBtn')?.addEventListener('click', closeAllModals);
  document.getElementById('closeDrawerBtn')?.addEventListener('click', closeAllModals);

  document.getElementById('modalApplyActionBtn')?.addEventListener('click', () => {
    if (store.selectedJobForModal) {
      closeAllModals();
      window.hirepulse.openApplyModal(store.selectedJobForModal.id);
    }
  });

  ['openPostJobBtn', 'openPostJobBtnMobile', 'openPostJobBtnATS'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      const modal = document.getElementById('postJobModal');
      modal?.classList.remove('hidden');
      modal?.classList.add('flex');
    });
  });

  document.getElementById('autofillApplyBtn')?.addEventListener('click', () => {
    document.getElementById('applyFullName').value = 'Jordan Vance';
    document.getElementById('applyEmail').value = 'jordan.vance@example.com';
    document.getElementById('applyPhone').value = '+1 (555) 789-0123';
    document.getElementById('applyLocation').value = 'San Francisco, CA';
    document.getElementById('applyRole').value = 'Software Engineer';
    document.getElementById('applyExperience').value = '4';
    document.getElementById('applyPortfolio').value = 'https://jordanvance.dev';
    document.getElementById('applyLinkedIn').value = 'https://linkedin.com/in/jordan-vance';
    document.getElementById('applyGitHub').value = 'https://github.com/jordanvance';
    document.getElementById('applyCoverLetter').value = 'I am enthusiastic about joining your team. My engineering experience aligns directly with your technical stack.';
    document.getElementById('applyResumeAttachedName').textContent = 'Jordan_Vance_Resume.pdf';
    document.getElementById('applyResumeAttachedName').classList.remove('hidden');
  });

  document.getElementById('applyResumeFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const nameEl = document.getElementById('applyResumeAttachedName');
      nameEl.textContent = file.name;
      nameEl.classList.remove('hidden');
    }
  });

  document.getElementById('applyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!store.selectedJobForModal) return;

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: store.selectedJobForModal.id,
      jobTitle: store.selectedJobForModal.title,
      company: store.selectedJobForModal.company,
      candidateName: document.getElementById('applyFullName').value.trim(),
      candidateEmail: document.getElementById('applyEmail').value.trim(),
      candidatePhone: document.getElementById('applyPhone').value.trim(),
      candidateLocation: document.getElementById('applyLocation').value.trim() || 'Remote',
      portfolioUrl: document.getElementById('applyPortfolio').value.trim(),
      linkedInUrl: document.getElementById('applyLinkedIn').value.trim(),
      githubUrl: document.getElementById('applyGitHub').value.trim(),
      resumeFileName: document.getElementById('applyResumeAttachedName').textContent || 'Resume.pdf',
      resumeText: `${document.getElementById('applyFullName').value} - Application for ${store.selectedJobForModal.title}`,
      coverLetter: document.getElementById('applyCoverLetter').value.trim(),
      experienceYears: Number(document.getElementById('applyExperience').value) || 3,
      currentRole: document.getElementById('applyRole').value.trim(),
      currentCompany: 'Independent',
      skills: document.getElementById('applySkills').value.split(',').map(s => s.trim()).filter(Boolean),
      stage: 'applied',
      rating: 4,
      notes: [],
      timeline: [
        { stage: 'applied', timestamp: new Date().toISOString(), note: 'Application submitted' }
      ],
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.applications.unshift(newApp);
    store.candidateEmail = newApp.candidateEmail;
    store.selectedJobForModal.applicantCount = (store.selectedJobForModal.applicantCount || 0) + 1;
    store.save();

    closeAllModals();
    showToast(`Application submitted! Tracking ID: ${newApp.id}`);
    renderJobBoard();
    renderCandidateTracker();
    renderRecruiterATS();
  });

  document.getElementById('autofillJobBtn')?.addEventListener('click', () => {
    document.getElementById('postJobTitle').value = 'Senior Distributed Systems Architect';
    document.getElementById('postJobCompany').value = 'PulseStream Cloud';
    document.getElementById('postJobDepartment').value = 'Engineering';
    document.getElementById('postJobType').value = 'Full-time';
    document.getElementById('postJobLocationType').value = 'Remote';
    document.getElementById('postJobExperience').value = 'Lead / Principal';
    document.getElementById('postJobLocation').value = 'Remote US / Canada';
    document.getElementById('postJobSalaryMin').value = '165000';
    document.getElementById('postJobSalaryMax').value = '210000';
    document.getElementById('postJobDescription').value = 'Join our distributed infrastructure team to build high-throughput event processing pipelines handling 50M+ events daily.';
    document.getElementById('postJobResponsibilities').value = 'Design and operate Kafka & Kubernetes clusters\nAuthor technical design specifications\nOptimize RPC throughput and latency';
    document.getElementById('postJobRequirements').value = '6+ years in distributed systems engineering\nDeep knowledge of Go, Rust, or modern backend architectures';
    document.getElementById('postJobSkills').value = 'Go, Distributed Systems, Kafka, Kubernetes, gRPC';
  });

  document.getElementById('postJobForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newJob = {
      id: `job-${Date.now()}`,
      title: document.getElementById('postJobTitle').value.trim(),
      company: document.getElementById('postJobCompany').value.trim(),
      companyLogo: '🏢',
      department: document.getElementById('postJobDepartment').value,
      type: document.getElementById('postJobType').value,
      locationType: document.getElementById('postJobLocationType').value,
      location: document.getElementById('postJobLocation').value.trim(),
      experienceLevel: document.getElementById('postJobExperience').value,
      salaryMin: Number(document.getElementById('postJobSalaryMin').value) || 120000,
      salaryMax: Number(document.getElementById('postJobSalaryMax').value) || 160000,
      currency: 'USD',
      description: document.getElementById('postJobDescription').value.trim() || 'Exciting career opportunity joining our team.',
      responsibilities: document.getElementById('postJobResponsibilities').value.split('\n').map(s => s.trim()).filter(Boolean),
      requirements: document.getElementById('postJobRequirements').value.split('\n').map(s => s.trim()).filter(Boolean),
      benefits: ['Comprehensive health coverage', 'Flexible remote PTO', '401(k) matching'],
      skills: document.getElementById('postJobSkills').value.split(',').map(s => s.trim()).filter(Boolean),
      status: 'active',
      createdAt: new Date().toISOString(),
      applicantCount: 0,
      featured: true
    };

    store.jobs.unshift(newJob);
    store.save();
    closeAllModals();
    showToast(`Requisition "${newJob.title}" published!`);
    renderJobBoard();
    renderRecruiterATS();
  });

  document.getElementById('drawerAddNoteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!store.selectedCandidateForDrawer) return;
    const input = document.getElementById('drawerNoteInput');
    if (!input.value.trim()) return;

    store.selectedCandidateForDrawer.notes.unshift({
      id: `n-${Date.now()}`,
      author: 'Recruiter Admin',
      text: input.value.trim(),
      date: new Date().toISOString()
    });
    input.value = '';
    store.save();
    window.hirepulse.openCandidateDrawer(store.selectedCandidateForDrawer.id);
  });

  document.getElementById('drawerScheduleForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!store.selectedCandidateForDrawer) return;
    const input = document.getElementById('drawerInterviewInput');
    if (!input.value) return;

    store.selectedCandidateForDrawer.stage = 'interview';
    store.selectedCandidateForDrawer.interviewDate = new Date(input.value).toISOString();
    store.selectedCandidateForDrawer.timeline.push({
      stage: 'interview',
      timestamp: new Date().toISOString(),
      note: `Interview scheduled for ${new Date(input.value).toLocaleString()}`
    });
    store.save();
    showToast('Interview confirmed and scheduled');
    window.hirepulse.openCandidateDrawer(store.selectedCandidateForDrawer.id);
    renderRecruiterATS();
  });

  document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
    const headers = ['ID', 'Candidate', 'Email', 'Role', 'Company', 'Stage', 'Rating', 'Applied At'];
    const rows = store.applications.map(a => [
      `"${a.id}"`,
      `"${a.candidateName}"`,
      `"${a.candidateEmail}"`,
      `"${a.jobTitle}"`,
      `"${a.company}"`,
      `"${a.stage}"`,
      `"${a.rating || 3}"`,
      `"${new Date(a.appliedAt).toLocaleDateString()}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HirePulse_Recruitment_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  const resetHandler = () => {
    if (confirm('Reset portal data to initial demo state?')) {
      store.reset();
      showToast('Portal reset to demo data');
      renderJobBoard();
      renderCandidateTracker();
      renderRecruiterATS();
      renderAnalytics();
    }
  };
  document.getElementById('resetDemoBtn')?.addEventListener('click', resetHandler);
  document.getElementById('resetDemoBtnMobile')?.addEventListener('click', resetHandler);
  document.getElementById('footerResetBtn')?.addEventListener('click', resetHandler);

  renderJobBoard();
  renderCandidateTracker();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
