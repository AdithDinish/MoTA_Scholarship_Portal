import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import { Scheme, SchemeId } from '../types';
import {
  School,
  GraduationCap,
  Award,
  Globe2,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const SchemesExplorer: React.FC = () => {
  const {
    language,
    setActiveTab,
    setSelectedSchemeForApply,
    application
  } = useApp();

  const [expandedSchemeId, setExpandedSchemeId] = useState<SchemeId | null>(null);
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

  const getStatusBadge = (status: Scheme['statusForUser']) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            Applied · Under Verification
          </span>
        );
      case 'Eligible':
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Eligible
            </span>
            <span className="text-xs text-slate-500 font-medium">Not Applied</span>
          </div>
        );
      case 'Not Applicable':
        return (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            Eligibility Check
          </span>
        );
      default:
        return (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            Check Eligibility
          </span>
        );
    }
  };

  const handleApplyClick = (scheme: Scheme) => {
    // If student already has an active Post-Matric scholarship application, show the "Existing Scholarship Check"
    if (application.overallStatus !== 'rejected' && scheme.id !== 'post_matric') {
      setShowConflictModal(scheme);
    } else {
      setSelectedSchemeForApply(scheme.id);
      setActiveTab('apply');
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
            Ministry of Tribal Affairs Schemes
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Scholarship & Fellowship Schemes
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            All five major welfare schemes administered by MoTA are unified under one single window.
            Check eligibility, compare benefits, and reuse verified documents.
          </p>
        </div>

        {/* Existing Active Benefit Ribbon */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-800 shrink-0" />
            <span className="text-blue-900">
              You currently have an active application under <strong>Post-Matric Scholarship Scheme (PMS-ST)</strong>.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            className="text-xs font-bold text-blue-900 hover:underline shrink-0 ml-2"
          >
            Track Status
          </button>
        </div>
      </div>

      {/* 5 Scheme Cards */}
      <div className="space-y-4">
        {SCHEMES_DATA.map(scheme => {
          const Icon = getSchemeIcon(scheme.id);
          const isExpanded = expandedSchemeId === scheme.id;

          const displayName =
            language === 'hi'
              ? scheme.hindiName
              : language === 'ta'
              ? scheme.tamilName
              : scheme.name;

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-2xl border transition-all ${
                scheme.statusForUser === 'Applied'
                  ? 'border-blue-300 ring-1 ring-blue-100 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Main Bar */}
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0f2e59] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {scheme.educationLevel}
                        </span>
                        {getStatusBadge(scheme.statusForUser)}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 max-w-2xl">{scheme.tagline}</p>
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center gap-2 sm:self-center shrink-0">
                    <button
                      onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {scheme.statusForUser === 'Applied' ? (
                      <button
                        onClick={() => setActiveTab('tracking')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <span>Track</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : scheme.statusForUser === 'Eligible' ? (
                      <button
                        onClick={() => handleApplyClick(scheme)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Apply Now</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveTab('eligibility');
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
                      >
                        Check Eligibility
                      </button>
                    )}
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Income Ceiling
                    </span>
                    <span className="font-semibold text-slate-800">{scheme.incomeLimit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Financial Support
                    </span>
                    <span className="font-semibold text-slate-800 line-clamp-1">
                      {scheme.financialAssistance}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Target Group
                    </span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{scheme.targetGroup}</span>
                  </div>
                </div>
              </div>

              {/* Accordion Expanded Detail View */}
              {isExpanded && (
                <div className="bg-slate-50/70 p-5 sm:p-6 border-t border-slate-200 rounded-b-2xl space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Scheme Overview & Purpose
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{scheme.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Eligibility Criteria
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {scheme.eligibilityPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-900 font-bold">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                        <ShieldCheck className="w-4 h-4 text-blue-900" />
                        Required Verified Documents
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {scheme.documentsRequired.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        Verified records in your wallet will be auto-attached without re-upload.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-slate-500">
                      Coverage: <strong>{scheme.coverage}</strong>
                    </div>
                    {scheme.statusForUser !== 'Applied' && (
                      <button
                        onClick={() => handleApplyClick(scheme)}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl transition-colors"
                      >
                        Proceed to Apply for {scheme.name.split(' ')[0]}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* EXISTING SCHOLARSHIP CHECK MODAL (Section 19 in prompt) */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Existing Scholarship Check
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  MoTA Single-Window Concurrency Safeguard
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-2">
              <p className="font-semibold">
                We found an active Post-Matric Scholarship application associated with your profile:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <div className="font-bold text-slate-900">Current Scheme: Post-Matric Scholarship (PMS-ST)</div>
                <div className="text-[11px] text-slate-600">Application ID: MOTA-PMS-2026-001245</div>
                <div className="text-[11px] text-blue-900 font-semibold mt-0.5">
                  Status: Active / Under Verification (₹25,000 Disbursed)
                </div>
              </div>
              <p className="text-xs text-slate-700">
                Please review your current scholarship status before applying for another scheme. Under Central Government guidelines, a student may hold only one full Central Government scholarship simultaneously for the same academic degree.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200">
              * Note: You may still submit an application for <strong>{showConflictModal.name}</strong> as an upgrade proposal (e.g. transitioning to Top Class), but the system will require relinquishment or reconciliation upon sanction.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowConflictModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Return to Schemes
              </button>
              <button
                onClick={() => {
                  const targetId = showConflictModal.id;
                  setShowConflictModal(null);
                  setSelectedSchemeForApply(targetId);
                  setActiveTab('apply');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
