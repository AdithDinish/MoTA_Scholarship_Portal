import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Layers, FileText, IndianRupee, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, role } = useApp();

  // If in admin role, bottom nav provides admin quick links
  if (role === 'admin') {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        aria-label="Mobile Admin Navigation"
      >
        <div className="grid grid-cols-4 items-center h-16">
          <button
            onClick={() => setActiveTab('admin_dashboard')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'admin_dashboard' ? 'text-blue-900 font-bold' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('admin_applications')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'admin_applications' ? 'text-blue-900 font-bold' : 'text-slate-500'
            }`}
          >
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Applications</span>
          </button>

          <button
            onClick={() => setActiveTab('admin_verification')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'admin_verification' ? 'text-blue-900 font-bold' : 'text-slate-500'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Verify Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('admin_coverage')}
            className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
              activeTab === 'admin_coverage' ? 'text-blue-900 font-bold' : 'text-slate-500'
            }`}
          >
            <IndianRupee className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Coverage</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center h-16">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'home' ? 'text-[#0f2e59] font-bold' : 'text-slate-500'
          }`}
          aria-label="Home Dashboard"
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'text-[#0f2e59]' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'schemes' || activeTab === 'tracking' || activeTab === 'deficiency'
              ? 'text-[#0f2e59] font-bold'
              : 'text-slate-500'
          }`}
          aria-label="Schemes and Applications"
        >
          <Layers
            className={`w-5 h-5 mb-0.5 ${
              activeTab === 'schemes' || activeTab === 'tracking' || activeTab === 'deficiency'
                ? 'text-[#0f2e59]'
                : 'text-slate-400'
            }`}
          />
          <span className="text-[10px] tracking-tight">Schemes</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'documents' ? 'text-[#0f2e59] font-bold' : 'text-slate-500'
          }`}
          aria-label="Digital Documents"
        >
          <FileText className={`w-5 h-5 mb-0.5 ${activeTab === 'documents' ? 'text-[#0f2e59]' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'payments' ? 'text-[#0f2e59] font-bold' : 'text-slate-500'
          }`}
          aria-label="DBT Payments"
        >
          <IndianRupee className={`w-5 h-5 mb-0.5 ${activeTab === 'payments' ? 'text-[#0f2e59]' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">Payments</span>
        </button>

        <button
          onClick={() => setActiveTab('jago')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'jago' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
          aria-label="JAGO AI Assistant"
        >
          <div className="relative">
            <Sparkles className={`w-5 h-5 mb-0.5 ${activeTab === 'jago' ? 'text-amber-500' : 'text-amber-600'}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          </div>
          <span className="text-[10px] tracking-tight">JAGO</span>
        </button>
      </div>
    </nav>
  );
};
