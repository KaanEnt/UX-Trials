/**
 * StatsPanel - Display user statistics in a grid
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { User } from '../../types';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';

interface StatsPanelProps {
  user: User;
  compact?: boolean;
}

interface StatItemProps {
  label: string;
  value: string | number;
  color?: string;
  size?: 'normal' | 'large';
}

function StatItem({ label, value, color = COLORS.text.primary, size = 'normal' }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text 
        style={[
          styles.statValue, 
          { color },
          size === 'large' && styles.statValueLarge
        ]}
      >
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function StatsPanel({ user, compact = false }: StatsPanelProps) {
  const winRate = user.stats.wins + user.stats.losses > 0
    ? Math.round((user.stats.wins / (user.stats.wins + user.stats.losses)) * 100)
    : 0;
  
  const totalGames = user.stats.wins + user.stats.losses + user.stats.draws;

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <StatItem 
          label="Play Time" 
          value={`${user.stats.playTime}h`} 
        />
        <View style={styles.divider} />
        <StatItem 
          label="Win Rate" 
          value={`${winRate}%`}
          color={winRate >= 50 ? COLORS.accent.success : COLORS.accent.error}
        />
        <View style={styles.divider} />
        <StatItem 
          label="Games" 
          value={totalGames}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StatItem 
          label="Total XP" 
          value={user.xp.toLocaleString()} 
          color={COLORS.accent.primary}
          size="large"
        />
        <StatItem 
          label="Win Rate" 
          value={`${winRate}%`}
          color={winRate >= 50 ? COLORS.accent.success : COLORS.accent.error}
          size="large"
        />
      </View>
      
      <View style={styles.row}>
        <StatItem label="Wins" value={user.stats.wins} color={COLORS.accent.success} />
        <StatItem label="Losses" value={user.stats.losses} color={COLORS.accent.error} />
        <StatItem label="Draws" value={user.stats.draws} color={COLORS.text.secondary} />
      </View>
      
      <View style={styles.row}>
        <StatItem label="Play Time" value={`${user.stats.playTime}h`} />
        <StatItem label="Win Streak" value={user.flags.winStreak} color={COLORS.accent.warning} />
        <StatItem label="Login Streak" value={user.flags.consecutiveLogins} />
      </View>
      
      <View style={styles.row}>
        <StatItem label="Badges" value={user.badges.length} color={COLORS.accent.secondary} />
        <StatItem label="Perfect Games" value={user.flags.perfectGames} color={COLORS.accent.primary} />
        <StatItem label="Prestige" value={user.prestige} color={COLORS.rankBase.gold} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
    fontSize: FONT_SIZES.statSmall,
    color: COLORS.text.primary,
  },
  statValueLarge: {
    fontSize: FONT_SIZES.statMedium,
  },
  statLabel: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
    marginTop: SPACING.xxs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border.subtle,
    marginHorizontal: SPACING.md,
  },
});

export default StatsPanel;
