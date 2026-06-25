import type { WorkspaceActivityTaskResponse } from '@/graphql/types/workspace-activity-task';

export type { WorkspaceActivityTaskResponse } from '@/graphql/types/workspace-activity-task';

export type WorkspaceActivityTask = Omit<WorkspaceActivityTaskResponse, 'task'>;
