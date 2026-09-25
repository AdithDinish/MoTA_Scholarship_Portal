import React from 'react';
import { useApp } from '../context/AppContext';
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  Building,
  CreditCard,
  ShieldCheck,
  Download,
  ExternalLink,
  Info
} from 'lucide-react';

export const PaymentDashboard: React.FC = () => {
  const { payments, student, application } = useApp();

  const totalSanctioned = 45000;
  const totalDisbursed = 25000;
  const pendingAmount = 20000;

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Direct Benefit Transfer (DBT)
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                PFMS Integrated ✓
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Scholarship Payments
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time payment tracking powered by Public Financial Management System (PFMS) & Aadhaar Payment Bridge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Demo action: Simulated PDF statement download.')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Statement</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block font-medium">Total Sanctioned</span>
            <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
              ₹{totalSanctioned.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Sanction Order: MOTA-2026/SO-881</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs text-emerald-800 font-medium block">Total Disbursed</span>
            <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">
              ₹{totalDisbursed.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 mt-1 block">
              Credited directly to SBI Account
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs text-amber-800 font-medium block">Pending Disbursal</span>
            <div className="text-2xl font-bold text-amber-700 tabular-nums mt-1">
              ₹{pendingAmount.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-amber-700 mt-1 block">
              Tuition fee reimbursement processing
            </span>
          </div>
        </div>
      </div>

      {/* Linked Bank Account Details (NPCI Aadhaar Bridge) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Designated DBT Bank Account
          </h2>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            NPCI Aadhaar-Seeded & Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Bank</span>
            <span className="font-bold text-slate-900">{student.bankName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Account Number</span>
            <span className="font-mono font-medium text-slate-900">{student.accountNumberMasked}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">IFSC Code</span>
            <span className="font-mono font-medium text-slate-900">{student.ifscCode}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Aadhaar Mapping</span>
            <span className="font-semibold text-emerald-700">Seeded via PFMS (No action needed)</span>
          </div>
        </div>
      </div>

      {/* Payment History List (Prompt Section 15) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Installment Disbursement History
        </h2>

        <div className="space-y-3.5">
          {payments.map(item => {
            const isPaid = item.status === 'paid';

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isPaid
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <IndianRupee className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{item.schemeName}</h4>
                        {isPaid ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Processing
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-0.5">{item.financialYear}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1 flex flex-wrap gap-x-3">
                        <span>PFMS Txn: {item.pfmsTransactionId}</span>
                        <span>Date: {item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <div className="text-lg font-bold text-slate-900 tabular-nums">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.dbtStatus}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
          Direct Benefit Transfer records are transmitted to the Public Financial Management System (PFMS) under Government of India DBT Mission.
        </div>
      </div>
    </div>
  );
};
