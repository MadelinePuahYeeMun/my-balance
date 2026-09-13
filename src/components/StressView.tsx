'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StressRating } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { HeartPulse, Check, AlertCircle, Sparkles } from 'lucide-react';

export const StressView: React.FC = () => {
  const { stressEntries, addStressCheckIn } = useApp();
  const [selectedRating, setSelectedRating] = useState<StressRating | null>(null);
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  const moods: { rating: StressRating; emoji: string; label: string; desc: string }[] = [
    { rating: 1, emoji: '😄', label: 'Great', desc: 'Energized & calm' },
    { rating: 2, emoji: '🙂', label: 'Good', desc: 'Steady focus' },
    { rating: 3, emoji: '😐', label: 'Okay', desc: 'Balanced load' },
    { rating: 4, emoji: '😟', label: 'Stressed', desc: 'Feeling pressure' },
    { rating: 5, emoji: '😫', label: 'Overwhelmed', desc: 'Near limit' },
  ];

  const handleSelectMood = (rating: StressRating) => {
    setSelectedRating(rating);
    addStressCheckIn(rating);
    const label = moods.find((m) => m.rating === rating)?.label;
    setSubmittedFeedback(`Logged today's status as "${label}".`);
    setTimeout(() => setSubmittedFeedback(null), 4000);
  };

  // Format chart data
  const chartData = stressEntries.map((entry) => ({
    day: entry.day,
    rating: entry.rating,
    label: entry.label,
  }));

  // Calculate insight
  const recentHighCount = stressEntries.slice(-4).filter((e) => e.rating >= 4).length;

  return (
    <div className="space-y-6">
      {/* Interactive Check-in Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">How are you feeling today?</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily check-ins help identify stress patterns early.
              </p>
            </div>
          </div>
        </div>

        {submittedFeedback && (
          <div className="my-4 p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-purple-600" />
            <span>{submittedFeedback}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
          {moods.map((m) => {
            const isSelected = selectedRating === m.rating;
            return (
              <button
                key={m.rating}
                onClick={() => handleSelectMood(m.rating)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-purple-50 dark:bg-purple-950/80 border-purple-500 text-purple-900 dark:text-purple-100 shadow-md scale-[1.02]'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="text-3xl sm:text-4xl mb-1.5 transform hover:scale-110 transition-transform">
                  {m.emoji}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{m.label}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stress History Line Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Your stress this week</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracking energy strain across the last 7 days
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" /> Trend Insight
          </span>
        </div>

        {/* Recharts Line Graph */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(val) => {
                  const map: Record<number, string> = { 1: 'Great', 2: 'Good', 3: 'Okay', 4: 'Stressed', 5: 'Overwhelmed' };
                  return map[val] || '';
                }}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl border border-slate-700">
                        <p className="font-bold">{data.day}</p>
                        <p className="text-purple-300">Status: {data.label}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 7, fill: '#6d28d9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stress Insight Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <p className="font-bold">
              {recentHighCount >= 2
                ? 'Your stress has been elevated for the past 3 days.'
                : 'Your stress levels are currently steady.'}
            </p>
            <p className="leading-relaxed opacity-90">
              High cognitive strain during mid-week assignments can accumulate. Check your Recommendations page to rebalance low-urgency tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
