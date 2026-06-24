import type { WorkspaceActivityTaskResponse } from '@/graphql/types/workspaceActivityTask';

export type { WorkspaceActivityTaskResponse } from '@/graphql/types/workspaceActivityTask';

export type WorkspaceActivityTask = Omit<WorkspaceActivityTaskResponse, 'task'>;
