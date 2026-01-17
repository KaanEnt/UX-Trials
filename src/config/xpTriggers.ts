/**
 * XP Trigger definitions - bonuses and multipliers
 */

import type { XPTrigger, TriggerType, TriggerActivation } from '../types';

// XP Trigger configurations
export const XP_TRIGGERS: XPTrigger[] = [
  // Additive instant triggers (flat XP bonus applied immediately)
  {
    id: 'match_win',
    name: 'Match Win',
    type: 'additive',
    activation: 'instant',
    value: 100,
  },
  {
    id: 'match_loss',
    name: 'Match Loss',
    type: 'additive',
    activation: 'instant',
    value: 25,
  },
  {
    id: 'match_draw',
    name: 'Match Draw',
    type: 'additive',
    activation: 'instant',
    value: 50,
  },
  {
    id: 'first_win_of_day',
    name: 'First Win of Day',
    type: 'additive',
    activation: 'instant',
    value: 200,
  },

  // Multiplicative instant triggers (multiplier applied to match XP)
  {
    id: 'win_streak_3',
    name: '3 Win Streak Bonus',
    type: 'multiplicative',
    activation: 'instant',
    value: 1.25, // +25% XP
  },
  {
    id: 'win_streak_5',
    name: '5 Win Streak Bonus',
    type: 'multiplicative',
    activation: 'instant',
    value: 1.5, // +50% XP
  },
  {
    id: 'win_streak_10',
    name: '10 Win Streak Bonus',
    type: 'multiplicative',
    activation: 'instant',
    value: 2.0, // +100% XP
  },
  {
    id: 'underdog_win',
    name: 'Underdog Victory',
    type: 'multiplicative',
    activation: 'instant',
    value: 1.5, // +50% for beating higher rank
  },

  // Additive overtime triggers (bonus after meeting condition over time)
  {
    id: 'daily_login_3',
    name: '3 Day Login Streak',
    type: 'additive',
    activation: 'overtime',
    value: 300,
    condition: { count: 3 },
  },
  {
    id: 'daily_login_7',
    name: '7 Day Login Streak',
    type: 'additive',
    activation: 'overtime',
    value: 1000,
    condition: { count: 7 },
  },
  {
    id: 'daily_login_14',
    name: '14 Day Login Streak',
    type: 'additive',
    activation: 'overtime',
    value: 2500,
    condition: { count: 14 },
  },
  {
    id: 'daily_login_30',
    name: '30 Day Login Streak',
    type: 'additive',
    activation: 'overtime',
    value: 5000,
    condition: { count: 30 },
  },

  // Multiplicative overtime triggers
  {
    id: 'weekend_bonus',
    name: 'Weekend Warrior',
    type: 'multiplicative',
    activation: 'overtime',
    value: 1.5,
    condition: { timeWindowDays: 2 }, // Sat-Sun
  },
  {
    id: 'consistent_player',
    name: 'Consistent Player',
    type: 'multiplicative',
    activation: 'overtime',
    value: 1.2,
    condition: { count: 5, timeWindowDays: 7 }, // 5 games in 7 days
  },
];

// Get trigger by ID
export function getXPTrigger(triggerId: string): XPTrigger | undefined {
  return XP_TRIGGERS.find((t) => t.id === triggerId);
}

// Get triggers by type
export function getTriggersByType(type: TriggerType): XPTrigger[] {
  return XP_TRIGGERS.filter((t) => t.type === type);
}

// Get triggers by activation
export function getTriggersByActivation(activation: TriggerActivation): XPTrigger[] {
  return XP_TRIGGERS.filter((t) => t.activation === activation);
}

// Get instant additive triggers
export function getInstantAdditiveTriggers(): XPTrigger[] {
  return XP_TRIGGERS.filter((t) => t.type === 'additive' && t.activation === 'instant');
}

// Get instant multiplicative triggers
export function getInstantMultiplierTriggers(): XPTrigger[] {
  return XP_TRIGGERS.filter((t) => t.type === 'multiplicative' && t.activation === 'instant');
}
