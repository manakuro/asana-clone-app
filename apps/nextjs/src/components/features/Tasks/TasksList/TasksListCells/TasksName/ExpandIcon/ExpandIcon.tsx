import { memo } from 'react';
import { useTasksContext } from '@/components/features/Tasks';
import { Container } from './Container';
import { Empty } from './Empty';

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
