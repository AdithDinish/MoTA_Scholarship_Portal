import React from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  IndianRupee,
  ShieldCheck,
  School,
  ExternalLink,
  ChevronRight,
  Users
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    application,
    verifications,
    documents,
    payments,
    setActiveTab,
    setSelectedSchemeForApply
  } = useApp();

  const verifiedDocsCount = documents.filter(d => d.status === 'verified').length;
  const actionRequiredDocsCount = documents.filter(d => d.status === 'action_required').length;

  const totalSanctioned = 45000;
  const totalDisbursed = 25000;
  const pendingAmount = 20000;

  return (
    <div className="space-y-6 pb-20 lg:pb-10">
      {/* Top Greeting & Profile Completion Hero Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-900 shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Hello, {student.name.split(' ')[0]} 👋
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  ST · {student.tribe} ({student.isPVTG ? 'PVTG' : 'General'})
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2">
                <span>{student.course}</span>
                <span aria-hidden="true">·</span>
                <span>{student.institution.split(',')[0]}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:w-64">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600 font-medium">Profile Completion</span>
              <span className="font-bold text-blue-900 tabular-nums">{student.profileCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-800 rounded-full transition-all duration-500"
                style={{ width: `${student.profileCompletion}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
              <span>Aadhaar & ST Verified</span>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-blue-800 font-semibold hover:underline"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Reassurance Banner on Data Security */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Unified MoTA Identity connected with DigiLocker, APAAR, and State e-District.</span>
        </div>
      </div>

      {/* IMPORTANT ACTION REQUIRED BANNER (If Deficiency Exists) */}
      {application.actionRequired ? (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                  Action Required
                </span>
                <span className="text-xs text-amber-800 font-medium">Ministry Scrutiny Flag</span>
              </div>
              <h3 className="text-base font-bold text-amber-950 mt-1">
                Income Certificate requires attention
              </h3>
              <p className="text-xs text-amber-900 mt-0.5 max-w-xl">
                The revenue verification system reported a digital stamp mismatch on certificate{' '}
                <span className="font-semibold">{student.incomeCertificateNo}</span>. Please upload a clear refreshed copy.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('deficiency')}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-2"
          >
            <span>Resolve Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-emerald-900">All Deficiencies Resolved</div>
              <div className="text-xs text-emerald-700">
                Your re-uploaded income certificate is in automatic re-verification queue. No action required.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('tracking')}
            className="text-xs font-semibold text-emerald-800 hover:underline shrink-0"
          >
            View Timeline
          </button>
        </div>
      )}

      {/* 2-Column Grid: Current Scholarship & DBT Payments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Current Active Scholarship */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current Scholarship
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                Active Scheme
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  Post-Matric Scholarship Scheme for ST Students
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  Application ID: <span className="font-semibold text-slate-700">{application.applicationId}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Academic Year:</span>
                <span className="font-semibold text-slate-800">{application.academicYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Current Stage:</span>
                <span className="font-semibold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {application.currentStage}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Institution Check:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified by MIT Anna Univ
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('tracking')}
              className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1"
            >
              <span>Track Application Timeline</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Verification Details
            </button>
          </div>
        </div>

        {/* Card 2: Payments / DBT Summary */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                DBT Payment Summary
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Aadhaar NPCI Seeded ✓
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center mt-2">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                <div className="text-[11px] text-slate-500">Sanctioned</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums mt-0.5">
                  ₹{totalSanctioned.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
                <div className="text-[11px] text-emerald-800 font-medium">Disbursed</div>
                <div className="text-lg font-bold text-emerald-700 tabular-nums mt-0.5">
                  ₹{totalDisbursed.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5">
                <div className="text-[11px] text-amber-800 font-medium">Pending</div>
                <div className="text-lg font-bold text-amber-700 tabular-nums mt-0.5">
                  ₹{pendingAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="mt-3.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-[10px]">
                  SBI
                </div>
                <div>
                  <div className="font-semibold text-slate-800">State Bank of India</div>
                  <div className="text-[10px] text-slate-500">A/c {student.accountNumberMasked}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-emerald-700">2 Installments Paid</span>
                <div className="text-[10px] text-slate-400">Last: 15 Sep 2026</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('payments')}
              className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1"
            >
              <span>View Payment Passbook & PFMS IDs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: MoTA 5 Schemes Status Matrix & Document Wallet Quick Stat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Applications Status across all 5 Schemes (Prompt requirement: 4 specific statuses) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Five MoTA Scholarship Schemes</h3>
              <p className="text-xs text-slate-500">Unified single-window view of your eligibility & applications</p>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
            >
              <span>View Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Scheme 1: Post-Matric */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
                  PMS
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Post-Matric Scholarship (PMS-ST)</div>
                  <div className="text-[11px] text-slate-500">Higher education for ST students (Current)</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  Under Verification
                </span>
              </div>
            </div>

            {/* Scheme 2: Top Class */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs shrink-0">
                  TCS
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Top Class Scholarship</div>
                  <div className="text-[11px] text-slate-500">Notified premier institutions (IITs, NITs, etc.)</div>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Eligible
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-600 font-medium">Not Applied</span>
              </div>
            </div>

            {/* Scheme 3: NFST */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                  NFST
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">National Fellowship (NFST)</div>
                  <div className="text-[11px] text-slate-500">M.Phil and Ph.D. full-time research scholars</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Not Applicable (B.Tech)
                </span>
              </div>
            </div>

            {/* Scheme 4: NOS */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                  NOS
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">National Overseas Scholarship</div>
                  <div className="text-[11px] text-slate-500">Masters/Ph.D. in top 500 QS world universities</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Not Applied
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Wallet Quick Overview */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Digital Document Wallet</h3>
              <span className="text-xs font-semibold text-slate-500">DigiLocker Synced</span>
            </div>

            <div className="space-y-3 mt-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{verifiedDocsCount} Verified</div>
                    <div className="text-[10px] text-slate-500">Reusable across all MoTA schemes</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">✓ Ready</span>
              </div>

              <div
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  actionRequiredDocsCount > 0
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      actionRequiredDocsCount > 0
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {actionRequiredDocsCount} Action Required
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {actionRequiredDocsCount > 0 ? 'Income Certificate QR issue' : 'No pending actions'}
                    </div>
                  </div>
                </div>
                {actionRequiredDocsCount > 0 && (
                  <button
                    onClick={() => setActiveTab('deficiency')}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    Fix Now
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-500">
              Your certificates are securely stored in your MoTA e-Wallet and automatically shared with approving officers.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('documents')}
              className="w-full py-2 text-center text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              Open Digital Document Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Quick Action Hub & Family Scheme View Link */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('eligibility')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">Eligibility Engine</div>
          <div className="text-[10px] text-slate-500">Check rules for all 5 schemes</div>
        </button>

        <button
          onClick={() => {
            setSelectedSchemeForApply('top_class');
            setActiveTab('apply');
          }}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">Apply for Scheme</div>
          <div className="text-[10px] text-slate-500">Pre-fill with verified data</div>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">Family Overview</div>
          <div className="text-[10px] text-slate-500">Track siblings & benefits</div>
        </button>

        <button
          onClick={() => setActiveTab('jago')}
          className="bg-white p-3.5 rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-xs transition-all text-left group bg-gradient-to-br from-blue-50/50 to-white"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xs font-bold text-blue-950">Ask JAGO AI</div>
          <div className="text-[10px] text-blue-800">Your 24/7 MoTA assistant</div>
        </button>
      </div>
    </div>
  );
};
