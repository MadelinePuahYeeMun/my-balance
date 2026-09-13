'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { DashboardView } from '../components/DashboardView';
import { TasksView } from '../components/TasksView';
import { StressView } from '../components/StressView';
import { RecommendationsView } from '../components/RecommendationsView';
import { AddTaskModal } from '../components/AddTaskModal';

function MainContent() {
  const { activeTab } = useApp();

  return (
    <div className="flex min-h-screen bg-slate-50/70 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20">
      {/* Sidebar / Bottom Navigation */}
      <Navigation />

      {/* Main Container */}
      <main className="flex-1 min-w-0 p-4 sm:p-7 md:p-10 pb-24 md:pb-10 max-w-7xl mx-auto">
        <Header />

        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'stress' && <StressView />}
        {activeTab === 'recommendations' && <RecommendationsView />}

        <AddTaskModal />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
