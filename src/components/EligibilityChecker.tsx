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
    <div className="space-y-3.5 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Eligibility Engine</span>
        <button
          onClick={autofillFromRavi}
          className="text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Autofill</span>
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-[#fff2e8] rounded-[28px] p-4.5 border border-orange-100 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-orange-950 uppercase tracking-wider bg-orange-200/60 px-2 py-0.5 rounded-full">
                Policy Engine
              </span>
              <span className="text-[10px] text-slate-500">5 Schemes</span>
            </div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight mt-1">
              Check Your Eligibility
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Evaluates statutory guidelines against your profile parameters.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Academic & Income Criteria
        </h2>

        <div className="space-y-3.5">
          {/* Question 1: Education Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current Education Level
            </label>
            <select
              value={educationLevel}
              onChange={e => setEducationLevel(e.target.value)}
              className="w-full text-xs p-3 rounded-[16px] border border-slate-200 bg-white focus:outline-indigo-600 min-h-[44px]"
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
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Institution Classification
            </label>
            <select
              value={institutionType}
              onChange={e => setInstitutionType(e.target.value)}
              className="w-full text-xs p-3 rounded-[16px] border border-slate-200 bg-white focus:outline-indigo-600 min-h-[44px]"
            >
              <option value="notified_premier">Notified Premier Institute (IITs, IIMs, NITs, MIT Anna Univ)</option>
              <option value="gov_university">Government / State University or Affiliated College</option>
              <option value="private_accredited">NAAC / UGC Accredited Private College</option>
              <option value="school_gov">Government / Local Body Secondary School</option>
            </select>
          </div>

          {/* Question 3: ST Community Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Scheduled Tribe (ST) Status
            </label>
            <select
              value={stStatus}
              onChange={e => setStStatus(e.target.value)}
              className="w-full text-xs p-3 rounded-[16px] border border-slate-200 bg-white focus:outline-indigo-600 min-h-[44px]"
            >
              <option value="verified_st">Scheduled Tribe with Verified Digital Certificate (Kurumbas)</option>
              <option value="pvtg_st">Particularly Vulnerable Tribal Group (PVTG)</option>
              <option value="non_st">Non-ST (General / OBC / SC)</option>
            </select>
          </div>

          {/* Question 4: Annual Family Income */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Annual Family Income: ₹{annualIncome.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min={50000}
              max={1000000}
              step={25000}
              value={annualIncome}
              onChange={e => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-[#5c67f2] h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹50k</span>
              <span className="font-semibold text-slate-600">₹2.5L (PMS)</span>
              <span className="font-semibold text-slate-600">₹6L (Top Class)</span>
              <span>₹10L+</span>
            </div>
          </div>

          {/* Question 5: Academic Marks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Qualifying Exam Marks: {marksPercentage}%
            </label>
            <input
              type="number"
              min={40}
              max={100}
              value={marksPercentage}
              onChange={e => setMarksPercentage(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-[16px] border border-slate-200 focus:outline-indigo-600 min-h-[44px]"
            />
          </div>

          {/* Question 6: Fellowship / Overseas Special Flags */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={hasNetGate}
                onChange={e => setHasNetGate(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
              />
              <span>Qualified UGC-NET / CSIR-NET / GATE (for NFST)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer min-h-[36px]">
              <input
                type="checkbox"
                checked={hasOverseasOffer}
                onChange={e => setHasOverseasOffer(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
              />
              <span>Possess Unconditional Foreign Offer (QS Top 500 for NOS)</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={evaluateEligibility}
            disabled={evaluating}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#18191c] hover:bg-slate-800 rounded-full shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
          >
            {evaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating...</span>
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Results ({results.length} Schemes Analyzed)
            </h3>
            <span className="text-[10px] text-slate-400">Automated</span>
          </div>

          <div className="space-y-2.5">
            {results.map((res, index) => {
              const isEligible = res.result === 'ELIGIBLE';
              const isPending = res.result === 'REQUIRES VERIFICATION';

              return (
                <div
                  key={index}
                  className={`p-4 rounded-[26px] border shadow-2xs ${
                    isEligible
                      ? 'bg-[#eefbf4] border-emerald-200'
                      : isPending
                      ? 'bg-[#fff8ea] border-amber-200'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isEligible
                              ? 'bg-emerald-600 text-white'
                              : isPending
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {res.result}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{res.schemeName}</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{res.reason}</p>
                    </div>

                    {isEligible && (
                      <button
                        onClick={() => {
                          setSelectedSchemeForApply(res.schemeId);
                          setActiveTab('apply');
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#18191c] hover:bg-slate-800 rounded-full shadow-md transition-all shrink-0 flex items-center gap-1 min-h-[36px]"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legal Verification Disclaimer */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-[20px] text-[11px] text-slate-500 flex items-start gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Preliminary assessment. Final eligibility is verified by State Welfare and Ministry Scrutiny Cells.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
