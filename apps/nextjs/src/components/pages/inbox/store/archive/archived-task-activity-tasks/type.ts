import type { ArchivedTaskActivityTaskResponse } from '@/graphql/types/archived-task-activity-task';

export type { ArchivedTaskActivityTaskResponse } from '@/graphql/types/archived-task-activity-task';

export type ArchivedTaskActivityTask = Omit<
  ArchivedTaskActivityTaskResponse,
  'task'
>;
