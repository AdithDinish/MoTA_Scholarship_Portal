import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Layers, FileText, Sparkles, User, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, role } = useApp();

  // Admin Bottom Pill Navigation
  if (role === 'admin') {
    return (
      <nav
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xs w-[90%] bg-[#121318] text-white rounded-full px-4 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-800/80 backdrop-blur-xl"
        aria-label="Admin Navigation"
      >
        <div className="flex items-center justify-around h-12">
          <button
            onClick={() => setActiveTab('admin_dashboard')}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              activeTab === 'admin_dashboard'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Admin Dashboard"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('admin_applications')}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              activeTab === 'admin_applications'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Applications Queue"
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('admin_verification')}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              activeTab === 'admin_verification'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Verification Center"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Profile Settings"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
    );
  }

  // Student Floating Dark Pill Navigation
  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[92%] bg-[#121318] text-white rounded-full px-5 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-800/80 backdrop-blur-xl transition-all duration-300"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between h-12">
        {/* Tab 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`relative p-2.5 rounded-full transition-all duration-300 ${
            activeTab === 'home'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Home Dashboard"
        >
          <Home className="w-5 h-5" />
        </button>

        {/* Tab 2: Schemes */}
        <button
          onClick={() => setActiveTab('schemes')}
          className={`relative p-2.5 rounded-full transition-all duration-300 ${
            activeTab === 'schemes' || activeTab === 'tracking' || activeTab === 'deficiency'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Explore Schemes"
        >
          <Layers className="w-5 h-5" />
        </button>

        {/* Tab 3: Document Wallet */}
        <button
          onClick={() => setActiveTab('documents')}
          className={`relative p-2.5 rounded-full transition-all duration-300 ${
            activeTab === 'documents'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Document Wallet"
        >
          <FileText className="w-5 h-5" />
        </button>

        {/* Tab 4: JAGO AI Assistant */}
        <button
          onClick={() => setActiveTab('jago')}
          className={`relative p-2.5 rounded-full transition-all duration-300 ${
            activeTab === 'jago'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Ask JAGO AI"
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'jago' ? 'text-amber-300' : 'text-slate-400'}`} />
          {activeTab !== 'jago' && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-[#121318]" />
          )}
        </button>

        {/* Tab 5: Profile / Settings */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`relative p-2.5 rounded-full transition-all duration-300 ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-110'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Student Profile"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
