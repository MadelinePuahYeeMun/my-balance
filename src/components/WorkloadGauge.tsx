'use client';

import React from 'react';
import { OverallWorkloadMetrics } from '../types';

interface WorkloadGaugeProps {
  metrics: OverallWorkloadMetrics;
}

export const WorkloadGauge: React.FC<WorkloadGaugeProps> = ({ metrics }) => {
  const { percentage, totalPlannedHours, availableCapacityHours, statusLabel, statusColor } = metrics;

  // SVG Circle calculation
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let gaugeGradient = ['#10b981', '#34d399']; // Green
  if (statusColor === 'amber') {
    gaugeGradient = ['#f59e0b', '#fbbf24']; // Amber
  } else if (statusColor === 'red') {
    gaugeGradient = ['#f43f5e', '#fb7185']; // Red
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Current Capacity Status
          </h2>
          <p className="text-base font-bold text-slate-800 dark:text-slate-100">Overall Load</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            statusColor === 'red'
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
              : statusColor === 'amber'
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
          }`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Main Gauge Visual */}
      <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={gaugeGradient[0]} />
                <stop offset="100%" stopColor={gaugeGradient[1]} />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Value Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Centered Percentage Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {percentage}%
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
              Capacity
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="space-y-3 text-center sm:text-left">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            You have <strong className="text-slate-900 dark:text-white font-bold">{totalPlannedHours} hours</strong> of planned commitments this week and approximately <strong className="text-slate-900 dark:text-white font-bold">{availableCapacityHours} hours</strong> of available capacity.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
            💡 {percentage >= 80 ? 'Tip: Deferring even 1 low-priority task can return you to optimal performance.' : 'Tip: Keep reserving buffer hours for unexpected study demands.'}
          </div>
        </div>
      </div>
    </div>
  );
};
