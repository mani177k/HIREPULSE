import React, { useState, useEffect } from 'react';
import { Application, ApplicationStage } from '../types/job.ts';
import { api } from '../services/api.ts';
import { Search, Building2, Calendar, Clock, CheckCircle2, AlertCircle, Trash2, ExternalLink, Mail, Phone, RefreshCw } from 'lucide-react';

interface CandidateTrackerProps {
  initialEmail?: string;
  onBrowseJobs: () => void;
}

const STAGES: { key: ApplicationStage; label: string }[] = [
  { key: 'applied', label: 'Applied' },
  { key: 'screening', label: 'Screening' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'hired', label: 'Hired' }
];

export const CandidateTracker: React.FC<CandidateTrackerProps> = ({
  initialEmail = 'alex.mercer@example.com',
  onBrowseJobs
}) => {
  const [candidateEmail, setCandidateEmail] = useState(initialEmail);
  const [searchEmailInput, setSearchEmailInput] = useState(initialEmail);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const fetchApplications = async (email: string) => {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCandidateApplications(email);
      setApplications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(candidateEmail);
  }, [candidateEmail]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchEmailInput.trim()) {
      setCandidateEmail(searchEmailInput.trim());
    }
  };

  const handleWithdraw = async (appId: string) => {
    if (!window.confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      return;
    }
    setWithdrawingId(appId);
    try {
      await api.withdrawApplication(appId);
      setApplications(prev => prev.filter(a => a.id !== appId));
    } catch (err: any) {
      alert(err.message || 'Failed to withdraw application');
    } finally {
      setWithdrawingId(null);
    }
  };

  const getStageIndex = (stage: ApplicationStage) => {
    if (stage === 'rejected') return -1;
    return STAGES.findIndex(s => s.key === stage);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Tracker Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Application Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track real-time hiring stage progress, interview invites, and recruiter feedback.
            </p>
          </div>

          {/* Quick email switcher */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={searchEmailInput}
                onChange={e => setSearchEmailInput(e.target.value)}
                placeholder="Enter candidate email"
                className="pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 w-64"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              Check
            </button>
          </form>
        </div>

        {/* Quick Demo Pre-sets */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Quick Demo Candidates:</span>
          <button
            onClick={() => { setSearchEmailInput('alex.mercer@example.com'); setCandidateEmail('alex.mercer@example.com'); }}
            className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
          >
            Alex Mercer (Interviewing)
          </button>
          <span>·</span>
          <button
            onClick={() => { setSearchEmailInput('elena.design@example.com'); setCandidateEmail('elena.design@example.com'); }}
            className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
          >
            Elena Rostova (Offer Stage)
          </button>
          <span>·</span>
          <button
            onClick={() => { setSearchEmailInput('marcus.vance@example.com'); setCandidateEmail('marcus.vance@example.com'); }}
            className="text-xs text-indigo-600 hover:underline font-medium cursor-pointer"
          >
            Marcus Vance (Screening)
          </button>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Retrieving application status...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No active applications found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No submissions were found for <span className="font-semibold text-slate-700">{candidateEmail}</span>. Submit an application or search with another email address.
          </p>
          <button
            onClick={onBrowseJobs}
            className="mt-5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            Explore Open Positions
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Showing {applications.length} submitted application{applications.length > 1 ? 's' : ''}</span>
            <span className="font-mono tabular-nums">Refreshed just now</span>
          </div>

          {applications.map((app) => {
            const currentStageIndex = getStageIndex(app.stage);
            const isRejected = app.stage === 'rejected';

            return (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                      <span className="font-semibold text-slate-800">{app.company}</span>
                      <span>·</span>
                      <span className="font-mono">{app.id}</span>
                      <span>·</span>
                      <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900">
                      {app.jobTitle}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Stage status indicator */}
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 font-medium">Status</div>
                      <span className={`text-xs font-bold capitalize ${
                        app.stage === 'hired' ? 'text-emerald-700' :
                        app.stage === 'offer' ? 'text-purple-700' :
                        app.stage === 'interview' ? 'text-indigo-700' :
                        app.stage === 'screening' ? 'text-amber-700' :
                        app.stage === 'rejected' ? 'text-red-700' :
                        'text-slate-700'
                      }`}>
                        {app.stage === 'interview' ? 'Interview Scheduled' : app.stage}
                      </span>
                    </div>

                    <button
                      onClick={() => handleWithdraw(app.id)}
                      disabled={withdrawingId === app.id}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title="Withdraw application"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline text-[11px]">Withdraw</span>
                    </button>
                  </div>
                </div>

                {/* Visual Pipeline Progress Stepper */}
                {!isRejected ? (
                  <div className="py-2">
                    <div className="relative flex items-center justify-between">
                      {/* Background connecting bar */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-100 rounded-full" />
                      {/* Active progress fill */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%`
                        }}
                      />

                      {STAGES.map((s, idx) => {
                        const isCompleted = idx <= currentStageIndex;
                        const isCurrent = idx === currentStageIndex;

                        return (
                          <div key={s.key} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isCompleted
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-white border-2 border-slate-200 text-slate-400'
                              } ${isCurrent ? 'ring-4 ring-indigo-100 scale-110' : ''}`}
                            >
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[11px] font-medium mt-1.5 whitespace-nowrap ${
                                isCurrent
                                  ? 'text-indigo-600 font-bold'
                                  : isCompleted
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Application status: Not moving forward at this time. We encourage applying for future openings.</span>
                  </div>
                )}

                {/* Interview Notification Banner if Interview Stage */}
                {app.stage === 'interview' && app.interviewDate && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-950">
                          Technical Interview Scheduled
                        </div>
                        <div className="text-xs text-indigo-800 mt-0.5">
                          Date: <span className="font-semibold font-mono">{new Date(app.interviewDate).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Offer Notification Banner if Offer Stage */}
                {app.stage === 'offer' && (
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-purple-950">
                          Formal Employment Offer Extended
                        </div>
                        <div className="text-xs text-purple-800 mt-0.5">
                          The hiring team has extended a formal offer. Please review communications from the talent acquisition team.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline History */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Activity & Communication Log
                  </div>
                  {app.timeline.map((entry, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span className="font-medium capitalize text-slate-800">{entry.stage}:</span>
                        <span>{entry.note || `Transitioned to ${entry.stage}`}</span>
                      </div>
                      <span className="text-slate-400 shrink-0 text-[11px] font-mono tabular-nums">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
