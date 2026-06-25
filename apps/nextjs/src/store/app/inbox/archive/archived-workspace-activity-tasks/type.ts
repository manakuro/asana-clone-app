import type { ArchivedWorkspaceActivityTaskResponse } from '@/graphql/types/archived-workspace-activity-task';

export type { ArchivedWorkspaceActivityTaskResponse } from '@/graphql/types/archived-workspace-activity-task';

export type ArchivedWorkspaceActivityTask = Omit<
  ArchivedWorkspaceActivityTaskResponse,
  'task'
>;
