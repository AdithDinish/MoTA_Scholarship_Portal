import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  Calendar,
  Layers,
  Check,
  ArrowRight
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationAsRead, setActiveTab } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deficiency':
        return AlertTriangle;
      case 'verification':
        return CheckCircle2;
      case 'payment':
        return IndianRupee;
      case 'deadline':
        return Calendar;
      case 'application':
        return Layers;
      default:
        return Bell;
    }
  };

  const filtered = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.read;
    return n.type === filterType;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              Alerts & Updates
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Notification Center
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct updates from Ministry of Tribal Affairs, Institution Nodal Officers, and State Welfare Cells.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
              className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === 'all' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === 'unread' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilterType('deficiency')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === 'deficiency' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Deficiencies
          </button>
          <button
            onClick={() => setFilterType('payment')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === 'payment' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilterType('verification')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterType === 'verification' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Verifications
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map(notif => {
          const Icon = getIcon(notif.type);
          const isDeficiency = notif.type === 'deficiency';

          return (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer ${
                !notif.read ? 'border-blue-300 ring-1 ring-blue-100 bg-blue-50/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isDeficiency
                      ? 'bg-amber-100 text-amber-900'
                      : notif.type === 'payment'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-50 text-blue-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{notif.title}</span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      )}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">{notif.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.actionRoute && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          markNotificationAsRead(notif.id);
                          setActiveTab(notif.actionRoute!);
                        }}
                        className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
