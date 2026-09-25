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
      <span className="text-xs font-bold text-slate-700">Loading module...</span>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { role, activeTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  // If viewing landing page
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
              ← Back to Student App
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
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      {/* Mobile App Top Header */}
      <Header />

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-2 pb-24">
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

      {/* Floating Dark Pill Bottom Navigation */}
      <BottomNav />

      {/* Floating Tour Switcher */}
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
