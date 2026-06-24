import type { TaskActivityTaskResponse } from '@/graphql/types/taskActivityTask';

export type { TaskActivityTaskResponse } from '@/graphql/types/taskActivityTask';

export type TaskActivityTask = Omit<TaskActivityTaskResponse, 'task'>;
