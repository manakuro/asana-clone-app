import { useMemo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { useTasksListContentVerticalScroll } from '@/features/tasks/components/tasks-list/tasks-list-content/use-tasks-list-content-vertical-scroll';
import { useTasksTaskListStatus } from '@/features/tasks/hooks';
import { createContext } from '@/shared/react/create-context';
import { useTaskListSortStatus } from '@/store/entities/task-list-sort-status';

const useValue = () => {
  const { taskListStatus } = useTasksTaskListStatus();
  const {
    isSortedByProject,
    isSortedByNone,
    isSortedByPriority,
    isSortedByAssignee,
    isSortedByCreationTime,
  } = useTaskListSortStatus();
  const { isScrolling } = useTasksListContentVerticalScroll();

  const sortedStyle = useMemo((): FlexProps => {
    if (
      !isSortedByNone(taskListStatus.taskListSortStatus) &&
      !isSortedByProject(taskListStatus.taskListSortStatus) &&
      !isSortedByPriority(taskListStatus.taskListSortStatus) &&
      !isSortedByAssignee(taskListStatus.taskListSortStatus) &&
      !isSortedByCreationTime(taskListStatus.taskListSortStatus)
    )
      return { borderBottom: 'none' };
    if (isScrolling) return { borderBottom: 'none' };
    return {};
  }, [
    isScrolling,
    isSortedByAssignee,
    isSortedByCreationTime,
    isSortedByNone,
    isSortedByPriority,
    isSortedByProject,
    taskListStatus.taskListSortStatus,
  ]);

  const scrollingStyle = useMemo((): FlexProps => {
    if (isScrolling) return { shadow: 'sm' };
    return {};
  }, [isScrolling]);

  return {
    sortedStyle,
    scrollingStyle,
  } as const;
};
export const { Context, useContext: useTasksListHeaderContext } = createContext(
  useValue,
  'TasksListHeaderContext',
);
