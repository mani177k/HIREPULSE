import React, { useState } from 'react';
import { Briefcase, Plus, Menu, X, RotateCcw } from 'lucide-react';

export type ActiveTab = 'jobs' | 'my-applications' | 'recruiter-ats' | 'analytics';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onPostJobClick: () => void;
  onResetData: () => void;
  applicationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onPostJobClick,
  onResetData,
  applicationCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; count?: number }[] = [
    { id: 'jobs', label: 'Explore Jobs' },
    { id: 'my-applications', label: 'My Applications', count: applicationCount > 0 ? applicationCount : undefined },
    { id: 'recruiter-ats', label: 'Recruiter ATS' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onTabChange('jobs')}
            className="flex items-center gap-2.5 text-left text-slate-900 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                HirePulse
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider -mt-1">
                Full-Stack Portal & ATS
              </span>
            </div>
          </button>

          {/* Zone 2: 4 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer relative py-2 ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.count !== undefined && (
                      <span className="text-xs font-mono tabular-nums px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded-sm">
                        {item.count}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onPostJobClick}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Job</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onPostJobClick}
              className="p-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className="text-xs font-mono tabular-nums px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onResetData();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-2 px-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Seed</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
