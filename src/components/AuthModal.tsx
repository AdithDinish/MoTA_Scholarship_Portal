import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  ArrowRight,
  RefreshCw,
  X,
  UserCheck,
  Building2,
  KeyRound,
  HelpCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { setRole, setActiveTab } = useApp();

  const [authMethod, setAuthMethod] = useState<'mobile' | 'email' | 'digilocker'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('98401 23456');
  const [emailAddress, setEmailAddress] = useState('ravi.kumar.st@mitindia.edu');
  const [otpVal, setOtpVal] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsOtpSent(true);
      setOtpVal('4829'); // Simulated OTP prefill
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setRole('student');
      setActiveTab('home');
      onClose();
    }, 600);
  };

  const handleQuickLoginAsStudent = () => {
    setRole('student');
    setActiveTab('home');
    onClose();
  };

  const handleQuickLoginAsOfficer = () => {
    setRole('admin');
    setActiveTab('admin_dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header (Prompt Section 5) */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-[#0f2e59] text-white flex items-center justify-center mx-auto mb-2 font-bold text-sm shadow-xs border border-blue-900">
            <span className="text-amber-400">मो</span>TA
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            MoTA Scholarship & Fellowship
          </h2>
          <p className="text-xs text-slate-500">
            One platform for ST scholarship and fellowship services
          </p>
        </div>

        {/* Quick Demo Pilot Accounts */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
            Quick 1-Click Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickLoginAsStudent}
              className="p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-500 text-left transition-colors flex items-center gap-2 group"
            >
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                  Ravi Kumar
                </div>
                <div className="text-[10px] text-slate-500">ST Student (PMS)</div>
              </div>
            </button>

            <button
              onClick={handleQuickLoginAsOfficer}
              className="p-2 bg-white rounded-lg border border-blue-200 hover:border-blue-500 text-left transition-colors flex items-center gap-2 group"
            >
              <Building2 className="w-4 h-4 text-blue-900 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                  Dr. K. Meena
                </div>
                <div className="text-[10px] text-slate-500">MoTA Officer</div>
              </div>
            </button>
          </div>
        </div>

        {/* Auth Method Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => {
              setAuthMethod('mobile');
              setIsOtpSent(false);
            }}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              authMethod === 'mobile' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile / OTP</span>
          </button>

          <button
            onClick={() => {
              setAuthMethod('email');
              setIsOtpSent(false);
            }}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              authMethod === 'email' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>

          <button
            onClick={() => {
              setAuthMethod('digilocker');
              setIsOtpSent(false);
            }}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1.5 ${
              authMethod === 'digilocker' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DigiLocker</span>
          </button>
        </div>

        {/* Form Body */}
        {authMethod === 'digilocker' ? (
          <div className="space-y-3 text-center py-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-semibold text-slate-800">
              DigiLocker Identity Integration
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Sign in using your DigiLocker verified mobile and 6-digit security PIN to automatically pull verified certificates.
            </p>
            <button
              onClick={handleQuickLoginAsStudent}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Authorize with DigiLocker (Demo)
            </button>
          </div>
        ) : !isOtpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {authMethod === 'mobile' ? 'Mobile Number (Aadhaar Seeded)' : 'Registered Email Address'}
              </label>
              <div className="relative">
                {authMethod === 'mobile' ? (
                  <>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full pl-11 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-blue-900 font-medium"
                    />
                  </>
                ) : (
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={e => setEmailAddress(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-blue-900 font-medium"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Requesting OTP...</span>
                </>
              ) : (
                <span>Login with OTP</span>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Enter 4-Digit OTP sent to {authMethod === 'mobile' ? `+91 ${mobileNumber}` : emailAddress}
              </label>
              <input
                type="text"
                maxLength={4}
                required
                value={otpVal}
                onChange={e => setOtpVal(e.target.value)}
                placeholder="4829"
                className="w-full text-center text-lg tracking-widest py-2 rounded-xl border border-slate-300 focus:outline-blue-900 font-bold text-blue-900"
              />
              <div className="text-[10px] text-slate-400 text-center mt-1">
                Simulated demo OTP is auto-filled (4829).
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Verify & Enter Dashboard</span>
              )}
            </button>
          </form>
        )}

        {/* Footer Links & Security Notice (Prompt Section 5) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              setRole('student');
              setActiveTab('onboarding');
              onClose();
            }}
            className="text-blue-900 font-bold hover:underline"
          >
            New Student? Register
          </button>

          <button
            onClick={() => {
              setRole('student');
              setActiveTab('jago');
              onClose();
            }}
            className="text-slate-500 hover:text-slate-800"
          >
            Need Help?
          </button>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <p>
            "Your information is protected using secure government-grade authentication mechanisms. (Demo Mode: No real Aadhaar or biometric data collected)."
          </p>
        </div>
      </div>
    </div>
  );
};
