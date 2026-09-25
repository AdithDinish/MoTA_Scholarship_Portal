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
    <div className="space-y-3.5 pb-24 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">Notifications</span>
        <button
          onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
        >
          Read all
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
            filterType === 'all'
              ? 'bg-[#18191c] text-white shadow-2xs scale-105'
              : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          All Updates
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
            filterType === 'unread'
              ? 'bg-[#18191c] text-white shadow-2xs scale-105'
              : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilterType('deficiency')}
          className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
            filterType === 'deficiency'
              ? 'bg-amber-600 text-white shadow-2xs scale-105'
              : 'bg-[#fff8ea] text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          Deficiencies
        </button>
        <button
          onClick={() => setFilterType('payment')}
          className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
            filterType === 'payment'
              ? 'bg-emerald-600 text-white shadow-2xs scale-105'
              : 'bg-[#eefbf4] text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setFilterType('verification')}
          className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
            filterType === 'verification'
              ? 'bg-indigo-600 text-white shadow-2xs scale-105'
              : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
          }`}
        >
          Verifications
        </button>
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
              className={`bg-white rounded-[26px] p-4 border transition-all cursor-pointer shadow-2xs ${
                !notif.read ? 'border-indigo-300 ring-1 ring-indigo-100 bg-indigo-50/20' : 'border-slate-100 hover:border-slate-200'
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
