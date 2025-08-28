import { useTasksTaskListStatus } from '@/components/features/organisms/Tasks/hooks';
import { Icon } from '@/components/ui/atoms';
import { useTaskListSortStatus } from '@/store/entities/taskListSortStatus';
import { memo, useCallback } from 'react';
import { Container } from './Container';

type Props = {
  tasksTaskColumnId: string;
};

export const DueDate = memo(function DueDate(props: Props) {
  const { tasksTaskColumnId } = props;
  const { sortByDueDate, sortByNone, taskListStatus } =
    useTasksTaskListStatus();
  const { isSortedByDueDate } = useTaskListSortStatus();

  const handleSort = useCallback(() => {
    if (isSortedByDueDate(taskListStatus.taskListSortStatus)) {
      sortByNone();
      return;
    }

    sortByDueDate();
  }, [
    isSortedByDueDate,
    sortByDueDate,
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
      {isSortedByDueDate(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  );
});
