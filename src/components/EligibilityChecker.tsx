import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Award,
  GraduationCap,
  School,
  Globe2,
  BookOpen
} from 'lucide-react';
import { SchemeId } from '../types';

export const EligibilityChecker: React.FC = () => {
  const { student, setActiveTab, setSelectedSchemeForApply } = useApp();

  const [educationLevel, setEducationLevel] = useState<string>('ug_technical');
  const [institutionType, setInstitutionType] = useState<string>('notified_premier');
  const [stStatus, setStStatus] = useState<string>('verified_st');
  const [annualIncome, setAnnualIncome] = useState<number>(180000);
  const [marksPercentage, setMarksPercentage] = useState<number>(86);
  const [hasNetGate, setHasNetGate] = useState<boolean>(false);
  const [hasOverseasOffer, setHasOverseasOffer] = useState<boolean>(false);

  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [results, setResults] = useState<{
    schemeId: SchemeId;
    schemeName: string;
    result: 'ELIGIBLE' | 'NOT ELIGIBLE' | 'REQUIRES VERIFICATION';
    reason: string;
  }[] | null>(null);

  const evaluateEligibility = () => {
    setEvaluating(true);
    setResults(null);

    setTimeout(() => {
      const evaluation: {
        schemeId: SchemeId;
        schemeName: string;
        result: 'ELIGIBLE' | 'NOT ELIGIBLE' | 'REQUIRES VERIFICATION';
        reason: string;
      }[] = [];

      // ST Check
      const isST = stStatus === 'verified_st';

      // 1. Pre-Matric
      if (educationLevel === 'secondary_school') {
        if (!isST) {
          evaluation.push({
            schemeId: 'pre_matric',
            schemeName: 'Pre-Matric Scholarship Scheme',
            result: 'NOT ELIGIBLE',
            reason: 'Applicant must belong to a notified Scheduled Tribe with verified certificate.'
          });
        } else if (annualIncome > 250000) {
          evaluation.push({
            schemeId: 'pre_matric',
            schemeName: 'Pre-Matric Scholarship Scheme',
            result: 'NOT ELIGIBLE',
            reason: 'Annual family income exceeds the ₹2,50,000 threshold for Pre-Matric.'
          });
        } else {
          evaluation.push({
            schemeId: 'pre_matric',
            schemeName: 'Pre-Matric Scholarship Scheme',
            result: 'ELIGIBLE',
            reason: 'ST student in Class 9-10 with family income within ₹2.5 Lakhs.'
          });
        }
      }

      // 2. Post-Matric
      if (['higher_sec', 'ug_technical', 'ug_general', 'pg_degree'].includes(educationLevel)) {
        if (!isST) {
          evaluation.push({
            schemeId: 'post_matric',
            schemeName: 'Post-Matric Scholarship (PMS-ST)',
            result: 'NOT ELIGIBLE',
            reason: 'Verified Scheduled Tribe certificate is mandatory.'
          });
        } else if (annualIncome <= 250000) {
          evaluation.push({
            schemeId: 'post_matric',
            schemeName: 'Post-Matric Scholarship (PMS-ST)',
            result: 'ELIGIBLE',
            reason: 'Eligible for 100% compulsory tuition fee reimbursement + annual maintenance allowance.'
          });
        } else {
          evaluation.push({
            schemeId: 'post_matric',
            schemeName: 'Post-Matric Scholarship (PMS-ST)',
            result: 'NOT ELIGIBLE',
            reason: 'Family income exceeds ₹2,50,000 ceiling. Consider Top Class or other schemes.'
          });
        }
      }

      // 3. Top Class Scholarship
      if (['ug_technical', 'ug_general', 'pg_degree'].includes(educationLevel)) {
        if (institutionType === 'notified_premier' && isST && annualIncome <= 600000) {
          evaluation.push({
            schemeId: 'top_class',
            schemeName: 'Top Class Education Scheme for ST Students',
            result: 'ELIGIBLE',
            reason: 'Enrolled in a MoTA-notified premier institution with family income below ₹6,00,000.'
          });
        } else if (institutionType !== 'notified_premier') {
          evaluation.push({
            schemeId: 'top_class',
            schemeName: 'Top Class Education Scheme for ST Students',
            result: 'NOT ELIGIBLE',
            reason: 'Only students admitted to 259 MoTA-notified premier institutions (IITs, IIMs, NITs, NLUs, etc.) qualify.'
          });
        } else if (annualIncome > 600000) {
          evaluation.push({
            schemeId: 'top_class',
            schemeName: 'Top Class Education Scheme for ST Students',
            result: 'NOT ELIGIBLE',
            reason: 'Family income exceeds the ₹6,00,000 ceiling for Top Class Scholarship.'
          });
        }
      }

      // 4. NFST
      if (educationLevel === 'phd_research' || educationLevel === 'pg_degree') {
        if (isST && marksPercentage >= 55) {
          evaluation.push({
            schemeId: 'nfst',
            schemeName: 'National Fellowship for ST Students (NFST)',
            result: hasNetGate ? 'ELIGIBLE' : 'REQUIRES VERIFICATION',
            reason: hasNetGate
              ? 'Confirmed eligibility for JRF/SRF stipend (₹37,000 - ₹42,000/mo) based on NET/GATE qualification.'
              : 'Requires verified registration in regular full-time Ph.D. program in a UGC-recognized university.'
          });
        } else {
          evaluation.push({
            schemeId: 'nfst',
            schemeName: 'National Fellowship for ST Students (NFST)',
            result: 'NOT ELIGIBLE',
            reason: 'Minimum 55% marks in Post-Graduation required for research fellowship.'
          });
        }
      }

      // 5. NOS
      if (hasOverseasOffer) {
        if (isST && annualIncome <= 800000 && marksPercentage >= 55) {
          evaluation.push({
            schemeId: 'nos',
            schemeName: 'National Overseas Scholarship (NOS)',
            result: 'ELIGIBLE',
            reason: 'Holds unconditional foreign admission offer with family income within ₹8,00,000.'
          });
        } else if (annualIncome > 800000) {
          evaluation.push({
            schemeId: 'nos',
            schemeName: 'National Overseas Scholarship (NOS)',
            result: 'NOT ELIGIBLE',
            reason: 'Family income exceeds ₹8,00,000 limit for overseas scholarship.'
          });
        }
      }

      if (evaluation.length === 0) {
        evaluation.push({
          schemeId: 'post_matric',
          schemeName: 'General ST Welfare Guidance',
          result: 'REQUIRES VERIFICATION',
          reason: 'Your specific course combination requires manual matching with state education directory.'
        });
      }

      setResults(evaluation);
      setEvaluating(false);
    }, 700);
  };

  const autofillFromRavi = () => {
    setEducationLevel('ug_technical');
    setInstitutionType('notified_premier');
    setStStatus('verified_st');
    setAnnualIncome(student.annualFamilyIncome);
    setMarksPercentage(86);
    setHasNetGate(false);
    setHasOverseasOffer(false);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              MoTA Scheme Rule Engine
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Check Your Eligibility
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Evaluates statutory guidelines for all 5 MoTA scholarships against verified academic and financial parameters.
            </p>
          </div>

          <button
            onClick={autofillFromRavi}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Ravi's Profile Data</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Student Profile & Academic Criteria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: Education Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Education Level
            </label>
            <select
              value={educationLevel}
              onChange={e => setEducationLevel(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-blue-900"
            >
              <option value="secondary_school">Secondary School (Class 9 - 10)</option>
              <option value="higher_sec">Higher Secondary (Class 11 - 12)</option>
              <option value="ug_technical">Undergraduate Technical (B.Tech, B.E., MBBS, Arch)</option>
              <option value="ug_general">Undergraduate General (B.A., B.Sc., B.Com)</option>
              <option value="pg_degree">Postgraduate (M.Tech, M.A., M.Sc., MBA)</option>
              <option value="phd_research">Ph.D. / M.Phil. / Doctoral Research</option>
            </select>
          </div>

          {/* Question 2: Institution Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institution Classification
            </label>
            <select
              value={institutionType}
              onChange={e => setInstitutionType(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-blue-900"
            >
              <option value="notified_premier">Notified Premier Institute (IITs, IIMs, NITs, AIIMS, MIT Anna Univ)</option>
              <option value="gov_university">Government / State University or Affiliated College</option>
              <option value="private_accredited">NAAC / UGC Accredited Private College</option>
              <option value="school_gov">Government / Local Body Secondary School</option>
            </select>
          </div>

          {/* Question 3: ST Community Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Scheduled Tribe (ST) Status
            </label>
            <select
              value={stStatus}
              onChange={e => setStStatus(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-blue-900"
            >
              <option value="verified_st">Scheduled Tribe with Verified Digital Certificate (Kurumbas / Santhal / etc.)</option>
              <option value="pvtg_st">Particularly Vulnerable Tribal Group (PVTG)</option>
              <option value="non_st">Non-ST (General / OBC / SC)</option>
            </select>
          </div>

          {/* Question 4: Annual Family Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Annual Family Income (from all sources): ₹{annualIncome.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min={50000}
              max={1000000}
              step={25000}
              value={annualIncome}
              onChange={e => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-blue-900"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹50,000</span>
              <span className="font-semibold text-slate-600">₹2.5L (PMS Limit)</span>
              <span className="font-semibold text-slate-600">₹6L (Top Class)</span>
              <span>₹10,00,000+</span>
            </div>
          </div>

          {/* Question 5: Academic Marks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Qualifying Exam Marks: {marksPercentage}%
            </label>
            <input
              type="number"
              min={40}
              max={100}
              value={marksPercentage}
              onChange={e => setMarksPercentage(Number(e.target.value))}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 focus:outline-blue-900"
            />
          </div>

          {/* Question 6: Fellowship / Overseas Special Flags */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNetGate}
                onChange={e => setHasNetGate(e.target.checked)}
                className="w-4 h-4 rounded text-blue-900 accent-blue-900"
              />
              <span>Qualified UGC-NET / CSIR-NET / GATE (for NFST)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasOverseasOffer}
                onChange={e => setHasOverseasOffer(e.target.checked)}
                className="w-4 h-4 rounded text-blue-900 accent-blue-900"
              />
              <span>Possess Unconditional Foreign Offer (QS Top 500 for NOS)</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Rule evaluation runs against verified Ministry guidelines.
          </span>
          <button
            onClick={evaluateEligibility}
            disabled={evaluating}
            className="px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {evaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Checking eligibility...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Evaluate Eligibility</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Evaluation Results ({results.length} Schemes Analyzed)
            </h3>
            <span className="text-xs text-slate-500">Automated Policy Check</span>
          </div>

          <div className="space-y-3">
            {results.map((res, index) => {
              const isEligible = res.result === 'ELIGIBLE';
              const isPending = res.result === 'REQUIRES VERIFICATION';

              return (
                <div
                  key={index}
                  className={`p-4 sm:p-5 rounded-2xl border ${
                    isEligible
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : isPending
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            isEligible
                              ? 'bg-emerald-600 text-white'
                              : isPending
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {res.result}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{res.schemeName}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5">{res.reason}</p>
                    </div>

                    {isEligible && (
                      <button
                        onClick={() => {
                          setSelectedSchemeForApply(res.schemeId);
                          setActiveTab('apply');
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
                      >
                        <span>Apply for Scheme</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explicit Legal Verification Disclaimer (as required by prompt) */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Notice regarding eligibility:</div>
              <p className="text-blue-900 mt-0.5">
                "You appear eligible based on the information currently available. Final eligibility is subject to official verification by the State Welfare Department, Institution Nodal Officer, and Ministry Scrutiny Cell."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
