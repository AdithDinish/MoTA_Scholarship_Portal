import React from 'react';
import { useApp } from '../context/AppContext';
import { SCHEMES_DATA } from '../data/mockData';
import {
  School,
  GraduationCap,
  Award,
  Globe2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  FileCheck,
  CreditCard,
  Building2,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SchemeId } from '../types';

interface LandingPageProps {
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin }) => {
  const { setActiveTab, setRole } = useApp();

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

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Ministry of Tribal Affairs · Government of India</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f2e59] tracking-tight leading-[1.15] text-balance">
              One Platform. <br />
              <span className="text-amber-600">Every Scholarship Journey.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Access, track and manage MoTA scholarship and fellowship services through a unified digital experience.
              No more switching between NSP, SFMP, and separate state portals.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenLogin}
                className="px-6 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Student Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setRole('student');
                  setActiveTab('schemes');
                }}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors"
              >
                Explore Scholarships
              </button>

              <a
                href="#how-it-works"
                className="px-4 py-3.5 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
              >
                How It Works ↓
              </a>
            </div>

            {/* Quick Demo Pilot Banner */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5 Flagship Schemes Unified</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>DigiLocker Zero-Duplicate Entry</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct PFMS / Aadhaar DBT</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative group">
              <img
                src="/src/assets/images/mota_scholarship_hero_1790316144827.jpg"
                alt="Tribal Scholars in higher education"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Empowering Tribal Youth
                </div>
                <div className="text-sm font-bold mt-0.5">
                  From School to Doctoral Studies Abroad
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  100% Direct Benefit Transfer (DBT) into Aadhaar-seeded accounts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Scholarship Schemes Section (Prompt Section 8 / 33) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            All Five Schemes in One Window
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Comprehensive Tribal Education Support
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Whether in high school, premier engineering colleges, or foreign universities, MoTA provides dedicated scholarships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SCHEMES_DATA.map(s => {
            const Icon = getSchemeIcon(s.id);

            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{s.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{s.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Income Limit</span>
                  <span className="text-xs font-bold text-slate-800">{s.incomeLimit}</span>
                  <button
                    onClick={() => {
                      setRole('student');
                      setActiveTab('schemes');
                    }}
                    className="w-full mt-3 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why This Platform? (Section 33 in prompt) */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Transforming Service Delivery
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why Unified MoTA Scholarship?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Overcoming the friction of disparate systems like NSP, SFMP, and NOS portals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900">One Single Dashboard</h4>
            <p className="text-xs text-slate-600 mt-1">
              View all five schemes, live verification stages, and disbursement statuses from a single login.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900">Digital Document Reuse</h4>
            <p className="text-xs text-slate-600 mt-1">
              Verified ST community certificates and marksheets stored once can be reused across all future scholarship cycles.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900">Unified Verification</h4>
            <p className="text-xs text-slate-600 mt-1">
              Instant automated validation with DigiLocker, APAAR, UDISE+, and State Revenue databases in real-time.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm mb-3">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900">Transparent DBT Tracking</h4>
            <p className="text-xs text-slate-600 mt-1">
              Direct connection to PFMS and NPCI Aadhaar Bridge with exact installment milestones and reference numbers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm mb-3">
              5
            </div>
            <h4 className="text-sm font-bold text-slate-900">JAGO Assistance</h4>
            <p className="text-xs text-slate-600 mt-1">
              Grounded, intelligent assistant answering questions on eligibility, pending deficiencies, and payment dates 24/7.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-sm mb-3">
              6
            </div>
            <h4 className="text-sm font-bold text-slate-900">Multilingual Accessibility</h4>
            <p className="text-xs text-slate-600 mt-1">
              Simple interface with full support for English, हिन्दी (Hindi), and தமிழ் (Tamil) designed for high readability.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (Prompt Section 34) */}
      <section id="how-it-works" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Simple 4-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Frictionless onboarding designed specifically for students from diverse backgrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-base mx-auto">
              1
            </div>
            <h4 className="text-sm font-bold text-slate-900">1. Create Profile</h4>
            <p className="text-xs text-slate-600">
              Sign in with mobile OTP and link your APAAR Student ID or DigiLocker profile.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-base mx-auto">
              2
            </div>
            <h4 className="text-sm font-bold text-slate-900">2. Verify Information</h4>
            <p className="text-xs text-slate-600">
              ST caste certificate and institution enrolment are automatically verified with issuing authorities.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-base mx-auto">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900">3. Apply for Scholarship</h4>
            <p className="text-xs text-slate-600">
              Choose Pre-Matric, Post-Matric, Top Class, NFST, or NOS. Verified data is pre-filled automatically.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-base mx-auto">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900">4. Track & Receive Benefits</h4>
            <p className="text-xs text-slate-600">
              Monitor verification checkpoints and receive direct DBT transfers into your bank account via PFMS.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onOpenLogin}
            className="px-8 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-sm rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
          >
            <span>Get Started with Student Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
