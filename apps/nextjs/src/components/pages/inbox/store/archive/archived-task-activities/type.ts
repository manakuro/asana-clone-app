import type { ArchivedTaskActivityResponse } from '@/graphql/types/archived-task-activity';

export type { ArchivedTaskActivityResponse } from '@/graphql/types/archived-task-activity';

export type ArchivedTaskActivity = Omit<
  ArchivedTaskActivityResponse,
  'archivedTaskActivityTasks' | 'activityType'
>;
