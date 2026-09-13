import { Task, OverallWorkloadMetrics, CategoryType, CategoryBreakdown } from '../types';

export const PRIORITY_WEIGHTS = {
  High: 1.5,
  Medium: 1.0,
  Low: 0.6,
};

export const BASE_ROUTINE_HOURS = 15; // Base fixed university schedule / lectures

export function calculateWorkloadMetrics(
  tasks: Task[],
  availableCapacityHours: number = 50
): OverallWorkloadMetrics {
  const activeTasks = tasks.filter((t) => !t.completed);

  // Sum raw hours and weighted hours
  let totalRawTaskHours = 0;
  let totalWeightedTaskHours = 0;

  const categoryTotals: Record<CategoryType, { raw: number; weighted: number }> = {
    Mental: { raw: 0, weighted: 0 },
    Time: { raw: 0, weighted: 0 },
    Physical: { raw: 0, weighted: 0 },
    Social: { raw: 0, weighted: 0 },
    Errands: { raw: 0, weighted: 0 },
  };

  activeTasks.forEach((task) => {
    const weight = PRIORITY_WEIGHTS[task.priority] || 1.0;
    // Today's urgent tasks have 1.2x urgency multiplier
    const urgencyMultiplier = task.dueDate === 'Today' ? 1.2 : 1.0;
    const weightedHours = task.estimatedHours * weight * urgencyMultiplier;

    totalRawTaskHours += task.estimatedHours;
    totalWeightedTaskHours += weightedHours;

    categoryTotals[task.category].raw += task.estimatedHours;
    categoryTotals[task.category].weighted += weightedHours;
  });

  const totalPlannedHours = Math.round((totalRawTaskHours + BASE_ROUTINE_HOURS) * 10) / 10;
  
  // Calculate percentage: total weighted task hours + base routine / capacity
  const weightedSum = totalWeightedTaskHours + (BASE_ROUTINE_HOURS * 1.0);
  const percentage = Math.min(100, Math.max(10, Math.round((weightedSum / availableCapacityHours) * 100)));

  let statusLabel = 'Optimal balance';
  let statusColor: 'green' | 'amber' | 'red' = 'green';

  if (percentage >= 85) {
    statusLabel = "You're in the overload zone";
    statusColor = 'red';
  } else if (percentage >= 75) {
    statusLabel = "You're approaching your capacity";
    statusColor = 'amber';
  } else if (percentage >= 60) {
    statusLabel = 'Moderate workload, stay mindful';
    statusColor = 'amber';
  } else {
    statusLabel = 'Well within healthy limits';
    statusColor = 'green';
  }

  // Calculate category breakdowns
  // Categories are mapped against expected max threshold per category to yield realistic %s
  const categoryThresholds: Record<CategoryType, number> = {
    Mental: 10,
    Time: 12,
    Physical: 4,
    Social: 5,
    Errands: 4,
  };

  const categoryIcons: Record<CategoryType, string> = {
    Mental: '🧠',
    Time: '⏰',
    Physical: '🏃',
    Social: '👥',
    Errands: '🛒',
  };

  const categoryColors: Record<CategoryType, { color: string; bgColor: string }> = {
    Mental: { color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-500' },
    Time: { color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500' },
    Physical: { color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-500' },
    Social: { color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-500' },
    Errands: { color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-500' },
  };

  let maxCategory: CategoryType = 'Mental';
  let maxPercentage = -1;

  const categoryBreakdowns: CategoryBreakdown[] = (
    ['Mental', 'Time', 'Physical', 'Social', 'Errands'] as CategoryType[]
  ).map((cat) => {
    const rawVal = categoryTotals[cat].raw;
    const weightedVal = categoryTotals[cat].weighted;
    const threshold = categoryThresholds[cat];
    
    // Percent formula based on threshold
    const catPercent = Math.min(100, Math.round((weightedVal / threshold) * 100));

    if (catPercent > maxPercentage) {
      maxPercentage = catPercent;
      maxCategory = cat;
    }

    return {
      category: cat,
      icon: categoryIcons[cat],
      percentage: catPercent,
      weightedHours: Math.round(weightedVal * 10) / 10,
      color: categoryColors[cat].color,
      bgColor: categoryColors[cat].bgColor,
    };
  });

  return {
    percentage,
    totalPlannedHours,
    availableCapacityHours,
    statusLabel,
    statusColor,
    categoryBreakdowns,
    topOverloadedCategory: maxCategory,
  };
}
