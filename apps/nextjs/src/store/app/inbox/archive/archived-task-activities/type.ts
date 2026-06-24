import type { ArchivedTaskActivityResponse } from '@/graphql/types/archivedTaskActivity';

export type { ArchivedTaskActivityResponse } from '@/graphql/types/archivedTaskActivity';

export type ArchivedTaskActivity = Omit<
  ArchivedTaskActivityResponse,
  'archivedTaskActivityTasks' | 'activityType'
>;
