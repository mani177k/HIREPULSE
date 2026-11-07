import React, { useState, useEffect } from 'react';
import { Application, ApplicationStage, Job } from '../types/job.ts';
import { api } from '../services/api.ts';
import { 
  Users, Search, Filter, Kanban, Table as TableIcon, Star, 
  ChevronRight, Calendar, MessageSquare, Check, X, FileText, 
  ExternalLink, Mail, Phone, MapPin, Briefcase, Clock, Plus, RefreshCw 
} from 'lucide-react';

interface RecruiterATSProps {
  jobs: Job[];
  onOpenPostJob: () => void;
  onRefreshData: () => void;
}

const STAGES: { id: ApplicationStage; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'border-slate-300' },
  { id: 'screening', label: 'Screening', color: 'border-amber-400' },
  { id: 'interview', label: 'Interview', color: 'border-indigo-500' },
  { id: 'offer', label: 'Offer', color: 'border-purple-500' },
  { id: 'hired', label: 'Hired', color: 'border-emerald-500' },
];

export const RecruiterATS: React.FC<RecruiterATSProps> = ({
  jobs,
  onOpenPostJob,
  onRefreshData
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);

  // Candidate review drawer state
  const [newNote, setNewNote] = useState('');
  const [interviewDateInput, setInterviewDateInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await api.getApplications({
        jobId: selectedJobId !== 'all' ? selectedJobId : undefined,
        search: searchQuery.trim() || undefined
      });
      setApplications(data);
      // Sync selectedCandidate if already open
      if (selectedCandidate) {
        const refreshed = data.find(a => a.id === selectedCandidate.id);
        if (refreshed) setSelectedCandidate(refreshed);
      }
    } catch (err) {
      console.error('Failed to load applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedJobId, searchQuery]);

  // Stage transition handler
  const handleStageChange = async (appId: string, newStage: ApplicationStage, noteText?: string) => {
    setIsUpdating(true);
    try {
      const updated = await api.updateApplication(appId, {
        stage: newStage,
        note: noteText || `Stage updated to ${newStage}`
      });
      setApplications(prev => prev.map(a => a.id === appId ? updated : a));
      if (selectedCandidate?.id === appId) {
        setSelectedCandidate(updated);
      }
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to update candidate stage');
    } finally {
      setIsUpdating(false);
    }
  };

  // Rating update handler
  const handleRatingChange = async (appId: string, rating: number) => {
    try {
      const updated = await api.updateApplication(appId, { rating });
      setApplications(prev => prev.map(a => a.id === appId ? updated : a));
      if (selectedCandidate?.id === appId) {
        setSelectedCandidate(updated);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update rating');
    }
  };

  // Add Recruiter Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !newNote.trim()) return;
    setIsUpdating(true);
    try {
      const updated = await api.updateApplication(selectedCandidate.id, {
        note: newNote.trim()
      });
      setApplications(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedCandidate(updated);
      setNewNote('');
    } catch (err: any) {
      alert(err.message || 'Failed to add note');
    } finally {
      setIsUpdating(false);
    }
  };

  // Schedule Interview
  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !interviewDateInput) return;
    setIsUpdating(true);
    try {
      const updated = await api.updateApplication(selectedCandidate.id, {
        stage: 'interview',
        interviewDate: new Date(interviewDateInput).toISOString(),
        note: `Interview scheduled for ${new Date(interviewDateInput).toLocaleString()}`
      });
      setApplications(prev => prev.map(a => a.id === updated.id ? updated : a));
      setSelectedCandidate(updated);
      setInterviewDateInput('');
      alert('Interview scheduled successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to schedule interview');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ATS Header & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Applicant Tracking System (ATS)
              </h1>
              <span className="text-xs font-mono tabular-nums px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                {applications.length} Active Applicants
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Screen candidates, manage pipeline stages, schedule interviews, and document internal feedback.
            </p>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPostJob}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Job Requisition</span>
            </button>
          </div>
        </div>

        {/* Filter & View Controls */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search candidates or skills..."
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 w-56 sm:w-64"
              />
            </div>

            {/* Job Requisition Selector */}
            <select
              value={selectedJobId}
              onChange={e => setSelectedJobId(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="all">All Job Requisitions ({jobs.length})</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.applicantCount})
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main ATS Content */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading pipeline candidates...</p>
        </div>
      ) : viewMode === 'kanban' ? (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STAGES.map(stage => {
            const stageApps = applications.filter(a => a.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 flex flex-col min-h-[520px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800 tracking-wide">
                    {stage.label}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-600 bg-white px-2 py-0.5 rounded shadow-2xs">
                    {stageApps.length}
                  </span>
                </div>

                {/* Candidate Cards Column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[680px] pr-0.5">
                  {stageApps.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 font-medium">
                      No candidates in {stage.label}
                    </div>
                  ) : (
                    stageApps.map(candidate => (
                      <div
                        key={candidate.id}
                        onClick={() => setSelectedCandidate(candidate)}
                        className={`bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-indigo-400 transition-all cursor-pointer group ${
                          selectedCandidate?.id === candidate.id ? 'ring-2 ring-indigo-500' : ''
                        }`}
                      >
                        {/* Candidate Top */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {candidate.avatarUrl ? (
                              <img
                                src={candidate.avatarUrl}
                                alt={candidate.candidateName}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                                {candidate.candidateName.charAt(0)}
                              </div>
                            )}
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {candidate.candidateName}
                              </h4>
                              <p className="text-[11px] text-slate-500 truncate max-w-[130px]">
                                {candidate.currentRole}
                              </p>
                            </div>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-[11px] font-mono ml-0.5 font-bold text-slate-700">
                              {candidate.rating || 3}
                            </span>
                          </div>
                        </div>

                        {/* Applied Job */}
                        <div className="mt-2.5 text-[11px] font-medium text-slate-700 bg-slate-50 p-1.5 rounded truncate">
                          {candidate.jobTitle}
                        </div>

                        {/* Key Skills */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map(skill => (
                            <span key={skill} className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 2 && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              +{candidate.skills.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Quick Action Footer */}
                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-mono tabular-nums">
                            {candidate.experienceYears}y exp
                          </span>
                          <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5">
                            View <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Applied Job</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Applied Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      No applications matching criteria
                    </td>
                  </tr>
                ) : (
                  applications.map(candidate => (
                    <tr
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          {candidate.avatarUrl ? (
                            <img
                              src={candidate.avatarUrl}
                              alt={candidate.candidateName}
                              referrerPolicy="no-referrer"
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                              {candidate.candidateName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-indigo-600">
                              {candidate.candidateName}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {candidate.candidateEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {candidate.jobTitle}
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono tabular-nums">
                        {candidate.experienceYears} Years
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-amber-500 font-mono font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                          {candidate.rating || 3}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`capitalize font-semibold text-[11px] px-2 py-0.5 rounded ${
                          candidate.stage === 'hired' ? 'bg-emerald-50 text-emerald-700' :
                          candidate.stage === 'offer' ? 'bg-purple-50 text-purple-700' :
                          candidate.stage === 'interview' ? 'bg-indigo-50 text-indigo-700' :
                          candidate.stage === 'screening' ? 'bg-amber-50 text-amber-700' :
                          candidate.stage === 'rejected' ? 'bg-red-50 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono tabular-nums">
                        {new Date(candidate.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CANDIDATE REVIEW SIDE DRAWER / MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedCandidate.avatarUrl ? (
                  <img
                    src={selectedCandidate.avatarUrl}
                    alt={selectedCandidate.candidateName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-base flex items-center justify-center">
                    {selectedCandidate.candidateName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedCandidate.candidateName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedCandidate.currentRole} · {selectedCandidate.experienceYears}y experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Actions & Stage Transition Bar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Pipeline Stage
                  </span>
                  {/* Rating Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500 mr-1">Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(selectedCandidate.id, star)}
                        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= (selectedCandidate.rating || 3)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {STAGES.map(s => (
                    <button
                      key={s.id}
                      disabled={isUpdating}
                      onClick={() => handleStageChange(selectedCandidate.id, s.id)}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                        selectedCandidate.stage === s.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleStageChange(selectedCandidate.id, 'rejected', 'Candidate rejected after review')}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Reject Candidate
                  </button>
                </div>
              </div>

              {/* Contact & Links Strip */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCandidate.candidateEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedCandidate.candidatePhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCandidate.candidateLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCandidate.jobTitle}</span>
                </div>
              </div>

              {/* Online Links */}
              {(selectedCandidate.portfolioUrl || selectedCandidate.linkedInUrl || selectedCandidate.githubUrl) && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedCandidate.portfolioUrl && (
                    <a
                      href={selectedCandidate.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-100 text-indigo-600 hover:underline rounded flex items-center gap-1 font-medium"
                    >
                      Portfolio <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {selectedCandidate.linkedInUrl && (
                    <a
                      href={selectedCandidate.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-100 text-indigo-600 hover:underline rounded flex items-center gap-1 font-medium"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {selectedCandidate.githubUrl && (
                    <a
                      href={selectedCandidate.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-100 text-indigo-600 hover:underline rounded flex items-center gap-1 font-medium"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {/* Resume / Background Document */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Resume Document
                  </h4>
                  <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {selectedCandidate.resumeFileName}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed font-sans">
                  {selectedCandidate.resumeText || 'No text extracted.'}
                </div>
              </div>

              {/* Cover Letter */}
              {selectedCandidate.coverLetter && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Cover Letter / Candidate Note
                  </h4>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedCandidate.coverLetter}
                  </div>
                </div>
              )}

              {/* Screening Answers */}
              {selectedCandidate.screeningAnswers && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Screening Question Responses
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedCandidate.screeningAnswers).map(([k, v]) => (
                      <div key={k} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[11px] text-slate-400 capitalize block">{k.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Interview Tool */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Schedule Interview</span>
                </h4>
                <form onSubmit={handleScheduleInterview} className="flex gap-2">
                  <input
                    type="datetime-local"
                    required
                    value={interviewDateInput}
                    onChange={e => setInterviewDateInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 border border-indigo-200 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Confirm Date
                  </button>
                </form>
                {selectedCandidate.interviewDate && (
                  <p className="text-[11px] text-indigo-800">
                    Currently scheduled for: <span className="font-semibold">{new Date(selectedCandidate.interviewDate).toLocaleString()}</span>
                  </p>
                )}
              </div>

              {/* Internal Recruiter Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Internal Recruiter Notes ({selectedCandidate.notes.length})</span>
                </h4>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Add interview feedback or recruiter evaluation..."
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdating || !newNote.trim()}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Post Note
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  {selectedCandidate.notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes posted yet.</p>
                  ) : (
                    selectedCandidate.notes.map(note => (
                      <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-semibold text-slate-800">{note.author}</span>
                          <span className="text-[11px] font-mono">{new Date(note.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{note.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
