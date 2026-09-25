import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CreditCard,
  MessageSquare,
  Building2,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';

export const DemoTourBar: React.FC = () => {
  const { triggerScenario, application, role } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const scenarios = [
    {
      id: 'dashboard',
      label: "1. Ravi's Dashboard",
      subtitle: '92% Profile, Income Alert, ₹45k Sanctioned',
      icon: CheckCircle2,
      active: true
    },
    {
      id: 'deficiency',
      label: '2. Resolve Deficiency',
      subtitle: 'Fix Income Cert QR Mismatch with 1 click',
      icon: AlertTriangle,
      badge: application.actionRequired ? 'Action Req' : 'Resolved'
    },
    {
      id: 'tracking',
      label: '3. Application Tracker',
      subtitle: 'Timeline: MOTA-PMS-2026-001245',
      icon: FileText
    },
    {
      id: 'documents',
      label: '4. Document Wallet',
      subtitle: '8 Verified, DigiLocker pull & re-use',
      icon: Layers
    },
    {
      id: 'payments',
      label: '5. DBT / PFMS Payments',
      subtitle: '₹25,000 Disbursed, ₹20,000 Processing',
      icon: CreditCard
    },
    {
      id: 'schemes',
      label: '6. 5 MoTA Schemes',
      subtitle: 'Pre/Post-Matric, Top Class, NFST, NOS',
      icon: Layers
    },
    {
      id: 'eligibility',
      label: '7. Eligibility Checker',
      subtitle: 'Interactive rule evaluator',
      icon: Compass
    },
    {
      id: 'apply',
      label: '8. Unified 9-Step Apply',
      subtitle: 'Reusable verified data pre-filled',
      icon: FileText
    },
    {
      id: 'family',
      label: '9. Family Overview',
      subtitle: 'Guardian + multi-scheme children',
      icon: Users
    },
    {
      id: 'jago',
      label: '10. Chat with JAGO',
      subtitle: 'Contextual AI assistance in EN/HI/TA',
      icon: Sparkles
    },
    {
      id: 'admin',
      label: '11. MoTA Officer Console',
      subtitle: 'Review queue, coverage gap map, KPIs',
      icon: Building2
    }
  ];

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 z-40">
      <div className="bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700/80 overflow-hidden max-w-xs transition-all">
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500 text-amber-950 flex items-center justify-center font-bold text-xs">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">DEMO WALKTHROUGH</div>
              <div className="text-[10px] text-slate-300">
                {role === 'student' ? 'Student Journey Steps' : 'Officer Administration'}
              </div>
            </div>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800 text-xs bg-slate-950">
            <div className="px-2 py-1.5 text-[10px] text-slate-400 uppercase font-semibold">
              Click any scenario to jump:
            </div>
            {scenarios.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    triggerScenario(s.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 hover:bg-slate-800/90 rounded-lg transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-amber-300">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {s.subtitle}
                      </div>
                    </div>
                  </div>
                  {s.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                        s.badge === 'Action Req'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {s.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
