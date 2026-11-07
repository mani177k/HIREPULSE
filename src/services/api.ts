import { Job, Application, ApplicationStage, RecruitmentStats } from '../types/job.ts';

export interface JobFilterParams {
  search?: string;
  department?: string;
  type?: string;
  locationType?: string;
  experienceLevel?: string;
  status?: string;
  minSalary?: number;
  sort?: string;
}

export const api = {
  async getJobs(params: JobFilterParams = {}): Promise<Job[]> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, String(val));
      }
    });
    const res = await fetch(`/api/jobs?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data.data;
  },

  async getJob(id: string): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch job details');
    const data = await res.json();
    return data.data;
  },

  async createJob(jobData: Partial<Job>): Promise<Job> {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create job');
    return data.data;
  },

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update job');
    return data.data;
  },

  async deleteJob(id: string): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete job');
    return data.data;
  },

  async getApplications(params: { jobId?: string; stage?: string; search?: string } = {}): Promise<Application[]> {
    const query = new URLSearchParams();
    if (params.jobId) query.append('jobId', params.jobId);
    if (params.stage) query.append('stage', params.stage);
    if (params.search) query.append('search', params.search);

    const res = await fetch(`/api/applications?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    const data = await res.json();
    return data.data;
  },

  async getApplication(id: string): Promise<Application> {
    const res = await fetch(`/api/applications/${id}`);
    if (!res.ok) throw new Error('Failed to fetch application');
    const data = await res.json();
    return data.data;
  },

  async submitApplication(appData: any): Promise<Application> {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit application');
    return data.data;
  },

  async updateApplication(id: string, updates: { stage?: ApplicationStage; rating?: number; note?: string; interviewDate?: string }): Promise<Application> {
    const res = await fetch(`/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update application');
    return data.data;
  },

  async getCandidateApplications(email: string): Promise<Application[]> {
    const res = await fetch(`/api/applications/candidate/${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('Failed to fetch candidate applications');
    const data = await res.json();
    return data.data;
  },

  async withdrawApplication(id: string): Promise<void> {
    const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Failed to withdraw application');
    }
  },

  async getStats(): Promise<RecruitmentStats> {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch recruitment stats');
    const data = await res.json();
    return data.data;
  },

  async resetSeedData(): Promise<void> {
    const res = await fetch('/api/seed', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset seed data');
  }
};
