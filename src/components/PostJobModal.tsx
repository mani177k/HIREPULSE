import React, { useState } from 'react';
import { Job, JobType, LocationType, ExperienceLevel } from '../types/job.ts';
import { api } from '../services/api.ts';
import { X, Plus, Trash2, CheckCircle2, AlertCircle, Building2, DollarSign, Sparkles } from 'lucide-react';

interface PostJobModalProps {
  onClose: () => void;
  onSuccess: (newJob: Job) => void;
  editingJob?: Job | null;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  onClose,
  onSuccess,
  editingJob
}) => {
  const [formData, setFormData] = useState({
    title: editingJob?.title || '',
    company: editingJob?.company || 'PulseStream Cloud',
    companyLogo: editingJob?.companyLogo || '⚡',
    department: editingJob?.department || 'Engineering',
    type: (editingJob?.type || 'Full-time') as JobType,
    locationType: (editingJob?.locationType || 'Remote') as LocationType,
    location: editingJob?.location || 'San Francisco, CA (or Remote)',
    experienceLevel: (editingJob?.experienceLevel || 'Senior') as ExperienceLevel,
    salaryMin: editingJob?.salaryMin ? String(editingJob.salaryMin) : '130000',
    salaryMax: editingJob?.salaryMax ? String(editingJob.salaryMax) : '170000',
    currency: editingJob?.currency || 'USD',
    description: editingJob?.description || '',
    skills: editingJob?.skills ? editingJob.skills.join(', ') : 'TypeScript, React, Node.js',
    status: editingJob?.status || 'active',
    featured: editingJob?.featured || false
  });

  const [responsibilities, setResponsibilities] = useState<string[]>(
    editingJob?.responsibilities || [
      'Architect robust web applications with modern design systems and clean APIs',
      'Collaborate with product and design to craft joyful user workflows',
      'Participate in code reviews and mentor colleagues across the team'
    ]
  );

  const [requirements, setRequirements] = useState<string[]>(
    editingJob?.requirements || [
      '4+ years of professional software engineering experience',
      'Proficiency in modern TypeScript, web standards, and cloud services',
      'Demonstrated passion for clean architecture and thoughtful UX'
    ]
  );

  const [benefits, setBenefits] = useState<string[]>(
    editingJob?.benefits || [
      'Comprehensive medical, dental, and vision insurance',
      'Flexible remote work policy and generous equipment stipend',
      '401(k) matching with immediate vesting and competitive equity'
    ]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofillTemplate = () => {
    setFormData({
      title: 'Senior Distributed Systems Architect',
      company: 'PulseStream Cloud',
      companyLogo: '⚡',
      department: 'Engineering',
      type: 'Full-time',
      locationType: 'Remote',
      location: 'Remote US / Canada',
      experienceLevel: 'Lead / Principal',
      salaryMin: '165000',
      salaryMax: '215000',
      currency: 'USD',
      description: 'We are expanding our core platform team to build fault-tolerant stream processing architectures handling high-concurrency ingestion and distributed state machines.',
      skills: 'Go, Rust, Distributed Systems, Kafka, Kubernetes, gRPC',
      status: 'active',
      featured: true
    });
    setResponsibilities([
      'Design and deploy resilient stream processing pipelines processing 50M+ daily events',
      'Benchmark throughput, memory allocation, and latency profiles under heavy workloads',
      'Author architectural blueprints and technical specifications for cross-team alignment'
    ]);
    setRequirements([
      '6+ years working on distributed backend systems or high-scale cloud platforms',
      'Experience with Kafka, Flink, RabbitMQ or event-driven streaming engines',
      'Deep knowledge of concurrent algorithms, memory models, and networking'
    ]);
  };

  const handleAddListItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    placeholder: string
  ) => {
    setList([...list, placeholder]);
  };

  const handleUpdateListItem = (
    idx: number,
    val: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const updated = [...list];
    updated[idx] = val;
    setList(updated);
  };

  const handleRemoveListItem = (
    idx: number,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage('Please enter a job title');
      return;
    }
    if (!formData.company.trim()) {
      setErrorMessage('Please enter the hiring company name');
      return;
    }
    if (!formData.location.trim()) {
      setErrorMessage('Please specify location');
      return;
    }

    setIsSubmitting(true);
    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        companyLogo: formData.companyLogo,
        department: formData.department,
        type: formData.type,
        locationType: formData.locationType,
        location: formData.location.trim(),
        experienceLevel: formData.experienceLevel,
        salaryMin: Number(formData.salaryMin) || 90000,
        salaryMax: Number(formData.salaryMax) || 140000,
        currency: formData.currency,
        description: formData.description || `Exciting career opportunity at ${formData.company}.`,
        responsibilities: responsibilities.filter(r => r.trim().length > 0),
        requirements: requirements.filter(r => r.trim().length > 0),
        benefits: benefits.filter(b => b.trim().length > 0),
        skills: skillsArray.length > 0 ? skillsArray : ['Communication', 'Teamwork'],
        status: formData.status as 'active' | 'draft' | 'closed',
        featured: formData.featured
      };

      let result: Job;
      if (editingJob) {
        result = await api.updateJob(editingJob.id, payload);
      } else {
        result = await api.createJob(payload);
      }

      onSuccess(result);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {editingJob ? 'Edit Job Requisition' : 'Create New Job Requisition'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish position specifications across candidate portal and track inbound talent.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!editingJob && (
              <button
                type="button"
                onClick={handleAutofillTemplate}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 rounded cursor-pointer"
                title="Autofill standard engineering position"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autofill Sample</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Position Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. PulseStream Cloud"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Department, Type, Location Type, Experience */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as JobType })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Arrangement</label>
                <select
                  value={formData.locationType}
                  onChange={e => setFormData({ ...formData, locationType: e.target.value as LocationType })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={e => setFormData({ ...formData, experienceLevel: e.target.value as ExperienceLevel })}
                  className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead / Principal">Lead / Principal</option>
                </select>
              </div>
            </div>

            {/* Location & Salary Range */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA (or Remote)"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Min ($ USD)</label>
                <input
                  type="number"
                  min="20000"
                  step="5000"
                  value={formData.salaryMin}
                  onChange={e => setFormData({ ...formData, salaryMin: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Max ($ USD)</label>
                <input
                  type="number"
                  min="20000"
                  step="5000"
                  value={formData.salaryMax}
                  onChange={e => setFormData({ ...formData, salaryMax: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg font-mono tabular-nums"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Role Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="High-level summary of the role mission and team context..."
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            {/* Responsibilities list */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Key Responsibilities</label>
                <button
                  type="button"
                  onClick={() => handleAddListItem(responsibilities, setResponsibilities, 'Drive delivery of key objectives')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>
              <div className="space-y-2">
                {responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={e => handleUpdateListItem(idx, e.target.value, responsibilities, setResponsibilities)}
                      className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, responsibilities, setResponsibilities)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements list */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Qualifications & Requirements</label>
                <button
                  type="button"
                  onClick={() => handleAddListItem(requirements, setRequirements, 'Demonstrated problem-solving abilities')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>
              <div className="space-y-2">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={e => handleUpdateListItem(idx, e.target.value, requirements, setRequirements)}
                      className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveListItem(idx, requirements, setRequirements)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Required Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={e => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. TypeScript, React, Node.js, PostgreSQL"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            {/* Status & Featured */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Mark as Featured Job</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Requisition Status:</span>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="text-xs px-2.5 py-1 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  <option value="active">Active (Published)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="closed">Closed / Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingJob ? 'Update Requisition' : 'Publish Requisition'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
