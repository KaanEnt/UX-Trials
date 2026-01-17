/**
 * Rank definitions with metallic gradient colors
 */

import type { RankConfig, RankId, PrestigeDecoration } from '../types';
import { COLORS } from '../theme/colors';

// XP thresholds
export const XP_PER_GRADE = 5000; // XP needed per grade
export const GRADES_PER_RANK = 9; // 9 grades before next rank
export const XP_PER_RANK = XP_PER_GRADE * GRADES_PER_RANK; // 45,000 XP per rank
export const MAX_RANKS = 5;
export const MAX_XP = XP_PER_RANK * MAX_RANKS; // 225,000 XP cap

// Rank configurations
export const RANKS: RankConfig[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    color: COLORS.rankBase.bronze,
    metallic: COLORS.rankMetallic.bronze,
  },
  {
    id: 'silver',
    name: 'Silver',
    color: COLORS.rankBase.silver,
    metallic: COLORS.rankMetallic.silver,
  },
  {
    id: 'gold',
    name: 'Gold',
    color: COLORS.rankBase.gold,
    metallic: COLORS.rankMetallic.gold,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    color: COLORS.rankBase.platinum,
    metallic: COLORS.rankMetallic.platinum,
  },
  {
    id: 'diamond',
    name: 'Diamond',
    color: COLORS.rankBase.diamond,
    metallic: COLORS.rankMetallic.diamond,
  },
];

// Get rank config by ID
export function getRankConfig(rankId: RankId): RankConfig {
  const rank = RANKS.find((r) => r.id === rankId);
  if (!rank) throw new Error(`Unknown rank: ${rankId}`);
  return rank;
}

// Get rank index (0-4)
export function getRankIndex(rankId: RankId): number {
  return RANKS.findIndex((r) => r.id === rankId);
}

// Grade tier definitions for visual display
export const GRADE_TIERS = [
  { tier: 'numeral', count: [1, 2, 3], asset: 'numeral_I' as const },
  { tier: 'star', count: [1, 2, 3], asset: 'star' as const },
  { tier: 'line', symbols: ['-', '=', '≡'], asset: null },
] as const;

// Grade names for display
export const GRADE_NAMES = ['I', 'II', 'III', '★', '★★', '★★★', '-', '=', '≡'] as const;

// Prestige decoration mapping by level
export const PRESTIGE_DECORATIONS: Record<number, PrestigeDecoration> = {
  0: 'none',
  1: 'crown',
  2: 'wings',
  3: 'halo',
  4: 'flames',
  5: 'stars',
};

// Get prestige decoration for level
export function getPrestigeDecoration(level: number): PrestigeDecoration {
  return PRESTIGE_DECORATIONS[Math.min(level, 5)] ?? 'none';
}
