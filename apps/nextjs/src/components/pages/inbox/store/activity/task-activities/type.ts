import type { TaskActivityResponse } from '@/graphql/types/task-activity';

export type { TaskActivityResponse } from '@/graphql/types/task-activity';

export type TaskActivity = Omit<
  TaskActivityResponse,
  'taskActivityTasks' | 'activityType'
>;
