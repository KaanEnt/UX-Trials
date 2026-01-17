/**
 * Spacing, layout, and grid system
 */

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999, // Circular
} as const;

// Grid system for profile page
export const GRID = {
  containerMaxWidth: 1200,
  containerPadding: SPACING.lg,
  columnGap: SPACING.lg,
  rowGap: SPACING.xl,

  // Profile page column ratios
  profileColumns: {
    trophySection: 140,
    statsSection: 1, // flex: 1
  },

  // Bottom section 50/50 split
  bottomColumns: {
    badges: 1, // flex: 1
    matchHistory: 1, // flex: 1
  },
} as const;
