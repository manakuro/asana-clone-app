import { useMemo } from 'react';
import { useTasksListContentVerticalScroll } from '@/components/features/Tasks';
import { useTasksTaskListStatus } from '@/components/features/Tasks/hooks';
import type { FlexProps } from '@/components/ui/flex';
import { createProvider } from '@/shared/react/createProvider';
import { useTaskListSortStatus } from '@/store/entities/taskListSortStatus';

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
export const { Provider, useContext: useTasksListHeaderContext } =
  createProvider(useValue, 'TasksListHeaderProvider');
