import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import { Scheme, SchemeId } from '../types';
import {
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  BookOpen,
  Award,
  Globe2,
  School
} from 'lucide-react';

export const SchemesExplorer: React.FC = () => {
  const {
    language,
    setActiveTab,
    setSelectedSchemeForApply,
    application
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showConflictModal, setShowConflictModal] = useState<Scheme | null>(null);

  const getSchemeIcon = (id: SchemeId) => {
    switch (id) {
      case 'pre_matric':
        return School;
      case 'post_matric':
        return GraduationCap;
      case 'top_class':
        return Award;
      case 'nfst':
        return BookOpen;
      case 'nos':
        return Globe2;
    }
  };

  const categories = [
    { id: 'all', label: 'All Schemes (5)' },
    { id: 'pre_matric', label: 'Pre-Matric' },
    { id: 'post_matric', label: 'Post-Matric' },
    { id: 'top_class', label: 'Top Class' },
    { id: 'nfst', label: 'NFST' },
    { id: 'nos', label: 'NOS Overseas' },
  ];

  const filteredSchemes = filterCategory === 'all'
    ? SCHEMES_DATA
    : SCHEMES_DATA.filter(s => s.id === filterCategory);

  const handleApplyClick = (scheme: Scheme) => {
    if (application.schemeId && application.schemeId !== scheme.id) {
      setShowConflictModal(scheme);
    } else {
      setSelectedSchemeForApply(scheme.id);
      setActiveTab('apply');
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-28">
      {/* Top Header Card (Soft Orange / Peach Theme matching image center screen) */}
      <div className="bg-gradient-to-br from-[#ff8c42] via-[#f97316] to-[#ea580c] text-white rounded-[32px] p-6 sm:p-7 shadow-xl shadow-orange-500/20 relative overflow-hidden">
        {/* Background Decorative Illustration */}
        <div className="absolute right-4 top-4 opacity-20 text-white pointer-events-none">
          <GraduationCap className="w-36 h-36" />
        </div>

        <div className="relative z-10 space-y-3">
          <button
            onClick={() => setActiveTab('home')}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Back to Home"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">
              ST Schemes & Fellowships
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 font-medium mt-1">
              Ministry of Tribal Affairs Single-Window Portal
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="px-3.5 py-1.5 rounded-full bg-[#121318] text-white text-xs font-bold shadow-md">
              🎓 5 Schemes Available
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
              📜 100% DBT Disbursement
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Pill Tag Category Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterCategory === cat.id
                ? 'bg-[#121318] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Schemes List (Matching Course Cards from Reference Image) */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme, idx) => {
          const IconComp = getSchemeIcon(scheme.id);
          const isApplied = application.schemeId === scheme.id;
          
          // Alternate card styles matching reference image (Dark, Periwinkle, Peach)
          const isDark = idx % 3 === 0;
          const isLavender = idx % 3 === 1;
          const isPeach = idx % 3 === 2;

          return (
            <div
              key={scheme.id}
              className={`rounded-[32px] p-6 transition-all duration-300 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[170px] ${
                isDark
                  ? 'bg-[#18191c] text-white shadow-xl'
                  : isLavender
                  ? 'bg-[#eef2ff] border border-indigo-200/80 text-indigo-950'
                  : 'bg-[#fff3eb] border border-orange-200/80 text-orange-950'
              }`}
            >
              {/* Card Header Tag & Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold ${
                      isDark
                        ? 'bg-white/10 text-white'
                        : isLavender
                        ? 'bg-indigo-500/15 text-indigo-700'
                        : 'bg-orange-500/15 text-orange-700'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isDark
                        ? 'bg-white/15 text-white'
                        : isLavender
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {scheme.id.replace('_', ' ')}
                  </span>
                </div>

                {isApplied && (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Applied
                  </span>
                )}
              </div>

              {/* Title & Amount */}
              <div className="my-3 space-y-1">
                <h3 className={`text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'hi' ? scheme.hindiName : language === 'ta' ? scheme.tamilName : scheme.name}
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'} line-clamp-2`}>
                  {scheme.description}
                </p>
              </div>

              {/* Footer: Amount & Action Arrow Button */}
              <div className="flex items-center justify-between pt-2 border-t border-current/10">
                <div>
                  <div className={`text-[10px] font-medium uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Financial Assistance
                  </div>
                  <div className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {scheme.financialAssistance}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick(scheme)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all group ${
                    isDark
                      ? 'bg-white text-slate-950'
                      : 'bg-[#121318]'
                  }`}
                  aria-label={`Apply for ${scheme.name}`}
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conflict Modal (If already applied) */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">One Scholarship Rule</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                You already have an active application under <strong>{application.schemeName}</strong>. Per Ministry guidelines, students can receive one active ST scholarship at a time.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setSelectedSchemeForApply(showConflictModal.id);
                  setShowConflictModal(null);
                  setActiveTab('apply');
                }}
                className="w-full py-3 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors"
              >
                Switch Application to {showConflictModal.name.split(' ')[0]}
              </button>
              <button
                onClick={() => setShowConflictModal(null)}
                className="w-full py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Keep Current Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
