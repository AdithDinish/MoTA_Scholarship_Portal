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
  const { payments, student, application, setActiveTab } = useApp();

  const totalSanctioned = 45000;
  const totalDisbursed = 25000;
  const pendingAmount = 20000;

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
        <span className="text-xs font-bold text-slate-500">DBT Payments</span>
        <div className="w-12" />
      </div>

      {/* Header Card */}
      <div className="bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] text-white rounded-[32px] p-5 shadow-xl shadow-emerald-600/15">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-emerald-100 uppercase tracking-wider text-[10px]">
            Direct Benefit Transfer
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            PFMS Verified ✓
          </span>
        </div>

        <div className="text-xs text-emerald-100 font-medium">Total Disbursed</div>
        <div className="text-3xl font-black text-white tracking-tight mt-0.5">
          ₹{totalDisbursed.toLocaleString('en-IN')}
        </div>
        <p className="text-[11px] text-emerald-100/90 mt-1">
          Directly credited to Aadhaar-seeded SBI account
        </p>
      </div>

      {/* 2 Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-[26px] bg-[#fff2e8] border border-orange-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 block font-medium">Sanctioned</span>
          <div className="text-xl font-black text-slate-900 tabular-nums mt-0.5">
            ₹{totalSanctioned.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-4 rounded-[26px] bg-[#eef1ff] border border-indigo-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 block font-medium">Pending Release</span>
          <div className="text-xl font-black text-slate-900 tabular-nums mt-0.5">
            ₹{pendingAmount.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Linked Bank Account Details (NPCI Aadhaar Bridge) */}
      <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                DBT Bank Account
              </h2>
              <span className="text-[10px] text-slate-400">Direct Benefit Transfer</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            NPCI Seeded
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 p-3 bg-slate-50/70 rounded-[20px] border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Bank</span>
            <span className="font-bold text-slate-800 text-[11px] truncate block">{student.bankName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Account</span>
            <span className="font-mono font-bold text-slate-800 text-[11px]">{student.accountNumberMasked}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">IFSC</span>
            <span className="font-mono font-bold text-slate-800 text-[11px]">{student.ifscCode}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Mapping</span>
            <span className="font-bold text-emerald-700 text-[11px]">Active (PFMS)</span>
          </div>
        </div>
      </div>

      {/* Payment History List */}
      <div className="bg-white rounded-[28px] p-4.5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Disbursement History
          </h2>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {payments.length} Records
          </span>
        </div>

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
