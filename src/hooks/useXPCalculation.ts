/**
 * useXPCalculation - Hook for calculating XP with triggers
 */

import { useCallback, useMemo } from 'react';
import type { User } from '../types';
import { 
  calculateMatchXP, 
  calculateLoginStreakBonus, 
  getActiveMultipliers,
  isWeekendBonusActive,
} from '../utils/xpCalculator';

interface XPBreakdown {
  baseXP: number;
  bonusXP: number;
  multiplier: number;
  totalXP: number;
  appliedTriggers: string[];
}

interface UseXPCalculationReturn {
  calculateWinXP: () => XPBreakdown;
  calculateLossXP: () => XPBreakdown;
  calculateDrawXP: () => XPBreakdown;
  loginStreakBonus: number;
  activeMultipliers: { name: string; value: number }[];
  isWeekendBonus: boolean;
}

export function useXPCalculation(user: User | null): UseXPCalculationReturn {
  const calculateWinXP = useCallback(() => {
    if (!user) {
      return { baseXP: 0, bonusXP: 0, multiplier: 1, totalXP: 0, appliedTriggers: [] };
    }
    return calculateMatchXP(user, 'win');
  }, [user]);

  const calculateLossXP = useCallback(() => {
    if (!user) {
      return { baseXP: 0, bonusXP: 0, multiplier: 1, totalXP: 0, appliedTriggers: [] };
    }
    return calculateMatchXP(user, 'loss');
  }, [user]);

  const calculateDrawXP = useCallback(() => {
    if (!user) {
      return { baseXP: 0, bonusXP: 0, multiplier: 1, totalXP: 0, appliedTriggers: [] };
    }
    return calculateMatchXP(user, 'draw');
  }, [user]);

  const loginStreakBonus = useMemo(() => {
    if (!user) return 0;
    return calculateLoginStreakBonus(user.flags.consecutiveLogins);
  }, [user?.flags.consecutiveLogins]);

  const activeMultipliers = useMemo(() => {
    if (!user) return [];
    return getActiveMultipliers(user);
  }, [user]);

  const isWeekendBonus = useMemo(() => {
    return isWeekendBonusActive();
  }, []);

  return {
    calculateWinXP,
    calculateLossXP,
    calculateDrawXP,
    loginStreakBonus,
    activeMultipliers,
    isWeekendBonus,
  };
}

/**
 * Format XP breakdown for display
 */
export function formatXPBreakdown(breakdown: XPBreakdown): string[] {
  const lines: string[] = [];
  
  lines.push(`Base: +${breakdown.baseXP} XP`);
  
  if (breakdown.multiplier !== 1) {
    lines.push(`Multiplier: ${breakdown.multiplier}x`);
  }
  
  if (breakdown.bonusXP > 0) {
    lines.push(`Bonus: +${breakdown.bonusXP} XP`);
  }
  
  lines.push(`Total: +${breakdown.totalXP} XP`);
  
  return lines;
}
