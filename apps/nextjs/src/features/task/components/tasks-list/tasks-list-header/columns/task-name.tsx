import { memo } from 'react';
import { useTasksListContext } from '@/features/task/components/tasks-list/context';
import { Container } from './container';

type Props = {
  tasksTaskColumnId: string;
};

export const TaskName = memo(function TaskName(props: Props) {
  const { tasksTaskColumnId } = props;
  const { stickyStyle } = useTasksListContext();

  return (
    <Container
      ml={6}
      tasksTaskColumnId={tasksTaskColumnId}
      isFirst
      containerStyle={{ ...stickyStyle }}
    />
  );
});
