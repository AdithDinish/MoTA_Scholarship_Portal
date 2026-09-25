import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Shield } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0b1f3a] text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold tracking-tight select-none border-b border-blue-950">
      {/* Left: Clock */}
      <div className="flex items-center gap-1.5 text-slate-100 font-bold">
        <span>{currentTime || '09:41'}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[10px] text-amber-300 font-medium">MoTA App</span>
      </div>

      {/* Center: Dynamic Pill/Notch Indicator */}
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-[10px] text-slate-300">
        <Shield className="w-3 h-3 text-amber-400" />
        <span>Govt. of India</span>
      </div>

      {/* Right: Signal, Wifi, Battery */}
      <div className="flex items-center gap-2 text-slate-200">
        <span className="text-[10px] font-mono text-emerald-400 font-bold">5G</span>
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
        </div>
      </div>
    </div>
  );
};
