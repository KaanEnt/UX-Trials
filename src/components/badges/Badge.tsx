/**
 * Badge - Circular badge with metallic frame and glint animation
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, G, Path, Rect, ClipPath } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import type { BadgeSize, BadgeTier } from '../../types';
import { COLORS } from '../../theme/colors';
import { DIMENSIONS } from '../../theme/dimensions';
import { ANIMATION } from '../../theme/effects';

interface BadgeProps {
  tier: BadgeTier;
  icon: string;
  size?: BadgeSize;
  earned?: boolean;
  onPress?: () => void;
}

const SIZES = {
  small: DIMENSIONS.badge.small,
  medium: DIMENSIONS.badge.medium,
  large: DIMENSIONS.badge.large,
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function Badge({
  tier,
  icon,
  size = 'medium',
  earned = true,
  onPress,
}: BadgeProps) {
  const badgeSize = SIZES[size];
  const ringWidth = DIMENSIONS.badge.ringWidth;
  const radius = (badgeSize - ringWidth) / 2;
  const center = badgeSize / 2;
  const innerRadius = radius - ringWidth / 2;
  const iconSize = badgeSize * 0.4;
  
  // Get metallic colors for tier
  const metallicColors = COLORS.badgeMetallic[tier];
  
  // Glint animation
  const glintProgress = useSharedValue(0);
  
  const handlePress = () => {
    // Trigger glint animation
    glintProgress.value = 0;
    glintProgress.value = withTiming(1, {
      duration: ANIMATION.glint,
      easing: Easing.inOut(Easing.ease),
    });
    
    onPress?.();
  };
  
  const glintStyle = useAnimatedStyle(() => {
    const rotation = interpolate(glintProgress.value, [0, 1], [0, 360]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });
  
  // Unique IDs for this badge instance
  const gradientId = `badge-${tier}-${Math.random().toString(36).substr(2, 9)}`;
  const glintGradientId = `glint-${gradientId}`;
  const clipId = `clip-${gradientId}`;

  // Map icon name to Feather icon
  const iconName = mapIconName(icon);

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.wrapper, glintStyle]}>
        <Svg width={badgeSize} height={badgeSize} viewBox={`0 0 ${badgeSize} ${badgeSize}`}>
          <Defs>
            {/* Metallic gradient */}
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {metallicColors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${index * 25}%`}
                  stopColor={color}
                />
              ))}
            </LinearGradient>
            
            {/* Glint highlight gradient */}
            <LinearGradient id={glintGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <Stop offset="45%" stopColor="rgba(255,255,255,0)" />
              <Stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
              <Stop offset="55%" stopColor="rgba(255,255,255,0)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </LinearGradient>
            
            <ClipPath id={clipId}>
              <Circle cx={center} cy={center} r={innerRadius} />
            </ClipPath>
          </Defs>
          
          {/* Background */}
          <Circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill={earned ? COLORS.background.tertiary : COLORS.background.secondary}
          />
          
          {/* Metallic ring */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={earned ? `url(#${gradientId})` : COLORS.border.default}
            strokeWidth={ringWidth}
            fill="none"
            opacity={earned ? 1 : 0.4}
          />
          
          {/* Glint overlay */}
          {earned && (
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={`url(#${glintGradientId})`}
              strokeWidth={ringWidth}
              fill="none"
            />
          )}
        </Svg>
      </Animated.View>
      
      {/* Icon centered on badge */}
      <View style={[styles.iconContainer, { 
        width: badgeSize, 
        height: badgeSize,
      }]}>
        <Feather
          name={iconName as any}
          size={iconSize}
          color={earned ? COLORS.badgeTier[tier] : COLORS.text.tertiary}
        />
      </View>
      
      {/* Locked overlay for unearned badges */}
      {!earned && (
        <View style={[styles.lockedOverlay, {
          width: innerRadius * 2,
          height: innerRadius * 2,
          borderRadius: innerRadius,
          top: ringWidth / 2,
          left: ringWidth / 2,
        }]}>
          <Feather name="lock" size={iconSize * 0.6} color={COLORS.text.tertiary} />
        </View>
      )}
    </Pressable>
  );
}

// Map our icon names to Feather icon names
function mapIconName(icon: string): string {
  const iconMap: Record<string, string> = {
    'trophy': 'award',
    'star': 'star',
    'calendar': 'calendar',
    'zap': 'zap',
    'flame': 'zap', // Feather doesn't have flame, using zap
    'award': 'award',
    'target': 'target',
    'clock': 'clock',
    'trending-up': 'trending-up',
    'check-circle': 'check-circle',
    'heart': 'heart',
    'shield': 'shield',
    'crown': 'award', // Using award as fallback
    'gem': 'hexagon',
    'infinity': 'repeat',
  };
  
  return iconMap[icon] ?? 'circle';
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  wrapper: {
    // Animated wrapper for glint rotation
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Badge;
