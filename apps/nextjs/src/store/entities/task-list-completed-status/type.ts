import type { TaskListCompletedStatusCode } from '@/graphql/enums';

export { TaskListCompletedStatusCode } from '@/graphql/enums';
export type TaskListCompletedStatusCodeKey =
  keyof typeof TaskListCompletedStatusCode;

export type TaskListCompletedStatusCodeValue = ValueOf<
  typeof TaskListCompletedStatusCode
>;
