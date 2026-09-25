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
    <div className="space-y-4 pb-20 lg:pb-8 max-w-3xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[550px]">
      {/* JAGO Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0f2e59] text-white flex items-center justify-center font-bold text-base shadow-sm border border-blue-900">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">JAGO</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Online · MoTA AI
                </span>
              </div>
              <p className="text-xs text-slate-500">Your Scholarship Assistant</p>
            </div>
          </div>

          {/* Multilingual Switcher inside JAGO */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                language === 'en' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                language === 'hi' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                language === 'ta' ? 'bg-white font-bold text-blue-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* Disclaimer Requirement from Prompt Section 17 */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900 shrink-0" />
          <span>
            JAGO responses are grounded in verified records available through connected MoTA systems (NSP, SFMP, NOS, DigiLocker).
          </span>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 overflow-y-auto space-y-4">
        {chatMessages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-[#0f2e59] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-blue-900 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-xs'
                }`}
              >
                <p>{msg.text}</p>

                {msg.sourceNote && (
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                    ℹ {msg.sourceNote}
                  </div>
                )}

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(act.tab)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-white text-blue-900 hover:bg-blue-50 border border-blue-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[9px] text-right font-mono ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
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
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0 text-xs">
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendJagoMessage(prompt)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-950 hover:border-blue-300 border border-slate-200 text-blue-950 font-medium rounded-full whitespace-nowrap transition-colors min-h-[36px]"
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
          className="flex-1 p-3 text-xs bg-white rounded-xl border border-slate-300 focus:outline-blue-900 shadow-xs"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
