'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryType, PriorityType } from '../types';
import { CheckCircle, Circle, Trash2, Calendar, Clock, Plus, Filter } from 'lucide-react';

export const TasksView: React.FC = () => {
  const { tasks, toggleTaskComplete, deleteTask, moveTaskToTomorrow, setIsAddTaskModalOpen } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Completed'>('All');

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'Active' && task.completed) return false;
    if (filterStatus === 'Completed' && !task.completed) return false;
    if (filterCategory !== 'All' && task.category !== filterCategory) return false;
    return true;
  });

  const categories: string[] = ['All', 'Mental', 'Time', 'Physical', 'Social', 'Errands'];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Commitments & Tasks</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your weekly load and rebalance tasks across life areas.
          </p>
        </div>

        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                filterCategory === cat
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
          {(['All', 'Active', 'Completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks matching selected filter criteria.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priorityBadges: Record<PriorityType, string> = {
              High: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
              Medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
              Low: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            };

            return (
              <div
                key={task.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-4.5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.completed
                    ? 'border-slate-200/50 dark:border-slate-800/80 opacity-60 bg-slate-50/50 dark:bg-slate-900/40'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 stroke-[1.75]" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-base font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </span>
                      {task.isRebalanced && (
                        <span className="text-[10px] bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full font-medium">
                          Rebalanced
                        </span>
                      )}
                    </div>
                    {task.notes && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{task.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {task.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${priorityBadges[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    {task.estimatedHours}h
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-lg">
                    <Calendar className="w-3.5 h-3.5" />
                    {task.dueDate}
                  </span>

                  {/* Actions */}
                  {task.dueDate === 'Today' && !task.completed && (
                    <button
                      onClick={() => moveTaskToTomorrow(task.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Defer →
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
