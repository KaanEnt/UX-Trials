/**
 * Task definitions - daily/weekly challenges for XP
 */

import type { TaskConfig } from '../types';

// Task configurations
export const TASKS: TaskConfig[] = [
  // Daily tasks
  {
    id: 'daily_win_1',
    name: 'Daily Victory',
    description: 'Win 1 match today',
    xpReward: 200,
    icon: 'trophy',
  },
  {
    id: 'daily_play_3',
    name: 'Active Player',
    description: 'Play 3 matches today',
    xpReward: 150,
    icon: 'gamepad-2',
  },
  {
    id: 'daily_perfect',
    name: 'Perfect Game',
    description: 'Complete a match with a perfect score',
    xpReward: 500,
    icon: 'check-circle',
  },
  {
    id: 'daily_quick_win',
    name: 'Speed Runner',
    description: 'Win a match in under 2 minutes',
    xpReward: 300,
    icon: 'zap',
  },
  {
    id: 'daily_playtime',
    name: 'Dedicated',
    description: 'Play for 30 minutes today',
    xpReward: 200,
    icon: 'clock',
  },

  // Streak tasks
  {
    id: 'streak_2',
    name: 'Warming Up',
    description: 'Win 2 matches in a row',
    xpReward: 250,
    icon: 'flame',
  },
  {
    id: 'streak_3',
    name: 'On Fire',
    description: 'Win 3 matches in a row',
    xpReward: 500,
    icon: 'flame',
  },
  {
    id: 'streak_5',
    name: 'Unstoppable',
    description: 'Win 5 matches in a row',
    xpReward: 1000,
    icon: 'flame',
  },

  // Weekly tasks
  {
    id: 'weekly_wins_10',
    name: 'Weekly Champion',
    description: 'Win 10 matches this week',
    xpReward: 1500,
    icon: 'calendar',
  },
  {
    id: 'weekly_play_20',
    name: 'Weekly Warrior',
    description: 'Play 20 matches this week',
    xpReward: 1000,
    icon: 'swords',
  },
  {
    id: 'weekly_variety',
    name: 'Explorer',
    description: 'Play against 10 different opponents this week',
    xpReward: 750,
    icon: 'users',
  },

  // Special tasks
  {
    id: 'comeback',
    name: 'Comeback King',
    description: 'Win a match after being down 2 points',
    xpReward: 400,
    icon: 'refresh-cw',
  },
  {
    id: 'domination',
    name: 'Domination',
    description: 'Win by 5 or more points',
    xpReward: 350,
    icon: 'crown',
  },
  {
    id: 'rival',
    name: 'Rival Defeated',
    description: 'Beat a player ranked higher than you',
    xpReward: 450,
    icon: 'sword',
  },
  {
    id: 'first_of_day',
    name: 'Early Bird',
    description: 'Play your first match before 9 AM',
    xpReward: 100,
    icon: 'sunrise',
  },
];

// Get task by ID
export function getTaskConfig(taskId: string): TaskConfig | undefined {
  return TASKS.find((t) => t.id === taskId);
}

// Get daily tasks
export function getDailyTasks(): TaskConfig[] {
  return TASKS.filter((t) => t.id.startsWith('daily_'));
}

// Get streak tasks
export function getStreakTasks(): TaskConfig[] {
  return TASKS.filter((t) => t.id.startsWith('streak_'));
}

// Get weekly tasks
export function getWeeklyTasks(): TaskConfig[] {
  return TASKS.filter((t) => t.id.startsWith('weekly_'));
}
