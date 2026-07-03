import { memo } from 'react';
import { useTasksContext } from '@/features/tasks/components/tasks-provider/tasks-context';
import { Container } from './container';
import { Empty } from './empty';

type Props = {
  taskId: string;
};

export const ExpandIcon = memo(function ExpandIcon(props: Props) {
  const { isProjectsPage } = useTasksContext();

  if (isProjectsPage) {
    return <Container taskId={props.taskId} />;
  }

  return <Empty />;
});
