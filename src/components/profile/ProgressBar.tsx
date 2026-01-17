/**
 * ProgressBar - SVG-based progress bar with liquid glow animation
 * Features 45° slanted stripes and pulsing glow effect
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, ClipPath, Pattern, G, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import type { RankId } from '../../types';
import { COLORS } from '../../theme/colors';
import { DIMENSIONS } from '../../theme/dimensions';
import { PROGRESS_BAR, ANIMATION } from '../../theme/effects';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';
import { SPACING } from '../../theme/spacing';

interface ProgressBarProps {
  progress: number; // 0-100
  rankId: RankId;
  currentXP: number;
  targetXP: number;
  showLabel?: boolean;
  isMaxRank?: boolean;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedG = Animated.createAnimatedComponent(G);

export function ProgressBar({
  progress,
  rankId,
  currentXP,
  targetXP,
  showLabel = true,
  isMaxRank = false,
}: ProgressBarProps) {
  const barHeight = DIMENSIONS.progressBar.height;
  const barRadius = DIMENSIONS.progressBar.borderRadius;
  const fillColor = COLORS.rankBase[rankId];
  
  // Stripe animation - horizontal flow
  const stripeOffset = useSharedValue(0);
  
  // Glow animation - pulsing opacity
  const glowOpacity = useSharedValue(PROGRESS_BAR.glowIntensity.min);
  
  useEffect(() => {
    if (!isMaxRank) {
      // Stripe flow animation
      stripeOffset.value = withRepeat(
        withTiming(PROGRESS_BAR.stripeWidth + PROGRESS_BAR.stripeGap, {
          duration: PROGRESS_BAR.flowSpeed,
          easing: Easing.linear,
        }),
        -1, // infinite
        false // don't reverse
      );
      
      // Glow pulse animation
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(PROGRESS_BAR.glowIntensity.max, {
            duration: PROGRESS_BAR.glowPulseDuration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(PROGRESS_BAR.glowIntensity.min, {
            duration: PROGRESS_BAR.glowPulseDuration / 2,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // infinite
        false
      );
    }
  }, [isMaxRank]);
  
  // Animated props for glow
  const animatedGlowProps = useAnimatedProps(() => ({
    opacity: glowOpacity.value,
  }));
  
  // Animated props for stripe pattern
  const animatedStripeProps = useAnimatedProps(() => ({
    transform: [{ translateX: stripeOffset.value }],
  }));
  
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  // IDs for SVG elements
  const patternId = `stripes-${Math.random().toString(36).substr(2, 9)}`;
  const clipId = `clip-${patternId}`;
  const glowGradientId = `glow-${patternId}`;

  return (
    <View style={styles.container}>
      <View style={[styles.barContainer, { height: barHeight }]}>
        <Svg width="100%" height={barHeight} preserveAspectRatio="none">
          <Defs>
            {/* Clip path for rounded corners */}
            <ClipPath id={clipId}>
              <Rect
                x={0}
                y={0}
                width="100%"
                height={barHeight}
                rx={barRadius}
                ry={barRadius}
              />
            </ClipPath>
            
            {/* Stripe pattern */}
            <Pattern
              id={patternId}
              x={0}
              y={0}
              width={PROGRESS_BAR.stripeWidth + PROGRESS_BAR.stripeGap}
              height={barHeight}
              patternUnits="userSpaceOnUse"
            >
              <Rect
                x={0}
                y={0}
                width={PROGRESS_BAR.stripeWidth + PROGRESS_BAR.stripeGap}
                height={barHeight}
                fill={fillColor}
              />
              <Line
                x1={PROGRESS_BAR.stripeWidth}
                y1={0}
                x2={0}
                y2={barHeight}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={PROGRESS_BAR.stripeGap}
              />
            </Pattern>
            
            {/* Glow gradient */}
            <LinearGradient id={glowGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <Stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </LinearGradient>
          </Defs>
          
          <G clipPath={`url(#${clipId})`}>
            {/* Background track */}
            <Rect
              x={0}
              y={0}
              width="100%"
              height={barHeight}
              fill={COLORS.background.tertiary}
            />
            
            {/* Progress fill with stripes */}
            <AnimatedG animatedProps={animatedStripeProps}>
              <Rect
                x={-PROGRESS_BAR.stripeWidth - PROGRESS_BAR.stripeGap}
                y={0}
                width={`${clampedProgress + 5}%`}
                height={barHeight}
                fill={`url(#${patternId})`}
              />
            </AnimatedG>
            
            {/* Glow overlay */}
            {!isMaxRank && (
              <AnimatedRect
                animatedProps={animatedGlowProps}
                x={0}
                y={0}
                width={`${clampedProgress}%`}
                height={barHeight / 2}
                fill={`url(#${glowGradientId})`}
              />
            )}
            
            {/* Border */}
            <Rect
              x={1}
              y={1}
              width="calc(100% - 2)"
              height={barHeight - 2}
              rx={barRadius - 1}
              ry={barRadius - 1}
              fill="none"
              stroke={COLORS.border.subtle}
              strokeWidth={1}
            />
          </G>
        </Svg>
      </View>
      
      {showLabel && (
        <View style={styles.labelContainer}>
          {isMaxRank ? (
            <Text style={styles.maxRankText}>MAX RANK</Text>
          ) : (
            <Text style={styles.xpText}>
              <Text style={styles.xpCurrent}>{currentXP.toLocaleString()}</Text>
              <Text style={styles.xpSeparator}> / </Text>
              <Text style={styles.xpTarget}>{targetXP.toLocaleString()} XP</Text>
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: DIMENSIONS.progressBar.borderRadius,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  xpText: {
    fontFamily: FONT_FAMILY.jetbrainsMono,
    fontSize: FONT_SIZES.bodySmall,
  },
  xpCurrent: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
  },
  xpSeparator: {
    color: COLORS.text.tertiary,
  },
  xpTarget: {
    color: COLORS.text.secondary,
  },
  maxRankText: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.body,
    color: COLORS.accent.warning,
    letterSpacing: 2,
  },
});

export default ProgressBar;
