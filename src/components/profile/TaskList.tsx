/**
 * TaskList - Display user's active tasks/challenges
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { UserTask } from '../../types';
import { getTaskConfig, TASKS } from '../../config/tasks';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { FONT_FAMILY, FONT_SIZES } from '../../theme/typography';
import { DIMENSIONS } from '../../theme/dimensions';

interface TaskListProps {
  tasks: UserTask[];
  maxTasks?: number;
  onTaskPress?: (taskId: string) => void;
}

interface TaskItemProps {
  task: UserTask;
  onPress?: () => void;
}

function TaskItem({ task, onPress }: TaskItemProps) {
  const config = getTaskConfig(task.taskId);
  if (!config) return null;
  
  const progress = task.target > 0 ? (task.progress / task.target) * 100 : 0;
  
  return (
    <Pressable 
      style={[styles.taskItem, task.completed && styles.taskItemCompleted]}
      onPress={onPress}
    >
      <View style={styles.taskCheckbox}>
        {task.completed ? (
          <Feather name="check-circle" size={20} color={COLORS.accent.success} />
        ) : (
          <Feather name="circle" size={20} color={COLORS.border.default} />
        )}
      </View>
      
      <View style={styles.taskContent}>
        <Text style={[styles.taskName, task.completed && styles.taskNameCompleted]}>
          {config.name}
        </Text>
        <Text style={styles.taskDescription} numberOfLines={1}>
          {config.description}
        </Text>
        
        {!task.completed && task.target > 1 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(100, progress)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {task.progress}/{task.target}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.taskReward}>
        <Text style={styles.rewardAmount}>+{config.xpReward}</Text>
        <Text style={styles.rewardLabel}>XP</Text>
      </View>
    </Pressable>
  );
}

export function TaskList({ tasks, maxTasks = 5, onTaskPress }: TaskListProps) {
  // Sort: incomplete first, then by XP reward descending
  const sortedTasks = [...tasks]
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      const aConfig = getTaskConfig(a.taskId);
      const bConfig = getTaskConfig(b.taskId);
      return (bConfig?.xpReward ?? 0) - (aConfig?.xpReward ?? 0);
    })
    .slice(0, maxTasks);

  if (sortedTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="check-square" size={32} color={COLORS.text.tertiary} />
        <Text style={styles.emptyText}>All tasks completed!</Text>
        <Text style={styles.emptySubtext}>Check back later for new challenges</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sortedTasks.map((task) => (
        <TaskItem 
          key={task.taskId} 
          task={task} 
          onPress={() => onTaskPress?.(task.taskId)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    height: DIMENSIONS.profile.taskRowHeight,
  },
  taskItemCompleted: {
    opacity: 0.6,
  },
  taskCheckbox: {
    marginRight: SPACING.md,
  },
  taskContent: {
    flex: 1,
    justifyContent: 'center',
  },
  taskName: {
    fontFamily: FONT_FAMILY.outfitMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.text.primary,
  },
  taskNameCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.text.secondary,
  },
  taskDescription: {
    fontFamily: FONT_FAMILY.outfit,
    fontSize: FONT_SIZES.bodySmall,
    color: COLORS.text.tertiary,
    marginTop: SPACING.xxs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent.primary,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: FONT_FAMILY.jetbrainsMono,
    fontSize: FONT_SIZES.caption,
    color: COLORS.text.tertiary,
  },
  taskReward: {
    alignItems: 'flex-end',
    marginLeft: SPACING.md,
  },
  rewardAmount: {
    fontFamily: FONT_FAMILY.jetbrainsMonoMedium,
    fontSize: FONT_SIZES.body,
    color: COLORS.accent.success,
  },
  rewardLabel: {
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

export default TaskList;
