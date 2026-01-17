/**
 * Rank progression system
 * Calculates rank/grade from XP and manages profile frame updates
 */

import type { RankState, ProfileFrame, User, RankId } from '../types';
import { RANKS, XP_PER_GRADE, XP_PER_RANK, GRADES_PER_RANK, MAX_XP, getRankConfig } from '../config/ranks';

/**
 * Calculate rank state from total XP
 */
export function calculateRankFromXP(totalXP: number): RankState {
  // Cap XP at maximum
  const cappedXP = Math.min(totalXP, MAX_XP);
  
  // Calculate rank index (0-4)
  const rankIndex = Math.min(
    Math.floor(cappedXP / XP_PER_RANK),
    RANKS.length - 1
  );
  
  // XP within current rank
  const xpInCurrentRank = cappedXP - (rankIndex * XP_PER_RANK);
  
  // Calculate grade index (0-8) within rank
  const gradeIndex = Math.min(
    Math.floor(xpInCurrentRank / XP_PER_GRADE),
    GRADES_PER_RANK - 1
  );
  
  // XP within current grade
  const xpInCurrentGrade = xpInCurrentRank - (gradeIndex * XP_PER_GRADE);
  
  // XP needed to reach next grade
  const isMaxRank = rankIndex === RANKS.length - 1 && gradeIndex === GRADES_PER_RANK - 1;
  const xpToNextGrade = isMaxRank ? 0 : XP_PER_GRADE - xpInCurrentGrade;
  
  // Progress percentage within grade
  const progressPercent = isMaxRank ? 100 : (xpInCurrentGrade / XP_PER_GRADE) * 100;
  
  return {
    rankId: RANKS[rankIndex].id,
    gradeIndex,
    xpInCurrentGrade,
    xpToNextGrade,
    progressPercent,
  };
}

/**
 * Build profile frame configuration from rank state
 */
export function buildProfileFrame(rank: RankState, prestigeLevel: number): ProfileFrame {
  const rankConfig = getRankConfig(rank.rankId);
  
  return {
    rankId: rank.rankId,
    gradeIndex: rank.gradeIndex,
    prestigeLevel,
    metallicColors: rankConfig.metallic,
  };
}

/**
 * Update user rank after XP change
 * Returns updated user with new rank data and profile frame
 */
export function updateUserRank(user: User, newXP: number): User {
  const newRank = calculateRankFromXP(newXP);
  const rankChanged = 
    user.rank !== newRank.rankId || 
    user.grade !== newRank.gradeIndex;
  
  return {
    ...user,
    xp: newXP,
    rank: newRank.rankId,
    grade: newRank.gradeIndex,
    // Rebuild profile frame config when rank changes
    profileFrame: rankChanged 
      ? buildProfileFrame(newRank, user.prestige) 
      : user.profileFrame,
  };
}

/**
 * Check if user is at max rank
 */
export function isMaxRank(rankId: RankId, gradeIndex: number): boolean {
  const rankIndex = RANKS.findIndex((r) => r.id === rankId);
  return rankIndex === RANKS.length - 1 && gradeIndex === GRADES_PER_RANK - 1;
}

/**
 * Get XP required to reach a specific rank/grade
 */
export function getXPForRank(rankId: RankId, gradeIndex: number): number {
  const rankIndex = RANKS.findIndex((r) => r.id === rankId);
  return (rankIndex * XP_PER_RANK) + (gradeIndex * XP_PER_GRADE);
}

/**
 * Calculate XP needed to reach next rank (not grade)
 */
export function xpToNextRank(currentXP: number): number {
  const currentRank = calculateRankFromXP(currentXP);
  const rankIndex = RANKS.findIndex((r) => r.id === currentRank.rankId);
  
  if (rankIndex >= RANKS.length - 1) {
    return 0; // Already at max rank
  }
  
  const nextRankXP = (rankIndex + 1) * XP_PER_RANK;
  return nextRankXP - currentXP;
}
