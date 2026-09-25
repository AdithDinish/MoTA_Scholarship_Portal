import React from 'react';
import { useApp } from '../context/AppContext';
import { FAMILY_MEMBERS_DATA } from '../data/mockData';
import {
  Users,
  ShieldCheck,
  GraduationCap,
  School,
  IndianRupee,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-react';

export const FamilyView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-3.5 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Family Overview</span>
        <div className="w-12" />
      </div>

      {/* Header Card */}
      <div className="bg-[#eef1ff] rounded-[28px] p-4.5 border border-indigo-100 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider bg-indigo-200/60 px-2 py-0.5 rounded-full">
                Family Social Protection
              </span>
              <span className="text-[10px] text-slate-500">Ration Card Linked</span>
            </div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight mt-1">
              Family Scholarship Overview
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Unified tracking for all children in the household.
            </p>
          </div>
        </div>

        {/* Aggregate Family Benefit Row */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/80 p-2.5 rounded-[18px] border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-semibold block">Children</span>
            <div className="text-sm font-black text-slate-900 mt-0.5">3 Enrolled</div>
          </div>
          <div className="bg-white/80 p-2.5 rounded-[18px] border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-semibold block">Schemes</span>
            <div className="text-sm font-black text-indigo-700 mt-0.5">PMS & Pre-M</div>
          </div>
          <div className="bg-white/80 p-2.5 rounded-[18px] border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] text-slate-500 font-semibold block">Disbursed</span>
            <div className="text-sm font-black text-emerald-700 mt-0.5">₹32,000</div>
          </div>
        </div>
      </div>

      {/* Family Members Cards */}
      <div className="space-y-3">
        {FAMILY_MEMBERS_DATA.map((member, index) => {
          const isRavi = member.name.includes('Ravi');
          const isPriya = member.name.includes('Priya');
          const isKarthik = member.name.includes('Karthik');

          return (
            <div
              key={index}
              className={`bg-white rounded-[26px] p-4 border transition-all shadow-2xs ${
                isRavi
                  ? 'border-indigo-200 ring-1 ring-indigo-100'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isRavi
                        ? 'bg-indigo-600 text-white'
                        : isPriya
                        ? 'bg-purple-100 text-purple-900'
                        : isKarthik
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-700">
                        {member.relation}
                      </span>
                      {isRavi && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200">
                          You
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {member.education || member.occupation}
                    </div>

                    <div className="text-[11px] text-slate-700 mt-1">
                      Scheme: <strong className="text-slate-900">{member.activeScheme}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400">Disbursed</div>
                  <div className="text-sm font-black text-slate-900 tabular-nums">
                    {member.disbursedAmount || '₹0'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                    {member.status}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-[22px] text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          Links household records across schemes so tribal families can monitor cumulative entitlements without separate logins.
        </p>
      </div>
    </div>
  );
};
