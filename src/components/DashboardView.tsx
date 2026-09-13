'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { WorkloadGauge } from './WorkloadGauge';
import { RecoveryCard } from './RecoveryCard';
import { CheckCircle, Circle, Clock, ArrowRight, AlertTriangle } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { workloadMetrics, tasks, toggleTaskComplete, setActiveTab, setIsAddTaskModalOpen } = useApp();

  const todayTasks = tasks.filter((t) => t.dueDate === 'Today');

  return (
    <div className="space-y-6">
      {/* Top Grid: Workload Gauge + Energy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Workload Gauge Card (7 cols) */}
        <div className="lg:col-span-7">
          <WorkloadGauge metrics={workloadMetrics} />
        </div>

        {/* Where is your energy going? Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Category Strain
                </h3>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Where is your energy going?
                </h2>
              </div>
              {workloadMetrics.percentage >= 75 && (
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="w-3 h-3" /> Mental + Time High
                </span>
              )}
            </div>

            {/* Horizontal Progress Bars */}
            <div className="space-y-3.5 my-2">
              {workloadMetrics.categoryBreakdowns.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span>{item.icon}</span>
                      <span>{item.category}</span>
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.bgColor}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            🧠 High mental strain & ⏰ tight time constraints represent your main overload risks.
          </p>
        </div>
      </div>

      {/* Recovery Section Card */}
      <RecoveryCard />

      {/* Today's Tasks Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Today's Focus Tasks</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {todayTasks.filter((t) => t.completed).length} of {todayTasks.length} commitments completed today
            </p>
          </div>

          <button
            onClick={() => setActiveTab('tasks')}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          >
            <span>View All Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {todayTasks.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No tasks scheduled for today!</p>
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              + Add a task
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayTasks.map((task) => {
              const priorityBadges = {
                High: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
                Medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
                Low: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
              };

              return (
                <div
                  key={task.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-200 gap-3 ${
                    task.completed
                      ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800 opacity-60'
                      : 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      className="mt-0.5 sm:mt-0 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 stroke-[1.75]" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                          {task.title}
                        </span>
                        {task.isRebalanced && (
                          <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                            Rebalanced
                          </span>
                        )}
                      </div>
                      {task.notes && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{task.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600">
                      {task.category}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${priorityBadges[task.priority]}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {task.estimatedHours}h
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
