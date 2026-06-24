import type { ArchivedWorkspaceActivityResponse } from '@/graphql/types/archivedWorkspaceActivity';

export type { ArchivedWorkspaceActivityResponse } from '@/graphql/types/archivedWorkspaceActivity';

export type ArchivedWorkspaceActivity = Omit<
  ArchivedWorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'archivedWorkspaceActivityTasks'
>;
