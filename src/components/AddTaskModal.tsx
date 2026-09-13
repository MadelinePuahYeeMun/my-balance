'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryType, PriorityType } from '../types';
import { X, Clock, AlertCircle } from 'lucide-react';

export const AddTaskModal: React.FC = () => {
  const { isAddTaskModalOpen, setIsAddTaskModalOpen, addTask } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Mental');
  const [priority, setPriority] = useState<PriorityType>('Medium');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [dueDate, setDueDate] = useState<'Today' | 'Tomorrow' | 'This Week'>('Today');

  if (!isAddTaskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      category,
      priority,
      estimatedHours: Number(estimatedHours),
      dueDate,
    });

    setTitle('');
    setCategory('Mental');
    setPriority('Medium');
    setEstimatedHours(2);
    setDueDate('Today');
    setIsAddTaskModalOpen(false);
  };

  const categories: { label: CategoryType; icon: string }[] = [
    { label: 'Mental', icon: '🧠' },
    { label: 'Time', icon: '⏰' },
    { label: 'Physical', icon: '🏃' },
    { label: 'Social', icon: '👥' },
    { label: 'Errands', icon: '🛒' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={() => setIsAddTaskModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Add New Commitment</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Track time and cognitive load for accurate balance scoring.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Task Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Complete Operating Systems Lab"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setCategory(cat.label)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                    category === cat.label
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-[11px] mt-0.5">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority & Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="High">🔴 High (1.5x load)</option>
                <option value="Medium">🟡 Medium (1.0x load)</option>
                <option value="Low">🟢 Low (0.6x load)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Deadline
              </label>
              <select
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value as 'Today' | 'Tomorrow' | 'This Week')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Estimated Duration: {estimatedHours} hours</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </label>
            <input
              type="range"
              min="0.5"
              max="8"
              step="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(parseFloat(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0.5h</span>
              <span>2h</span>
              <span>4h</span>
              <span>6h</span>
              <span>8h</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="px-4 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
