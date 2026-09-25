import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Building,
  School,
  FileCheck,
  IndianRupee,
  Users
} from 'lucide-react';
import { VerificationItem } from '../types';

export const VerificationCenter: React.FC = () => {
  const { verifications, setActiveTab, resolveIncomeDeficiency } = useApp();

  const getVerificationIcon = (id: string) => {
    switch (id) {
      case 'v-identity':
        return ShieldCheck;
      case 'v-st':
        return Users;
      case 'v-academic':
        return School;
      case 'v-institution':
        return Building;
      case 'v-income':
        return IndianRupee;
      case 'v-bank':
        return FileCheck;
      default:
        return FileCheck;
    }
  };

  const getStatusDisplay = (status: VerificationItem['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Verified ✓
          </span>
        );
      case 'action_required':
      case 'mismatch':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            Mismatch / Action Required
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Verification Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Automated Government Cross-Check
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Unified Verification Engine
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Cross-validates your identity, ST lineage, college enrolment, and banking credentials across
              7 national registers in real-time.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 self-start sm:self-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-emerald-900 font-semibold">6 of 7 Cleared Automatically</span>
          </div>
        </div>
      </div>

      {/* Verification Cards Grid */}
      <div className="space-y-3.5">
        {verifications.map(item => {
          const Icon = getVerificationIcon(item.id);
          const isProblem = item.status === 'action_required' || item.status === 'mismatch';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                isProblem
                  ? 'border-amber-300 ring-1 ring-amber-100 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isProblem
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-50 text-blue-900'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                      {getStatusDisplay(item.status)}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Source Registry: <strong className="text-slate-700">{item.source}</strong>
                    </div>
                    {item.referenceNumber && (
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        Ref Token: {item.referenceNumber} · Last checked: {item.lastChecked}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action / Status Details */}
                <div className="sm:self-center shrink-0">
                  {isProblem ? (
                    <button
                      onClick={() => setActiveTab('deficiency')}
                      className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Resolve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="text-right text-xs text-slate-400 hidden sm:block">
                      <span className="font-semibold text-emerald-700">Digital Seal Valid</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Banner */}
              {item.message && (
                <div
                  className={`mt-3.5 p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                    isProblem
                      ? 'bg-amber-50/80 border border-amber-200 text-amber-950'
                      : 'bg-slate-50 border border-slate-100 text-slate-600'
                  }`}
                >
                  {isProblem ? (
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div className="leading-relaxed">
                    {item.message}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
