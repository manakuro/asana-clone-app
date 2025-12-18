import { useCallback } from 'react';
import type { TaskListCompletedStatusCodeValue } from '@/store/entities/taskListCompletedStatus';
import {
  type TaskListCompletedStatuses,
  taskListCompletedStatues,
} from '../atom';
import { useTaskListStatus } from './useTaskListStatus';
import { useTaskListStatusCommand } from './useTaskListStatusCommand';

export const useTaskListCompletedStatus = () => {
  const { taskListStatus } = useTaskListStatus();
  const taskListStatusCommand = useTaskListStatusCommand();

  const isTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      taskListStatus.taskListCompletedStatus.statusCode ===
      taskListCompletedStatues[status],
    [taskListStatus.taskListCompletedStatus],
  );

  const setTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatusCodeValue) => {
      taskListStatusCommand.setTaskListCompletedStatus({
        statusCode: status,
      });
    },
    [taskListStatusCommand],
  );

  return {
    isTaskListCompletedStatus,
    setTaskListCompletedStatus,
  };
};
