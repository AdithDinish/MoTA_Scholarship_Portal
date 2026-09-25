import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  IndianRupee,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FileText,
  Trophy,
  CheckCircle2,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    application,
    documents,
    setActiveTab,
    setSelectedSchemeForApply
  } = useApp();

  const actionRequiredDocsCount = documents.filter(d => d.status === 'action_required').length;

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-28">
      {/* 1. Large Hero Feature Card */}
      <div className="bg-gradient-to-br from-[#5c67f2] via-[#6366f1] to-[#4338ca] text-white rounded-[32px] p-6 sm:p-7 shadow-xl shadow-indigo-500/20 relative overflow-hidden transition-transform duration-300">
        {/* Background Subtle Decorative Shapes */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-6 top-6 opacity-15 text-white pointer-events-none">
          <Trophy className="w-36 h-36" />
        </div>

        <div className="relative z-10 max-w-md space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Featured MoTA Scheme</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight">
            National Overseas Scholarship (NOS)
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
            Full financial assistance for ST scholars pursuing Master's & Ph.D. degrees abroad in top global universities.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedSchemeForApply('nos');
                setActiveTab('apply');
              }}
              className="w-12 h-12 rounded-full bg-[#121318] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
              aria-label="Apply to NOS 2026"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-bold text-white tracking-wide uppercase">Apply Now</span>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stat Card 1: Warm Peach / Sand Tint */}
        <div className="bg-[#fff3eb] border border-orange-200/60 rounded-[28px] p-5 shadow-2xs flex flex-col justify-between min-h-[130px]">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/15 text-orange-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500">Active Schemes</div>
            <div className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">5</div>
          </div>
        </div>

        {/* Stat Card 2: Soft Periwinkle Tint */}
        <div className="bg-[#eef2ff] border border-indigo-200/60 rounded-[28px] p-5 shadow-2xs flex flex-col justify-between min-h-[130px]">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-700 flex items-center justify-center font-bold">
            <IndianRupee className="w-5 h-5" />
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500">Disbursed (DBT)</div>
            <div className="text-3xl font-black text-slate-900 tracking-tight mt-0.5">₹48,000</div>
          </div>
        </div>
      </div>

      {/* 3. Progress Performance Card */}
      <div className="bg-[#faf8f5] border border-stone-200/80 rounded-[32px] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Progress Performance</h3>
            <p className="text-xs text-slate-500">Scholarship Application Lifecycle</p>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full"
          >
            <span>Track</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stacked Visual Bar */}
        <div className="space-y-2 pt-1">
          <div className="h-4 w-full bg-stone-200/80 rounded-full overflow-hidden flex p-0.5">
            <div className="h-full bg-orange-400 rounded-l-full w-[35%] transition-all" />
            <div className="h-full bg-indigo-500 w-[45%] transition-all" />
            <div className="h-full bg-emerald-500 rounded-r-full w-[20%] transition-all" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span>Pre-Matric: <strong className="text-slate-900">₹12k</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>Post-Matric: <strong className="text-slate-900">₹24k</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Top Class: <strong className="text-slate-900">₹12k</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deficiency / Action Required Card (If active) */}
      {application.actionRequired ? (
        <div className="bg-[#18191c] text-white rounded-[32px] p-6 shadow-xl flex items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xs sm:max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" />
              <span>Action Required</span>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">Deficiency Resolution Needed</h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              Income certificate re-upload requested by State Nodal Officer.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('deficiency')}
            className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all group"
            aria-label="Resolve Deficiency"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      ) : null}

      {/* 5. Document Vault Summary Card */}
      <div className="bg-[#e8ebff] border border-indigo-200/80 text-indigo-950 rounded-[32px] p-6 shadow-2xs flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>DigiLocker & APAAR Vault</span>
          </div>
          <h4 className="text-base font-bold text-slate-900">ST Certificate & APAAR ID Verified</h4>
          <p className="text-xs text-slate-600">
            Tribe: {student.tribe} ({student.isPVTG ? 'PVTG Recognized' : 'General ST'})
          </p>
        </div>

        <button
          onClick={() => setActiveTab('documents')}
          className="w-12 h-12 rounded-full bg-[#121318] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all group"
          aria-label="View Document Wallet"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 6. JAGO AI Help Prompt Card */}
      <div className="bg-[#f0f9ff] border border-sky-200 rounded-[32px] p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Ask JAGO Assistance</h4>
            <p className="text-xs text-slate-500">Need help with eligibility or scheme criteria?</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('jago')}
          className="px-4 py-2 rounded-full bg-sky-900 text-white text-xs font-bold hover:bg-sky-950 transition-colors shrink-0"
        >
          Ask JAGO
        </button>
      </div>
    </div>
  );
};
