/**
 * Typography design system
 * Fonts: Outfit (primary), Rajdhani (display), JetBrains Mono (stats)
 */

export const FONTS = {
  // Primary: Clean geometric sans-serif for UI elements
  primary: {
    family: 'Outfit',
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  // Display: For ranks, numbers, stats - more impactful
  display: {
    family: 'Rajdhani',
    weights: {
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  // Mono: For XP numbers, stats, match data
  mono: {
    family: 'JetBrainsMono',
    weights: {
      regular: '400',
      medium: '500',
    },
  },
} as const;

export const FONT_SIZES = {
  // Display sizes (ranks, hero stats)
  displayLarge: 48,
  displayMedium: 36,
  displaySmall: 28,

  // Headings
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,

  // Body text
  bodyLarge: 16,
  body: 14,
  bodySmall: 12,

  // Captions & labels
  caption: 11,
  label: 10,

  // XP/Stats numbers
  statLarge: 32,
  statMedium: 24,
  statSmall: 18,
} as const;

export const LINE_HEIGHTS = {
  tight: 1.1,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  extraWide: 1.5, // For labels, rank names
} as const;

// Font family mappings for React Native
export const FONT_FAMILY = {
  // Outfit variants
  outfit: 'Outfit_400Regular',
  outfitMedium: 'Outfit_500Medium',
  outfitSemiBold: 'Outfit_600SemiBold',
  outfitBold: 'Outfit_700Bold',

  // Rajdhani variants
  rajdhani: 'Rajdhani_500Medium',
  rajdhaniSemiBold: 'Rajdhani_600SemiBold',
  radjhaniBold: 'Rajdhani_700Bold',

  // JetBrains Mono variants
  jetbrainsMono: 'JetBrainsMono_400Regular',
  jetbrainsMonoMedium: 'JetBrainsMono_500Medium',
} as const;
