/**
 * PrestigeDecoration - Decorative elements above trophy frame
 * Crown, wings, halo, flames, stars based on prestige level
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import type { PrestigeDecoration as PrestigeDecorationType, TrophySize } from '../../types';
import { COLORS } from '../../theme/colors';
import { DIMENSIONS } from '../../theme/dimensions';

interface PrestigeDecorationProps {
  decoration: PrestigeDecorationType;
  size?: TrophySize;
  color?: string;
}

const SIZE_SCALE = {
  small: 0.5,
  medium: 0.75,
  large: 1,
};

// Crown SVG paths
function CrownDecoration({ scale, color }: { scale: number; color: string }) {
  const width = 60 * scale;
  const height = 40 * scale;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 60 40">
      <Defs>
        <LinearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#B8860B" />
          <Stop offset="30%" stopColor="#FFD700" />
          <Stop offset="50%" stopColor="#FFFACD" />
          <Stop offset="70%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#B8860B" />
        </LinearGradient>
      </Defs>
      <Path
        d="M5 35 L10 15 L20 25 L30 5 L40 25 L50 15 L55 35 Z"
        fill="url(#crownGold)"
        stroke="#B8860B"
        strokeWidth={1}
      />
      {/* Gems */}
      <Circle cx="30" cy="15" r="3" fill="#FF5252" />
      <Circle cx="18" cy="25" r="2" fill="#00D9FF" />
      <Circle cx="42" cy="25" r="2" fill="#00D9FF" />
    </Svg>
  );
}

// Wings SVG paths
function WingsDecoration({ scale, color }: { scale: number; color: string }) {
  const width = 100 * scale;
  const height = 35 * scale;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 100 35">
      <Defs>
        <LinearGradient id="wingsSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#71706E" />
          <Stop offset="30%" stopColor="#C0C0C0" />
          <Stop offset="50%" stopColor="#E8E8E8" />
          <Stop offset="70%" stopColor="#C0C0C0" />
          <Stop offset="100%" stopColor="#71706E" />
        </LinearGradient>
      </Defs>
      {/* Left wing */}
      <Path
        d="M50 30 Q30 25 20 20 Q10 15 5 5 Q15 15 25 18 Q35 21 45 25 Z"
        fill="url(#wingsSilver)"
        stroke="#71706E"
        strokeWidth={0.5}
      />
      <Path
        d="M50 30 Q35 28 30 25 Q20 20 15 10 Q25 18 35 22 Q42 26 48 28 Z"
        fill="#E8E8E8"
        opacity={0.5}
      />
      {/* Right wing */}
      <Path
        d="M50 30 Q70 25 80 20 Q90 15 95 5 Q85 15 75 18 Q65 21 55 25 Z"
        fill="url(#wingsSilver)"
        stroke="#71706E"
        strokeWidth={0.5}
      />
      <Path
        d="M50 30 Q65 28 70 25 Q80 20 85 10 Q75 18 65 22 Q58 26 52 28 Z"
        fill="#E8E8E8"
        opacity={0.5}
      />
    </Svg>
  );
}

// Halo SVG
function HaloDecoration({ scale, color }: { scale: number; color: string }) {
  const width = 80 * scale;
  const height = 20 * scale;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 80 20">
      <Defs>
        <LinearGradient id="haloGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#FFD700" stopOpacity={0.3} />
          <Stop offset="50%" stopColor="#FFFACD" stopOpacity={0.9} />
          <Stop offset="100%" stopColor="#FFD700" stopOpacity={0.3} />
        </LinearGradient>
      </Defs>
      {/* Outer glow */}
      <Path
        d="M10 15 Q40 0 70 15"
        stroke="#FFD700"
        strokeWidth={6}
        fill="none"
        opacity={0.3}
      />
      {/* Inner ring */}
      <Path
        d="M10 15 Q40 2 70 15"
        stroke="url(#haloGold)"
        strokeWidth={3}
        fill="none"
      />
    </Svg>
  );
}

// Flames SVG
function FlamesDecoration({ scale, color }: { scale: number; color: string }) {
  const width = 80 * scale;
  const height = 30 * scale;
  
  return (
    <Svg width={width} height={height} viewBox="0 0 80 30">
      <Defs>
        <LinearGradient id="flame" x1="0%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor="#FF5252" />
          <Stop offset="50%" stopColor="#FFB800" />
          <Stop offset="100%" stopColor="#FFFACD" />
        </LinearGradient>
      </Defs>
      {/* Multiple flame paths */}
      <Path
        d="M25 30 Q20 20 25 10 Q30 15 28 30 Z"
        fill="url(#flame)"
        opacity={0.9}
      />
      <Path
        d="M35 30 Q28 15 35 5 Q42 12 38 30 Z"
        fill="url(#flame)"
        opacity={0.95}
      />
      <Path
        d="M40 30 Q35 10 40 2 Q45 8 48 30 Z"
        fill="url(#flame)"
      />
      <Path
        d="M50 30 Q45 15 50 5 Q55 12 52 30 Z"
        fill="url(#flame)"
        opacity={0.95}
      />
      <Path
        d="M55 30 Q60 20 55 10 Q50 15 52 30 Z"
        fill="url(#flame)"
        opacity={0.9}
      />
    </Svg>
  );
}

// Stars SVG
function StarsDecoration({ scale, color }: { scale: number; color: string }) {
  const width = 90 * scale;
  const height = 25 * scale;
  
  const starPath = "M0,-8 L2,-2 L8,-2 L3,2 L5,8 L0,4 L-5,8 L-3,2 L-8,-2 L-2,-2 Z";
  
  return (
    <Svg width={width} height={height} viewBox="0 0 90 25">
      <Defs>
        <LinearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="50%" stopColor="#FFFACD" />
          <Stop offset="100%" stopColor="#FFD700" />
        </LinearGradient>
      </Defs>
      {/* Three stars */}
      <G transform="translate(25, 15) scale(0.8)">
        <Path d={starPath} fill="url(#starGold)" />
      </G>
      <G transform="translate(45, 10) scale(1)">
        <Path d={starPath} fill="url(#starGold)" />
      </G>
      <G transform="translate(65, 15) scale(0.8)">
        <Path d={starPath} fill="url(#starGold)" />
      </G>
    </Svg>
  );
}

export function PrestigeDecoration({
  decoration,
  size = 'medium',
  color = COLORS.rankBase.gold,
}: PrestigeDecorationProps) {
  const scale = SIZE_SCALE[size];

  if (decoration === 'none') {
    return null;
  }

  const renderDecoration = () => {
    switch (decoration) {
      case 'crown':
        return <CrownDecoration scale={scale} color={color} />;
      case 'wings':
        return <WingsDecoration scale={scale} color={color} />;
      case 'halo':
        return <HaloDecoration scale={scale} color={color} />;
      case 'flames':
        return <FlamesDecoration scale={scale} color={color} />;
      case 'stars':
        return <StarsDecoration scale={scale} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderDecoration()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrestigeDecoration;
