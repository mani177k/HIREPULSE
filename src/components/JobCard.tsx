import React from 'react';
import { Job } from '../types/job.ts';
import { Bookmark, MapPin, Building2, Clock, DollarSign, CheckCircle2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  onApply: (job: Job) => void;
  isBookmarked: boolean;
  onToggleBookmark: (jobId: string) => void;
  hasApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onSelect,
  onApply,
  isBookmarked,
  onToggleBookmark,
  hasApplied
}) => {
  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k / yr`;
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Posted today';
    if (days === 1) return 'Posted 1d ago';
    return `Posted ${days}d ago`;
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between group">
      <div>
        {/* Top Header: Company & Bookmark */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-lg select-none shrink-0 font-medium text-slate-700">
              {job.companyLogo || <Building2 className="w-5 h-5 text-slate-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                {job.company}
                {job.featured && (
                  <span className="text-[11px] font-semibold text-amber-700">· Featured</span>
                )}
              </p>
              <h3 
                onClick={() => onSelect(job)}
                className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug line-clamp-1"
              >
                {job.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onToggleBookmark(job.id)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''
              }`}
            />
          </button>
        </div>

        {/* Clean Unboxed Metadata with Typographic Separators */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-normal">
          <span className="flex items-center gap-1 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {job.location} ({job.locationType})
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.department}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.type}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.experienceLevel}</span>
        </div>

        {/* Short Excerpt */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills List (Unboxed typography with quiet delimiters) */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[11px] text-slate-600 bg-slate-100/70 px-2 py-0.5 rounded font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Salary, Timestamp, Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-xs text-slate-400">Compensation</div>
          <div className="text-sm font-semibold text-slate-900 font-mono tabular-nums">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(job)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Details
          </button>

          {hasApplied ? (
            <span className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Applied</span>
            </span>
          ) : (
            <button
              onClick={() => onApply(job)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
