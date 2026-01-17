/**
 * Leaderboard home page - Displays ranked users
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAllUsers } from '../src/hooks/useUser';
import { TrophyFrame } from '../src/components/trophy/TrophyFrame';
import { GradeIndicator } from '../src/components/trophy/GradeIndicator';
import { getRankConfig, GRADE_NAMES } from '../src/config/ranks';
import { calculateRankFromXP } from '../src/utils/rankProgression';
import { formatXP } from '../src/utils/xpCalculator';
import type { User } from '../src/types';
import { COLORS } from '../src/theme/colors';
import { SPACING, BORDER_RADIUS } from '../src/theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../src/theme/typography';
import { DIMENSIONS } from '../src/theme/dimensions';

interface LeaderboardItemProps {
  user: User;
  rank: number;
  onPress: () => void;
}

function LeaderboardItem({ user, rank, onPress }: LeaderboardItemProps) {
  const rankConfig = getRankConfig(user.rank);
  const rankState = calculateRankFromXP(user.xp);
  
  // Position indicator styling
  const positionStyles = {
    1: { bg: '#FFD700', text: '#0D0D12' },
    2: { bg: '#C0C0C0', text: '#0D0D12' },
    3: { bg: '#CD7F32', text: '#FFFFFF' },
  };
  
  const positionStyle = positionStyles[rank as keyof typeof positionStyles] ?? {
    bg: COLORS.background.tertiary,
    text: COLORS.text.secondary,
  };

  return (
    <Pressable style={styles.item} onPress={onPress}>
      {/* Position indicator */}
      <View style={[styles.position, { backgroundColor: positionStyle.bg }]}>
        <Text style={[styles.positionText, { color: positionStyle.text }]}>
          {rank}
        </Text>
      </View>
      
      {/* Trophy frame with avatar */}
      <View style={styles.avatarContainer}>
        <TrophyFrame
          profileFrame={user.profileFrame}
          avatarUrl={user.avatar}
          size="small"
        />
      </View>
      
      {/* User info */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.rankInfo}>
          <Text style={[styles.rankName, { color: rankConfig.color }]}>
            {rankConfig.name}
          </Text>
          <GradeIndicator 
            gradeIndex={user.grade} 
            rankId={user.rank}
            size="small"
          />
        </View>
      </View>
      
      {/* XP */}
      <View style={styles.xpContainer}>
        <Text style={styles.xpValue}>{formatXP(user.xp)}</Text>
        <Text style={styles.xpLabel}>XP</Text>
      </View>
      
      {/* Arrow */}
      <Feather name="chevron-right" size={20} color={COLORS.text.tertiary} />
    </Pressable>
  );
}

export default function LeaderboardScreen() {
  const { users, loading, error } = useAllUsers();

  const handleUserPress = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <View style={styles.container}>
      {/* Header stats */}
      <View style={styles.header}>
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>{users.length}</Text>
          <Text style={styles.headerStatLabel}>Players</Text>
        </View>
        <View style={styles.headerDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>
            {formatXP(users.reduce((sum, u) => sum + u.xp, 0))}
          </Text>
          <Text style={styles.headerStatLabel}>Total XP</Text>
        </View>
        <View style={styles.headerDivider} />
        <View style={styles.headerStat}>
          <Text style={styles.headerStatValue}>
            {users.reduce((sum, u) => sum + u.badges.length, 0)}
          </Text>
          <Text style={styles.headerStatLabel}>Badges</Text>
        </View>
      </View>

      {/* Leaderboard list */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LeaderboardItem
            user={item}
            rank={index + 1}
            onPress={() => handleUserPress(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatValue: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.h2,
    color: COLORS.accent.primary,
  },
  headerStatLabel: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border.subtle,
  },
  list: {
    padding: SPACING.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    height: DIMENSIONS.leaderboard.rowHeight,
  },
  position: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  positionText: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.body,
  },
  avatarContainer: {
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontFamily: FONT_FAMILY.outfitSemiBold,
    fontSize: FONT_SIZES.body,
    color: COLORS.text.primary,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xxs,
  },
  rankName: {
    fontFamily: FONT_FAMILY.rajdhani,
    fontSize: FONT_SIZES.bodySmall,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  xpContainer: {
    alignItems: 'flex-end',
    marginRight: SPACING.sm,
  },
  xpValue: {
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.text.primary,
  },
  xpLabel: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
  },
  separator: {
    height: SPACING.sm,
  },
});
