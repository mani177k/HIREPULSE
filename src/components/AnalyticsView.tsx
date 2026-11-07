import React, { useState, useEffect } from 'react';
import { RecruitmentStats, Application } from '../types/job.ts';
import { api } from '../services/api.ts';
import { 
  BarChart3, Users, Briefcase, Award, TrendingUp, Download, 
  RefreshCw, CheckCircle2, PieChart, Sparkles 
} from 'lucide-react';

interface AnalyticsViewProps {
  onRefresh: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onRefresh }) => {
  const [stats, setStats] = useState<RecruitmentStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleExportCSV = async () => {
    try {
      const apps = await api.getApplications({});
      if (apps.length === 0) {
        alert('No applications available to export');
        return;
      }

      // Generate CSV string
      const headers = [
        'Application ID',
        'Job Title',
        'Company',
        'Candidate Name',
        'Candidate Email',
        'Phone',
        'Location',
        'Experience (Years)',
        'Stage',
        'Rating',
        'Applied Date'
      ];

      const rows = apps.map(a => [
        `"${a.id}"`,
        `"${a.jobTitle}"`,
        `"${a.company}"`,
        `"${a.candidateName}"`,
        `"${a.candidateEmail}"`,
        `"${a.candidatePhone}"`,
        `"${a.candidateLocation}"`,
        `"${a.experienceYears}"`,
        `"${a.stage}"`,
        `"${a.rating || 3}"`,
        `"${new Date(a.appliedAt).toISOString()}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `HirePulse_Recruitment_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to generate export file');
    }
  };

  if (loading || !stats) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Aggregating recruitment metrics...</p>
      </div>
    );
  }

  // Calculate funnel conversions
  const total = stats.totalApplications || 1;
  const screeningCount = stats.stageDistribution.screening + stats.stageDistribution.interview + stats.stageDistribution.offer + stats.stageDistribution.hired;
  const interviewCount = stats.stageDistribution.interview + stats.stageDistribution.offer + stats.stageDistribution.hired;
  const offerCount = stats.stageDistribution.offer + stats.stageDistribution.hired;
  const hiredCount = stats.stageDistribution.hired;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Export */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Recruitment Funnel & Pipeline Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time conversion metrics, candidate sourcing efficiency, and talent demand distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Active Requisitions</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {stats.activeJobs}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">out of {stats.totalJobs} total postings</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Total Applicants</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1 font-mono tabular-nums">
            {stats.totalApplications}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Across all positions</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">In Technical Interviews</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {stats.inInterviewCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active stage candidates</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Successful Hires</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono tabular-nums">
            {stats.hiredCount}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium">Accepted offers</div>
        </div>
      </div>

      {/* Recruitment Conversion Funnel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Pipeline Conversion Funnel
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage progression and conversion ratios from initial applicant submission to accepted hire.
          </p>
        </div>

        <div className="space-y-4">
          {/* Applied */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">1. Applications Received</span>
              <span className="font-mono tabular-nums font-bold text-slate-900">{total} candidates (100%)</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-slate-700 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Screening */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">2. Qualified for Screening</span>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                {screeningCount} candidates ({((screeningCount / total) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full" 
                style={{ width: `${Math.min(100, (screeningCount / total) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Interview */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">3. Technical & Leadership Interviews</span>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                {interviewCount} candidates ({((interviewCount / total) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full" 
                style={{ width: `${Math.min(100, (interviewCount / total) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Offer */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">4. Offers Extended</span>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                {offerCount} candidates ({((offerCount / total) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full" 
                style={{ width: `${Math.min(100, (offerCount / total) * 100)}%` }} 
              />
            </div>
          </div>

          {/* Hired */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-800">5. Signed Hires</span>
              <span className="font-mono tabular-nums font-bold text-emerald-700">
                {hiredCount} candidates ({((hiredCount / total) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full" 
                style={{ width: `${Math.min(100, (hiredCount / total) * 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dual Column: Department Distribution & In-Demand Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Open Requisitions by Department
          </h3>
          <div className="space-y-3">
            {stats.departmentBreakdown.map(dept => (
              <div key={dept.department} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">{dept.department}</span>
                <span className="font-mono font-bold text-slate-700 tabular-nums bg-white px-2.5 py-0.5 rounded border border-slate-200">
                  {dept.count} Requisitions
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Demanded Skills */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Top Skills in Demand
          </h3>
          <div className="space-y-3">
            {stats.topSkills.map((item, idx) => (
              <div key={item.skill} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">0{idx + 1}.</span>
                  <span className="font-semibold text-slate-800">{item.skill}</span>
                </div>
                <span className="font-mono text-slate-600 tabular-nums">
                  {item.demand} Job Postings
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Leadership Spotlight */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center gap-4">
        <img
          src="/src/assets/images/avatar_recruiter_sarah_1794038197050.jpg"
          alt="Sarah Jenkins"
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-full object-cover border border-slate-200 shrink-0"
        />
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Lead Recruiter: Sarah Jenkins
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Overseeing technical hiring workflows, interview pipeline orchestration, and talent brand consistency across HirePulse.
          </p>
        </div>
      </div>
    </div>
  );
};
