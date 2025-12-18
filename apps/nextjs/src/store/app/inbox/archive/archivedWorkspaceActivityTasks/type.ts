import type { ArchivedWorkspaceActivityTaskResponse } from '@/graphql/types/archivedWorkspaceActivityTask';

export type { ArchivedWorkspaceActivityTaskResponse } from '@/graphql/types/archivedWorkspaceActivityTask';

export type ArchivedWorkspaceActivityTask = Omit<
  ArchivedWorkspaceActivityTaskResponse,
  'task'
>;
