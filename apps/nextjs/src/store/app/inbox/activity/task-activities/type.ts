import type { TaskActivityResponse } from '@/graphql/types/taskActivity';

export type { TaskActivityResponse } from '@/graphql/types/taskActivity';

export type TaskActivity = Omit<
  TaskActivityResponse,
  'taskActivityTasks' | 'activityType'
>;
