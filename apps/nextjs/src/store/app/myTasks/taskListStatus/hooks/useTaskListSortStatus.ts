import { useCallback } from 'react';
import { TaskListSortStatusCode } from '@/store/entities/taskListSortStatus';
import { type TaskListSortStatuses, taskListSortStatues } from '../atom';
import type { TaskListSortStatusCodeValue } from '../types';
import { useTaskListStatus } from './useTaskListStatus';
import { useTaskListStatusCommand } from './useTaskListStatusCommand';

export const useTaskListSortStatus = () => {
  const { setTaskListSortStatus } = useTaskListStatusCommand();
  const { taskListStatus } = useTaskListStatus();

  const isSorted = useCallback(
    (status: TaskListSortStatuses) =>
      taskListStatus.taskListSortStatus.statusCode ===
      taskListSortStatues[status],
    [taskListStatus.taskListSortStatus],
  );

  const sortBy = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      setTaskListSortStatus({ statusCode: status });
    },
    [setTaskListSortStatus],
  );

  const sortByProject = useCallback(() => {
    sortBy(TaskListSortStatusCode.Project);
  }, [sortBy]);

  const sortByNone = useCallback(() => {
    sortBy(TaskListSortStatusCode.None);
  }, [sortBy]);

  const sortByAlphabetical = useCallback(() => {
    sortBy(TaskListSortStatusCode.Alphabetical);
  }, [sortBy]);

  const sortByLikes = useCallback(() => {
    sortBy(TaskListSortStatusCode.Likes);
  }, [sortBy]);

  const sortByDueDate = useCallback(() => {
    sortBy(TaskListSortStatusCode.DueDate);
  }, [sortBy]);

  return {
    sortBy,
    isSorted,
    sortByProject,
    sortByNone,
    sortByAlphabetical,
    sortByLikes,
    sortByDueDate,
  };
};
