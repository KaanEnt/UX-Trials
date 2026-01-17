/**
 * Shadows, gradients, and animation effects
 */

import { Platform } from 'react-native';

// Shadow styles - platform specific
export const SHADOWS = {
  none: {},
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    },
  }),
} as const;

// Glow effect generator
export const createGlow = (color: string) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
    web: {
      boxShadow: `0 0 12px ${color}`,
    },
  });

// Metallic gradient stops for SVG
export const METALLIC_GRADIENT = {
  // Gradient stop positions for shiny metallic effect (5 stops)
  stops: [0, 0.25, 0.5, 0.75, 1],
  // Animation for glint sweep (badge hover)
  glintAngle: 135, // degrees
  glintDuration: 600, // ms
} as const;

// Progress bar liquid animation config
export const PROGRESS_BAR = {
  stripeAngle: 45, // Slant angle in degrees
  stripeWidth: 20, // Width of each stripe
  stripeGap: 10, // Gap between stripes
  flowSpeed: 1500, // ms for stripe animation cycle
  glowPulseDuration: 3000, // ms for glow pulse
  glowIntensity: {
    min: 0.3,
    max: 0.8,
  },
  height: 24,
  borderRadius: 12,
} as const;

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  glint: 600,
  flow: 1500,
  glow: 3000,
} as const;

// Easing curves
export const EASING = {
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  linear: 'linear',
} as const;
