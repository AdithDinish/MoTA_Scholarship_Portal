import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  Upload,
  FileText,
  ArrowRight,
  ShieldAlert,
  Info,
  RefreshCw,
  HelpCircle,
  Eye
} from 'lucide-react';

export const DeficiencyManager: React.FC = () => {
  const {
    student,
    application,
    resolveIncomeDeficiency,
    setActiveTab
  } = useApp();

  const [selectedFileName, setSelectedFileName] = useState<string>('Income_Certificate_2025_Reissued_Clear.pdf');
  const [remarks, setRemarks] = useState<string>('Re-scanned income certificate with high-contrast QR code and digital seal from Revenue Office.');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasResolved, setHasResolved] = useState<boolean>(!application.actionRequired);

  const handleSubmitResolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      resolveIncomeDeficiency(selectedFileName);
      setIsUploading(false);
      setHasResolved(true);
    }, 800);
  };

  return (
    <div className="space-y-3.5 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('tracking')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Deficiency Center</span>
        <div className="w-12" />
      </div>

      {/* Top Header Card */}
      <div className="bg-[#fff8ea] rounded-[28px] p-4.5 border border-amber-200/80 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded-full">
                Action Required
              </span>
              <span className="text-[11px] text-slate-500">Ministry Scrutiny Cell</span>
            </div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight mt-1">
              Deficiency Correction
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Resolve flagged document issues directly on your mobile device.
            </p>
          </div>
        </div>
      </div>

      {hasResolved ? (
        /* Resolved State Screen */
        <div className="bg-white rounded-[28px] p-6 border border-emerald-200/80 shadow-2xs text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Submitted for Re-verification ✓
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Your updated certificate was transmitted to the verification authority.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-[20px] border border-slate-100 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Document:</span>
              <span className="font-semibold text-slate-800">Family Income Certificate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">File:</span>
              <span className="font-mono text-indigo-700 text-[11px] truncate max-w-[180px]">{selectedFileName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-700">Under Review</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Turnaround:</span>
              <span className="font-semibold text-slate-700">Within 24 Hours</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('tracking')}
              className="px-5 py-2.5 bg-[#18191c] hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      ) : (
        /* Action Required Form */
        <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-2xs space-y-4">
          {/* Issue Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Issue Flagged
            </h3>

            <div className="p-3.5 bg-[#fff8ea] border border-amber-200/80 rounded-[20px] space-y-2 text-xs">
              <div>
                <span className="font-bold text-amber-950 block text-[11px]">WHAT HAPPENED</span>
                <span className="text-amber-900 text-[11px] leading-relaxed">
                  Income Certificate (No: <strong>{student.incomeCertificateNo}</strong>) could not be verified automatically against Tamil Nadu e-District.
                </span>
              </div>

              <div>
                <span className="font-bold text-amber-950 block text-[11px]">REASON</span>
                <span className="text-amber-900 text-[11px] leading-relaxed">
                  "QR barcode was unreadable due to low scan resolution."
                </span>
              </div>

              <div>
                <span className="font-bold text-amber-950 block text-[11px]">NEXT STEP</span>
                <span className="text-amber-900 text-[11px] leading-relaxed">
                  Re-upload a clear copy with readable QR code and official digital signature.
                </span>
              </div>
            </div>
          </div>

          {/* Current File Preview & Action */}
          <div className="border border-slate-100 rounded-[20px] p-3 bg-slate-50/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-[10px]">
                PDF
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-[11px]">Income_Certificate_2025.pdf</div>
                <div className="text-[10px] text-rose-600 font-medium">Flagged Mismatch · Uploaded 15 Sep</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Demo preview: Currently uploaded scan showing blurred QR code.')}
              className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1 shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Upload Corrected File Form */}
          <form onSubmit={handleSubmitResolution} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5 text-xs">
                Upload Clear Document
              </label>
              <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-[20px] p-4 text-center">
                <Upload className="w-6 h-6 text-indigo-600 mx-auto mb-1.5" />
                <div className="font-bold text-slate-800 text-xs">
                  {selectedFileName}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  High-res PDF or JPG (300 DPI)
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1 text-xs">
                Remarks / Explanation (Optional)
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className="w-full p-2.5 text-xs rounded-[16px] border border-slate-200 focus:outline-indigo-600 bg-white"
              />
            </div>

            <div className="p-2.5 bg-slate-50 rounded-[16px] border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Replaces defective file and immediately notifies verification queue.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('tracking')}
                className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-full text-xs min-h-[44px]"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-5 py-2.5 font-bold text-white bg-[#18191c] hover:bg-slate-800 rounded-full shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 min-h-[44px]"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Submit Correction</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
