'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const { resetDemoData, setIsAddTaskModalOpen } = useApp();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/60 dark:border-slate-800">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          Good afternoon, Alex <span className="animate-pulse">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
          Let’s check in with your week.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          title="Reset prototype to initial state"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-xl transition-all border border-slate-200/50 dark:border-slate-700/50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* Add Task Button */}
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
};
