
import React from 'react';
import { RedFlag } from '../types';

export const RedFlagsTable: React.FC<{ flags: RedFlag[] }> = ({ flags }) => {
  // Group flags by category
  const groupedFlags = flags.reduce((acc, flag) => {
    const cat = flag.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(flag);
    return acc;
  }, {} as Record<string, RedFlag[]>);

  const categories = Object.keys(groupedFlags);

  if (flags.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500">
        No major red flags detected.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-600 dark:text-blue-500 px-2 whitespace-nowrap">
              {category}
            </h4>
            <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800"></div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 shadow-sm transition-colors">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 text-xs w-1/4">Risk</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 text-xs w-16 text-center">Severity</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 text-xs">Analysis & Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {groupedFlags[category].map((flag, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-4 align-top">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{flag.risk}</div>
                    </td>
                    <td className="px-4 py-4 align-top text-center">
                      <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-tight border ${
                        flag.severity === 'High' ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-500 border-rose-200 dark:border-rose-500/30' :
                        flag.severity === 'Medium' ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/30' :
                        'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/30'
                      }`}>
                        {flag.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top space-y-3">
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        {flag.explanation}
                      </p>
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                        <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block mb-1">Proposed Fix:</span>
                        <p className="text-blue-800 dark:text-blue-200/80 font-mono text-[11px] leading-relaxed italic">
                          "{flag.alternative}"
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
