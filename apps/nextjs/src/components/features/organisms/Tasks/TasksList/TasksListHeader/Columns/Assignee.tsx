import { useTasksTaskListStatus } from '@/components/features/organisms/Tasks/hooks';
import { Icon } from '@/components/ui/atoms';
import { useTaskListSortStatus } from '@/store/entities/taskListSortStatus';
import { memo, useCallback } from 'react';
import { Container } from './Container';

type Props = {
  tasksTaskColumnId: string;
};

export const Assignee = memo(function Assignee(props: Props) {
  const { tasksTaskColumnId } = props;
  const { sortByAssignee, sortByNone, taskListStatus } =
    useTasksTaskListStatus();
  const { isSortedByAssignee } = useTaskListSortStatus();

  const handleSort = useCallback(() => {
    if (isSortedByAssignee(taskListStatus.taskListSortStatus)) {
      sortByNone();
      return;
    }

    sortByAssignee?.();
  }, [
    isSortedByAssignee,
    sortByAssignee,
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
      {isSortedByAssignee(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  );
});
