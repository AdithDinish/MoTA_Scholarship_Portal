import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import {
  CheckCircle2,
  FileCheck,
  User,
  GraduationCap,
  Users,
  IndianRupee,
  School,
  FileText,
  CreditCard,
  Send,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const ApplicationForm: React.FC = () => {
  const {
    student,
    documents,
    selectedSchemeForApply,
    setSelectedSchemeForApply,
    setActiveTab
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [useExistingPersonal, setUseExistingPersonal] = useState(true);
  const [useExistingCommunity, setUseExistingCommunity] = useState(true);
  const [useExistingEducation, setUseExistingEducation] = useState(true);
  const [useExistingIncome, setUseExistingIncome] = useState(true);
  const [useExistingBank, setUseExistingBank] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedScheme =
    SCHEMES_DATA.find(s => s.id === selectedSchemeForApply) || SCHEMES_DATA[2]; // Default to Top Class

  const steps = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Education', icon: GraduationCap },
    { num: 3, label: 'ST Community', icon: Users },
    { num: 4, label: 'Income', icon: IndianRupee },
    { num: 5, label: 'Institution', icon: School },
    { num: 6, label: 'Documents', icon: FileText },
    { num: 7, label: 'Bank / DBT', icon: CreditCard },
    { num: 8, label: 'Review', icon: FileCheck },
    { num: 9, label: 'Submit', icon: Send }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-xl mx-auto text-center space-y-5 my-8">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Application Submitted Successfully!</h2>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-left">
          <div className="flex justify-between">
            <span className="text-slate-500">Scheme:</span>
            <span className="font-semibold text-slate-900">{selectedScheme.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Generated Application ID:</span>
            <span className="font-mono font-bold text-blue-900">
              MOTA-TCS-2026-009941
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Data Re-use Efficiency:</span>
            <span className="font-bold text-emerald-700">8 Reusable Verified Credentials attached</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Assigned To:</span>
            <span className="text-slate-800">Institute Nodal Officer (MIT Anna Univ)</span>
          </div>
        </div>
        <p className="text-xs text-slate-600">
          Your previously verified ST credentials, UIDAI masked identity, and academic records have been automatically re-used.
          You can track this application in your dashboard.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('tracking')}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Track in Application Timeline
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setActiveTab('home');
            }}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('schemes')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Scholarship Application</span>
        <button
          onClick={() => setActiveTab('schemes')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
        >
          Change
        </button>
      </div>

      {/* Top Header Card */}
      <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-2xs space-y-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              Single-Window
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              DigiLocker Linked ✓
            </span>
          </div>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight mt-1.5">
            Apply: {selectedScheme.name}
          </h1>
        </div>

        {/* Modern Mobile Segmented Stepper */}
        <div className="pt-2 border-t border-slate-100/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 text-[11px]">
              Step {currentStep} of 9: <span className="text-indigo-600">{steps[currentStep - 1].label}</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400">
              {Math.round((currentStep / 9) * 100)}%
            </span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full flex gap-1 overflow-hidden p-0.5">
            {steps.map(s => (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`h-full flex-1 rounded-full cursor-pointer transition-all ${
                  s.num <= currentStep ? 'bg-[#5c67f2]' : 'bg-slate-200/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Multi-Step Container */}
      <div className="bg-white rounded-[28px] p-4.5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 1: Personal Information</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  UIDAI Demographic Match
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                <span className="text-blue-950 font-medium">Use Verified Information from Master Profile</span>
              </div>
              <button
                type="button"
                onClick={() => setUseExistingPersonal(!useExistingPersonal)}
                className="font-bold text-blue-900 hover:underline"
              >
                {useExistingPersonal ? 'Edit Manually' : 'Reset to Verified'}
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name (As on Aadhaar)</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.name}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Date of Birth</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.dob}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.gender}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mobile (Aadhaar Seeded)</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.mobile}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">State of Domicile</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.state}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">District</label>
                <input
                  type="text"
                  disabled={useExistingPersonal}
                  defaultValue={student.district}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 disabled:text-slate-700 disabled:bg-slate-100 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Education Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 2: Education & Academic History</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                APAAR ID: {student.apaarId} ✓
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
              <span className="text-blue-950 font-medium">
                Academic records verified from Tamil Nadu State Board & Anna University Registry
              </span>
              <span className="font-bold text-emerald-700">Pre-Verified</span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Current Enrolment</label>
                <input
                  type="text"
                  disabled
                  defaultValue={student.course}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Year of Study</label>
                <input
                  type="text"
                  disabled
                  defaultValue={student.yearOfStudy}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Cumulative Marks / CGPA</label>
                <input
                  type="text"
                  disabled
                  defaultValue={`${student.marksPercentage} (Verified by COE)`}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium text-emerald-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: ST Community Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 3: Scheduled Tribe (ST) Credentials</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                e-District Verified ✓
              </span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-emerald-950">
                  ST Community Certificate {student.stCertificateNo} is Verified
                </div>
                <div className="text-emerald-800 mt-0.5">
                  Tribe: <strong>{student.tribe}</strong> · Identified as Particularly Vulnerable Tribal Group (PVTG).
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">
                  Issued by Tahsildar, Udhagamandalam · Reusable for all MoTA benefits.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">ST Certificate Number</label>
                <input
                  type="text"
                  disabled
                  defaultValue={student.stCertificateNo}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Notified Tribe</label>
                <input
                  type="text"
                  disabled
                  defaultValue={student.tribe}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Income Details */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 4: Annual Family Income</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                Threshold: ₹6,00,000
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-600">Verified Certificate No:</span>
                <span className="font-mono text-slate-900">{student.incomeCertificateNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Annual Family Income:</span>
                <span className="font-bold text-slate-900">₹{student.annualFamilyIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Validity:</span>
                <span className="text-emerald-700 font-medium">Valid up to {student.incomeCertValidUpto}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Your family income of ₹1,80,000 satisfies the income eligibility threshold for both Post-Matric (&lt; ₹2.5L) and Top Class (&lt; ₹6.0L).
            </div>
          </div>
        )}

        {/* Step 5: Institution Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 5: Institution & AISHE Details</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                AISHE Code: {student.institutionUdiseCode} ✓
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-900">{student.institution}</div>
              <div className="text-slate-600">
                Campus: Chromepet, Chennai, Tamil Nadu · Directorate of Technical Education Recognized
              </div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified in MoTA Top Class Premier Institution Registry
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Documents Re-use */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 6: Digital Document Reuse</h3>
              <span className="text-xs font-bold text-emerald-700">Auto-Attached from Wallet</span>
            </div>

            <p className="text-xs text-slate-500">
              The following verified documents from your Digital Wallet will be automatically attached to this application:
            </p>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {documents.slice(0, 5).map(doc => (
                <div key={doc.id} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-900" />
                    <div>
                      <div className="font-semibold text-slate-900">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.source}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Reusable ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Bank & DBT Details */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 7: Bank & Aadhaar NPCI Mapping</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Aadhaar NPCI Seeded ✓
              </span>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Bank Name:</span>
                <span className="font-bold text-slate-900">{student.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Account Number:</span>
                <span className="font-mono text-slate-900">{student.accountNumberMasked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">IFSC Code:</span>
                <span className="font-mono text-slate-900">{student.ifscCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">NPCI Aadhaar Bridge:</span>
                <span className="font-bold text-emerald-700">Active (DBT Enabled)</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Comprehensive Review */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Step 8: Application Summary & Declarations</h3>
              <span className="text-xs font-bold text-blue-900">Final Verification</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheme Applied For:</span>
                <span className="font-bold text-blue-900">{selectedScheme.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="font-medium text-slate-800">{student.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Community:</span>
                <span className="font-semibold text-slate-800">{student.tribe} (PVTG)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DBT Bank Account:</span>
                <span className="font-medium text-slate-800">SBI ({student.accountNumberMasked})</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong>Declaration:</strong> I hereby declare that the particulars provided above are true to the best of my knowledge. I consent to MoTA verifying my credentials with connected government portals.
            </div>
          </div>
        )}

        {/* Step 9: Final Submission */}
        {currentStep === 9 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ready to Submit Application</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Clicking submit will transmit your application and linked DigiLocker verified certificates to the Nodal Officer of {student.institution.split(',')[0]}.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
              >
                <span>Confirm & Submit Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stepper Navigation Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-full border border-slate-200/80 transition-colors disabled:opacity-30 flex items-center gap-1.5 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {currentStep < 9 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#18191c] hover:bg-slate-800 rounded-full shadow-md transition-all flex items-center gap-1.5 min-h-[44px]"
            >
              <span>Next ({currentStep + 1}/9)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
