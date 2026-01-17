/**
 * XP calculation utilities
 * Handles trigger-based XP bonuses and multipliers
 */

import type { User, XPTrigger, MatchResult } from '../types';
import { getXPTrigger, XP_TRIGGERS } from '../config/xpTriggers';

interface XPCalculation {
  baseXP: number;
  bonusXP: number;
  multiplier: number;
  totalXP: number;
  appliedTriggers: string[];
}

/**
 * Calculate XP for a match result with all applicable triggers
 */
export function calculateMatchXP(
  user: User,
  matchResult: 'win' | 'loss' | 'draw',
  additionalTriggers: string[] = []
): XPCalculation {
  let baseXP = 0;
  let bonusXP = 0;
  let multiplier = 1.0;
  const appliedTriggers: string[] = [];

  // Base XP from match result
  switch (matchResult) {
    case 'win':
      baseXP = getXPTrigger('match_win')?.value ?? 100;
      appliedTriggers.push('match_win');
      break;
    case 'loss':
      baseXP = getXPTrigger('match_loss')?.value ?? 25;
      appliedTriggers.push('match_loss');
      break;
    case 'draw':
      baseXP = getXPTrigger('match_draw')?.value ?? 50;
      appliedTriggers.push('match_draw');
      break;
  }

  // Apply win streak multipliers
  if (matchResult === 'win' && user.flags.winStreak >= 3) {
    if (user.flags.winStreak >= 10) {
      const trigger = getXPTrigger('win_streak_10');
      if (trigger) {
        multiplier *= trigger.value;
        appliedTriggers.push('win_streak_10');
      }
    } else if (user.flags.winStreak >= 5) {
      const trigger = getXPTrigger('win_streak_5');
      if (trigger) {
        multiplier *= trigger.value;
        appliedTriggers.push('win_streak_5');
      }
    } else {
      const trigger = getXPTrigger('win_streak_3');
      if (trigger) {
        multiplier *= trigger.value;
        appliedTriggers.push('win_streak_3');
      }
    }
  }

  // Apply first win of day bonus
  if (matchResult === 'win' && user.flags.dailyBonus) {
    const trigger = getXPTrigger('first_win_of_day');
    if (trigger) {
      bonusXP += trigger.value;
      appliedTriggers.push('first_win_of_day');
    }
  }

  // Apply additional specified triggers
  for (const triggerId of additionalTriggers) {
    const trigger = getXPTrigger(triggerId);
    if (trigger && !appliedTriggers.includes(triggerId)) {
      if (trigger.type === 'additive') {
        bonusXP += trigger.value;
      } else {
        multiplier *= trigger.value;
      }
      appliedTriggers.push(triggerId);
    }
  }

  // Calculate total
  const totalXP = Math.floor((baseXP * multiplier) + bonusXP);

  return {
    baseXP,
    bonusXP,
    multiplier,
    totalXP,
    appliedTriggers,
  };
}

/**
 * Check and apply login streak bonuses
 */
export function calculateLoginStreakBonus(consecutiveLogins: number): number {
  if (consecutiveLogins >= 30) {
    return getXPTrigger('daily_login_30')?.value ?? 5000;
  }
  if (consecutiveLogins >= 14) {
    return getXPTrigger('daily_login_14')?.value ?? 2500;
  }
  if (consecutiveLogins >= 7) {
    return getXPTrigger('daily_login_7')?.value ?? 1000;
  }
  if (consecutiveLogins >= 3) {
    return getXPTrigger('daily_login_3')?.value ?? 300;
  }
  return 0;
}

/**
 * Check if weekend bonus applies
 */
export function isWeekendBonusActive(): boolean {
  const day = new Date().getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

/**
 * Get active multipliers for display
 */
export function getActiveMultipliers(user: User): { name: string; value: number }[] {
  const multipliers: { name: string; value: number }[] = [];

  // Win streak
  if (user.flags.winStreak >= 10) {
    multipliers.push({ name: '10 Win Streak', value: 2.0 });
  } else if (user.flags.winStreak >= 5) {
    multipliers.push({ name: '5 Win Streak', value: 1.5 });
  } else if (user.flags.winStreak >= 3) {
    multipliers.push({ name: '3 Win Streak', value: 1.25 });
  }

  // Weekend bonus
  if (isWeekendBonusActive()) {
    multipliers.push({ name: 'Weekend Warrior', value: 1.5 });
  }

  return multipliers;
}

/**
 * Format XP number for display
 */
export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
}
