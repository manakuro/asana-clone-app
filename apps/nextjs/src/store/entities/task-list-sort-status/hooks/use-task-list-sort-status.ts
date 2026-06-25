import { useCallback } from 'react';
import {
  TaskListSortStatusCode,
  type TaskListSortStatusCodeValue,
} from '../type';

const isSortedBy = (
  status: TaskListSortStatusCodeValue,
  targetStatus: TaskListSortStatusCodeValue,
) => status === targetStatus;

export const useTaskListSortStatus = () => {
  const isSortedByNone = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.None),
    [],
  );
  const isSortedByDueDate = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.DueDate),
    [],
  );
  const isSortedByLikes = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.Likes),
    [],
  );
  const isSortedByAlphabetical = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.Alphabetical),
    [],
  );
  const isSortedByProject = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.Project),
    [],
  );
  const isSortedByAssignee = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.Assignee),
    [],
  );
  const isSortedByPriority = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.Priority),
    [],
  );
  const isSortedByCreationTime = useCallback(
    (status: TaskListSortStatusCodeValue) =>
      isSortedBy(status, TaskListSortStatusCode.CreationTime),
    [],
  );

  return {
    isSortedByNone,
    isSortedByDueDate,
    isSortedByLikes,
    isSortedByAlphabetical,
    isSortedByProject,
    isSortedByAssignee,
    isSortedByPriority,
    isSortedByCreationTime,
  };
};
