import type { ArchivedWorkspaceActivityResponse } from '@/graphql/types/archived-workspace-activity';

export type { ArchivedWorkspaceActivityResponse } from '@/graphql/types/archived-workspace-activity';

export type ArchivedWorkspaceActivity = Omit<
  ArchivedWorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'archivedWorkspaceActivityTasks'
>;
