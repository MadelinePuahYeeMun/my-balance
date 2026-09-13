export type CategoryType = 'Mental' | 'Time' | 'Physical' | 'Social' | 'Errands';

export type PriorityType = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  category: CategoryType;
  priority: PriorityType;
  estimatedHours: number;
  dueDate: 'Today' | 'Tomorrow' | 'This Week';
  completed: boolean;
  notes?: string;
  isRebalanced?: boolean;
}

export type StressRating = 1 | 2 | 3 | 4 | 5; // 1: Great, 2: Good, 3: Okay, 4: Stressed, 5: Overwhelmed

export interface StressEntry {
  id: string;
  day: string; // 'Monday', 'Tuesday', etc.
  rating: StressRating;
  label: string; // 'Great', 'Good', 'Okay', 'Stressed', 'Overwhelmed'
  dateStr: string; // ISO format or formatted string
}

export interface CategoryBreakdown {
  category: CategoryType;
  icon: string;
  percentage: number;
  weightedHours: number;
  color: string;
  bgColor: string;
}

export interface OverallWorkloadMetrics {
  percentage: number;
  totalPlannedHours: number;
  availableCapacityHours: number;
  statusLabel: string;
  statusColor: 'green' | 'amber' | 'red';
  categoryBreakdowns: CategoryBreakdown[];
  topOverloadedCategory: CategoryType;
}

export interface RebalanceRecommendation {
  id: string;
  type: 'move_task' | 'keep_task' | 'break';
  taskId?: string;
  title: string;
  subtitle: string;
  actionText: string;
  appliedText?: string;
  impactHours?: number;
  impactCapacityPercentage?: number;
}
