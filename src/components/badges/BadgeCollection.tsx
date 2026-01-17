/**
 * BadgeCollection - Grid display of user badges
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Badge } from './Badge';
import type { UserBadge, BadgeConfig } from '../../types';
import { getBadgeConfig, BADGES } from '../../config/badges';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';
import { DIMENSIONS } from '../../theme/dimensions';

interface BadgeCollectionProps {
  earnedBadges: UserBadge[];
  showAll?: boolean; // Show all badges (earned + locked)
  columns?: number;
  onBadgePress?: (badgeId: string) => void;
}

export function BadgeCollection({
  earnedBadges,
  showAll = false,
  columns = DIMENSIONS.profile.badgeGridColumns,
  onBadgePress,
}: BadgeCollectionProps) {
  const earnedIds = new Set(earnedBadges.map((b) => b.badgeId));
  
  // Determine which badges to show
  const badgesToShow = showAll
    ? BADGES
    : BADGES.filter((b) => earnedIds.has(b.id));
  
  // Sort: earned first, then by tier (platinum > gold > silver > bronze)
  const tierOrder: Record<string, number> = {
    platinum: 0,
    gold: 1,
    silver: 2,
    bronze: 3,
  };
  
  const sortedBadges = [...badgesToShow].sort((a, b) => {
    const aEarned = earnedIds.has(a.id);
    const bEarned = earnedIds.has(b.id);
    
    if (aEarned !== bEarned) {
      return aEarned ? -1 : 1;
    }
    
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  if (sortedBadges.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No badges earned yet</Text>
        <Text style={styles.emptySubtext}>Complete challenges to earn badges</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.grid, { gap: SPACING.md }]}>
        {sortedBadges.map((badge) => (
          <View key={badge.id} style={styles.badgeWrapper}>
            <Badge
              tier={badge.tier}
              icon={badge.icon}
              earned={earnedIds.has(badge.id)}
              size="medium"
              onPress={() => onBadgePress?.(badge.id)}
            />
            <Text 
              style={[
                styles.badgeName,
                !earnedIds.has(badge.id) && styles.badgeNameLocked
              ]}
              numberOfLines={1}
            >
              {badge.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// Empty slot component for showing available badge slots
export function BadgeSlot() {
  return (
    <View style={styles.slot}>
      <View style={styles.slotInner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgeWrapper: {
    alignItems: 'center',
    width: DIMENSIONS.badge.medium + SPACING.lg,
    marginBottom: SPACING.sm,
  },
  badgeName: {
    marginTop: SPACING.xs,
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: COLORS.text.tertiary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
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
    marginTop: SPACING.xs,
  },
  slot: {
    width: DIMENSIONS.badge.medium,
    height: DIMENSIONS.badge.medium,
    borderRadius: DIMENSIONS.badge.medium / 2,
    borderWidth: 2,
    borderColor: COLORS.border.subtle,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotInner: {
    width: DIMENSIONS.badge.medium * 0.6,
    height: DIMENSIONS.badge.medium * 0.6,
    borderRadius: DIMENSIONS.badge.medium * 0.3,
    backgroundColor: COLORS.background.tertiary,
  },
});

export default BadgeCollection;
