import { atom } from 'jotai';
import { TaskListCompletedStatusCode } from '@/store/entities/taskListCompletedStatus';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import type { ProjectTaskListStatus } from './type';

export const taskListStatusState = atom<ProjectTaskListStatus>({
  id: '',
  taskListCompletedStatusId: '',
  taskListSortStatusId: '',
  taskListCompletedStatus: {
    id: '',
    statusCode: TaskListCompletedStatusCode.Incomplete,
  },
  taskListSortStatus: {
    id: '',
    statusCode: TaskListSortStatusCode.None,
  },
  createdAt: '',
  updatedAt: '',
});

export const isTaskListCompletedStatusState = (
  key: TaskListCompletedStatuses,
) =>
  atom<boolean>((get) => {
    const taskStatus = get(taskListStatusState);
    return (
      taskStatus.taskListCompletedStatus.statusCode ===
      taskListCompletedStatues[key]
    );
  });

export const isTaskListSortStatusState = (key: TaskListSortStatuses) =>
  atom<boolean>((get) => {
    const taskStatus = get(taskListStatusState);
    return (
      taskStatus.taskListSortStatus.statusCode === taskListSortStatues[key]
    );
  });

export const taskListSortStatues = {
  none: TaskListSortStatusCode.None,
  dueDate: TaskListSortStatusCode.DueDate,
  likes: TaskListSortStatusCode.Likes,
  alphabetical: TaskListSortStatusCode.Alphabetical,
  assignee: TaskListSortStatusCode.Assignee,
  creationTime: TaskListSortStatusCode.CreationTime,
  priority: TaskListSortStatusCode.Priority,
} as const;
export type TaskListSortStatuses = keyof typeof taskListSortStatues;

export const taskListCompletedStatues = {
  incomplete: TaskListCompletedStatusCode.Incomplete,
  completed: TaskListCompletedStatusCode.Completed,
  completedToday: TaskListCompletedStatusCode.CompletedToday,
  completedYesterday: TaskListCompletedStatusCode.CompletedYesterday,
  completed1Week: TaskListCompletedStatusCode.Completed_1Week,
  completed2Weeks: TaskListCompletedStatusCode.Completed_2Weeks,
  completed3Weeks: TaskListCompletedStatusCode.Completed_3Weeks,
  all: TaskListCompletedStatusCode.All,
} as const;
export type TaskListCompletedStatuses = keyof typeof taskListCompletedStatues;
