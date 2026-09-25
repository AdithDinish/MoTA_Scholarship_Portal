import React from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import {
  Layers,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  School,
  GraduationCap,
  Award,
  BookOpen,
  Globe2
} from 'lucide-react';
import { SchemeId } from '../types';

export const OverviewMatrix: React.FC = () => {
  const { setActiveTab, setSelectedSchemeForApply, application } = useApp();

  const getIcon = (id: SchemeId) => {
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

  const schemeMatrix = [
    {
      id: 'pre_matric' as SchemeId,
      name: 'Pre-Matric Scholarship',
      category: 'Classes 9 & 10',
      eligibility: 'Not Applicable',
      eligibilityReason: 'Student currently in Higher Education (B.Tech 3rd Yr)',
      applicationStatus: 'Not Applied',
      currentStage: 'N/A',
      paymentStatus: '₹0 (Completed in Secondary School)',
      actionText: 'View Rules',
      actionTab: 'schemes'
    },
    {
      id: 'post_matric' as SchemeId,
      name: 'Post-Matric Scholarship (PMS-ST)',
      category: 'Higher Education (B.Tech)',
      eligibility: 'Eligible & Verified',
      eligibilityReason: 'ST Kurumbas + Income ₹1.8L (< ₹2.5L limit)',
      applicationStatus: 'Applied (MOTA-PMS-2026-001245)',
      currentStage: application.actionRequired ? 'Ministry Verification (Flagged)' : 'Ministry Verification (Clean)',
      paymentStatus: '₹25,000 Paid (₹20,000 Processing)',
      actionText: application.actionRequired ? 'Resolve Deficiency' : 'Track Status',
      actionTab: application.actionRequired ? 'deficiency' : 'tracking'
    },
    {
      id: 'top_class' as SchemeId,
      name: 'Top Class Education Scheme',
      category: 'Premier Technical Institute',
      eligibility: 'Potentially Eligible',
      eligibilityReason: 'MIT Anna Univ recognized + Family income < ₹6 Lakhs',
      applicationStatus: 'Not Applied',
      currentStage: 'Ready to Apply',
      paymentStatus: 'Up to ₹2,50,000/yr full grant eligible',
      actionText: 'Apply Now',
      actionTab: 'apply'
    },
    {
      id: 'nfst' as SchemeId,
      name: 'National Fellowship (NFST)',
      category: 'M.Phil / Ph.D. Research',
      eligibility: 'Future Progression',
      eligibilityReason: 'Requires regular full-time Ph.D. enrolment after post-graduation',
      applicationStatus: 'Not Applied',
      currentStage: 'N/A',
      paymentStatus: '₹37,000/month stipend eligible upon Ph.D. entry',
      actionText: 'Check Guidelines',
      actionTab: 'schemes'
    },
    {
      id: 'nos' as SchemeId,
      name: 'National Overseas Scholarship (NOS)',
      category: 'Masters/Ph.D. Abroad',
      eligibility: 'Not Applied',
      eligibilityReason: 'Requires unconditional offer letter from top 500 QS world university',
      applicationStatus: 'Not Applied',
      currentStage: 'N/A',
      paymentStatus: 'Full tuition + $15,400 USD annual maintenance',
      actionText: 'Check Guidelines',
      actionTab: 'schemes'
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Unified Scholarship Matrix
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Scholarship Overview
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              All five statutory Ministry of Tribal Affairs schemes consolidated in one synchronized dashboard.
              Monitor concurrent eligibility, ongoing disbursements, and future educational progression.
            </p>
          </div>
        </div>
      </div>

      {/* Unified Table on Desktop / Cards on Mobile */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 hidden md:grid md:grid-cols-12 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <div className="col-span-3">Scheme & Category</div>
          <div className="col-span-2">Eligibility</div>
          <div className="col-span-2">Application</div>
          <div className="col-span-2">Current Status</div>
          <div className="col-span-2">Disbursement / Benefit</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-100">
          {schemeMatrix.map(row => {
            const Icon = getIcon(row.id);
            const isPMS = row.id === 'post_matric';
            const isTCS = row.id === 'top_class';

            return (
              <div
                key={row.id}
                className={`p-4 md:grid md:grid-cols-12 items-center gap-2 text-xs transition-colors ${
                  isPMS ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                }`}
              >
                {/* Column 1: Scheme Name */}
                <div className="col-span-3 mb-2 md:mb-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{row.name}</div>
                      <div className="text-[11px] text-slate-500">{row.category}</div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Eligibility */}
                <div className="col-span-2 mb-1.5 md:mb-0">
                  <span className="md:hidden font-semibold text-slate-400 mr-2">Eligibility:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      row.eligibility.includes('Eligible')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {row.eligibility}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">{row.eligibilityReason}</div>
                </div>

                {/* Column 3: Application */}
                <div className="col-span-2 mb-1.5 md:mb-0">
                  <span className="md:hidden font-semibold text-slate-400 mr-2">Application:</span>
                  <span className="font-medium text-slate-800">{row.applicationStatus}</span>
                </div>

                {/* Column 4: Current Status */}
                <div className="col-span-2 mb-1.5 md:mb-0">
                  <span className="md:hidden font-semibold text-slate-400 mr-2">Status:</span>
                  <span
                    className={`font-semibold text-[11px] ${
                      row.currentStage.includes('Flagged')
                        ? 'text-amber-700'
                        : row.currentStage.includes('Verification')
                        ? 'text-blue-900'
                        : 'text-slate-600'
                    }`}
                  >
                    {row.currentStage}
                  </span>
                </div>

                {/* Column 5: Payment */}
                <div className="col-span-2 mb-2 md:mb-0">
                  <span className="md:hidden font-semibold text-slate-400 mr-2">Payment:</span>
                  <span className="font-bold text-slate-900">{row.paymentStatus}</span>
                </div>

                {/* Column 6: Action Button */}
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => {
                      if (row.actionTab === 'apply') {
                        setSelectedSchemeForApply(row.id);
                        setActiveTab('apply');
                      } else {
                        setActiveTab(row.actionTab);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      row.actionText === 'Resolve Deficiency'
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : row.actionText === 'Apply Now'
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {row.actionText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
