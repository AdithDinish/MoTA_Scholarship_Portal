import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  IndianRupee,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Trophy,
  ChevronRight
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    application,
    setActiveTab,
    setSelectedSchemeForApply
  } = useApp();

  return (
    <div className="h-full flex flex-col justify-between py-1 space-y-3">
      {/* 1. Ultra-Compact Hero Feature Banner Card */}
      <div className="bg-gradient-to-br from-[#5c67f2] via-[#6366f1] to-[#4338ca] text-white rounded-[28px] p-5 shadow-xl shadow-indigo-500/15 relative overflow-hidden flex items-center justify-between shrink-0">
        <div className="absolute right-3 top-3 opacity-15 text-white pointer-events-none">
          <Trophy className="w-28 h-28" />
        </div>

        <div className="relative z-10 max-w-[240px] space-y-1.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>Featured Fellowship</span>
          </div>

          <h2 className="text-xl font-black leading-tight tracking-tight">
            National Overseas (NOS) 2026
          </h2>

          <p className="text-[11px] text-indigo-100 font-medium line-clamp-2">
            Higher studies ST fellowship up to ₹20,000/yr for UK & US universities.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSchemeForApply('nos');
            setActiveTab('apply');
          }}
          className="w-12 h-12 rounded-full bg-[#121318] text-white flex items-center justify-center shrink-0 shadow-lg hover:scale-105 active:scale-95 transition-all group z-10"
          aria-label="Apply to NOS 2026"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Compact Side-by-Side Stat Cards */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        {/* Stat Card 1: Warm Peach */}
        <div className="bg-[#fff3eb] border border-orange-200/80 rounded-[24px] p-4 shadow-2xs flex flex-col justify-between h-28">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-orange-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-orange-800 bg-orange-200/60 px-2 py-0.5 rounded-full">Active</span>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-500">Eligible Schemes</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">5 Schemes</div>
          </div>
        </div>

        {/* Stat Card 2: Soft Periwinkle */}
        <div className="bg-[#eef2ff] border border-indigo-200/80 rounded-[24px] p-4 shadow-2xs flex flex-col justify-between h-28">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-700 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-indigo-800 bg-indigo-200/60 px-2 py-0.5 rounded-full">DBT Paid</span>
          </div>

          <div>
            <div className="text-[11px] font-medium text-slate-500">Disbursed</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">₹48,000</div>
          </div>
        </div>
      </div>

      {/* 3. Progress Performance Snapshot */}
      <div className="bg-[#faf8f5] border border-stone-200/80 rounded-[26px] p-4 shadow-2xs shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Application Pipeline</h3>
            <p className="text-[10px] text-slate-500">State Nodal Verification Progress</p>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1"
          >
            <span>76%</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Compact Progress Bar */}
        <div className="h-3.5 w-full bg-stone-200/80 rounded-full overflow-hidden flex p-0.5">
          <div className="h-full bg-orange-400 rounded-l-full w-[35%]" />
          <div className="h-full bg-indigo-500 w-[45%]" />
          <div className="h-full bg-emerald-500 rounded-r-full w-[20%]" />
        </div>
      </div>

      {/* 4. Action Card (Deficiency or DigiLocker Vault) */}
      {application.actionRequired ? (
        <div className="bg-[#18191c] text-white rounded-[26px] p-4 shadow-lg flex items-center justify-between gap-3 shrink-0">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-300 uppercase tracking-wider">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              <span>Action Needed</span>
            </div>
            <h4 className="text-sm font-bold text-white">Re-upload Income Certificate</h4>
          </div>

          <button
            onClick={() => setActiveTab('deficiency')}
            className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all"
            aria-label="Resolve Deficiency"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-[#e8ebff] border border-indigo-200/80 text-indigo-950 rounded-[26px] p-4 shadow-2xs flex items-center justify-between gap-3 shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>DigiLocker ST Vault</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">Kurumbas Tribe Certificate Verified</h4>
          </div>

          <button
            onClick={() => setActiveTab('documents')}
            className="w-10 h-10 rounded-full bg-[#121318] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-all"
            aria-label="View Documents"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
