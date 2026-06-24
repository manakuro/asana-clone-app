import type { DeletedTaskResponse } from '@/graphql/types/deletedTask';

export type { DeletedTaskResponse } from '@/graphql/types/deletedTask';

export type DeletedTask = Omit<DeletedTaskResponse, 'task'>;
