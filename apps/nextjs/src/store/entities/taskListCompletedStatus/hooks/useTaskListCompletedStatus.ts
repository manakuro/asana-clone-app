import { useCallback } from 'react';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
} from '@/store/entities/taskListCompletedStatus';

const isCompleted = (
  status: TaskListCompletedStatusCodeValue,
  targetStatus: TaskListCompletedStatusCodeValue,
) => status === targetStatus;

export const useTaskListCompletedStatus = () => {
  const isTaskListCompletedAll = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.All),
    [],
  );
  const isTaskListInComplete = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.Incomplete),
    [],
  );
  const isTaskListCompleted1Week = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.Completed_1Week),
    [],
  );
  const isTaskListCompleted2Weeks = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.Completed_2Weeks),
    [],
  );
  const isTaskListCompleted3Weeks = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.Completed_3Weeks),
    [],
  );
  const isTaskListCompletedToday = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.CompletedToday),
    [],
  );
  const isTaskListCompletedYesterday = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.CompletedYesterday),
    [],
  );
  const isTaskListCompleted = useCallback(
    (status: TaskListCompletedStatusCodeValue) =>
      isCompleted(status, TaskListCompletedStatusCode.Completed),
    [],
  );

  return {
    isTaskListCompleted,
    isTaskListCompletedAll,
    isTaskListInComplete,
    isTaskListCompleted1Week,
    isTaskListCompleted2Weeks,
    isTaskListCompleted3Weeks,
    isTaskListCompletedToday,
    isTaskListCompletedYesterday,
  };
};
