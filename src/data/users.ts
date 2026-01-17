/**
 * Mock user data for development
 */

import type { User } from '../types';
import { COLORS } from '../theme/colors';

export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    username: 'ProGamer99',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=ProGamer99',
    xp: 127500, // Gold rank
    rank: 'gold',
    grade: 8,
    prestige: 1,
    flags: {
      consecutiveLogins: 12,
      winStreak: 5,
      dailyBonus: true,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 245,
      perfectGames: 8,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2025-06-15' },
      { badgeId: 'newcomer', earnedAt: '2025-06-18' },
      { badgeId: 'daily_player', earnedAt: '2025-06-25' },
      { badgeId: 'streak_3', earnedAt: '2025-07-02' },
      { badgeId: 'veteran', earnedAt: '2025-09-10' },
      { badgeId: 'streak_5', earnedAt: '2025-10-05' },
      { badgeId: 'perfectionist', earnedAt: '2025-11-20' },
      { badgeId: 'dedicated', earnedAt: '2026-01-05' },
    ],
    tasks: [
      { taskId: 'daily_win_1', progress: 0, target: 1, completed: false },
      { taskId: 'daily_play_3', progress: 2, target: 3, completed: false },
      { taskId: 'streak_3', progress: 2, target: 3, completed: false },
      { taskId: 'weekly_wins_10', progress: 7, target: 10, completed: false },
      { taskId: 'daily_perfect', progress: 0, target: 1, completed: false },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user2', opponentName: 'NightOwl', outcome: 'win', xpGained: 125, timestamp: '2026-01-17T14:30:00Z' },
      { id: 'm2', opponentId: 'user3', opponentName: 'StarPlayer', outcome: 'win', xpGained: 110, timestamp: '2026-01-17T13:15:00Z' },
      { id: 'm3', opponentId: 'user5', opponentName: 'GameMaster', outcome: 'loss', xpGained: 25, timestamp: '2026-01-17T12:00:00Z' },
      { id: 'm4', opponentId: 'user4', opponentName: 'QuickDraw', outcome: 'win', xpGained: 100, timestamp: '2026-01-16T20:30:00Z' },
      { id: 'm5', opponentId: 'user6', opponentName: 'Phoenix', outcome: 'win', xpGained: 150, timestamp: '2026-01-16T18:00:00Z' },
    ],
    profileFrame: {
      rankId: 'gold',
      gradeIndex: 8,
      prestigeLevel: 1,
      metallicColors: COLORS.rankMetallic.gold,
    },
    stats: {
      playTime: 142,
      wins: 156,
      losses: 78,
      draws: 11,
      winRate: 66,
    },
  },
  {
    id: 'user2',
    username: 'NightOwl',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=NightOwl',
    xp: 185000, // Platinum rank
    rank: 'platinum',
    grade: 3,
    prestige: 2,
    flags: {
      consecutiveLogins: 28,
      winStreak: 3,
      dailyBonus: false,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 412,
      perfectGames: 15,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2025-03-10' },
      { badgeId: 'newcomer', earnedAt: '2025-03-12' },
      { badgeId: 'daily_player', earnedAt: '2025-03-20' },
      { badgeId: 'streak_3', earnedAt: '2025-04-01' },
      { badgeId: 'veteran', earnedAt: '2025-05-15' },
      { badgeId: 'consistent', earnedAt: '2025-06-01' },
      { badgeId: 'streak_5', earnedAt: '2025-07-10' },
      { badgeId: 'perfectionist', earnedAt: '2025-08-20' },
      { badgeId: 'dedicated', earnedAt: '2025-10-15' },
      { badgeId: 'centurion', earnedAt: '2025-12-01' },
      { badgeId: 'legendary_streak', earnedAt: '2026-01-02' },
    ],
    tasks: [
      { taskId: 'daily_win_1', progress: 1, target: 1, completed: true },
      { taskId: 'daily_play_3', progress: 3, target: 3, completed: true },
      { taskId: 'streak_5', progress: 3, target: 5, completed: false },
      { taskId: 'weekly_wins_10', progress: 10, target: 10, completed: true },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user1', opponentName: 'ProGamer99', outcome: 'loss', xpGained: 25, timestamp: '2026-01-17T14:30:00Z' },
      { id: 'm2', opponentId: 'user5', opponentName: 'GameMaster', outcome: 'win', xpGained: 175, timestamp: '2026-01-17T12:00:00Z' },
      { id: 'm3', opponentId: 'user3', opponentName: 'StarPlayer', outcome: 'win', xpGained: 100, timestamp: '2026-01-16T22:30:00Z' },
    ],
    profileFrame: {
      rankId: 'platinum',
      gradeIndex: 3,
      prestigeLevel: 2,
      metallicColors: COLORS.rankMetallic.platinum,
    },
    stats: {
      playTime: 310,
      wins: 268,
      losses: 132,
      draws: 12,
      winRate: 67,
    },
  },
  {
    id: 'user3',
    username: 'StarPlayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=StarPlayer',
    xp: 72500, // Silver rank
    rank: 'silver',
    grade: 6,
    prestige: 0,
    flags: {
      consecutiveLogins: 5,
      winStreak: 0,
      dailyBonus: true,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 98,
      perfectGames: 2,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2025-10-05' },
      { badgeId: 'newcomer', earnedAt: '2025-10-10' },
      { badgeId: 'daily_player', earnedAt: '2025-10-20' },
      { badgeId: 'first_blood', earnedAt: '2025-11-02' },
    ],
    tasks: [
      { taskId: 'daily_win_1', progress: 0, target: 1, completed: false },
      { taskId: 'daily_play_3', progress: 1, target: 3, completed: false },
      { taskId: 'streak_2', progress: 0, target: 2, completed: false },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user1', opponentName: 'ProGamer99', outcome: 'loss', xpGained: 25, timestamp: '2026-01-17T13:15:00Z' },
      { id: 'm2', opponentId: 'user2', opponentName: 'NightOwl', outcome: 'loss', xpGained: 25, timestamp: '2026-01-16T22:30:00Z' },
      { id: 'm3', opponentId: 'user4', opponentName: 'QuickDraw', outcome: 'win', xpGained: 100, timestamp: '2026-01-16T19:00:00Z' },
    ],
    profileFrame: {
      rankId: 'silver',
      gradeIndex: 6,
      prestigeLevel: 0,
      metallicColors: COLORS.rankMetallic.silver,
    },
    stats: {
      playTime: 45,
      wins: 52,
      losses: 44,
      draws: 2,
      winRate: 54,
    },
  },
  {
    id: 'user4',
    username: 'QuickDraw',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=QuickDraw',
    xp: 32000, // Bronze rank
    rank: 'bronze',
    grade: 6,
    prestige: 0,
    flags: {
      consecutiveLogins: 2,
      winStreak: 1,
      dailyBonus: true,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 42,
      perfectGames: 1,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2025-12-01' },
      { badgeId: 'newcomer', earnedAt: '2025-12-08' },
      { badgeId: 'first_blood', earnedAt: '2025-12-15' },
    ],
    tasks: [
      { taskId: 'daily_win_1', progress: 1, target: 1, completed: true },
      { taskId: 'daily_play_3', progress: 2, target: 3, completed: false },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user1', opponentName: 'ProGamer99', outcome: 'loss', xpGained: 25, timestamp: '2026-01-16T20:30:00Z' },
      { id: 'm2', opponentId: 'user3', opponentName: 'StarPlayer', outcome: 'loss', xpGained: 25, timestamp: '2026-01-16T19:00:00Z' },
      { id: 'm3', opponentId: 'user6', opponentName: 'Phoenix', outcome: 'win', xpGained: 100, timestamp: '2026-01-16T17:00:00Z' },
    ],
    profileFrame: {
      rankId: 'bronze',
      gradeIndex: 6,
      prestigeLevel: 0,
      metallicColors: COLORS.rankMetallic.bronze,
    },
    stats: {
      playTime: 18,
      wins: 22,
      losses: 19,
      draws: 1,
      winRate: 53,
    },
  },
  {
    id: 'user5',
    username: 'GameMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=GameMaster',
    xp: 220000, // Diamond rank (near max)
    rank: 'diamond',
    grade: 7,
    prestige: 3,
    flags: {
      consecutiveLogins: 45,
      winStreak: 8,
      dailyBonus: false,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 890,
      perfectGames: 42,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2024-08-01' },
      { badgeId: 'newcomer', earnedAt: '2024-08-03' },
      { badgeId: 'daily_player', earnedAt: '2024-08-10' },
      { badgeId: 'streak_3', earnedAt: '2024-08-15' },
      { badgeId: 'veteran', earnedAt: '2024-09-20' },
      { badgeId: 'consistent', earnedAt: '2024-10-01' },
      { badgeId: 'streak_5', earnedAt: '2024-10-20' },
      { badgeId: 'marathon', earnedAt: '2024-11-15' },
      { badgeId: 'perfectionist', earnedAt: '2024-12-01' },
      { badgeId: 'dedicated', earnedAt: '2025-02-01' },
      { badgeId: 'centurion', earnedAt: '2025-03-15' },
      { badgeId: 'legendary_streak', earnedAt: '2025-05-01' },
      { badgeId: 'grandmaster', earnedAt: '2025-08-01' },
    ],
    tasks: [
      { taskId: 'streak_5', progress: 8, target: 5, completed: true },
      { taskId: 'daily_perfect', progress: 0, target: 1, completed: false },
      { taskId: 'weekly_wins_10', progress: 8, target: 10, completed: false },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user1', opponentName: 'ProGamer99', outcome: 'win', xpGained: 50, timestamp: '2026-01-17T12:00:00Z' },
      { id: 'm2', opponentId: 'user2', opponentName: 'NightOwl', outcome: 'loss', xpGained: 25, timestamp: '2026-01-17T12:00:00Z' },
      { id: 'm3', opponentId: 'user3', opponentName: 'StarPlayer', outcome: 'win', xpGained: 200, timestamp: '2026-01-16T23:00:00Z' },
      { id: 'm4', opponentId: 'user4', opponentName: 'QuickDraw', outcome: 'win', xpGained: 200, timestamp: '2026-01-16T21:00:00Z' },
    ],
    profileFrame: {
      rankId: 'diamond',
      gradeIndex: 7,
      prestigeLevel: 3,
      metallicColors: COLORS.rankMetallic.diamond,
    },
    stats: {
      playTime: 892,
      wins: 612,
      losses: 256,
      draws: 22,
      winRate: 70,
    },
  },
  {
    id: 'user6',
    username: 'Phoenix',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Phoenix',
    xp: 15000, // Bronze rank
    rank: 'bronze',
    grade: 3,
    prestige: 0,
    flags: {
      consecutiveLogins: 1,
      winStreak: 0,
      dailyBonus: true,
      lastLoginDate: '2026-01-17',
      gamesPlayed: 18,
      perfectGames: 0,
    },
    badges: [
      { badgeId: 'first_win', earnedAt: '2026-01-10' },
      { badgeId: 'newcomer', earnedAt: '2026-01-15' },
    ],
    tasks: [
      { taskId: 'daily_win_1', progress: 0, target: 1, completed: false },
      { taskId: 'daily_play_3', progress: 1, target: 3, completed: false },
      { taskId: 'streak_2', progress: 0, target: 2, completed: false },
    ],
    matchHistory: [
      { id: 'm1', opponentId: 'user4', opponentName: 'QuickDraw', outcome: 'loss', xpGained: 25, timestamp: '2026-01-16T17:00:00Z' },
      { id: 'm2', opponentId: 'user1', opponentName: 'ProGamer99', outcome: 'loss', xpGained: 25, timestamp: '2026-01-16T18:00:00Z' },
    ],
    profileFrame: {
      rankId: 'bronze',
      gradeIndex: 3,
      prestigeLevel: 0,
      metallicColors: COLORS.rankMetallic.bronze,
    },
    stats: {
      playTime: 6,
      wins: 8,
      losses: 10,
      draws: 0,
      winRate: 44,
    },
  },
];

// Export as JSON-like structure
export const usersData = {
  users: MOCK_USERS,
};

export default MOCK_USERS;
