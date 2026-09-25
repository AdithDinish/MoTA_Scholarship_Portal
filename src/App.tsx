import React, { useState, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DemoTourBar } from './components/DemoTourBar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';

// Lazy-loaded views for code splitting & bundle performance
const StudentDashboard = lazy(() => import('./components/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const SchemesExplorer = lazy(() => import('./components/SchemesExplorer').then(m => ({ default: m.SchemesExplorer })));
const EligibilityChecker = lazy(() => import('./components/EligibilityChecker').then(m => ({ default: m.EligibilityChecker })));
const ApplicationForm = lazy(() => import('./components/ApplicationForm').then(m => ({ default: m.ApplicationForm })));
const DocumentWallet = lazy(() => import('./components/DocumentWallet').then(m => ({ default: m.DocumentWallet })));
const VerificationCenter = lazy(() => import('./components/VerificationCenter').then(m => ({ default: m.VerificationCenter })));
const ApplicationTracker = lazy(() => import('./components/ApplicationTracker').then(m => ({ default: m.ApplicationTracker })));
const DeficiencyManager = lazy(() => import('./components/DeficiencyManager').then(m => ({ default: m.DeficiencyManager })));
const PaymentDashboard = lazy(() => import('./components/PaymentDashboard').then(m => ({ default: m.PaymentDashboard })));
const FamilyView = lazy(() => import('./components/FamilyView').then(m => ({ default: m.FamilyView })));
const OverviewMatrix = lazy(() => import('./components/OverviewMatrix').then(m => ({ default: m.OverviewMatrix })));
const NotificationCenter = lazy(() => import('./components/NotificationCenter').then(m => ({ default: m.NotificationCenter })));
const JagoChatbot = lazy(() => import('./components/JagoChatbot').then(m => ({ default: m.JagoChatbot })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const OnboardingFlow = lazy(() => import('./components/OnboardingFlow').then(m => ({ default: m.OnboardingFlow })));
const StudentProfileView = lazy(() => import('./components/StudentProfileView').then(m => ({ default: m.StudentProfileView })));

const ViewFallback: React.FC = () => (
  <div className="flex items-center justify-center p-12 text-slate-500">
    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
      <div className="w-4 h-4 rounded-full border-2 border-blue-900 border-t-transparent animate-spin" />
      <span className="text-xs font-semibold text-slate-700">Loading module...</span>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { role, activeTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);

  // If viewing landing page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4">
        <div className="w-full max-w-7xl bg-slate-50 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-24">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowLanding(false)}
                className="text-xs font-semibold text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                ← Back to Student App
              </button>
            </div>
            <LandingPage onOpenLogin={() => setShowAuthModal(true)} />
          </main>
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
          <DemoTourBar />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 sm:bg-slate-950 flex flex-col items-center justify-start text-slate-900 font-sans selection:bg-blue-900 selection:text-white">
      {/* Desktop Viewport Controller Bar */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-5xl px-6 py-2.5 bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">MoTA ST Mobile App Shell</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Mobile-first Progressive Portal for ST Students & Scholars</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400">Display Layout:</span>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !isPhoneFrame
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📱 Mobile Web (Full Width)
          </button>
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isPhoneFrame
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📲 Phone Device Frame
          </button>
        </div>
      </div>

      {/* Main App Container (Adaptive Device Mockup or Mobile App Canvas) */}
      <div
        className={`w-full bg-slate-50 transition-all duration-300 flex flex-col relative ${
          isPhoneFrame
            ? 'max-w-[440px] my-6 rounded-[48px] border-[12px] border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden min-h-[880px]'
            : 'max-w-md sm:max-w-2xl lg:max-w-4xl min-h-screen shadow-2xl'
        }`}
      >
        {/* Mobile App Header */}
        <Header />

        {/* Main App Content Viewport */}
        <main className="flex-1 w-full mx-auto px-3.5 sm:px-5 py-4 pb-28">
          {/* Top Demo Context Banner */}
          <div className="mb-4 flex items-center justify-between gap-2 p-2.5 bg-blue-50/90 border border-blue-200 rounded-2xl text-xs text-blue-950 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-bold">MoTA ST Mobile App:</span>
              <span className="text-slate-600 hidden xs:inline">
                Single-window ST Portal
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowLanding(true)}
                className="font-bold text-blue-900 hover:underline min-h-[32px] flex items-center px-1"
              >
                Public Site
              </button>
            </div>
          </div>

          {/* Dynamic Route View with Suspense */}
          <Suspense fallback={<ViewFallback />}>
            {role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <>
                {activeTab === 'home' && <StudentDashboard />}
                {activeTab === 'schemes' && <SchemesExplorer />}
                {activeTab === 'eligibility' && <EligibilityChecker />}
                {activeTab === 'apply' && <ApplicationForm />}
                {activeTab === 'documents' && <DocumentWallet />}
                {activeTab === 'verification' && <VerificationCenter />}
                {activeTab === 'tracking' && <ApplicationTracker />}
                {activeTab === 'deficiency' && <DeficiencyManager />}
                {activeTab === 'payments' && <PaymentDashboard />}
                {activeTab === 'family' && <FamilyView />}
                {activeTab === 'overview' && <OverviewMatrix />}
                {activeTab === 'notifications' && <NotificationCenter />}
                {activeTab === 'jago' && <JagoChatbot />}
                {activeTab === 'profile' && <StudentProfileView />}
                {activeTab === 'onboarding' && <OnboardingFlow />}
              </>
            )}
          </Suspense>
        </main>

        {/* Mobile App Bottom Navigation Bar */}
        <BottomNav />
      </div>

      {/* Floating Walkthrough Switcher */}
      <DemoTourBar />

      {/* Auth / Login Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
