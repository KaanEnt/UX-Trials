/**
 * Grade display calculation utilities
 * Algorithmically determines grade symbols from single assets
 */

import type { GradeDisplay } from '../types';
import { GRADE_TIERS, GRADE_NAMES } from '../config/ranks';

/**
 * Calculate grade display configuration from grade index (0-8)
 * 
 * Grades 0-2: I, II, III (numeral_I asset repeated 1-3x)
 * Grades 3-5: ★, ★★, ★★★ (star asset repeated 1-3x)
 * Grades 6-8: -, =, ≡ (unicode characters)
 */
export function getGradeDisplay(gradeIndex: number): GradeDisplay {
  // Clamp grade to valid range
  const grade = Math.max(0, Math.min(8, gradeIndex));
  
  // Determine tier (0=numeral, 1=star, 2=line)
  const tierIndex = Math.floor(grade / 3);
  // Position within tier (0, 1, or 2)
  const positionInTier = grade % 3;
  
  const tier = GRADE_TIERS[tierIndex];
  
  if (tierIndex === 2) {
    // Line tier - return unicode char directly
    const lineSymbols = ['-', '=', '≡'];
    return {
      type: 'char',
      char: lineSymbols[positionInTier],
      count: 1,
    };
  }
  
  // Numeral or star tier - repeat single asset
  return {
    type: 'asset',
    asset: tier.asset,
    count: positionInTier + 1,
  };
}

/**
 * Get display string for grade (for text rendering)
 */
export function getGradeString(gradeIndex: number): string {
  const grade = Math.max(0, Math.min(8, gradeIndex));
  return GRADE_NAMES[grade];
}

/**
 * Get full rank display name (e.g., "Gold III" or "Platinum ★★")
 */
export function getRankDisplayName(rankName: string, gradeIndex: number): string {
  const gradeString = getGradeString(gradeIndex);
  return `${rankName} ${gradeString}`;
}
