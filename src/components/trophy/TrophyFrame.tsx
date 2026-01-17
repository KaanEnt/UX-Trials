/**
 * TrophyFrame - Circular metallic ring with profile image
 * Uses SVG linear gradients for metallic effect
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, ClipPath, G } from 'react-native-svg';
import type { TrophySize, ProfileFrame } from '../../types';
import { DIMENSIONS } from '../../theme/dimensions';
import { COLORS } from '../../theme/colors';
import { METALLIC_GRADIENT } from '../../theme/effects';

interface TrophyFrameProps {
  profileFrame: ProfileFrame;
  avatarUrl?: string;
  size?: TrophySize;
  showDecoration?: boolean;
}

const SIZES = {
  small: DIMENSIONS.trophyFrame.small,
  medium: DIMENSIONS.trophyFrame.medium,
  large: DIMENSIONS.trophyFrame.large,
};

export function TrophyFrame({
  profileFrame,
  avatarUrl,
  size = 'medium',
  showDecoration = true,
}: TrophyFrameProps) {
  const frameSize = SIZES[size];
  const ringWidth = DIMENSIONS.trophyFrame.ringWidth;
  const radius = (frameSize - ringWidth) / 2;
  const center = frameSize / 2;
  const innerRadius = radius - ringWidth / 2;
  const metallicColors = profileFrame.metallicColors;

  // Generate unique gradient ID
  const gradientId = `metallic-${profileFrame.rankId}-${Math.random().toString(36).substr(2, 9)}`;
  const clipPathId = `clip-${gradientId}`;

  return (
    <View style={[styles.container, { width: frameSize, height: frameSize }]}>
      <Svg width={frameSize} height={frameSize} viewBox={`0 0 ${frameSize} ${frameSize}`}>
        <Defs>
          {/* Metallic gradient - diagonal for shine effect */}
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {metallicColors.map((color, index) => (
              <Stop
                key={index}
                offset={`${METALLIC_GRADIENT.stops[index] * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>

          {/* Clip path for avatar */}
          <ClipPath id={clipPathId}>
            <Circle cx={center} cy={center} r={innerRadius - 2} />
          </ClipPath>
        </Defs>

        {/* Background circle (dark) */}
        <Circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill={COLORS.background.secondary}
        />

        {/* Metallic ring */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={ringWidth}
          fill="none"
        />

        {/* Inner shadow ring for depth */}
        <Circle
          cx={center}
          cy={center}
          r={innerRadius}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={2}
          fill="none"
        />
      </Svg>

      {/* Avatar image positioned on top */}
      {avatarUrl && (
        <View style={[styles.avatarContainer, { 
          width: innerRadius * 2 - 4,
          height: innerRadius * 2 - 4,
          borderRadius: innerRadius - 2,
          top: ringWidth / 2 + 2,
          left: ringWidth / 2 + 2,
        }]}>
          <Image
            source={{ uri: avatarUrl }}
            style={[styles.avatar, {
              width: innerRadius * 2 - 4,
              height: innerRadius * 2 - 4,
              borderRadius: innerRadius - 2,
            }]}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Placeholder when no avatar */}
      {!avatarUrl && (
        <View style={[styles.placeholder, {
          width: innerRadius * 2 - 4,
          height: innerRadius * 2 - 4,
          borderRadius: innerRadius - 2,
          top: ringWidth / 2 + 2,
          left: ringWidth / 2 + 2,
        }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    backgroundColor: COLORS.background.tertiary,
  },
});

export default TrophyFrame;
