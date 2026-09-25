import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Layers, FileText, Sparkles, User, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, role } = useApp();

  if (role === 'admin') {
    return (
      <nav
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-30 bg-[#18191c] text-white rounded-full px-4 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-xl"
        aria-label="Admin Navigation"
      >
        <div className="flex items-center justify-around h-11">
          <button
            onClick={() => setActiveTab('admin_dashboard')}
            className={`p-2 rounded-full transition-all duration-200 ${
              activeTab === 'admin_dashboard'
                ? 'bg-[#5c67f2] text-white shadow-md scale-110'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Admin Dashboard"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('admin_applications')}
            className={`p-2 rounded-full transition-all duration-200 ${
              activeTab === 'admin_applications'
                ? 'bg-[#5c67f2] text-white shadow-md scale-110'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Applications Queue"
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('admin_verification')}
            className={`p-2 rounded-full transition-all duration-200 ${
              activeTab === 'admin_verification'
                ? 'bg-[#5c67f2] text-white shadow-md scale-110'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Verification Center"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`p-2 rounded-full transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-[#5c67f2] text-white shadow-md scale-110'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Profile Settings"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] max-w-[340px] z-30 bg-[#18191c] text-white rounded-full px-4 py-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/10 backdrop-blur-xl transition-all"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between h-11">
        {/* Tab 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`p-2 rounded-full transition-all duration-200 ${
            activeTab === 'home'
              ? 'bg-[#5c67f2] text-white shadow-md shadow-indigo-500/30 scale-110'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Home Dashboard"
        >
          <Home className="w-5 h-5" />
        </button>

        {/* Tab 2: Schemes */}
        <button
          onClick={() => setActiveTab('schemes')}
          className={`p-2 rounded-full transition-all duration-200 ${
            activeTab === 'schemes' || activeTab === 'tracking' || activeTab === 'deficiency'
              ? 'bg-[#5c67f2] text-white shadow-md shadow-indigo-500/30 scale-110'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Explore Schemes"
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Tab 3: Document Wallet */}
        <button
          onClick={() => setActiveTab('documents')}
          className={`p-2 rounded-full transition-all duration-200 ${
            activeTab === 'documents'
              ? 'bg-[#5c67f2] text-white shadow-md shadow-indigo-500/30 scale-110'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Document Wallet"
        >
          <FileText className="w-5 h-5" />
        </button>

        {/* Tab 4: JAGO AI */}
        <button
          onClick={() => setActiveTab('jago')}
          className={`relative p-2 rounded-full transition-all duration-200 ${
            activeTab === 'jago'
              ? 'bg-[#5c67f2] text-white shadow-md shadow-indigo-500/30 scale-110'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Ask JAGO AI"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          {activeTab !== 'jago' && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        {/* Tab 5: Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`p-2 rounded-full transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-[#5c67f2] text-white shadow-md shadow-indigo-500/30 scale-110'
              : 'text-slate-400 hover:text-white'
          }`}
          aria-label="Student Profile"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
