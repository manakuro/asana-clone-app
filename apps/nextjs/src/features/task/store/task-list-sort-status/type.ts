import type { TaskListSortStatusCode } from '@/graphql/enums';

export { TaskListSortStatusCode } from '@/graphql/enums';
export type TaskListSortStatusCodeKey = keyof typeof TaskListSortStatusCode;

export type TaskListSortStatusCodeValue = ValueOf<
  typeof TaskListSortStatusCode
>;
