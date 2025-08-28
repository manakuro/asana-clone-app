import { useTasksTaskListStatus } from '@/components/features/organisms/Tasks/hooks';
import { Icon } from '@/components/ui/atoms';
import { useTaskListSortStatus } from '@/store/entities/taskListSortStatus';
import { memo, useCallback } from 'react';
import { Container } from './Container';

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
        <Icon icon="arrowDownAlt" color="text.muted" />
      )}
    </Container>
  );
});
