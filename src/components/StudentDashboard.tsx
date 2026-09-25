import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  IndianRupee,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  MoreHorizontal,
  Award,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    application,
    setActiveTab,
    setSelectedSchemeForApply
  } = useApp();

  return (
    <div className="space-y-3.5 pb-24">
      {/* 1. HERO CARD: Matching Screen 1 in reference image */}
      <div className="bg-gradient-to-br from-[#545fe5] via-[#5c67f2] to-[#4752d6] text-white rounded-[32px] p-5 sm:p-6 shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        {/* Cute hand-crafted trophy illustration with pink star, matching reference image */}
        <div className="absolute right-3 top-3 w-32 h-36 pointer-events-none select-none flex items-center justify-center">
          <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
            {/* Stars */}
            <path d="M20 15 L22 20 L27 22 L22 24 L20 29 L18 24 L13 22 L18 20 Z" fill="#ffd166" opacity="0.8" />
            <path d="M100 25 L101.5 28.5 L105 30 L101.5 31.5 L100 35 L98.5 31.5 L95 30 L98.5 28.5 Z" fill="#ffd166" opacity="0.8" />
            <path d="M15 90 L16.5 93.5 L20 95 L16.5 96.5 L15 100 L13.5 96.5 L10 95 L13.5 93.5 Z" fill="#ffffff" opacity="0.6" />
            <path d="M105 110 L106.5 113.5 L110 115 L106.5 116.5 L105 120 L103.5 116.5 L100 115 L103.5 113.5 Z" fill="#ffffff" opacity="0.6" />
            
            {/* Trophy Cup */}
            <path d="M42 35 C42 68 52 82 60 86 C68 82 78 68 78 35 Z" fill="#ffb74d" stroke="#e67e22" strokeWidth="2.5" />
            <path d="M45 35 C45 64 53 77 60 81 C67 77 75 64 75 35 Z" fill="#ffcc80" />
            {/* Cup Rim */}
            <ellipse cx="60" cy="35" rx="18" ry="4.5" fill="#ffe082" stroke="#e67e22" strokeWidth="2" />
            
            {/* Trophy Handles */}
            <path d="M42 42 C30 42 28 60 44 67" fill="none" stroke="#e67e22" strokeWidth="3" strokeLinecap="round" />
            <path d="M78 42 C90 42 92 60 76 67" fill="none" stroke="#e67e22" strokeWidth="3" strokeLinecap="round" />
            
            {/* Trophy Pink Star in center */}
            <path d="M60 50 L62.5 56.5 L69 57.5 L64 62 L65.5 68.5 L60 65 L54.5 68.5 L56 62 L51 57.5 L57.5 56.5 Z" fill="#f06292" stroke="#d81b60" strokeWidth="1" />
            
            {/* Stem & Base */}
            <path d="M57 86 L63 86 L64 102 L56 102 Z" fill="#ffa726" stroke="#e67e22" strokeWidth="2" />
            <ellipse cx="60" cy="104" rx="16" ry="5" fill="#ff9800" stroke="#e67e22" strokeWidth="2" />
            <ellipse cx="60" cy="107" rx="14" ry="4" fill="#fb8c00" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[210px] space-y-2">
          <h2 className="text-2xl font-black leading-tight tracking-tight text-white">
            A series of Fellowships
          </h2>
          <p className="text-xs text-indigo-100 font-medium leading-relaxed">
            National ST scholarships for talented tribal scholars across the country
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedSchemeForApply('nos');
                setActiveTab('schemes');
              }}
              className="w-11 h-11 rounded-full bg-[#18191c] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
              aria-label="Explore Fellowships"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. STAT CARDS ROW: Side-by-side matching reference image */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Card 1: Orange tint */}
        <div className="bg-[#fff2e8] border border-orange-100 rounded-[28px] p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Schemes</span>
          </div>

          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">5</div>
          </div>
        </div>

        {/* Card 2: Lavender tint */}
        <div className="bg-[#eef1ff] border border-indigo-100 rounded-[28px] p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#4f46e5]/15 text-[#4f46e5] flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-slate-600">Disbursed</span>
          </div>

          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight">₹48k</div>
          </div>
        </div>
      </div>

      {/* 3. PROGRESS PERFORMANCE CARD: Matching reference image */}
      <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Progress perfomance
          </h3>
          <button
            onClick={() => setActiveTab('tracking')}
            className="text-slate-400 hover:text-slate-700 p-1"
            aria-label="View Progress"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-segment progress bar */}
        <div className="h-8 w-full bg-slate-100 rounded-2xl flex overflow-hidden p-1 gap-1">
          <div className="h-full bg-[#fca26e] rounded-xl w-[35%] transition-all" />
          <div className="h-full bg-[#9da7ff] rounded-xl w-[45%] transition-all" />
          <div className="h-full bg-[#cbd5e1] rounded-xl w-[20%] transition-all" />
        </div>

        {/* Legend under progress bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold px-1 pt-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fca26e]" />
            <span>Applied: <strong className="text-slate-900">100%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9da7ff]" />
            <span>Verified: <strong className="text-slate-900">76%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
            <span>DBT: <strong className="text-slate-900">Pending</strong></span>
          </div>
        </div>
      </div>

      {/* 4. ACTION CARD (Dark theme, matching Screen 2 in reference image) */}
      <div className="bg-[#18191c] text-white rounded-[28px] p-4.5 shadow-md flex items-center justify-between gap-3">
        <div className="space-y-1 max-w-[220px]">
          <div className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase">
            ACTIVE APPLICATION
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
            Post-Matric ST Scholarship
          </h4>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img
                src={student.avatarUrl}
                alt="Student"
                className="w-5 h-5 rounded-full object-cover border border-[#18191c]"
              />
              <div className="w-5 h-5 rounded-full bg-indigo-600 border border-[#18191c] text-white text-[9px] font-bold flex items-center justify-center">
                TN
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">State Verified</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('tracking')}
          className="w-11 h-11 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all group"
          aria-label="View Application Progress"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 5. SECOND ACTION CARD (Lavender theme, matching Screen 2 in reference image) */}
      <div className="bg-[#dfe4ff] text-indigo-950 rounded-[28px] p-4.5 border border-indigo-200/80 shadow-2xs flex items-center justify-between gap-3">
        <div className="space-y-1 max-w-[220px]">
          <div className="text-[10px] font-extrabold text-indigo-700 tracking-wider uppercase">
            DIGITAL VAULT
          </div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
            DigiLocker ST Certificate Linked
          </h4>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-indigo-900 bg-indigo-200/70 px-2 py-0.5 rounded-full">
              Kurumbas (PVTG)
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('documents')}
          className="w-11 h-11 rounded-full bg-[#18191c] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all group"
          aria-label="Open Document Wallet"
        >
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
