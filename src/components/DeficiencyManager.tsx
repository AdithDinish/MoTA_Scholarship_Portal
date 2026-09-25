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
    <div className="space-y-6 pb-20 lg:pb-10 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                Action Required
              </span>
              <span className="text-xs text-slate-500">Ministry Scrutiny Cell</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Deficiency Correction Center
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Clear, simple steps to resolve flagged issues without visiting government offices.
            </p>
          </div>
        </div>
      </div>

      {hasResolved ? (
        /* Resolved State Screen */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Submitted for Re-verification ✓
          </h2>

          <div className="max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Document:</span>
              <span className="font-semibold text-slate-800">Family Income Certificate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Uploaded File:</span>
              <span className="font-mono text-blue-900">{selectedFileName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Queue:</span>
              <span className="text-slate-800">Tamil Nadu Revenue Auto-Matcher</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expected Time:</span>
              <span className="font-semibold text-emerald-700">Within 24 Hours</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Your updated certificate was successfully transmitted. Your application status is now updated to "Under Verification", and all notifications have been updated.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('tracking')}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>View Updated Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      ) : (
        /* Action Required Form */
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          {/* Issue Breakdown (WHAT happened? WHY? WHAT next?) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Issue Details
            </h3>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3 text-xs">
              <div>
                <span className="font-bold text-amber-950 block">WHAT happened?</span>
                <span className="text-amber-900">
                  Your submitted Income Certificate (No: <strong>{student.incomeCertificateNo}</strong>) could not be automatically verified against the Tamil Nadu e-District database.
                </span>
              </div>

              <div>
                <span className="font-bold text-amber-950 block">WHY?</span>
                <span className="text-amber-900">
                  "Certificate details could not be matched with the submitted information. The digital QR barcode on the current scan was illegible during automated computer scanning."
                </span>
              </div>

              <div>
                <span className="font-bold text-amber-950 block">WHAT should you do next?</span>
                <span className="text-amber-900">
                  Upload a fresh, clear PDF or image showing the full certificate with readable QR code and Tahsildar digital signature.
                </span>
              </div>
            </div>
          </div>

          {/* Current File Preview & Action */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                PDF
              </div>
              <div>
                <div className="font-semibold text-slate-900">Income_Certificate_2025_Scan.pdf</div>
                <div className="text-[10px] text-rose-600 font-medium">Flagged Mismatch · Uploaded 15 Sep</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert('Demo preview: Currently uploaded scan showing blurred QR code.')}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Flagged File</span>
            </button>
          </div>

          {/* Upload Corrected File Form */}
          <form onSubmit={handleSubmitResolution} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Upload Corrected Document (PDF or high-res JPG)
              </label>
              <div className="border-2 border-dashed border-blue-300 bg-blue-50/30 rounded-xl p-5 text-center">
                <Upload className="w-7 h-7 text-blue-900 mx-auto mb-2" />
                <div className="font-bold text-slate-800">
                  {selectedFileName}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Ready to submit · Validated against State e-District specifications (300 DPI)
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Student Explanation / Remarks (Optional)
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-600">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                Once submitted, this replaces the defective copy and immediately notifies the Ministry Central Scrutiny Cell.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('tracking')}
                className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back to Tracking
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2.5 font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Revenue System...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Submit for Re-verification</span>
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
