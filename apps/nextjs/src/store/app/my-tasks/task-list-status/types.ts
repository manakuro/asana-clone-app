import type { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';

export type TaskListSortStatusCodeValue =
  | typeof TaskListSortStatusCode.None
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.Likes
  | typeof TaskListSortStatusCode.Alphabetical
  | typeof TaskListSortStatusCode.Project;
