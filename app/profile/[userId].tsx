/**
 * Profile page - Displays user profile with stats, badges, and match history
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useUser, useUserRankInfo } from '../../src/hooks/useUser';
import { TrophyFrame } from '../../src/components/trophy/TrophyFrame';
import { PrestigeDecoration } from '../../src/components/trophy/PrestigeDecoration';
import { GradeIndicator } from '../../src/components/trophy/GradeIndicator';
import { ProgressBar } from '../../src/components/profile/ProgressBar';
import { StatsPanel } from '../../src/components/profile/StatsPanel';
import { TaskList } from '../../src/components/profile/TaskList';
import { MatchHistory } from '../../src/components/profile/MatchHistory';
import { BadgeCollection } from '../../src/components/badges/BadgeCollection';
import { getRankConfig, getPrestigeDecoration, XP_PER_GRADE } from '../../src/config/ranks';
import { getRankDisplayName } from '../../src/utils/gradeCalculator';
import { isMaxRank } from '../../src/utils/rankProgression';
import { COLORS } from '../../src/theme/colors';
import { SPACING, BORDER_RADIUS } from '../../src/theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../../src/theme/typography';

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { user, loading, error } = useUser(userId ?? '');
  const rankInfo = useUserRankInfo(user);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const rankConfig = getRankConfig(user.rank);
  const prestigeDecoration = getPrestigeDecoration(user.prestige);
  const isAtMaxRank = isMaxRank(user.rank, user.grade);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.header}>
        {/* Trophy section */}
        <View style={styles.trophySection}>
          {/* Prestige decoration */}
          {prestigeDecoration !== 'none' && (
            <View style={styles.prestigeContainer}>
              <PrestigeDecoration
                decoration={prestigeDecoration}
                size="medium"
                color={rankConfig.color}
              />
            </View>
          )}
          
          {/* Trophy frame */}
          <TrophyFrame
            profileFrame={user.profileFrame}
            avatarUrl={user.avatar}
            size="large"
          />
          
          {/* Grade indicator */}
          <View style={styles.gradeContainer}>
            <GradeIndicator
              gradeIndex={user.grade}
              rankId={user.rank}
              size="large"
            />
          </View>
        </View>
        
        {/* User info */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={[styles.rankDisplay, { color: rankConfig.color }]}>
            {getRankDisplayName(rankConfig.name, user.grade)}
          </Text>
          
          {user.prestige > 0 && (
            <View style={styles.prestigeBadge}>
              <Text style={styles.prestigeText}>Prestige {user.prestige}</Text>
            </View>
          )}
          
          {/* Compact stats */}
          <View style={styles.compactStats}>
            <StatsPanel user={user} compact />
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {isAtMaxRank ? 'Max Rank Achieved' : 'Progress to Next Grade'}
        </Text>
        <ProgressBar
          progress={rankInfo?.progressPercent ?? 0}
          rankId={user.rank}
          currentXP={rankInfo?.xpInCurrentGrade ?? 0}
          targetXP={XP_PER_GRADE}
          isMaxRank={isAtMaxRank}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <StatsPanel user={user} />
      </View>

      {/* Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        <TaskList tasks={user.tasks} maxTasks={5} />
      </View>

      {/* Bottom section - Badges and Match History side by side on larger screens */}
      <View style={styles.bottomSection}>
        {/* Badges */}
        <View style={[styles.section, styles.halfSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <Text style={styles.sectionCount}>{user.badges.length}</Text>
          </View>
          <BadgeCollection
            earnedBadges={user.badges}
            showAll={false}
            columns={4}
          />
        </View>

        {/* Match History */}
        <View style={[styles.section, styles.halfSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Matches</Text>
          </View>
          <MatchHistory matches={user.matchHistory} maxMatches={5} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  loadingText: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.body,
    color: COLORS.text.secondary,
  },
  errorText: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.body,
    color: COLORS.accent.error,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  trophySection: {
    alignItems: 'center',
  },
  prestigeContainer: {
    marginBottom: -SPACING.sm,
    zIndex: 1,
  },
  gradeContainer: {
    marginTop: SPACING.sm,
  },
  userInfo: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  username: {
    fontFamily: FONT_FAMILY.outfitBold,
    fontSize: FONT_SIZES.h1,
    color: COLORS.text.primary,
  },
  rankDisplay: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.h2,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.xs,
  },
  prestigeBadge: {
    backgroundColor: COLORS.rankBase.gold,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xxs,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
  },
  prestigeText: {
    fontFamily: FONT_FAMILY.rajdhaniSemiBold,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.inverse,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  compactStats: {
    marginTop: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.outfitSemiBold,
    fontSize: FONT_SIZES.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  sectionCount: {
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.accent.secondary,
  },
  bottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  halfSection: {
    flex: 1,
    minWidth: 280,
  },
});
