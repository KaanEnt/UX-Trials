/**
 * Core type definitions for the Ranked Leaderboard System
 */

// Rank IDs
export type RankId = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// Badge tier types
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

// XP Trigger types
export type TriggerType = 'additive' | 'multiplicative';
export type TriggerActivation = 'instant' | 'overtime';

// Grade display configuration
export interface GradeDisplay {
  type: 'asset' | 'char';
  asset?: 'numeral_I' | 'star';
  char?: string;
  count: number;
}

// Rank configuration
export interface RankConfig {
  id: RankId;
  name: string;
  color: string;
  metallic: string[];
}

// Rank state calculated from XP
export interface RankState {
  rankId: RankId;
  gradeIndex: number;
  xpInCurrentGrade: number;
  xpToNextGrade: number;
  progressPercent: number;
}

// Profile frame configuration (persisted in user record)
export interface ProfileFrame {
  rankId: RankId;
  gradeIndex: number;
  prestigeLevel: number;
  metallicColors: string[];
}

// Badge configuration
export interface BadgeConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  criteria: string;
}

// Task configuration
export interface TaskConfig {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  icon: string;
}

// XP Trigger configuration
export interface XPTrigger {
  id: string;
  name: string;
  type: TriggerType;
  activation: TriggerActivation;
  value: number;
  condition?: {
    count?: number;
    timeWindowDays?: number;
  };
}

// User flags for XP triggers
export interface UserFlags {
  consecutiveLogins: number;
  winStreak: number;
  dailyBonus: boolean;
  lastLoginDate: string;
  gamesPlayed: number;
  perfectGames: number;
}

// Match result
export interface MatchResult {
  id: string;
  opponentId: string;
  opponentName: string;
  outcome: 'win' | 'loss' | 'draw';
  xpGained: number;
  timestamp: string;
}

// User task progress
export interface UserTask {
  taskId: string;
  progress: number;
  target: number;
  completed: boolean;
}

// User badge (earned badge with metadata)
export interface UserBadge {
  badgeId: string;
  earnedAt: string;
}

// Complete user record
export interface User {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  rank: RankId;
  grade: number;
  prestige: number;
  flags: UserFlags;
  badges: UserBadge[];
  tasks: UserTask[];
  matchHistory: MatchResult[];
  profileFrame: ProfileFrame;
  stats: {
    playTime: number; // hours
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  };
}

// Trophy frame size variants
export type TrophySize = 'small' | 'medium' | 'large';

// Badge size variants
export type BadgeSize = 'small' | 'medium' | 'large';

// Prestige decoration type
export type PrestigeDecoration = 'none' | 'crown' | 'wings' | 'halo' | 'flames' | 'stars';
