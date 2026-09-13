'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { getRecoverySuggestion } from '../utils/recommendations';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const RecoveryCard: React.FC = () => {
  const { workloadMetrics, stressEntries } = useApp();

  const recentStress = stressEntries.slice(-1)[0]?.rating || 3;
  const suggestion = getRecoverySuggestion(workloadMetrics.percentage, recentStress);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-emerald-950/40 dark:to-teal-950/20 rounded-3xl p-6 border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            💚
          </div>
          <h3 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
            Your recovery matters too
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Wellbeing Guard
        </span>
      </div>

      <h4 className="font-semibold text-sm text-emerald-950 dark:text-emerald-100 mb-1">
        {suggestion.title}
      </h4>
      <p className="text-xs sm:text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed mb-4">
        {suggestion.message}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50">
        {suggestion.tips.map((tip, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-medium text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
