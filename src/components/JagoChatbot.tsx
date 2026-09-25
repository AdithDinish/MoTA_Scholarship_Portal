import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Send,
  Globe,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Bot
} from 'lucide-react';
import { Language } from '../types';

export const JagoChatbot: React.FC = () => {
  const {
    chatMessages,
    sendJagoMessage,
    language,
    setLanguage,
    setActiveTab,
    student,
    application
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendJagoMessage(inputVal.trim());
    setInputVal('');
  };

  const samplePrompts = [
    'Why is my application pending?',
    'What documents do I need?',
    'When will I get my scholarship?',
    'What scholarships can I apply for?',
    'How does DigiLocker work with MoTA?'
  ];

  return (
    <div className="space-y-3 pb-24 max-w-4xl mx-auto flex flex-col min-h-[70vh]">
      {/* Back button & Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs font-bold text-slate-500">JAGO AI Assistant</span>
        <div className="w-12" />
      </div>

      {/* JAGO Header Card */}
      <div className="bg-[#18191c] text-white rounded-[28px] p-4 shadow-md shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-base shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black text-white">JAGO</h1>
                <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Online · MoTA AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tribal Scholarship Co-pilot</p>
            </div>
          </div>

          {/* Multilingual Switcher inside JAGO */}
          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-full text-[10px]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                language === 'hi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                language === 'ta' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300'
              }`}
            >
              TA
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 bg-white rounded-[28px] border border-slate-100 shadow-2xs p-3.5 overflow-y-auto space-y-3 min-h-[300px]">
        {chatMessages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-[20px] p-3 text-xs leading-relaxed space-y-1.5 ${
                  isUser
                    ? 'bg-[#5c67f2] text-white rounded-tr-xs shadow-2xs'
                    : 'bg-[#faf9f6] border border-slate-100 text-slate-900 rounded-tl-xs shadow-2xs'
                }`}
              >
                <p className="text-[12px]">{msg.text}</p>

                {msg.sourceNote && (
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/50">
                    ℹ {msg.sourceNote}
                  </div>
                )}

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-1.5 flex flex-wrap gap-1">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(act.tab)}
                        className="px-2.5 py-1 text-[10px] font-bold bg-white text-indigo-900 hover:bg-indigo-50 border border-indigo-200 rounded-full shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] text-right font-mono ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0 text-xs">
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendJagoMessage(prompt)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-bold rounded-full whitespace-nowrap shadow-2xs transition-all min-h-[36px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="shrink-0 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask JAGO in English, हिन्दी, or தமிழ்..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className="flex-1 px-4 py-3 text-xs bg-white rounded-full border border-slate-200/80 focus:outline-indigo-500 shadow-2xs min-h-[44px]"
        />
        <button
          type="submit"
          className="w-11 h-11 bg-[#18191c] hover:bg-slate-800 text-white rounded-full shadow-md transition-all flex items-center justify-center shrink-0 active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
