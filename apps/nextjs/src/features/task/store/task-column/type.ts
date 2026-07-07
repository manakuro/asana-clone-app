import type { TaskColumnType } from '@/graphql/enums';
import type { TaskColumnResponse } from '@/graphql/types/task-column';

export type { TaskColumnResponse } from '@/graphql/types/task-column';

export type TaskColumn = TaskColumnResponse;

export { TaskColumnType } from '@/graphql/enums';
export type TaskColumnTypeKey = keyof typeof TaskColumnType;

export type TaskColumnTypeValue = ValueOf<typeof TaskColumnType>;
