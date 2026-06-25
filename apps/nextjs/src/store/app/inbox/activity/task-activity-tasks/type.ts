import type { TaskActivityTaskResponse } from '@/graphql/types/task-activity-task';

export type { TaskActivityTaskResponse } from '@/graphql/types/task-activity-task';

export type TaskActivityTask = Omit<TaskActivityTaskResponse, 'task'>;
