import React from 'react';
import { Job } from '../types/job.ts';
import { X, MapPin, Building2, Calendar, Users, DollarSign, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  isBookmarked: boolean;
  onToggleBookmark: (jobId: string) => void;
  hasApplied?: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  isBookmarked,
  onToggleBookmark,
  hasApplied
}) => {
  if (!job) return null;

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} – $${max.toLocaleString()} ${job.currency} / year`;
  };

  const copyJobLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Job link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
              {job.companyLogo || <Building2 className="w-6 h-6 text-slate-500" />}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {job.company}
              </p>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {job.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(job.id)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove bookmark' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
            </button>
            <button
              onClick={copyJobLink}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Share job link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Overview Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Location</div>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">{job.location}</div>
              <div className="text-xs text-slate-500">{job.locationType}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Department</div>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">{job.department}</div>
              <div className="text-xs text-slate-500">{job.type}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Experience</div>
              <div className="text-sm font-semibold text-slate-800 mt-0.5">{job.experienceLevel}</div>
              <div className="text-xs text-slate-500">{job.applicantCount} applicants</div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Salary Range</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5 font-mono tabular-nums">
                ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-slate-500">Annual compensation</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 mb-3">
              Role Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 mb-3">
                Key Responsibilities
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 mb-3">
                Required Qualifications
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium text-slate-800 bg-slate-100 px-3 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 mb-3">
                Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">·</span>
            <span className="font-mono tabular-nums">{job.applicantCount} applicants</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            {hasApplied ? (
              <span className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Application Submitted</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(job);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Apply for this Position
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
