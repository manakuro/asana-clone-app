import { useTasksContext } from '@/components/features/Tasks';
import type { FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';
import { ListItemForMyTasksPage } from './ListItemForMyTasksPage';
import { ListItemForProjectsPage } from './ListItemForProjectsPage';

type Props = {
  taskId: string;
} & FlexProps;

export const ListItem = memo(function ListItem(props: Props) {
  const { taskId } = props;
  const { isMyTasksPage } = useTasksContext();

  if (isMyTasksPage) {
    return <ListItemForMyTasksPage taskId={taskId} />;
  }

  return <ListItemForProjectsPage taskId={taskId} />;
});
