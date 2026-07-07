import type { DeletedTaskResponse } from '@/graphql/types/deleted-task';

export type { DeletedTaskResponse } from '@/graphql/types/deleted-task';

export type DeletedTask = Omit<DeletedTaskResponse, 'task'>;
