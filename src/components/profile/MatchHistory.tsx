/**
 * MatchHistory - Display recent match results
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { MatchResult } from '../../types';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';
import { DIMENSIONS } from '../../theme/dimensions';

interface MatchHistoryProps {
  matches: MatchResult[];
  maxMatches?: number;
}

interface MatchItemProps {
  match: MatchResult;
}

function MatchItem({ match }: MatchItemProps) {
  const outcomeConfig = {
    win: { 
      icon: 'check-circle' as const, 
      color: COLORS.accent.success,
      label: 'WIN',
    },
    loss: { 
      icon: 'x-circle' as const, 
      color: COLORS.accent.error,
      label: 'LOSS',
    },
    draw: { 
      icon: 'minus-circle' as const, 
      color: COLORS.text.secondary,
      label: 'DRAW',
    },
  };
  
  const config = outcomeConfig[match.outcome];
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays}d ago`;
    }
    if (diffHours > 0) {
      return `${diffHours}h ago`;
    }
    return 'Just now';
  };

  return (
    <View style={styles.matchItem}>
      <View style={[styles.outcomeIndicator, { backgroundColor: config.color }]}>
        <Feather name={config.icon} size={16} color={COLORS.background.primary} />
      </View>
      
      <View style={styles.matchContent}>
        <View style={styles.matchMain}>
          <Text style={styles.outcomeLabel}>{config.label}</Text>
          <Text style={styles.vsText}> vs </Text>
          <Text style={styles.opponentName}>{match.opponentName}</Text>
        </View>
        <Text style={styles.matchTime}>{formatTime(match.timestamp)}</Text>
      </View>
      
      <View style={styles.xpGain}>
        <Text style={[styles.xpAmount, { color: config.color }]}>
          +{match.xpGained}
        </Text>
        <Text style={styles.xpLabel}>XP</Text>
      </View>
    </View>
  );
}

export function MatchHistory({ matches, maxMatches = 10 }: MatchHistoryProps) {
  const displayMatches = matches.slice(0, maxMatches);

  if (displayMatches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="inbox" size={32} color={COLORS.text.tertiary} />
        <Text style={styles.emptyText}>No matches yet</Text>
        <Text style={styles.emptySubtext}>Play a match to see your history</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {displayMatches.map((match) => (
        <MatchItem key={match.id} match={match} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    height: DIMENSIONS.profile.matchRowHeight,
  },
  outcomeIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  matchContent: {
    flex: 1,
  },
  matchMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outcomeLabel: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.bodySmall,
    color: COLORS.text.primary,
    letterSpacing: 0.5,
  },
  vsText: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.bodySmall,
    color: COLORS.text.tertiary,
  },
  opponentName: {
    fontFamily: FONT_FAMILY.outfitMedium,
    fontSize: FONT_SIZES.bodySmall,
    color: COLORS.text.secondary,
  },
  matchTime: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
    marginTop: SPACING.xxs,
  },
  xpGain: {
    alignItems: 'flex-end',
    marginLeft: SPACING.sm,
  },
  xpAmount: {
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
    fontSize: FONT_SIZES.bodySmall,
  },
  xpLabel: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    gap: SPACING.sm,
  },
  emptyText: {
    fontFamily: FONT_FAMILY.outfitMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.text.secondary,
  },
  emptySubtext: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.bodySmall,
    color: COLORS.text.tertiary,
  },
});

export default MatchHistory;
