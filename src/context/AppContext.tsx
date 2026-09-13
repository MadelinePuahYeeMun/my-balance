'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, StressEntry, StressRating, OverallWorkloadMetrics } from '../types';
import { INITIAL_TASKS, INITIAL_STRESS_ENTRIES, DEFAULT_WEEKLY_CAPACITY_HOURS } from '../data/initialData';
import { calculateWorkloadMetrics } from '../utils/workload';

type ActiveTab = 'dashboard' | 'tasks' | 'stress' | 'recommendations';

interface AppContextType {
  tasks: Task[];
  stressEntries: StressEntry[];
  availableCapacityHours: number;
  activeTab: ActiveTab;
  isAddTaskModalOpen: boolean;
  workloadMetrics: OverallWorkloadMetrics;
  setActiveTab: (tab: ActiveTab) => void;
  setIsAddTaskModalOpen: (open: boolean) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  moveTaskToTomorrow: (id: string) => void;
  addStressCheckIn: (rating: StressRating) => void;
  resetDemoData: () => void;
  setCapacityHours: (hours: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_TASKS = 'my_balance_tasks_v1';
const LOCAL_STORAGE_KEY_STRESS = 'my_balance_stress_v1';
const LOCAL_STORAGE_KEY_CAPACITY = 'my_balance_capacity_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [stressEntries, setStressEntries] = useState<StressEntry[]>(INITIAL_STRESS_ENTRIES);
  const [availableCapacityHours, setAvailableCapacityHours] = useState<number>(DEFAULT_WEEKLY_CAPACITY_HOURS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
      const savedStress = localStorage.getItem(LOCAL_STORAGE_KEY_STRESS);
      const savedCapacity = localStorage.getItem(LOCAL_STORAGE_KEY_CAPACITY);

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      if (savedStress) {
        setStressEntries(JSON.parse(savedStress));
      }
      if (savedCapacity) {
        setAvailableCapacityHours(Number(savedCapacity));
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(tasks));
      localStorage.setItem(LOCAL_STORAGE_KEY_STRESS, JSON.stringify(stressEntries));
      localStorage.setItem(LOCAL_STORAGE_KEY_CAPACITY, availableCapacityHours.toString());
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [tasks, stressEntries, availableCapacityHours, isInitialized]);

  const workloadMetrics = calculateWorkloadMetrics(tasks, availableCapacityHours);

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const moveTaskToTomorrow = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, dueDate: 'Tomorrow', isRebalanced: true } : t
      )
    );
  };

  const addStressCheckIn = (rating: StressRating) => {
    const labelMap: Record<StressRating, string> = {
      1: 'Great',
      2: 'Good',
      3: 'Okay',
      4: 'Stressed',
      5: 'Overwhelmed',
    };

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];

    const newEntry: StressEntry = {
      id: `stress-${Date.now()}`,
      day: today,
      rating,
      label: labelMap[rating],
      dateStr: new Date().toISOString().split('T')[0],
    };

    setStressEntries((prev) => {
      const updated = [...prev.slice(1), newEntry];
      return updated;
    });
  };

  const resetDemoData = () => {
    setTasks(INITIAL_TASKS);
    setStressEntries(INITIAL_STRESS_ENTRIES);
    setAvailableCapacityHours(DEFAULT_WEEKLY_CAPACITY_HOURS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TASKS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_STRESS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CAPACITY);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        stressEntries,
        availableCapacityHours,
        activeTab,
        isAddTaskModalOpen,
        workloadMetrics,
        setActiveTab,
        setIsAddTaskModalOpen,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        moveTaskToTomorrow,
        addStressCheckIn,
        resetDemoData,
        setCapacityHours: setAvailableCapacityHours,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
