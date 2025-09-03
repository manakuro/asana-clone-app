import { useTasksListContentVerticalScroll } from '@/components/features/organisms/Tasks';
import { useTasksTaskListStatus } from '@/components/features/organisms/Tasks/hooks';
import type { ChakraProps } from '@/shared/chakra';
import { createProvider } from '@/shared/react/createProvider';
import { useTaskListSortStatus } from '@/store/entities/taskListSortStatus';
import { useMemo } from 'react';

type ContextProps = {
  sortedStyle: ChakraProps;
  scrollingStyle: ChakraProps;
};

const useValue = (): ContextProps => {
  const { taskListStatus } = useTasksTaskListStatus();
  const {
    isSortedByProject,
    isSortedByNone,
    isSortedByPriority,
    isSortedByAssignee,
    isSortedByCreationTime,
  } = useTaskListSortStatus();
  const { isScrolling } = useTasksListContentVerticalScroll();

  const sortedStyle = useMemo((): ChakraProps => {
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

  const scrollingStyle = useMemo((): ChakraProps => {
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
