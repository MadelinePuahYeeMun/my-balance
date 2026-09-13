'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRecommendations } from '../utils/recommendations';
import { Sparkles, AlertTriangle, ArrowRight, Check, ShieldAlert, Heart, Calendar } from 'lucide-react';

export const RecommendationsView: React.FC = () => {
  const { tasks, workloadMetrics, moveTaskToTomorrow, setActiveTab } = useApp();
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});

  const recommendations = generateRecommendations(tasks, workloadMetrics.percentage);

  const todayTasks = tasks.filter((t) => !t.completed && t.dueDate === 'Today');
  const todayPlannedHours = todayTasks.reduce((acc, t) => acc + t.estimatedHours, 0);

  const handleApplyAction = (recId: string, taskId?: string) => {
    if (taskId) {
      moveTaskToTomorrow(taskId);
    }
    setAppliedActions((prev) => ({ ...prev, [recId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> AI Balance Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Balance Plan</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Smart recommendations to protect your energy and prevent overload.
          </p>
        </div>
      </div>

      {/* Main Alert Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-7 border shadow-sm transition-all ${
          workloadMetrics.percentage >= 75
            ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
            : 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
              workloadMetrics.percentage >= 75
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {workloadMetrics.percentage >= 75 ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <ShieldAlert className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {workloadMetrics.percentage >= 75
                  ? "⚠️ You're carrying more than you have time for."
                  : '✨ Your current plan is well balanced!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                {workloadMetrics.percentage >= 75
                  ? "Based on your focus hours and urgency, high mental load today risks fatigue."
                  : "Your planned commitments match your available energy capacity nicely."}
              </p>
            </div>

            {/* Hours Comparison Badge */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase block">
                  Planned Tasks Today
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {todayPlannedHours} hours
                </span>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase block">
                  Target Focus Limit
                </span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  6.5 hours
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/80 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase block">
                  Overall Load
                </span>
                <span
                  className={`text-xl font-extrabold ${
                    workloadMetrics.percentage >= 75
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {workloadMetrics.percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Recommended Rebalancing Actions</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((rec) => {
            const isApplied = appliedActions[rec.id];

            return (
              <div
                key={rec.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border transition-all duration-300 shadow-sm ${
                  isApplied
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{rec.title}</h4>
                      {isApplied && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {rec.appliedText || 'Applied'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{rec.subtitle}</p>

                    {rec.impactHours && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        📉 Frees up {rec.impactHours} hours today (reduces overall strain)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {!isApplied ? (
                      <button
                        onClick={() => handleApplyAction(rec.id, rec.taskId)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
                      >
                        <span>{rec.actionText}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl"
                      >
                        <span>View Updated Load →</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
