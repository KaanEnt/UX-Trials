/**
 * GradeIndicator - Displays grade symbols algorithmically
 * Uses single assets repeated (I, star) or unicode chars (-, =, ≡)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { getGradeDisplay } from '../../utils/gradeCalculator';
import { DIMENSIONS } from '../../theme/dimensions';
import { COLORS } from '../../theme/colors';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';
import type { RankId } from '../../types';

interface GradeIndicatorProps {
  gradeIndex: number;
  rankId?: RankId;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const SIZE_SCALE = {
  small: 0.75,
  medium: 1,
  large: 1.25,
};

// Roman numeral I SVG
function NumeralI({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size * 0.4} height={size} viewBox="0 0 8 20">
      <Defs>
        <LinearGradient id="numeralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} />
          <Stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.3} />
          <Stop offset="100%" stopColor={color} />
        </LinearGradient>
      </Defs>
      <Path
        d="M1 2 L7 2 L7 4 L5 4 L5 16 L7 16 L7 18 L1 18 L1 16 L3 16 L3 4 L1 4 Z"
        fill={color}
      />
    </Svg>
  );
}

// Star SVG
function StarSymbol({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Defs>
        <LinearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} />
          <Stop offset="50%" stopColor="#FFFACD" />
          <Stop offset="100%" stopColor={color} />
        </LinearGradient>
      </Defs>
      <Path
        d="M10 1 L12.5 7 L19 7.5 L14 12 L15.5 19 L10 15.5 L4.5 19 L6 12 L1 7.5 L7.5 7 Z"
        fill="url(#starGrad)"
      />
    </Svg>
  );
}

export function GradeIndicator({
  gradeIndex,
  rankId = 'gold',
  color,
  size = 'medium',
}: GradeIndicatorProps) {
  const scale = SIZE_SCALE[size];
  const symbolSize = DIMENSIONS.grade.symbolSize * scale;
  const gap = DIMENSIONS.grade.symbolGap * scale;
  
  const gradeDisplay = getGradeDisplay(gradeIndex);
  
  // Determine color based on rank if not provided
  const displayColor = color ?? COLORS.rankBase[rankId] ?? COLORS.rankBase.gold;

  // Render repeated assets
  if (gradeDisplay.type === 'asset') {
    const symbols = Array(gradeDisplay.count).fill(null);
    
    return (
      <View style={[styles.container, { gap }]}>
        {symbols.map((_, index) => (
          <View key={index} style={styles.symbol}>
            {gradeDisplay.asset === 'numeral_I' ? (
              <NumeralI size={symbolSize} color={displayColor} />
            ) : (
              <StarSymbol size={symbolSize} color={displayColor} />
            )}
          </View>
        ))}
      </View>
    );
  }

  // Render unicode character
  return (
    <View style={styles.container}>
      <Text style={[
        styles.charSymbol,
        {
          fontSize: symbolSize * 1.5,
          color: displayColor,
        }
      ]}>
        {gradeDisplay.char}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: DIMENSIONS.grade.containerHeight,
  },
  symbol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  charSymbol: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontWeight: '600',
  },
});

export default GradeIndicator;
