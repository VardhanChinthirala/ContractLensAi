
import React, { useState } from 'react';

interface NegotiationBoxProps {
  text: string;
  isLocked?: boolean;
  onUpgrade?: () => void;
}

export const NegotiationBox: React.FC<NegotiationBoxProps> = ({ text, isLocked = false, onUpgrade }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (isLocked) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Negotiation Copilot</h3>
          {isLocked && (
            <span className="px-2 py-0.5 bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded uppercase tracking-widest border border-blue-500/20">
              Pro Feature
            </span>
          )}
        </div>
        {!isLocked && (
          <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Email Script</span>
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="relative">
        <div className={`bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm transition-all ${isLocked ? 'blur-sm select-none opacity-50' : ''}`}>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
          <pre className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-sans text-sm leading-relaxed">
            {text}
          </pre>
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl max-w-xs space-y-4">
              <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold">Unlock Negotiation Copilot</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upgrade to Pro or Business to get AI-generated professional scripts to negotiate these flags.</p>
              <button 
                onClick={onUpgrade}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all"
              >
                Upgrade to Unlock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
