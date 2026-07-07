import type { WorkspaceActivityResponse } from '@/graphql/types/workspace-activity';

export type { WorkspaceActivityResponse } from '@/graphql/types/workspace-activity';

export type WorkspaceActivity = Omit<
  WorkspaceActivityResponse,
  | 'workspace'
  | 'teammate'
  | 'project'
  | 'activityType'
  | 'workspaceActivityTasks'
>;
