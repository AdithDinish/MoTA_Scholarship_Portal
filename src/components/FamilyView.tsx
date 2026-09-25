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
    <div className="space-y-6 pb-20 lg:pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                Family Social Protection
              </span>
              <span className="text-xs text-slate-500">Ration Card & e-District Linked</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              My Family Scholarship Overview
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Provides unified tracking for all children in the household receiving different MoTA scholarship schemes
              (Pre-Matric, Post-Matric, Higher Education) to avoid fragmented portal logins.
            </p>
          </div>
        </div>

        {/* Aggregate Family Benefit Box */}
        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div>
            <span className="text-xs text-slate-500">Total Enrolled Children</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">3 Children</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Active Schemes</span>
            <div className="text-xl font-bold text-blue-900 mt-0.5">PMS & Pre-Matric</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Annual Disbursed Benefits</span>
            <div className="text-xl font-bold text-emerald-700 mt-0.5">₹32,000</div>
          </div>
        </div>
      </div>

      {/* Family Members Cards */}
      <div className="space-y-4">
        {FAMILY_MEMBERS_DATA.map((member, index) => {
          const isRavi = member.name.includes('Ravi');
          const isPriya = member.name.includes('Priya');
          const isKarthik = member.name.includes('Karthik');

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                isRavi
                  ? 'border-blue-300 ring-1 ring-blue-100'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isRavi
                        ? 'bg-blue-900 text-white'
                        : isPriya
                        ? 'bg-purple-100 text-purple-900'
                        : isKarthik
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {member.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {member.relation}
                      </span>
                      {isRavi && (
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                          You (Current User)
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {member.education || member.occupation}
                    </div>

                    <div className="text-xs font-medium text-slate-700 mt-1">
                      Scheme: <strong>{member.activeScheme}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:self-center shrink-0">
                  <div className="text-xs text-slate-400">Benefit Disbursed</div>
                  <div className="text-lg font-bold text-slate-900 tabular-nums">
                    {member.disbursedAmount || '₹0'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {member.status}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Problem Statement Explanation Banner */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Why the Family Overview is critical:</span>
          <p className="mt-0.5">
            Previously, a tribal household with one child in 10th grade and another in college had to maintain separate accounts on NSP, state scholarship portals, and bank records. MoTA's Unified Platform links family records so parents and students can see their household's cumulative welfare entitlements from a single screen.
          </p>
        </div>
      </div>
    </div>
  );
};
