import type { WorkspaceActivityResponse } from '@/graphql/types/workspaceActivity';

export type { WorkspaceActivityResponse } from '@/graphql/types/workspaceActivity';

export type WorkspaceActivity = Omit<
  WorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'workspaceActivityTasks'
>;
