# HirePulse — Job Portal & Applicant Tracking System (ATS)

A lightweight recruitment portal and ATS built with **HTML5, Tailwind CSS, and Vanilla JavaScript** contained in **just 3 core files in a single folder**:

```
├── index.html       # Complete semantic markup & UI structure
├── style.css        # Clean typography & custom animations
└── app.js           # Full recruitment logic, state & persistence
```

No build tools, no `src/` subdirectories, and no complex configuration needed.

---

## 🚀 Instant Deployment on GitHub Pages

Because all paths are relative (`./style.css` and `./app.js`), this runs immediately when pushed to GitHub:

1. Push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Add HirePulse job portal"
   git remote add origin https://github.com/your-username/hirepulse.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `root`
   - Click **Save**
3. Your portal will be live at `https://your-username.github.io/hirepulse/` with all jobs and features working immediately!

---

## 🌟 Included Recruitment Features

1. **Job Board & Multi-Faceted Filters**
   - Instant search across job titles, skills, and companies.
   - Filter by Department, Work Arrangement (Remote, Hybrid, On-site), Type (Full-time, Contract, etc.), Experience Level (Entry, Mid, Senior, Lead), and dynamic Salary Slider.
   - Bookmark / Save jobs with browser persistence.

2. **Job Details Modal**
   - Full role description, key responsibilities, qualifications, compensation range, and perks.

3. **Candidate Application Submission**
   - 4-step guided application modal with contact details, experience, resume file upload simulation, screening questions, and autofill sample button.

4. **Recruiter ATS Pipeline (Applicant Tracking System)**
   - **Kanban Board** and **Data Table** views across 5 standard stages: `Applied` ➔ `Screening` ➔ `Interview` ➔ `Offer` ➔ `Hired`.
   - Candidate Review Drawer with profile info, resume reader, 1–5 star ratings, interview scheduler, and recruiter internal notes thread.

5. **Candidate Application Tracker ("My Applications")**
   - Live candidate tracking view with 5-stage progress bar stepper, interview alerts, and withdrawal option.

6. **Recruitment Analytics & Reporting**
   - Stage conversion funnel percentages, department distribution, top technical skills demand, and working **Export to CSV** report.
