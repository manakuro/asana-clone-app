import type { TaskListSortStatusCode } from '@/features/task/store/task-list-sort-status';

export type TaskListSortStatusCodeValue =
  | typeof TaskListSortStatusCode.None
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.Likes
  | typeof TaskListSortStatusCode.Alphabetical
  | typeof TaskListSortStatusCode.Project;
