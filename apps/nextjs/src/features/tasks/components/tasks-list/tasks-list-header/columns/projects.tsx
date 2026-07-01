import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { useTasksTaskListStatus } from '@/features/tasks/hooks';
import { useTaskListSortStatus } from '@/store/entities/task-list-sort-status';
import { Container } from './container';

type Props = {
  tasksTaskColumnId: string;
};

export const Projects = memo(function Projects(props: Props) {
  const { tasksTaskColumnId } = props;
  const { sortByProject, sortByNone, taskListStatus } =
    useTasksTaskListStatus();
  const { isSortedByProject } = useTaskListSortStatus();

  const handleSort = useCallback(() => {
    if (isSortedByProject(taskListStatus.taskListSortStatus)) {
      sortByNone();
      return;
    }

    sortByProject?.();
  }, [
    isSortedByProject,
    sortByNone,
    sortByProject,
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
      {isSortedByProject(taskListStatus.taskListSortStatus) && (
        <Icon icon="arrowDownAlt" color="fg.muted" />
      )}
    </Container>
  );
});
