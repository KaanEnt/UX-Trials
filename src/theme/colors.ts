/**
 * Color palette for the dark theme ranked leaderboard system
 */

export const COLORS = {
  // Background layers (dark theme)
  background: {
    primary: '#0D0D12', // Deepest background
    secondary: '#14141B', // Card backgrounds
    tertiary: '#1C1C26', // Elevated surfaces
    overlay: 'rgba(0,0,0,0.6)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    tertiary: '#606070',
    inverse: '#0D0D12',
  },

  // Accent colors
  accent: {
    primary: '#00D9FF', // Cyan - primary actions
    secondary: '#7B61FF', // Purple - secondary elements
    success: '#00E676', // Green - wins, positive
    warning: '#FFB800', // Amber - alerts
    error: '#FF5252', // Red - losses, errors
  },

  // Progress bar glow colors (used for liquid effect)
  glow: {
    cyan: 'rgba(0, 217, 255, 0.4)',
    green: 'rgba(0, 230, 118, 0.4)',
    gold: 'rgba(255, 215, 0, 0.4)',
  },

  // Rank colors (base, non-metallic for progress bars)
  rankBase: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
  },

  // Rank metallic gradients (for trophy frames - 5 stops each)
  rankMetallic: {
    bronze: ['#8B4513', '#CD7F32', '#DAA520', '#CD7F32', '#8B4513'],
    silver: ['#71706E', '#C0C0C0', '#E8E8E8', '#C0C0C0', '#71706E'],
    gold: ['#B8860B', '#FFD700', '#FFFACD', '#FFD700', '#B8860B'],
    platinum: ['#808080', '#E5E4E2', '#FFFFFF', '#E5E4E2', '#808080'],
    diamond: ['#4169E1', '#87CEEB', '#E0FFFF', '#87CEEB', '#4169E1'],
  },

  // Badge tier colors
  badgeTier: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  },

  // Badge tier metallic gradients
  badgeMetallic: {
    bronze: ['#8B4513', '#CD7F32', '#DAA520', '#CD7F32', '#8B4513'],
    silver: ['#71706E', '#C0C0C0', '#E8E8E8', '#C0C0C0', '#71706E'],
    gold: ['#B8860B', '#FFD700', '#FFFACD', '#FFD700', '#B8860B'],
    platinum: ['#808080', '#E5E4E2', '#FFFFFF', '#E5E4E2', '#808080'],
  },

  // UI elements
  border: {
    subtle: '#2A2A35',
    default: '#3A3A48',
    strong: '#4A4A58',
  },
} as const;

export type RankColorKey = keyof typeof COLORS.rankBase;
export type BadgeTierKey = keyof typeof COLORS.badgeTier;
