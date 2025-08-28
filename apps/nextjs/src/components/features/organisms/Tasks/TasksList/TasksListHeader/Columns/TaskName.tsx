import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import { memo } from 'react';
import { Container } from './Container';

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
