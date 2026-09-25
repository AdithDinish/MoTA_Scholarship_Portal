import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Award,
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { application, setActiveTab } = useApp();

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-28">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Progress</h1>
        <div className="px-3 py-1.5 rounded-full bg-[#121318] text-white text-xs font-bold shadow-xs">
          2025 - 2026
        </div>
      </div>

      {/* Main Progress Chart Card (Matching Right Screen from Reference Image) */}
      <div className="bg-[#fff6ee] border border-orange-200/80 rounded-[32px] p-6 shadow-xs space-y-6">
        {/* Top Header stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#121318] text-white flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">4 Stages</div>
              <div className="text-xs text-slate-500 font-medium">Verification Status</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 tracking-tight">76%</div>
            <div className="text-xs text-slate-500 font-medium">Completed</div>
          </div>
        </div>

        {/* Visual Bar Graph breakdown (Mon, Tue, Wed, Thr, Fri chart style from reference image) */}
        <div className="pt-2 pb-1 space-y-3">
          <div className="flex items-end justify-between h-40 px-3">
            {/* Bar 1: State Nodal */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[10px] font-bold text-orange-800 bg-orange-200/80 px-2 py-0.5 rounded-full">100%</span>
              <div className="w-10 bg-orange-400 rounded-2xl h-28 transition-all" />
              <span className="text-[11px] font-bold text-slate-600">Institute</span>
            </div>

            {/* Bar 2: State Nodal */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[10px] font-bold text-orange-800 bg-orange-200/80 px-2 py-0.5 rounded-full">100%</span>
              <div className="w-10 bg-orange-500 rounded-2xl h-32 transition-all" />
              <span className="text-[11px] font-bold text-slate-600">Nodal</span>
            </div>

            {/* Bar 3: MoTA Sanction */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[10px] font-bold text-indigo-900 bg-indigo-200/80 px-2 py-0.5 rounded-full">76%</span>
              <div className="w-10 bg-indigo-600 rounded-2xl h-36 transition-all ring-4 ring-indigo-200/60" />
              <span className="text-[11px] font-bold text-slate-900">MoTA</span>
            </div>

            {/* Bar 4: PFMS DBT */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-full">Pending</span>
              <div className="w-10 bg-stone-300 rounded-2xl h-16 transition-all" />
              <span className="text-[11px] font-bold text-slate-600">Bank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Timeline List */}
      <div className="bg-[#faf8f5] border border-stone-200/80 rounded-[32px] p-6 shadow-2xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Verification Lifecycle</h3>

        <div className="space-y-4">
          {application.timeline.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : step.status === 'in_progress'
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 shadow-md'
                      : step.status === 'action_required'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-stone-200 text-slate-500'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : step.status === 'in_progress' ? (
                    <Clock className="w-4 h-4" />
                  ) : step.status === 'action_required' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {idx !== application.timeline.length - 1 && (
                  <div className="w-0.5 h-10 bg-stone-200 my-1" />
                )}
              </div>

              <div className="flex-1 bg-white p-3.5 rounded-2xl border border-stone-200/60 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{step.title}</span>
                  <span className="text-[10px] font-medium text-slate-400">{step.date}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{step.remarks || step.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top ST Beneficiaries Card (Matching Student Rating list from reference image) */}
      <div className="bg-[#18191c] text-white rounded-[32px] p-6 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-amber-950 flex items-center justify-center font-bold shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Top ST Scholars (Tamil Nadu)</h4>
            <p className="text-xs text-slate-400">10 best performing scholarship awardees</p>
          </div>
        </div>

        {/* Avatars */}
        <div className="flex items-center -space-x-2 shrink-0">
          <img
            src="/src/assets/images/student_avatar_ravi_1790316158644.jpg"
            className="w-8 h-8 rounded-full border-2 border-[#18191c] object-cover"
            alt="Scholar"
          />
          <img
            src="/src/assets/images/officer_avatar_meena_1790316169327.jpg"
            className="w-8 h-8 rounded-full border-2 border-[#18191c] object-cover"
            alt="Scholar"
          />
          <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-[#18191c] text-white text-[10px] font-bold flex items-center justify-center">
            +8
          </div>
        </div>
      </div>
    </div>
  );
};
