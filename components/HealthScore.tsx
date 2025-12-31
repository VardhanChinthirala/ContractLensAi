
import React from 'react';

interface HealthScoreProps {
  score: number;
  verdict: string;
}

export const HealthScore: React.FC<HealthScoreProps> = ({ score, verdict }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600 dark:text-emerald-500';
    if (s >= 50) return 'text-amber-600 dark:text-amber-500';
    return 'text-rose-600 dark:text-rose-500';
  };

  const getBgColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
    if (s >= 50) return 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
    return 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
  };

  return (
    <div className={`p-6 rounded-2xl border ${getBgColor(score)} flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors`}>
      <div>
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Contract Health Score</h3>
        <p className={`text-4xl font-black ${getColor(score)}`}>{score}/100</p>
      </div>
      <div className="sm:text-right">
        <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest ${getColor(score)} bg-white dark:bg-white/5 border border-current inline-block mb-2 shadow-sm`}>
          {verdict}
        </span>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[150px] sm:ml-auto">
          {score < 50 ? 'Immediate legal review or heavy negotiation recommended.' : score < 80 ? 'Standard agreement with some risks.' : 'Highly favorable for you.'}
        </p>
      </div>
    </div>
  );
};
