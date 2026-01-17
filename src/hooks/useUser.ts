/**
 * useUser - Hook for accessing and managing user data
 */

import { useState, useCallback, useMemo } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../data/users';
import { updateUserRank, calculateRankFromXP } from '../utils/rankProgression';

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateXP: (amount: number) => void;
  refreshUser: () => void;
}

export function useUser(userId: string): UseUserReturn {
  const [user, setUser] = useState<User | null>(() => {
    return MOCK_USERS.find((u) => u.id === userId) ?? null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateXP = useCallback((amount: number) => {
    if (!user) return;
    
    const newXP = Math.max(0, user.xp + amount);
    const updatedUser = updateUserRank(user, newXP);
    setUser(updatedUser);
  }, [user]);

  const refreshUser = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      const foundUser = MOCK_USERS.find((u) => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found');
      }
    } catch (e) {
      setError('Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    user,
    loading,
    error,
    updateXP,
    refreshUser,
  };
}

/**
 * useAllUsers - Hook for accessing all users (for leaderboard)
 */
export function useAllUsers() {
  const [users] = useState<User[]>(MOCK_USERS);
  
  // Sort users by XP descending for leaderboard
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => b.xp - a.xp);
  }, [users]);
  
  return {
    users: sortedUsers,
    loading: false,
    error: null,
  };
}

/**
 * Get rank display info for a user
 */
export function useUserRankInfo(user: User | null) {
  return useMemo(() => {
    if (!user) return null;
    
    return calculateRankFromXP(user.xp);
  }, [user?.xp]);
}
