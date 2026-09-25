import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Users,
  GraduationCap,
  IndianRupee,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { student, setActiveTab } = useApp();

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Student Profile</span>
        <div className="w-12" />
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-[32px] p-5 border border-slate-100 shadow-2xs flex items-center gap-4">
        <img
          src={student.avatarUrl}
          alt={student.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-sm shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold text-slate-900 truncate">{student.name}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
              ST Verified ✓
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">
            ID: <span className="font-mono text-slate-800">{student.id}</span>
          </div>
          <div className="text-[11px] font-semibold text-indigo-600 mt-1">
            {student.tribe} ({student.isPVTG ? 'PVTG Recognized' : 'General ST'})
          </div>
        </div>
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Section 1: Demographic & Identity */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-900" />
              Demographic & Identity
            </span>
            <span className="text-emerald-700 text-[11px]">UIDAI Masked ✓</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Date of Birth:</span>
              <span className="font-medium text-slate-900">{student.dob}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gender:</span>
              <span className="font-medium text-slate-900">{student.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Aadhaar (Masked):</span>
              <span className="font-mono text-slate-900">{student.aadhaarMasked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">APAAR ID:</span>
              <span className="font-mono text-slate-900">{student.apaarId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile:</span>
              <span className="font-medium text-slate-900">{student.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-medium text-slate-900">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Section 2: ST Community Lineage */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-900" />
              Scheduled Tribe Credentials
            </span>
            <span className="text-emerald-700 text-[11px]">e-District Verified ✓</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Tribe / Community:</span>
              <span className="font-bold text-slate-900">{student.tribe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PVTG Status:</span>
              <span className="font-semibold text-purple-700">Particularly Vulnerable Tribal Group</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ST Certificate No:</span>
              <span className="font-mono text-slate-900">{student.stCertificateNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Issuing State:</span>
              <span className="font-medium text-slate-900">{student.stIssuingState}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">District:</span>
              <span className="font-medium text-slate-900">{student.district}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Academic Details */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-900" />
              Academic Enrolment
            </span>
            <span className="text-emerald-700 text-[11px]">AISHE Verified ✓</span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-slate-500 block">Institution:</span>
              <span className="font-semibold text-slate-900">{student.institution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Course:</span>
              <span className="font-medium text-slate-900">{student.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Semester:</span>
              <span className="font-medium text-slate-900">{student.yearOfStudy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Academic Score:</span>
              <span className="font-semibold text-emerald-800">{student.marksPercentage}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Financial & DBT Bank Details */}
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-900" />
              Financial & DBT Mandate
            </span>
            <span className="text-emerald-700 text-[11px]">PFMS Seeded ✓</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Annual Family Income:</span>
              <span className="font-bold text-slate-900">₹{student.annualFamilyIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bank Name:</span>
              <span className="font-medium text-slate-900">{student.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Account No:</span>
              <span className="font-mono text-slate-900">{student.accountNumberMasked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">IFSC Code:</span>
              <span className="font-mono text-slate-900">{student.ifscCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consent & Data Protection Notice (Prompt Section 28) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-3">
        <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Consent & Privacy Notice:</span>
          <p className="mt-0.5">
            "Before retrieving information from an external authorized source (DigiLocker, State e-District, APAAR), the application will request appropriate consent where required. Your demographic credentials are encrypted in compliance with Digital Personal Data Protection guidelines."
          </p>
        </div>
      </div>
    </div>
  );
};
