import React, { useState } from 'react';
import { Job, Application } from '../types/job.ts';
import { api } from '../services/api.ts';
import { X, Upload, CheckCircle2, AlertCircle, FileText, ArrowRight, ArrowLeft, Briefcase, User, Sparkles } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
  onSuccess: (newApp: Application) => void;
  initialEmail?: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  onClose,
  onSuccess,
  initialEmail = ''
}) => {
  if (!job) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: initialEmail,
    candidatePhone: '',
    candidateLocation: '',
    portfolioUrl: '',
    linkedInUrl: '',
    githubUrl: '',
    experienceYears: '3',
    currentRole: '',
    currentCompany: '',
    skills: job.skills.slice(0, 3).join(', '),
    resumeFileName: '',
    resumeText: '',
    coverLetter: '',
    noticePeriod: '2 weeks',
    expectedSalary: `$${(job.salaryMin + (job.salaryMax - job.salaryMin) * 0.5).toLocaleString()}`,
    workAuthorization: 'Authorized to work without sponsorship'
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setFormData(prev => ({
        ...prev,
        resumeFileName: file.name,
        resumeText: `Candidate Resume File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
      }));
    }
  };

  const handleFillDemoProfile = () => {
    setFormData({
      candidateName: 'Jordan Vance',
      candidateEmail: 'jordan.vance@example.com',
      candidatePhone: '+1 (555) 678-9012',
      candidateLocation: 'San Francisco, CA',
      portfolioUrl: 'https://jordanvance.dev',
      linkedInUrl: 'https://linkedin.com/in/jordan-vance',
      githubUrl: 'https://github.com/jordanvance',
      experienceYears: '5',
      currentRole: 'Software Developer',
      currentCompany: 'Nova Tech',
      skills: job.skills.join(', '),
      resumeFileName: 'Jordan_Vance_Curriculum_Vitae.pdf',
      resumeText: `Jordan Vance - Experienced professional with 5 years in ${job.department}. Specializing in ${job.skills.slice(0, 4).join(', ')}. Strong background with fast-paced engineering teams.`,
      coverLetter: `Dear Hiring Team at ${job.company},\n\nI am writing to express my strong enthusiasm for the ${job.title} role. With over 5 years of focused experience, I have developed expertise that directly maps to your requirements for ${job.skills.slice(0, 3).join(', ')}. I would love the opportunity to contribute to your ongoing product roadmap.`,
      noticePeriod: '2 weeks',
      expectedSalary: `$${(job.salaryMin + 10000).toLocaleString()}`,
      workAuthorization: 'Authorized to work without sponsorship'
    });
  };

  const validateStep1 = () => {
    if (!formData.candidateName.trim()) {
      setErrorMessage('Please enter your full name');
      return false;
    }
    if (!formData.candidateEmail.trim() || !formData.candidateEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.candidatePhone.trim()) {
      setErrorMessage('Please enter your contact phone number');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const validateStep2 = () => {
    if (!formData.currentRole.trim()) {
      setErrorMessage('Please specify your current or most recent title');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const validateStep3 = () => {
    if (!formData.resumeFileName && !formData.resumeText.trim()) {
      setErrorMessage('Please attach a resume file or enter summary details');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const submissionPayload = {
        jobId: job.id,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone,
        candidateLocation: formData.candidateLocation || 'Remote / Unspecified',
        portfolioUrl: formData.portfolioUrl,
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl,
        resumeFileName: formData.resumeFileName || `${formData.candidateName.replace(/\s+/g, '_')}_Resume.pdf`,
        resumeText: formData.resumeText || `${formData.candidateName} - Applied for ${job.title}`,
        coverLetter: formData.coverLetter,
        experienceYears: Number(formData.experienceYears) || 0,
        currentRole: formData.currentRole,
        currentCompany: formData.currentCompany,
        skills: skillsArray,
        screeningAnswers: {
          noticePeriod: formData.noticePeriod,
          expectedSalary: formData.expectedSalary,
          workAuthorization: formData.workAuthorization
        }
      };

      const result = await api.submitApplication(submissionPayload);
      setSubmittedApp(result);
      onSuccess(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Applying for Position</div>
            <div className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>{job.title}</span>
              <span className="text-xs text-slate-500 font-normal">at {job.company}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!submittedApp && (
              <button
                type="button"
                onClick={handleFillDemoProfile}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 rounded cursor-pointer"
                title="Autofill form with realistic candidate info"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autofill Sample</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator (Only if not successfully submitted) */}
        {!submittedApp && (
          <div className="px-6 pt-4 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span className={step >= 1 ? 'text-indigo-600 font-semibold' : ''}>1. Personal Info</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 2 ? 'text-indigo-600 font-semibold' : ''}>2. Experience</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 3 ? 'text-indigo-600 font-semibold' : ''}>3. Resume & Screening</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 4 ? 'text-indigo-600 font-semibold' : ''}>4. Review</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* SUCCESS VIEW */}
          {submittedApp ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{submittedApp.candidateName}</span>. Your application for <span className="font-semibold text-slate-900">{job.title}</span> has been securely transmitted to the recruitment team.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{submittedApp.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidate Email:</span>
                  <span className="font-medium text-slate-800">{submittedApp.candidateEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Initial Status:</span>
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Applied (In Review)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                >
                  Done & Return to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (step === 4) handleSubmit(); else handleNext(); }}>
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Contact & Profile Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.candidateName}
                        onChange={e => setFormData({ ...formData, candidateName: e.target.value })}
                        placeholder="e.g. Jordan Vance"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.candidateEmail}
                        onChange={e => setFormData({ ...formData, candidateEmail: e.target.value })}
                        placeholder="jordan@example.com"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.candidatePhone}
                        onChange={e => setFormData({ ...formData, candidatePhone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current City, State / Country
                      </label>
                      <input
                        type="text"
                        value={formData.candidateLocation}
                        onChange={e => setFormData({ ...formData, candidateLocation: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">Online Links</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="Portfolio / Website URL"
                        className="text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                      <input
                        type="url"
                        value={formData.linkedInUrl}
                        onChange={e => setFormData({ ...formData, linkedInUrl: e.target.value })}
                        placeholder="LinkedIn Profile URL"
                        className="text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="GitHub / Repo URL"
                        className="text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Experience & Skills */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Experience & Professional Background</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current / Most Recent Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.currentRole}
                        onChange={e => setFormData({ ...formData, currentRole: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current / Most Recent Company
                      </label>
                      <input
                        type="text"
                        value={formData.currentCompany}
                        onChange={e => setFormData({ ...formData, currentCompany: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Years of Relevant Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={e => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    >
                      <option value="0">Less than 1 year (Entry / Graduate)</option>
                      <option value="2">1 – 3 years (Junior / Mid)</option>
                      <option value="5">4 – 6 years (Mid / Senior)</option>
                      <option value="8">7 – 10 years (Senior / Staff)</option>
                      <option value="12">10+ years (Principal / Lead)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Key Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.skills}
                      onChange={e => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g. TypeScript, React, Node.js, GraphQL"
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Recommended matching skills for this position: {job.skills.join(', ')}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Resume & Screening Questions */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Resume & Screening Questions</h4>

                  {/* Resume Upload Simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Upload Resume / CV (PDF, DOCX) <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-5 text-center transition-colors bg-slate-50/50">
                      <input
                        type="file"
                        id="resumeUpload"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="resumeUpload" className="cursor-pointer block">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <span className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                          Click to browse files
                        </span>
                        <span className="text-xs text-slate-500"> or drag and drop</span>
                        <p className="text-[11px] text-slate-400 mt-1">PDF or DOCX up to 10MB</p>
                      </label>
                    </div>

                    {formData.resumeFileName && (
                      <div className="mt-2.5 flex items-center justify-between p-2.5 bg-slate-100 rounded-lg text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="font-medium text-slate-800 truncate">{formData.resumeFileName}</span>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold shrink-0">Attached</span>
                      </div>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cover Note / Why are you a fit for {job.company}?
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverLetter}
                      onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Briefly describe what excites you about this role..."
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>

                  {/* Screening Questions */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Screening Questions</h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Notice Period / Earliest Start Date
                        </label>
                        <select
                          value={formData.noticePeriod}
                          onChange={e => setFormData({ ...formData, noticePeriod: e.target.value })}
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                        >
                          <option value="Immediate">Immediate / Available now</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="1 month">1 month</option>
                          <option value="2 months">2+ months</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">
                          Expected Annual Compensation
                        </label>
                        <input
                          type="text"
                          value={formData.expectedSalary}
                          onChange={e => setFormData({ ...formData, expectedSalary: e.target.value })}
                          placeholder="$150,000"
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">
                        Work Authorization
                      </label>
                      <select
                        value={formData.workAuthorization}
                        onChange={e => setFormData({ ...formData, workAuthorization: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="Authorized to work without sponsorship">Authorized to work without sponsorship</option>
                        <option value="Will require visa sponsorship now or in future">Will require visa sponsorship</option>
                        <option value="TN / Other regional work authorization">TN / Regional authorization</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Application */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Review Application Details</h4>
                  
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Candidate</span>
                        <span className="font-semibold text-slate-800">{formData.candidateName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Email</span>
                        <span className="font-semibold text-slate-800">{formData.candidateEmail}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Phone</span>
                        <span className="font-medium text-slate-800">{formData.candidatePhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Location</span>
                        <span className="font-medium text-slate-800">{formData.candidateLocation || 'Remote'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Current Role</span>
                        <span className="font-semibold text-slate-800">{formData.currentRole} at {formData.currentCompany || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Experience</span>
                        <span className="font-semibold text-slate-800">{formData.experienceYears} Years</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Resume Document</span>
                      <span className="font-mono text-slate-800">{formData.resumeFileName}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Notice Period</span>
                        <span className="font-medium text-slate-800">{formData.noticePeriod}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Expected Salary</span>
                        <span className="font-medium text-slate-800">{formData.expectedSalary}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Authorization</span>
                        <span className="font-medium text-slate-800 truncate block">{formData.workAuthorization}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    By submitting, you certify that the information provided is accurate and grant permission to the recruitment team to evaluate your application.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Bottom Actions */}
        {!submittedApp && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
