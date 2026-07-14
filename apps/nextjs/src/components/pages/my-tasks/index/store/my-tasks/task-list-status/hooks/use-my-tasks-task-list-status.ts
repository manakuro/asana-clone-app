import { useTaskListCompletedStatus } from './use-task-list-completed-status';
import { useTaskListSortStatus } from './use-task-list-sort-status';
import { useTaskListStatus } from './use-task-list-status';

export const useMyTasksTaskListStatus = () => {
  return {
    ...useTaskListStatus(),
    ...useTaskListSortStatus(),
    ...useTaskListCompletedStatus(),
  };
};
