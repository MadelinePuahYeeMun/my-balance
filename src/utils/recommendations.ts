import { Task, StressEntry, RebalanceRecommendation } from '../types';

export function generateRecommendations(
  tasks: Task[],
  overallWorkloadPercent: number
): RebalanceRecommendation[] {
  const recommendations: RebalanceRecommendation[] = [];
  const activeTodayTasks = tasks.filter((t) => !t.completed && t.dueDate === 'Today');

  // Find a low-priority task scheduled for Today to suggest moving to Tomorrow
  const candidateToMove = activeTodayTasks.find((t) => t.priority === 'Low' && !t.isRebalanced) ||
    activeTodayTasks.find((t) => t.priority === 'Medium' && t.category === 'Social' && !t.isRebalanced);

  if (candidateToMove) {
    recommendations.push({
      id: `rec-move-${candidateToMove.id}`,
      type: 'move_task',
      taskId: candidateToMove.id,
      title: `1. Move "${candidateToMove.title}"`,
      subtitle: `${candidateToMove.priority} priority • ${candidateToMove.estimatedHours} hours`,
      actionText: 'Move to tomorrow →',
      appliedText: 'Moved to tomorrow',
      impactHours: candidateToMove.estimatedHours,
      impactCapacityPercentage: Math.round((candidateToMove.estimatedHours / 50) * 100 * 1.2),
    });
  }

  // Find a high-priority academic/work task to keep and prioritize
  const highPriorityTask = activeTodayTasks.find((t) => t.priority === 'High' && t.category === 'Mental') ||
    activeTodayTasks.find((t) => t.priority === 'High');

  if (highPriorityTask) {
    recommendations.push({
      id: `rec-keep-${highPriorityTask.id}`,
      type: 'keep_task',
      taskId: highPriorityTask.id,
      title: `2. Prioritize "${highPriorityTask.title}"`,
      subtitle: `High priority • ${highPriorityTask.estimatedHours} hours needed • Deadline soon`,
      actionText: 'Focus on this first →',
      appliedText: 'Prioritized',
    });
  }

  // Always include a recovery break recommendation
  recommendations.push({
    id: 'rec-break-walk',
    type: 'break',
    title: '3. Take a recovery break',
    subtitle: overallWorkloadPercent > 80
      ? 'You have been working intensely. Protect your energy.'
      : 'Maintain momentum with regular pause points.',
    actionText: '20-minute walk recommended 🌿',
  });

  return recommendations;
}

export function getRecoverySuggestion(
  workloadPercent: number,
  recentStressRating: number
): { title: string; message: string; tips: string[] } {
  if (workloadPercent >= 80) {
    return {
      title: 'You’re running close to your limit ⚡',
      message:
        'Your current workload is in the high intensity zone. Consider pausing and giving your mind space before jumping into your next heavy assignment.',
      tips: [
        'Take a 20–30 minute walk outside',
        'Step away from screens completely for 15 mins',
        'Hydrate and grab a nourishing snack',
        'Defer low-urgency errands to tomorrow',
      ],
    };
  }

  if (recentStressRating >= 4) {
    return {
      title: 'Elevated stress detected 🧘',
      message:
        'Your check-ins show high stress over recent days. Remember that rest is essential for long-term productivity and cognitive performance.',
      tips: [
        'Practice 5 minutes of deep box breathing',
        'Listen to calming audio or music',
        'Plan to go to bed 30 minutes earlier tonight',
        'Reach out to a peer or friend for a light chat',
      ],
    };
  }

  return {
    title: 'Good balance momentum ✨',
    message:
      'You are pacing yourself well today. Keep building sustainable study habits and scheduling intentional rest periods.',
    tips: [
      'Take quick 5-minute stretch breaks every hour',
      'Keep your workspace well ventilated',
      'Celebrate completing key priorities',
    ],
  };
}
