import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentItem } from '../types';
import {
  FileText,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Upload,
  Plus,
  ShieldCheck,
  Search,
  Eye,
  X,
  Copy,
  Check,
  GraduationCap,
  Landmark,
  Award,
  Fingerprint,
  Building,
  Sparkles,
  ArrowRight,
  Shield,
  FileCode,
  ExternalLink
} from 'lucide-react';

export const DocumentWallet: React.FC = () => {
  const {
    documents,
    uploadNewDocument,
    importDigiLockerDoc,
    setActiveTab
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'action_required'>('all');
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Upload Form State
  const [uploadDocName, setUploadDocName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<DocumentItem['category']>('Education');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [
    'All',
    'Community',
    'Income',
    'Education',
    'Identity',
    'Domicile',
    'Bank',
    'Other'
  ];

  // Filter calculation
  const filteredDocs = documents.filter(doc => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'verified' && doc.status === 'verified') ||
      (statusFilter === 'action_required' && doc.status === 'action_required');
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.certificateNumber && doc.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const actionReqCount = documents.filter(d => d.status === 'action_required').length;

  const handleCopyCert = (certNo: string, docId: string) => {
    if (!certNo) return;
    navigator.clipboard?.writeText?.(certNo);
    setCopiedId(docId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadDocName.trim()) return;
    uploadNewDocument(uploadCategory, uploadDocName, selectedFile);
    setShowUploadModal(false);
    setUploadDocName('');
    setSelectedFile(null);
  };

  const handleDigiLockerPull = (docName: string) => {
    importDigiLockerDoc(docName);
    setShowDigiLockerModal(false);
  };

  const getCategoryIcon = (cat: DocumentItem['category']) => {
    switch (cat) {
      case 'Community':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'Income':
        return <Landmark className="w-4 h-4 text-amber-600" />;
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'Identity':
        return <Fingerprint className="w-4 h-4 text-emerald-600" />;
      case 'Domicile':
        return <Building className="w-4 h-4 text-indigo-600" />;
      case 'Bank':
        return <Landmark className="w-4 h-4 text-teal-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getCategoryTheme = (cat: DocumentItem['category']) => {
    switch (cat) {
      case 'Community':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200/60',
          iconBg: 'bg-purple-100/70 text-purple-700'
        };
      case 'Income':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-800',
          border: 'border-amber-200/60',
          iconBg: 'bg-amber-100/80 text-amber-800'
        };
      case 'Education':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200/60',
          iconBg: 'bg-blue-100/70 text-blue-700'
        };
      case 'Identity':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200/60',
          iconBg: 'bg-emerald-100/70 text-emerald-700'
        };
      case 'Domicile':
        return {
          bg: 'bg-indigo-50',
          text: 'text-indigo-700',
          border: 'border-indigo-200/60',
          iconBg: 'bg-indigo-100/70 text-indigo-700'
        };
      case 'Bank':
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          border: 'border-teal-200/60',
          iconBg: 'bg-teal-100/70 text-teal-700'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200/60',
          iconBg: 'bg-slate-100 text-slate-700'
        };
    }
  };

  return (
    <div className="space-y-4 max-w-full mx-auto pb-24">
      {/* 1. Sleek Top Header Card with clear breathing room */}
      <div className="bg-gradient-to-br from-[#0f2e59] via-[#1a3d6f] to-[#122442] text-white rounded-[28px] p-4.5 shadow-lg shadow-blue-950/15 relative overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2.5">
            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-bold text-white/90 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-colors flex items-center gap-1 active:scale-95"
            >
              ← Back
            </button>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DigiLocker Active</span>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Document Wallet</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-xs text-blue-100/85 font-normal leading-relaxed">
              Pre-verified digital credentials automatically linked to your ST scholarship applications.
            </p>
          </div>

          {/* Key Stat Badges Row */}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/10 text-xs">
            <div className="flex-1 bg-white/10 rounded-xl px-2.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] text-blue-200">Verified</span>
              <span className="font-extrabold text-white text-xs">{verifiedCount} of {documents.length}</span>
            </div>

            {actionReqCount > 0 ? (
              <button
                onClick={() => setStatusFilter(statusFilter === 'action_required' ? 'all' : 'action_required')}
                className={`flex-1 rounded-xl px-2.5 py-1.5 flex items-center justify-between transition-colors ${
                  statusFilter === 'action_required'
                    ? 'bg-amber-400 text-amber-950 font-bold'
                    : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                }`}
              >
                <span className="text-[11px]">Action Req</span>
                <span className="font-extrabold text-xs">{actionReqCount}</span>
              </button>
            ) : (
              <div className="flex-1 bg-emerald-500/20 text-emerald-200 rounded-xl px-2.5 py-1.5 flex items-center justify-between">
                <span className="text-[11px]">All Clear</span>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setShowDigiLockerModal(true)}
              className="py-2 px-3 rounded-full bg-white text-[#0f2e59] font-bold text-xs shadow-sm hover:bg-blue-50 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#0f2e59]" />
              <span>DigiLocker Pull</span>
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="py-2 px-3 rounded-full bg-[#18191c] text-white font-bold text-xs shadow-sm hover:bg-black active:scale-98 transition-all flex items-center justify-center gap-1.5 border border-white/10"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload New</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, cert no, or issuer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-0.5">
          {categories.map(cat => {
            const count = cat === 'All' ? documents.length : documents.filter(d => d.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#18191c] text-white shadow-xs scale-102'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Single Column Document Cards: Uncrammed, Spaced, Highly Readable */}
      <div className="flex flex-col gap-3.5">
        {filteredDocs.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 text-center border border-slate-200/80 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">No documents found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try changing your search query or switching categories.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="text-xs font-bold text-[#0f2e59] bg-blue-50 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDocs.map(doc => {
            const isVerified = doc.status === 'verified';
            const isActionReq = doc.status === 'action_required';
            const theme = getCategoryTheme(doc.category);
            const isCopied = copiedId === doc.id;

            return (
              <div
                key={doc.id}
                className={`bg-white rounded-[24px] p-4 border transition-all ${
                  isActionReq
                    ? 'border-amber-300 ring-1 ring-amber-200 shadow-sm bg-amber-50/15'
                    : 'border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Header Row: Category Badge & Status Badge */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${theme.bg} ${theme.text} ${theme.border}`}
                    >
                      {getCategoryIcon(doc.category)}
                      <span>{doc.category}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {doc.fileSize}
                    </span>
                  </div>

                  {isVerified ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : isActionReq ? (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Action Required</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Pending</span>
                    </span>
                  )}
                </div>

                {/* Main Identity Row: Icon + Title + Issuer */}
                <div className="flex items-start gap-3 mt-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${theme.iconBg}`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {doc.source}
                    </p>
                  </div>
                </div>

                {/* Metadata Details Box: Clean Key-Value Strip */}
                <div className="mt-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  {doc.certificateNumber && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 text-[11px]">Cert / Ref No:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-slate-800 text-[11px] select-all">
                          {doc.certificateNumber}
                        </span>
                        <button
                          onClick={() => handleCopyCert(doc.certificateNumber || '', doc.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          title="Copy Certificate Number"
                          aria-label="Copy Certificate Number"
                        >
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Verified Date:</span>
                    <span className="font-medium text-slate-700">{doc.dateVerified}</span>
                  </div>

                  {doc.issueAuthority && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Issuing Authority:</span>
                      <span className="text-slate-700 font-medium truncate max-w-[190px]">
                        {doc.issueAuthority}
                      </span>
                    </div>
                  )}

                  {/* Deficiency Alert Banner with direct CTA */}
                  {doc.deficiencyReason && (
                    <div className="pt-2 mt-1 border-t border-amber-200">
                      <div className="flex items-start gap-1.5 text-[11px] text-amber-900 leading-snug font-medium bg-amber-100/60 p-2 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{doc.deficiencyReason}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="text-xs font-bold text-[#0f2e59] hover:text-blue-900 bg-blue-50/70 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  {isActionReq ? (
                    <button
                      onClick={() => setActiveTab('deficiency')}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-full shadow-xs transition-all flex items-center gap-1"
                    >
                      <span>Fix in Tracker</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setViewingDoc(doc);
                      }}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. DIGILOCKER MOCK SYNC MODAL */}
      {showDigiLockerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0f2e59] text-white flex items-center justify-center font-black text-xs tracking-wider">
                  DL
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">DigiLocker Sync</h3>
                  <p className="text-[11px] text-slate-500">Government of India Identity Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setShowDigiLockerModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="leading-snug">
                DigiLocker OAuth 2.0 active for Aadhaar <strong className="font-mono">•••• 4192</strong>.
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-700 text-xs">Available Verified Certificates:</div>

              <div
                onClick={() => handleDigiLockerPull('CBSE Class X Passing Certificate')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-2xl cursor-pointer hover:bg-blue-50/50 flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0f2e59]">
                    CBSE Class X Certificate
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Central Board of Secondary Education · 2020
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  + Pull
                </span>
              </div>

              <div
                onClick={() => handleDigiLockerPull('National Health ID (ABHA) Card')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-2xl cursor-pointer hover:bg-blue-50/50 flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0f2e59]">
                    National Health ID (ABHA)
                  </div>
                  <div className="text-[10px] text-slate-500">
                    National Health Authority · Ayushman Bharat
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  + Pull
                </span>
              </div>

              <div
                onClick={() => handleDigiLockerPull('Tamil Nadu Disability Certificate (UDID)')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-2xl cursor-pointer hover:bg-blue-50/50 flex items-center justify-between transition-all group"
              >
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-[#0f2e59]">
                    UDID Disability Card
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Dept of Empowerment of PwD
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  + Pull
                </span>
              </div>
            </div>

            <div className="pt-1 text-center text-[10px] text-slate-400">
              Certificates retrieved via DigiLocker bear valid digital signatures under the IT Act 2000.
            </div>
          </div>
        </div>
      )}

      {/* 5. UPLOAD DOCUMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Upload className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Upload Document</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Current Semester College Fee Receipt"
                  value={uploadDocName}
                  onChange={e => setUploadDocName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#0f2e59] bg-white font-medium text-slate-800"
                >
                  <option value="Education">Education</option>
                  <option value="Community">Community</option>
                  <option value="Income">Income</option>
                  <option value="Domicile">Domicile</option>
                  <option value="Identity">Identity</option>
                  <option value="Bank">Bank</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Attachment (PDF / JPG / PNG max 5MB)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-slate-700 font-semibold text-xs block">
                    Choose file or drag here
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    OCR validation runs automatically upon upload
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3.5 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-full text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-[#0f2e59] hover:bg-blue-900 rounded-full text-xs shadow-xs"
                >
                  Upload & Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DOCUMENT PREVIEW MODAL */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#0f2e59] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {viewingDoc.name}
                  </h3>
                  <div className="text-[11px] text-slate-500">{viewingDoc.fileName}</div>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Details Card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="font-semibold text-slate-900 text-right">{viewingDoc.source}</span>
              </div>
              {viewingDoc.certificateNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate ID:</span>
                  <span className="font-mono text-slate-900 font-semibold">{viewingDoc.certificateNumber}</span>
                </div>
              )}
              {viewingDoc.issueAuthority && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Issuing Authority:</span>
                  <span className="text-slate-900 font-medium text-right">{viewingDoc.issueAuthority}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <span className={`font-bold capitalize ${
                  viewingDoc.status === 'verified' ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  {viewingDoc.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Simulated Verified Document Preview Box */}
            <div className="h-40 bg-gradient-to-b from-slate-100 to-slate-200/60 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              {/* Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none font-black text-6xl tracking-widest text-slate-900 select-none">
                MOTA
              </div>
              <FileCheck className="w-9 h-9 text-[#0f2e59] mb-2" />
              <div className="text-xs font-bold text-slate-800">
                Official Digital Record ({viewDocType(viewingDoc)})
              </div>
              <div className="text-[10px] text-slate-500 mt-1 max-w-[220px]">
                Cryptographically validated under Ministry of Tribal Affairs DigiLocker Framework
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setViewingDoc(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading authorized PDF for ${viewingDoc.name}`);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0f2e59] hover:bg-blue-900 rounded-full flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function viewDocType(doc: DocumentItem): string {
  if (doc.category === 'Community') return 'Scheduled Tribe Certificate';
  if (doc.category === 'Income') return 'Revenue Income Assessment';
  return 'Accredited Academic Record';
}
