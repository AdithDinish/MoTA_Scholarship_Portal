import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  STATE_COVERAGE_INSIGHTS,
  CONNECTED_SYSTEMS
} from '../data/mockData';
import { AdminApplicationRecord } from '../types';
import {
  Building2,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Database,
  Layers,
  MapPin,
  RefreshCw,
  ExternalLink,
  Lock,
  Eye,
  X,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminApplications,
    adminUpdateStatus,
    activeTab,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterScheme, setFilterScheme] = useState('all');
  const [selectedApp, setSelectedApp] = useState<AdminApplicationRecord | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'applications' | 'verification' | 'coverage' | 'integrations' | 'architecture' | 'security'>('overview');

  const filteredApps = adminApplications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScheme = filterScheme === 'all' || app.schemeId === filterScheme;
    return matchesSearch && matchesScheme;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-7xl mx-auto">
      {/* Officer Identification Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/src/assets/images/officer_avatar_meena_1790316169327.jpg"
            alt="Dr. K. Meena"
            className="w-13 h-13 rounded-full object-cover border-2 border-blue-900 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                MoTA Scholarship Administration
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                National Officer Console
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Logged in as: <strong>Dr. K. Meena</strong> · Verification & Scrutiny Directorate, Ministry of Tribal Affairs
            </div>
          </div>
        </div>

        {/* Administration Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto scrollbar-none text-xs self-start sm:self-center">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'overview' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KPIs & Analytics
          </button>
          <button
            onClick={() => setActiveSubTab('applications')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'applications' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Applications ({adminApplications.length})
          </button>
          <button
            onClick={() => setActiveSubTab('verification')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'verification' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verification Queue
          </button>
          <button
            onClick={() => setActiveSubTab('coverage')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'coverage' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Coverage Gaps
          </button>
          <button
            onClick={() => setActiveSubTab('integrations')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'integrations' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Connected Portals
          </button>
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeSubTab === 'architecture' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Architecture
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: OVERVIEW & KPIS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards (Prompt Section 21) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total Applications
              </span>
              <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">125,430</div>
              <span className="text-[10px] text-emerald-600 font-medium">↑ 14% vs last year</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                Under Verification
              </span>
              <div className="text-2xl font-bold text-amber-700 tabular-nums mt-1">18,240</div>
              <span className="text-[10px] text-slate-400">Institutional & Ministry</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
                Pending Documents
              </span>
              <div className="text-2xl font-bold text-rose-700 tabular-nums mt-1">7,820</div>
              <span className="text-[10px] text-slate-400">Deficiency flagged</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                Sanctioned
              </span>
              <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">95,240</div>
              <span className="text-[10px] text-slate-400">Ready for APBS</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 col-span-2 md:col-span-1">
              <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block">
                Payments Processing
              </span>
              <div className="text-2xl font-bold text-blue-900 tabular-nums mt-1">4,320</div>
              <span className="text-[10px] text-slate-400">Queued in PFMS</span>
            </div>
          </div>

          {/* Scheme Breakdown & Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Applications by Scheme */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Applications by Scheme (Current Cycle)
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Post-Matric Scholarship (PMS-ST)</span>
                    <span className="font-bold text-slate-900">78,410 (62.5%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 rounded-full" style={{ width: '62.5%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Pre-Matric Scholarship (ST)</span>
                    <span className="font-bold text-slate-900">38,200 (30.4%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '30.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">Top Class Education Scheme</span>
                    <span className="font-bold text-slate-900">6,120 (4.9%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '4.9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">National Fellowship (NFST)</span>
                    <span className="font-bold text-slate-900">2,350 (1.9%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '1.9%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-slate-700">National Overseas Scholarship (NOS)</span>
                    <span className="font-bold text-slate-900">350 (0.3%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: '0.3%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Efficiency & Processing Times */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Verification Engine Performance
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Automated Clearances
                  </span>
                  <div className="text-xl font-bold text-emerald-700 mt-0.5">84.2%</div>
                  <span className="text-[10px] text-slate-400">Zero human intervention</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Avg Processing Time
                  </span>
                  <div className="text-xl font-bold text-slate-900 mt-0.5">3.4 Days</div>
                  <span className="text-[10px] text-emerald-600 font-medium">Down from 42 days</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    DigiLocker Match Rate
                  </span>
                  <div className="text-xl font-bold text-blue-900 mt-0.5">91.8%</div>
                  <span className="text-[10px] text-slate-400">ST & Board certificates</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    DBT Direct Success
                  </span>
                  <div className="text-xl font-bold text-emerald-700 mt-0.5">99.1%</div>
                  <span className="text-[10px] text-slate-400">Aadhaar APBS transfers</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Connected Services Health:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> All 9 Endpoints Synchronized
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: APPLICATION MANAGEMENT TABLE (Prompt Section 22) */}
      {activeSubTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Application Management</h2>
              <p className="text-xs text-slate-500">
                Live registry of ST student applications submitted across India.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student, state, ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 w-56"
                />
              </div>

              <select
                value={filterScheme}
                onChange={e => setFilterScheme(e.target.value)}
                className="text-xs p-1.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="all">All Schemes</option>
                <option value="post_matric">Post-Matric (PMS)</option>
                <option value="top_class">Top Class (TCS)</option>
                <option value="nfst">National Fellowship</option>
                <option value="nos">Overseas (NOS)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">App ID</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Scheme</th>
                  <th className="py-2.5 px-3">State & Institute</th>
                  <th className="py-2.5 px-3">Verified %</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Last Updated</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-slate-900">
                      {app.applicationId}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[10px] text-slate-400">ST Verified ✓</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {app.schemeName}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{app.state}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                        {app.institution}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-900 rounded-full"
                            style={{ width: `${app.verificationPercentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 tabular-nums">
                          {app.verificationPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          app.status === 'approved' || app.status === 'sanctioned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'action_required'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {app.status === 'action_required' ? 'Deficiency Flagged' : app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {app.lastUpdated}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: VERIFICATION QUEUE (Prompt Section 23) */}
      {activeSubTab === 'verification' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Verification Management Queue</h2>
              <p className="text-xs text-slate-500">
                Monitor automatic cross-verification vs items requiring officer manual intervention.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Manual Review Queue: 1 Pending
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-900">Identity & ST Verification</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-emerald-800 tabular-nums">98.4%</div>
              <p className="text-[11px] text-emerald-700 mt-1">
                UIDAI and State e-District automated matching working smoothly.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900">Income Verification Mismatches</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-800 tabular-nums">1.6%</div>
              <p className="text-[11px] text-amber-700 mt-1">
                Ravi Kumar's re-uploaded certificate queued for manual scrutiny.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900">Academic & Enrolment Checks</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-800 tabular-nums">94.1%</div>
              <p className="text-[11px] text-blue-700 mt-1">
                Validated directly against AISHE and APAAR university registries.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: COVERAGE INSIGHTS (Prompt Section 25) */}
      {activeSubTab === 'coverage' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Unreached Beneficiary Identification
              </div>
              <h2 className="text-lg font-bold text-slate-900">Scholarship Coverage Insights</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Identifies high-density tribal pockets and students who qualify but haven't applied yet.
              </p>
            </div>

            <div className="text-right sm:self-center">
              <span className="text-xs text-slate-400">Total Potential Coverage Gap</span>
              <div className="text-xl font-bold text-amber-700 tabular-nums">2,720 Students in Pilot</div>
            </div>
          </div>

          {/* State-Wise Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">ST Population</th>
                  <th className="py-2.5 px-3">Estimated Eligible</th>
                  <th className="py-2.5 px-3">Active Beneficiaries</th>
                  <th className="py-2.5 px-3">Coverage %</th>
                  <th className="py-2.5 px-3 text-right">Potential Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STATE_COVERAGE_INSIGHTS.map((st, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{st.state}</td>
                    <td className="py-2.5 px-3 text-slate-600">{st.stPopulation.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-slate-600">{st.estimatedEligibleStudents.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-700">
                      {st.currentScholarshipBeneficiaries.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-900 rounded-full"
                            style={{ width: `${st.coveragePercentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{st.coveragePercentage}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-700">
                      {st.unreachedGap.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <strong>Government Notice:</strong> "Potential matches require official verification by District Welfare Officers and do not represent confirmed legal eligibility."
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: CONNECTED SYSTEMS (Prompt Section 24) */}
      {activeSubTab === 'integrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Connected System Integrations</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                PROTOTYPE INTEGRATION
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulated real-time interoperability with Central, State, and Academic Data Registries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {CONNECTED_SYSTEMS.map(sys => (
              <div key={sys.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="font-bold text-slate-900 text-xs">{sys.name}</div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      sys.status === 'Connected'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {sys.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{sys.description}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-500">
                  <span>Protocol: {sys.apiProtocol}</span>
                  <span>Sync: {sys.lastSync}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 6: ARCHITECTURE DIAGRAM (Prompt Section 27) */}
      {activeSubTab === 'architecture' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Unified Architecture Flow</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              How the unified mobile application bridges multiple existing platforms and external verification engines.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3 text-center text-xs">
            {/* Box 1: Student App */}
            <div className="p-4 rounded-xl bg-blue-900 text-white font-bold shadow-xs">
              <div className="text-sm">Student Mobile Web App & PWA (Unified Experience)</div>
              <div className="text-[10px] text-blue-200 font-normal mt-0.5">
                One Login · One Profile · One Wallet · One Application Tracker · JAGO Assistant
              </div>
            </div>

            <div className="text-slate-400 font-bold">↓</div>

            {/* Box 2: API Gateway */}
            <div className="p-3.5 rounded-xl bg-slate-800 text-white font-semibold">
              Unified MoTA Scholarship Gateway & Event Bus (REST/GraphQL)
            </div>

            <div className="text-slate-400 font-bold">↓</div>

            {/* Box 3: Existing Portals Bridge */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-blue-900">
                NSP 2.0 Bridge
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl font-bold text-purple-900">
                SFMP (NFST)
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl font-bold text-amber-900">
                NOS Overseas Portal
              </div>
            </div>

            <div className="text-slate-400 font-bold">↓</div>

            {/* Box 4: Verification Layer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
              <div className="font-bold text-slate-800 text-center">
                National Verification Layer (Zero-Duplicate Data Entry)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                <span className="p-1.5 bg-white border border-slate-200 rounded">DigiLocker</span>
                <span className="p-1.5 bg-white border border-slate-200 rounded">APAAR / UDISE+</span>
                <span className="p-1.5 bg-white border border-slate-200 rounded">UIDAI Vault</span>
                <span className="p-1.5 bg-white border border-slate-200 rounded">State e-District</span>
              </div>
            </div>

            <div className="text-slate-400 font-bold">↓</div>

            {/* Box 5: MoTA Database */}
            <div className="p-3.5 rounded-xl bg-emerald-700 text-white font-bold">
              MoTA Unified Master Beneficiary Database & DBT APBS Bridge
            </div>
          </div>
        </div>
      )}

      {/* OFFICER APPLICATION REVIEW DRAWER / MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900 uppercase">Officer Scrutiny Console</div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedApp.studentName} ({selectedApp.applicationId})
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheme:</span>
                <span className="font-bold text-slate-900">{selectedApp.schemeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Institution:</span>
                <span className="text-slate-800">{selectedApp.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Family Income:</span>
                <span className="font-semibold text-slate-900">₹{selectedApp.incomeAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Automated Checks:</span>
                <span className="font-bold text-emerald-700">ST & Enrolment Verified ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold capitalize text-blue-900">{selectedApp.status}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => {
                  adminUpdateStatus(selectedApp.applicationId, 'action_required');
                  setSelectedApp(null);
                }}
                className="px-3.5 py-2 font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl"
              >
                Request Correction
              </button>

              <button
                onClick={() => {
                  adminUpdateStatus(selectedApp.applicationId, 'approved');
                  setSelectedApp(null);
                }}
                className="px-4 py-2 font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
              >
                Approve Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
