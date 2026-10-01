import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Zap, Globe, ChevronDown, Check, UserCheck, Building2, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { MobileBottomSheet } from './MobileBottomSheet';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
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
    <header className="sticky top-0 z-30 bg-[#faf9f6]/90 backdrop-blur-md px-4 sm:px-6 pt-3 pb-2 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: User Greeting */}
        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug tracking-tight">
            Hello, {student.name.split(' ')[0]}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Progress: <strong className="text-slate-800">{student.profileCompletion}%</strong></span>
          </div>
        </div>

        {/* Right: Actions (Role Pill, Language Pill, Notification Bell) */}
        <div className="flex items-center gap-2">
          {/* Role Switcher Pill */}
          <button
            onClick={() => setShowRoleMenu(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all min-h-[40px]"
            aria-label="Switch Role"
          >
            {role === 'student' ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Student</span>
              </>
            ) : (
              <>
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Officer</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Language Selector Pill */}
          <button
            onClick={() => setShowLangMenu(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all min-h-[40px]"
            aria-label="Select Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{languages.find(l => l.code === language)?.native || 'EN'}</span>
          </button>

          {/* Minimalist Floating Notification Bell Button */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all active:scale-95"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>

      {/* Language Mobile Bottom Sheet */}
      <MobileBottomSheet
        isOpen={showLangMenu}
        onClose={() => setShowLangMenu(false)}
        title="App Language / भाषा"
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
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="text-base font-semibold">{l.native}</div>
                <div className="text-xs text-slate-500">{l.label}</div>
              </div>
              {language === l.code && (
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
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
        title="Switch Account Role"
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
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-900">Student Profile (Ravi Kumar)</div>
              <div className="text-xs text-slate-600">ST Beneficiary · B.Tech 3rd Year · Kurumbas PVTG</div>
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
                ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-2xs'
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
            <span>Reset Demo State</span>
          </button>
        </div>
      </MobileBottomSheet>
    </header>
  );
};
