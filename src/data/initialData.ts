import { Task, StressEntry } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Machine Learning Assignment',
    category: 'Mental',
    priority: 'High',
    estimatedHours: 3,
    dueDate: 'Today',
    completed: false,
    notes: 'Focus on model hyperparameter tuning section'
  },
  {
    id: 'task-2',
    title: 'Part-Time Work Shift (Library)',
    category: 'Time',
    priority: 'High',
    estimatedHours: 5,
    dueDate: 'Today',
    completed: false,
    notes: 'Covering information desk'
  },
  {
    id: 'task-3',
    title: 'Database Systems Quiz Prep',
    category: 'Mental',
    priority: 'High',
    estimatedHours: 3,
    dueDate: 'Today',
    completed: false,
    notes: 'Review SQL joins & normalization'
  },
  {
    id: 'task-4',
    title: 'Club Meeting',
    category: 'Social',
    priority: 'Low',
    estimatedHours: 2,
    dueDate: 'Today',
    completed: false,
    notes: 'Weekly robotics club sync'
  },
  {
    id: 'task-5',
    title: 'Gym & Cardio Workout',
    category: 'Physical',
    priority: 'Medium',
    estimatedHours: 1.5,
    dueDate: 'Today',
    completed: false
  },
  {
    id: 'task-6',
    title: 'Grocery Shopping & Meal Prep',
    category: 'Errands',
    priority: 'Medium',
    estimatedHours: 1.5,
    dueDate: 'Today',
    completed: false
  },
  {
    id: 'task-7',
    title: 'Software Engineering Draft Essay',
    category: 'Mental',
    priority: 'Medium',
    estimatedHours: 4,
    dueDate: 'Tomorrow',
    completed: false
  },
  {
    id: 'task-8',
    title: 'Coffee Catchup with Sarah',
    category: 'Social',
    priority: 'Low',
    estimatedHours: 1.5,
    dueDate: 'Tomorrow',
    completed: false
  }
];

export const INITIAL_STRESS_ENTRIES: StressEntry[] = [
  { id: 's-1', day: 'Mon', rating: 3, label: 'Okay', dateStr: '2026-09-07' },
  { id: 's-2', day: 'Tue', rating: 4, label: 'Stressed', dateStr: '2026-09-08' },
  { id: 's-3', day: 'Wed', rating: 4, label: 'Stressed', dateStr: '2026-09-09' },
  { id: 's-4', day: 'Thu', rating: 5, label: 'Overwhelmed', dateStr: '2026-09-10' },
  { id: 's-5', day: 'Fri', rating: 4, label: 'Stressed', dateStr: '2026-09-11' },
  { id: 's-6', day: 'Sat', rating: 3, label: 'Okay', dateStr: '2026-09-12' },
  { id: 's-7', day: 'Sun', rating: 2, label: 'Good', dateStr: '2026-09-13' }
];

export const DEFAULT_WEEKLY_CAPACITY_HOURS = 50;
