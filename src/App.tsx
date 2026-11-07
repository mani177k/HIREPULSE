import React, { useState, useEffect } from 'react';
import { Job, Application } from './types/job.ts';
import { api, JobFilterParams } from './services/api.ts';
import { Navbar, ActiveTab } from './components/Navbar.tsx';
import { JobCard } from './components/JobCard.tsx';
import { JobDetailModal } from './components/JobDetailModal.tsx';
import { ApplyModal } from './components/ApplyModal.tsx';
import { CandidateTracker } from './components/CandidateTracker.tsx';
import { RecruiterATS } from './components/RecruiterATS.tsx';
import { PostJobModal } from './components/PostJobModal.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { 
  Search, MapPin, Filter, Briefcase, SlidersHorizontal, 
  RotateCcw, Sparkles, Building2, CheckCircle2, ChevronDown 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  
  // Bookmarks (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hirepulse_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Candidate Email state
  const [candidateEmail, setCandidateEmail] = useState<string>(() => {
    return localStorage.getItem('hirepulse_candidate_email') || 'alex.mercer@example.com';
  });

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocationType, setSelectedLocationType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [minSalary, setMinSalary] = useState<number>(0);
  const [sortBy, setSortBy] = useState('newest');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Modals state
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Jobs
  const loadJobs = async () => {
    setLoading(true);
    try {
      const params: JobFilterParams = {
        search: searchQuery.trim() || undefined,
        department: selectedDepartment !== 'All' ? selectedDepartment : undefined,
        type: selectedType !== 'All' ? selectedType : undefined,
        locationType: selectedLocationType !== 'All' ? selectedLocationType : undefined,
        experienceLevel: selectedExperience !== 'All' ? selectedExperience : undefined,
        minSalary: minSalary > 0 ? minSalary : undefined,
        sort: sortBy
      };
      const fetchedJobs = await api.getJobs(params);
      setJobs(fetchedJobs);
    } catch (err) {
      console.error('Failed to load jobs', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's own applications for count & tracker
  const loadUserApplications = async (email: string) => {
    try {
      const apps = await api.getCandidateApplications(email);
      setUserApplications(apps);
    } catch (err) {
      console.error('Failed to load candidate applications', err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [searchQuery, selectedDepartment, selectedType, selectedLocationType, selectedExperience, minSalary, sortBy]);

  useEffect(() => {
    loadUserApplications(candidateEmail);
  }, [candidateEmail]);

  // Bookmark Toggle
  const handleToggleBookmark = (jobId: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId];
      try {
        localStorage.setItem('hirepulse_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Reset demo data handler
  const handleResetData = async () => {
    if (!window.confirm('Reset the job portal to initial demonstration seed data?')) return;
    try {
      await api.resetSeedData();
      showToast('Portal data reset to seed state');
      loadJobs();
      loadUserApplications(candidateEmail);
    } catch (err) {
      alert('Failed to reset seed data');
    }
  };

  // Filtered jobs considering bookmarks
  const displayedJobs = showBookmarksOnly
    ? jobs.filter(j => bookmarkedIds.includes(j.id))
    : jobs;

  const userAppliedJobIds = new Set(userApplications.map(a => a.jobId));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPostJobClick={() => setIsPostJobModalOpen(true)}
        onResetData={handleResetData}
        applicationCount={userApplications.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'jobs' && (
          <div className="space-y-8 pb-16">
            {/* Hero & Search Header */}
            <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center space-y-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Discover Your Next Career Move
                </h1>
                <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                  Browse vetted roles across high-growth engineering, design, and product teams. Apply with zero friction and monitor your pipeline progress in real time.
                </p>

                {/* Primary Search Container */}
                <div className="pt-4 max-w-4xl mx-auto">
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-sm flex flex-col sm:flex-row items-center gap-2">
                    {/* Text input */}
                    <div className="relative flex-1 w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by job title, skill (TypeScript, React), or company..."
                        className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 bg-transparent border-0 focus:outline-none text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Department Quick Filter */}
                    <div className="w-full sm:w-auto shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                      <select
                        value={selectedDepartment}
                        onChange={e => setSelectedDepartment(e.target.value)}
                        className="w-full sm:w-40 text-xs px-2.5 py-2 border-0 bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>

                    {/* Arrangement Quick Filter */}
                    <div className="w-full sm:w-auto shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                      <select
                        value={selectedLocationType}
                        onChange={e => setSelectedLocationType(e.target.value)}
                        className="w-full sm:w-32 text-xs px-2.5 py-2 border-0 bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="All">Work Type</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Skill Tags (Interactive Segmented Filter Buttons) */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                    <span className="text-slate-400 mr-1">Popular searches:</span>
                    {['TypeScript', 'React', 'Kubernetes', 'Design Systems', 'PostgreSQL'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => setSearchQuery(skill)}
                        className="px-2.5 py-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer"
                      >
                        {skill}
                      </button>
                    ))}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-indigo-600 hover:underline ml-1 cursor-pointer font-medium"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Job Board Grid & Faceted Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Secondary Filter Bar */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {/* Job Type */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-medium">Type:</span>
                    <select
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                      className="px-2 py-1 border border-slate-200 rounded-md bg-white text-slate-700"
                    >
                      <option value="All">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-medium">Experience:</span>
                    <select
                      value={selectedExperience}
                      onChange={e => setSelectedExperience(e.target.value)}
                      className="px-2 py-1 border border-slate-200 rounded-md bg-white text-slate-700"
                    >
                      <option value="All">All Levels</option>
                      <option value="Entry-level">Entry-level</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior">Senior</option>
                      <option value="Lead / Principal">Lead / Principal</option>
                    </select>
                  </div>

                  {/* Minimum Salary Slider */}
                  <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <span className="text-slate-400 font-medium">Min Salary:</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      {minSalary === 0 ? 'Any' : `$${(minSalary / 1000).toFixed(0)}k+`}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="180000"
                      step="10000"
                      value={minSalary}
                      onChange={e => setMinSalary(Number(e.target.value))}
                      className="w-24 accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  {/* Saved Jobs Toggle */}
                  <button
                    onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer border ${
                      showBookmarksOnly
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Saved Jobs ({bookmarkedIds.length})
                  </button>
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="px-2.5 py-1 border border-slate-200 rounded-md bg-white text-slate-700 font-medium"
                  >
                    <option value="newest">Newest First</option>
                    <option value="salary-high">Highest Salary</option>
                    <option value="salary-low">Lowest Salary</option>
                    <option value="applicants">Most Applicants</option>
                  </select>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
                <span>
                  Showing <strong className="text-slate-900 font-mono tabular-nums">{displayedJobs.length}</strong> available positions
                </span>
                {(selectedDepartment !== 'All' || selectedType !== 'All' || selectedLocationType !== 'All' || searchQuery || minSalary > 0 || showBookmarksOnly) && (
                  <button
                    onClick={() => {
                      setSelectedDepartment('All');
                      setSelectedType('All');
                      setSelectedLocationType('All');
                      setSelectedExperience('All');
                      setMinSalary(0);
                      setSearchQuery('');
                      setShowBookmarksOnly(false);
                    }}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Job Listings Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 h-64 animate-pulse space-y-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4" />
                          <div className="h-3 bg-slate-100 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="h-12 bg-slate-100 rounded" />
                      <div className="h-8 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : displayedJobs.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try broadening your search query, adjusting salary threshold, or resetting active filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDepartment('All');
                      setSelectedType('All');
                      setSelectedLocationType('All');
                      setSelectedExperience('All');
                      setMinSalary(0);
                      setSearchQuery('');
                      setShowBookmarksOnly(false);
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onSelect={setSelectedJobForDetail}
                      onApply={setSelectedJobForApply}
                      isBookmarked={bookmarkedIds.includes(job.id)}
                      onToggleBookmark={handleToggleBookmark}
                      hasApplied={userAppliedJobIds.has(job.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* View 2: Candidate Application Tracker */}
        {activeTab === 'my-applications' && (
          <CandidateTracker
            initialEmail={candidateEmail}
            onBrowseJobs={() => setActiveTab('jobs')}
          />
        )}

        {/* View 3: Recruiter ATS Pipeline & Board */}
        {activeTab === 'recruiter-ats' && (
          <RecruiterATS
            jobs={jobs}
            onOpenPostJob={() => setIsPostJobModalOpen(true)}
            onRefreshData={() => {
              loadJobs();
              loadUserApplications(candidateEmail);
            }}
          />
        )}

        {/* View 4: Analytics */}
        {activeTab === 'analytics' && (
          <AnalyticsView
            onRefresh={() => {
              loadJobs();
              loadUserApplications(candidateEmail);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">HirePulse</span>
            <span>·</span>
            <span>Enterprise Full-Stack Recruitment Portal & ATS</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>RESTful API Connected</span>
            <span>·</span>
            <button
              onClick={handleResetData}
              className="text-indigo-600 hover:underline cursor-pointer font-medium"
            >
              Reset Seed Data
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Job Detail Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={setSelectedJobForApply}
        isBookmarked={selectedJobForDetail ? bookmarkedIds.includes(selectedJobForDetail.id) : false}
        onToggleBookmark={handleToggleBookmark}
        hasApplied={selectedJobForDetail ? userAppliedJobIds.has(selectedJobForDetail.id) : false}
      />

      {/* 2. Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
        initialEmail={candidateEmail}
        onSuccess={(newApp) => {
          showToast(`Application submitted! Tracking ID: ${newApp.id}`);
          setCandidateEmail(newApp.candidateEmail);
          try {
            localStorage.setItem('hirepulse_candidate_email', newApp.candidateEmail);
          } catch (e) {}
          loadUserApplications(newApp.candidateEmail);
          loadJobs();
        }}
      />

      {/* 3. Post Job Modal */}
      {isPostJobModalOpen && (
        <PostJobModal
          onClose={() => setIsPostJobModalOpen(false)}
          onSuccess={(newJob) => {
            showToast(`Requisition "${newJob.title}" published!`);
            loadJobs();
          }}
        />
      )}
    </div>
  );
}
