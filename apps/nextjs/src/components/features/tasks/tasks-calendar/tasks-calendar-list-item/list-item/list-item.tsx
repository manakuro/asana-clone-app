import { memo } from 'react';
import { useTasksContext } from '@/components/features/tasks';
import type { FlexProps } from '@/components/ui/flex';
import { ListItemForMyTasksPage } from './list-item-for-my-tasks-page';
import { ListItemForProjectsPage } from './list-item-for-projects-page';

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
