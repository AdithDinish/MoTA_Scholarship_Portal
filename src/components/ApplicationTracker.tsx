import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  ArrowRight,
  ShieldCheck,
  Building,
  School,
  IndianRupee,
  FileCheck,
  ExternalLink
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { application, setActiveTab } = useApp();

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-4xl mx-auto">
      {/* Header Application Identity Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Application Tracking
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                Live Status
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              {application.schemeName}
            </h1>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3">
              <span>
                Application ID: <strong className="text-slate-800 font-mono">{application.applicationId}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>Submitted: {application.appliedDate}</span>
              <span aria-hidden="true">·</span>
              <span>Academic Year: {application.academicYear}</span>
            </div>
          </div>

          <div className="text-right sm:self-center shrink-0">
            <div className="text-xs text-slate-400">Current Stage</div>
            <div className="text-sm font-bold text-amber-700 flex items-center gap-1.5 justify-end mt-0.5">
              <Clock className="w-4 h-4 animate-spin text-amber-600" />
              <span>{application.currentStage}</span>
            </div>
          </div>
        </div>

        {/* Expected Next Action Callout (Prompt requirement) */}
        <div
          className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            application.actionRequired
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {application.actionRequired ? (
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                {application.actionRequired ? 'Action Required from Student' : 'Nothing Required from You'}
              </div>
              <p className="text-xs mt-0.5">
                {application.expectedNextAction}
              </p>
            </div>
          </div>

          {application.actionRequired && (
            <button
              onClick={() => setActiveTab('deficiency')}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>Resolve Deficiency</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Visual Timeline (Prompt Section 13) */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">
          Lifecycle Verification Timeline
        </h2>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {application.timeline.map((event, index) => {
            const isCompleted = event.status === 'completed';
            const isInProgress = event.status === 'in_progress';
            const isActionReq = event.status === 'action_required';
            const isPending = event.status === 'pending';

            return (
              <div key={index} className="relative">
                {/* Timeline Node Icon */}
                <div
                  className={`absolute -left-[30px] sm:-left-[38px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ring-4 ring-white ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isActionReq
                      ? 'bg-amber-500 text-white'
                      : isInProgress
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActionReq ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : isInProgress ? (
                    <Clock className="w-4 h-4 animate-pulse" />
                  ) : (
                    <Circle className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Timeline Content */}
                <div
                  className={`p-4 rounded-xl border ${
                    isActionReq
                      ? 'bg-amber-50/70 border-amber-200'
                      : isInProgress
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-slate-50/60 border-slate-100'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{event.title}</span>
                      {isCompleted && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                          Completed ✓
                        </span>
                      )}
                      {isActionReq && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded">
                          Attention Needed
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-[10px] font-semibold text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                          In Progress ⏳
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{event.date}</span>
                  </div>

                  <div className="text-xs text-slate-500 mb-1">
                    Responsible Body: <strong className="text-slate-700">{event.actor}</strong>
                  </div>

                  {event.remarks && (
                    <p className="text-xs text-slate-700 mt-2 p-2 bg-white/80 rounded-lg border border-slate-200">
                      {event.remarks}
                    </p>
                  )}

                  {isActionReq && (
                    <div className="mt-3 pt-2 border-t border-amber-200 flex justify-end">
                      <button
                        onClick={() => setActiveTab('deficiency')}
                        className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
                      >
                        <span>Fix Income Certificate Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
