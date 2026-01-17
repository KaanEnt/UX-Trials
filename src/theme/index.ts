/**
 * Combined theme export
 */

import { FONTS, FONT_SIZES, LINE_HEIGHTS, LETTER_SPACING, FONT_FAMILY } from './typography';
import { COLORS } from './colors';
import { SPACING, BORDER_RADIUS, GRID } from './spacing';
import { SHADOWS, METALLIC_GRADIENT, PROGRESS_BAR, ANIMATION, EASING, createGlow } from './effects';
import { DIMENSIONS } from './dimensions';

export const theme = {
  fonts: FONTS,
  fontFamily: FONT_FAMILY,
  fontSizes: FONT_SIZES,
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  grid: GRID,
  shadows: SHADOWS,
  metallicGradient: METALLIC_GRADIENT,
  progressBar: PROGRESS_BAR,
  animation: ANIMATION,
  easing: EASING,
  dimensions: DIMENSIONS,
  createGlow,
} as const;

export type Theme = typeof theme;

// Re-export individual modules
export * from './typography';
export * from './colors';
export * from './spacing';
export * from './effects';
export * from './dimensions';
