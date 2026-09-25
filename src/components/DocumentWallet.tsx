import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentItem } from '../types';
import {
  FileText,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Plus,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  X
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
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);

  // New Upload Form State
  const [uploadDocName, setUploadDocName] = useState('');
  const [uploadCategory, setUploadCategory] = useState<DocumentItem['category']>('Education');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [
    'All',
    'Identity',
    'Community',
    'Education',
    'Income',
    'Domicile',
    'Disability',
    'Bank',
    'Other'
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.certificateNumber && doc.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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

  return (
    <div className="space-y-6 pb-20 lg:pb-10">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Digital Locker & Wallet
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
                Single Repository
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              My Documents
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              All academic, caste, and income credentials verified across DigiLocker and state e-District registries.
              Re-use across all 5 MoTA schemes without re-uploading.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowDigiLockerModal(true)}
              className="px-3.5 py-2 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get from DigiLocker</span>
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents or IDs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-blue-900"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map(doc => {
          const isVerified = doc.status === 'verified';
          const isActionReq = doc.status === 'action_required';

          return (
            <div
              key={doc.id}
              className={`bg-white rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                isActionReq
                  ? 'border-amber-300 ring-1 ring-amber-100 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{doc.fileSize}</span>
                  </div>

                  {isVerified ? (
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  ) : isActionReq ? (
                    <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Action Required
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Pending
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mt-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isVerified
                        ? 'bg-blue-50 text-blue-900'
                        : isActionReq
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{doc.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doc.source}</p>
                  </div>
                </div>

                {/* Details snippet */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  {doc.certificateNumber && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ref / Cert No:</span>
                      <span className="font-mono font-medium text-slate-800 truncate max-w-[150px]">
                        {doc.certificateNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Verified:</span>
                    <span className="text-slate-700">{doc.dateVerified}</span>
                  </div>
                  {doc.deficiencyReason && (
                    <div className="pt-1 border-t border-amber-200 text-amber-900 font-medium">
                      ⚠ {doc.deficiencyReason}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setViewingDoc(doc)}
                  className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                {isActionReq ? (
                  <button
                    onClick={() => setActiveTab('deficiency')}
                    className="px-3 py-1 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
                  >
                    Replace Document
                  </button>
                ) : (
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Details
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DIGILOCKER MOCK SYNC MODAL */}
      {showDigiLockerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                  DL
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Fetch from DigiLocker</h3>
                  <p className="text-[11px] text-slate-500">Authorized Government Identity Sync</p>
                </div>
              </div>
              <button
                onClick={() => setShowDigiLockerModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0" />
              <span>Simulated DigiLocker API OAuth 2.0 session active for Aadhaar XXXX-4192.</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-700">Available Verified Certificates:</div>

              <div
                onClick={() => handleDigiLockerPull('CBSE Class X Passing Certificate')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center justify-between transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">CBSE Class X Passing Certificate</div>
                  <div className="text-[10px] text-slate-500">Central Board of Secondary Education · 2020</div>
                </div>
                <span className="text-xs font-bold text-blue-900">+ Pull</span>
              </div>

              <div
                onClick={() => handleDigiLockerPull('National Health ID (ABHA) Card')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center justify-between transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">National Health ID (ABHA) Card</div>
                  <div className="text-[10px] text-slate-500">National Health Authority · Ayushman Bharat</div>
                </div>
                <span className="text-xs font-bold text-blue-900">+ Pull</span>
              </div>

              <div
                onClick={() => handleDigiLockerPull('Tamil Nadu Disability Certificate (UDID)')}
                className="p-3 border border-slate-200 hover:border-blue-500 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center justify-between transition-all"
              >
                <div>
                  <div className="font-bold text-slate-900">UDID Disability Card (if applicable)</div>
                  <div className="text-[10px] text-slate-500">Dept of Empowerment of Persons with Disabilities</div>
                </div>
                <span className="text-xs font-bold text-blue-900">+ Pull</span>
              </div>
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-400">
              Certificates retrieved via DigiLocker bear authorized digital signatures under IT Act 2000.
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-bold text-slate-900">Upload New Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Current Semester College Fee Receipt"
                  value={uploadDocName}
                  onChange={e => setUploadDocName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={uploadCategory}
                  onChange={e => setUploadCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white"
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
                <label className="block font-semibold text-slate-700 mb-1">File Attachment (PDF / JPG / PNG max 5MB)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-slate-600 font-medium">Click to select or drag document here</span>
                  <div className="text-[10px] text-slate-400 mt-1">Simulated instant OCR verification</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl"
                >
                  Upload & Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{viewingDoc.name}</h3>
                  <div className="text-xs text-slate-500">{viewingDoc.fileName}</div>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Details Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Source:</span>
                <span className="font-semibold text-slate-900">{viewingDoc.source}</span>
              </div>
              {viewingDoc.certificateNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate ID:</span>
                  <span className="font-mono text-slate-900">{viewingDoc.certificateNumber}</span>
                </div>
              )}
              {viewingDoc.issueAuthority && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Issuing Authority:</span>
                  <span className="text-slate-900">{viewingDoc.issueAuthority}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Status:</span>
                <span className="font-bold text-emerald-700 capitalize">{viewingDoc.status}</span>
              </div>
            </div>

            {/* Simulated Document Preview Container */}
            <div className="h-44 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center p-4">
              <FileCheck className="w-10 h-10 text-blue-900/60 mb-2" />
              <div className="text-xs font-semibold text-slate-800">
                Authorized Digital Copy ({viewDocType(viewingDoc)})
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Digitally signed and sealed under Government of India Information Technology Act.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Demo action: Simulated PDF download.');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified PDF</span>
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
