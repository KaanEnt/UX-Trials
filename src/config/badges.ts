/**
 * Badge definitions with tier-based metallic frames
 */

import type { BadgeConfig, BadgeTier } from '../types';

// Badge configurations
export const BADGES: BadgeConfig[] = [
  // Bronze tier badges (easier to obtain)
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Win your first match',
    icon: 'trophy',
    tier: 'bronze',
    criteria: 'Win 1 match',
  },
  {
    id: 'newcomer',
    name: 'Newcomer',
    description: 'Complete your first 5 games',
    icon: 'star',
    tier: 'bronze',
    criteria: 'Play 5 matches',
  },
  {
    id: 'daily_player',
    name: 'Daily Player',
    description: 'Login and play for 7 consecutive days',
    icon: 'calendar',
    tier: 'bronze',
    criteria: '7 day login streak',
  },
  {
    id: 'first_blood',
    name: 'Quick Draw',
    description: 'Win a match in under 2 minutes',
    icon: 'zap',
    tier: 'bronze',
    criteria: 'Win a quick match',
  },

  // Silver tier badges
  {
    id: 'streak_3',
    name: 'Hot Streak',
    description: 'Win 3 matches in a row',
    icon: 'flame',
    tier: 'silver',
    criteria: '3 win streak',
  },
  {
    id: 'veteran',
    name: 'Veteran',
    description: 'Complete 50 matches',
    icon: 'award',
    tier: 'silver',
    criteria: 'Play 50 matches',
  },
  {
    id: 'consistent',
    name: 'Consistent',
    description: 'Maintain 50% win rate over 20 games',
    icon: 'target',
    tier: 'silver',
    criteria: '50%+ win rate (20+ games)',
  },
  {
    id: 'marathon',
    name: 'Marathon',
    description: 'Play for 10 hours total',
    icon: 'clock',
    tier: 'silver',
    criteria: '10 hours play time',
  },

  // Gold tier badges
  {
    id: 'streak_5',
    name: 'Unstoppable',
    description: 'Win 5 matches in a row',
    icon: 'trending-up',
    tier: 'gold',
    criteria: '5 win streak',
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete a match with a perfect score',
    icon: 'check-circle',
    tier: 'gold',
    criteria: 'Perfect game score',
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Login for 30 consecutive days',
    icon: 'heart',
    tier: 'gold',
    criteria: '30 day login streak',
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Win 100 matches',
    icon: 'shield',
    tier: 'gold',
    criteria: '100 wins',
  },

  // Platinum tier badges (rare achievements)
  {
    id: 'legendary_streak',
    name: 'Legendary Streak',
    description: 'Win 10 matches in a row',
    icon: 'crown',
    tier: 'platinum',
    criteria: '10 win streak',
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster',
    description: 'Reach Diamond rank',
    icon: 'gem',
    tier: 'platinum',
    criteria: 'Reach Diamond',
  },
  {
    id: 'thousand_hours',
    name: 'Thousand Hours',
    description: 'Play for 1000 hours total',
    icon: 'infinity',
    tier: 'platinum',
    criteria: '1000 hours play time',
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Maintain 70% win rate over 100 games',
    icon: 'star',
    tier: 'platinum',
    criteria: '70%+ win rate (100+ games)',
  },
];

// Get badge by ID
export function getBadgeConfig(badgeId: string): BadgeConfig | undefined {
  return BADGES.find((b) => b.id === badgeId);
}

// Get badges by tier
export function getBadgesByTier(tier: BadgeTier): BadgeConfig[] {
  return BADGES.filter((b) => b.tier === tier);
}

// Badge icon mapping to Expo vector icons
export const BADGE_ICONS: Record<string, string> = {
  trophy: 'trophy',
  star: 'star',
  calendar: 'calendar',
  zap: 'zap',
  flame: 'flame',
  award: 'award',
  target: 'target',
  clock: 'clock',
  'trending-up': 'trending-up',
  'check-circle': 'check-circle',
  heart: 'heart',
  shield: 'shield',
  crown: 'crown',
  gem: 'gem',
  infinity: 'infinity',
};
