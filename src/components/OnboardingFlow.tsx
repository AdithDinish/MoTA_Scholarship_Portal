import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Users,
  GraduationCap,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export const OnboardingFlow: React.FC = () => {
  const { student, setActiveTab } = useApp();
  const [step, setStep] = useState(1);

  const steps = [
    { num: 1, label: 'Personal', icon: User },
    { num: 2, label: 'Community', icon: Users },
    { num: 3, label: 'Education', icon: GraduationCap },
    { num: 4, label: 'Financial', icon: IndianRupee },
    { num: 5, label: 'Bank', icon: CreditCard }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs text-center space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
          Student Registration & Profile Setup
        </span>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome to MoTA Single Window
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Complete this one-time master profile. All five MoTA schemes will reuse this verified data.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 pt-4">
          {steps.map(s => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  s.num === step
                    ? 'bg-blue-900 text-white shadow-xs'
                    : s.num < step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s.num < step ? '✓' : s.num}
              </div>
              <span
                className={`text-xs hidden sm:inline ${
                  s.num === step ? 'font-bold text-blue-900' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Step 1: Personal Information</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={student.name}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Date of Birth</label>
                <input
                  type="text"
                  defaultValue={student.dob}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                <input
                  type="text"
                  defaultValue={student.gender}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mobile</label>
                <input
                  type="text"
                  defaultValue={student.mobile}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">State</label>
                <input
                  type="text"
                  defaultValue={student.state}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">District</label>
                <input
                  type="text"
                  defaultValue={student.district}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Step 2: Scheduled Tribe (ST) Information</h2>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium">
              Linked with Tamil Nadu e-District Tribal Database (Certificate: {student.stCertificateNo})
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tribe / Community</label>
                <input
                  type="text"
                  defaultValue={student.tribe}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">PVTG Category</label>
                <input
                  type="text"
                  defaultValue="Yes (Kurumbas recognized as PVTG)"
                  disabled
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-100 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Step 3: Education & Academic Details</h2>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">School / College</label>
              <input
                type="text"
                defaultValue={student.institution}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Course</label>
                <input
                  type="text"
                  defaultValue={student.course}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Year / Semester</label>
                <input
                  type="text"
                  defaultValue={student.yearOfStudy}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Step 4: Financial & Domicile Details</h2>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Annual Family Income</label>
              <input
                type="text"
                defaultValue={`₹${student.annualFamilyIncome.toLocaleString('en-IN')}`}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Income Certificate No</label>
                <input
                  type="text"
                  defaultValue={student.incomeCertificateNo}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Domicile Certificate No</label>
                <input
                  type="text"
                  defaultValue={student.domicileCertNo}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Step 5: Bank & DBT / PFMS Information</h2>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium">
              Aadhaar NPCI Mapping Confirmed. Direct Benefit Transfer enabled.
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Bank Name</label>
              <input
                type="text"
                defaultValue={student.bankName}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Account Number</label>
                <input
                  type="text"
                  defaultValue={student.accountNumberMasked}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">IFSC Code</label>
                <input
                  type="text"
                  defaultValue={student.ifscCode}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep(prev => prev - 1)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl disabled:opacity-30 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(prev => prev + 1)}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl flex items-center gap-1"
            >
              <span>Next Step ({step + 1}/5)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('home')}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Setup & Go to Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
