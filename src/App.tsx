import React, { useState, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DemoTourBar } from './components/DemoTourBar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';

// Lazy-loaded views for performance
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
    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-[24px] border border-stone-200/80 shadow-2xs">
      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      <span className="text-xs font-bold text-slate-700">Loading...</span>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { role, activeTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  // If viewing public landing page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-28">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowLanding(false)}
              className="text-xs font-extrabold text-indigo-900 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs hover:bg-stone-50"
            >
              ← Back to Mobile App
            </button>
          </div>
          <LandingPage onOpenLogin={() => setShowAuthModal(true)} />
        </main>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <DemoTourBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#eee7de] sm:bg-[#e7dfd4] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden select-none font-sans">
      {/* Authentic Mobile App Phone Frame */}
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[844px] sm:max-h-[94vh] bg-[#faf9f6] sm:rounded-[52px] sm:border-[10px] sm:border-[#1a1b20] sm:shadow-[0_28px_80px_rgba(0,0,0,0.28),0_10px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden relative">
        {/* Top Speaker / Dynamic Island on Phone */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-[#faf9f6] shrink-0 z-30">
          <div className="w-24 h-4 bg-[#1a1b20] rounded-full flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-[#2a2c35]" />
          </div>
        </div>

        {/* Mobile App Header */}
        <Header />

        {/* Mobile Content Viewport with smooth scroll & no scrollbar */}
        <main className="flex-1 overflow-y-auto no-scrollbar px-4 pt-1 pb-24">
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

        {/* Floating Dark Pill Navigation Bar Anchored Inside Phone */}
        <BottomNav />
      </div>

      {/* Floating Demo Tour Bar */}
      <DemoTourBar />

      {/* Auth Modal */}
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
