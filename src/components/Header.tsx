import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ShieldCheck, UserCheck, Globe, ChevronDown, RefreshCw, Sparkles, Building2, Check } from 'lucide-react';
import { Language } from '../types';
import { MobileBottomSheet } from './MobileBottomSheet';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    student,
    notifications,
    resetDemoData
  } = useApp();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm">
      {/* Top Government Disclaimer & Utility Bar */}
      <div className="bg-[#0b1f3a] text-white px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Government of India Emblem SVG */}
          <div className="flex items-center gap-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span className="font-semibold text-slate-100">GOVERNMENT OF INDIA</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Ministry of Tribal Affairs</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* DEMO / PROTOTYPE DATA Indicator */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold tracking-wider">
            <span>DEMO / PROTOTYPE DATA</span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white px-2.5 py-1 rounded hover:bg-white/10 transition-colors text-xs min-h-[36px]"
              aria-label="Select Language"
              aria-expanded={showLangMenu}
              aria-haspopup="true"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{languages.find(l => l.code === language)?.native || 'English'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div role="menu" className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 text-slate-800 z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    role="menuitem"
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 min-h-[38px] ${
                      language === l.code ? 'font-semibold text-blue-900 bg-blue-50' : ''
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-slate-400 text-[10px]">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Navigation Row conforming to 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark with official emblem mark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0f2e59] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm shrink-0 border border-blue-900">
              <span className="text-amber-400">मो</span>TA
            </div>
            <div>
              <div className="text-base font-bold text-[#0f2e59] tracking-tight leading-tight">
                MoTA Unified Scholarship Portal
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight">
                Ministry of Tribal Affairs · National Single Window
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (Hidden on mobile, accessible via BottomNav or Drawer) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {role === 'student' ? (
            <>
              <button
                onClick={() => setActiveTab('home')}
                className={`transition-colors py-1 ${activeTab === 'home' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('schemes')}
                className={`transition-colors py-1 ${activeTab === 'schemes' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                All Schemes (5)
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`transition-colors py-1 ${activeTab === 'tracking' || activeTab === 'deficiency' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Track Status
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`transition-colors py-1 ${activeTab === 'documents' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Document Wallet
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`transition-colors py-1 ${activeTab === 'payments' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                DBT Payments
              </button>
              <button
                onClick={() => setActiveTab('family')}
                className={`transition-colors py-1 ${activeTab === 'family' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Family Overview
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('admin_dashboard')}
                className={`transition-colors py-1 ${activeTab === 'admin_dashboard' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Officer KPIs
              </button>
              <button
                onClick={() => setActiveTab('admin_applications')}
                className={`transition-colors py-1 ${activeTab === 'admin_applications' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('admin_verification')}
                className={`transition-colors py-1 ${activeTab === 'admin_verification' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Verification Queue
              </button>
              <button
                onClick={() => setActiveTab('admin_coverage')}
                className={`transition-colors py-1 ${activeTab === 'admin_coverage' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Coverage Gaps
              </button>
              <button
                onClick={() => setActiveTab('admin_integrations')}
                className={`transition-colors py-1 ${activeTab === 'admin_integrations' ? 'text-[#0f2e59] font-bold border-b-2 border-[#0f2e59]' : 'hover:text-slate-900'}`}
              >
                Connected Portals
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions (Notifications, Role switcher, User profile) */}
        <div className="flex items-center gap-2">
          {/* Ask JAGO Quick Button */}
          <button
            onClick={() => setActiveTab('jago')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'jago'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Ask</span>
            <span>JAGO</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white" />
            )}
          </button>

          {/* Role Switcher (Student vs Admin/Officer) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors min-h-[40px]"
              aria-label="Switch User Role"
              aria-expanded={showRoleMenu}
              aria-haspopup="true"
            >
              {role === 'student' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline text-slate-500">View as:</span>
                  <span className="font-semibold text-slate-800">Student (Ravi)</span>
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-blue-700" />
                  <span className="hidden md:inline text-slate-500">View as:</span>
                  <span className="font-semibold text-slate-800">MoTA Officer</span>
                </>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveTab('home');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                    role === 'student' ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700'
                  }`}
                >
                  <img
                    src={student.avatarUrl}
                    alt="Ravi Kumar"
                    className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-medium">Ravi Kumar (ST Student)</div>
                    <div className="text-[10px] text-slate-500">Post-Matric Applicant</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRole('admin');
                    setActiveTab('admin_dashboard');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                    role === 'admin' ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700'
                  }`}
                >
                  <img
                    src="/src/assets/images/officer_avatar_meena_1790316169327.jpg"
                    alt="Dr. K. Meena"
                    className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-medium">Dr. K. Meena (Officer)</div>
                    <div className="text-[10px] text-slate-500">MoTA Verification Cell</div>
                  </div>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    resetDemoData();
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Demo State</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Mobile Bottom Sheet */}
      <MobileBottomSheet
        isOpen={showLangMenu}
        onClose={() => setShowLangMenu(false)}
        title="Select App Language / भाषा चुनें"
      >
        <div className="space-y-2">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setShowLangMenu(false);
              }}
              className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-all min-h-[52px] ${
                language === l.code
                  ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="text-base font-semibold">{l.native}</div>
                <div className="text-xs text-slate-500">{l.label}</div>
              </div>
              {language === l.code && (
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </MobileBottomSheet>

      {/* Role Switcher Mobile Bottom Sheet */}
      <MobileBottomSheet
        isOpen={showRoleMenu}
        onClose={() => setShowRoleMenu(false)}
        title="Switch App Role / मोड बदलें"
      >
        <div className="space-y-3">
          <button
            onClick={() => {
              setRole('student');
              setActiveTab('home');
              setShowRoleMenu(false);
            }}
            className={`w-full text-left p-4 rounded-2xl border flex items-center gap-3 transition-all min-h-[64px] ${
              role === 'student'
                ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-bold shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900">Student Profile (Ravi Kumar)</div>
              <div className="text-xs text-slate-600">ST Beneficiary · B.Tech 3rd Year · PVTG Kurumbas</div>
            </div>
          </button>

          <button
            onClick={() => {
              setRole('admin');
              setActiveTab('admin_dashboard');
              setShowRoleMenu(false);
            }}
            className={`w-full text-left p-4 rounded-2xl border flex items-center gap-3 transition-all min-h-[64px] ${
              role === 'admin'
                ? 'bg-blue-50 border-blue-500 text-slate-900 font-bold shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900">MoTA Officer / Nodal Admin</div>
              <div className="text-xs text-slate-600">Verification Cell · State & Central Oversight</div>
            </div>
          </button>

          <button
            onClick={() => {
              resetDemoData();
              setShowRoleMenu(false);
            }}
            className="w-full text-center py-3 text-xs text-rose-600 hover:bg-rose-50 font-semibold rounded-xl border border-rose-200 flex items-center justify-center gap-2 mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </MobileBottomSheet>
    </header>
  );
};
