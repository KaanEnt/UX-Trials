/**
 * Component dimensions and sizes
 */

export const DIMENSIONS = {
  // Trophy frame
  trophyFrame: {
    small: 80,
    medium: 120,
    large: 160,
    ringWidth: 6, // Metallic border thickness
    prestigeOffset: -20, // How far above frame prestige sits
  },

  // Badges
  badge: {
    small: 48,
    medium: 64,
    large: 80,
    ringWidth: 4,
    iconPadding: 12,
  },

  // Grade indicator
  grade: {
    symbolSize: 16,
    symbolGap: 4,
    containerHeight: 24,
  },

  // Progress bar
  progressBar: {
    height: 24,
    minWidth: 200,
    borderRadius: 12,
  },

  // Profile page sections
  profile: {
    headerHeight: 180,
    taskRowHeight: 48,
    matchRowHeight: 44,
    badgeGridColumns: 4,
    maxContentWidth: 800,
  },

  // Leaderboard
  leaderboard: {
    rowHeight: 72,
    avatarSize: 48,
    maxWidth: 600,
  },
} as const;
