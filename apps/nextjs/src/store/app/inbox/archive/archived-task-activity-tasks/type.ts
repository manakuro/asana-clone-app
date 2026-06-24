import type { ArchivedTaskActivityTaskResponse } from '@/graphql/types/archivedTaskActivityTask';

export type { ArchivedTaskActivityTaskResponse } from '@/graphql/types/archivedTaskActivityTask';

export type ArchivedTaskActivityTask = Omit<
  ArchivedTaskActivityTaskResponse,
  'task'
>;
