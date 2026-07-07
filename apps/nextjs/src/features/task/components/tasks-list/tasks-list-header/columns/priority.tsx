import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { useTasksTaskListStatus } from '@/features/task/hooks';
import { useTaskListSortStatus } from '@/features/task/store/task-list-sort-status';
import { Container } from './container';

type Props = {
  tasksTaskColumnId: string;
};

export const Priority = memo(function Priority(props: Props) {
  const { tasksTaskColumnId } = props;
  const { sortByNone, taskListStatus, sortByPriority } =
    useTasksTaskListStatus();
  const { isSortedByPriority } = useTaskListSortStatus();

  const handleSort = useCallback(() => {
    if (isSortedByPriority(taskListStatus.taskListSortStatus)) {
      sortByNone();
      return;
    }

    sortByPriority?.();
  }, [
    isSortedByPriority,
    sortByPriority,
    sortByNone,
    taskListStatus.taskListSortStatus,
  ]);

  return (
    <Container
      tasksTaskColumnId={tasksTaskColumnId}
      clickable
      onClick={handleSort}
      onSort={handleSort}
      menu
    >
      {isSortedByPriority(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="fg.muted" />
      )}
    </Container>
  );
});
