import { memo } from 'react';
import { useTasksContext } from '@/components/features/tasks/components/tasks-provider/tasks-context';
import type { FlexProps } from '@/components/ui/flex';
import { Context } from './provider';
import { TasksBoardListItemForMyTasksPage } from './tasks-board-list-item-for-my-tasks-page';
import { TasksBoardListItemForProjectsPage } from './tasks-board-list-item-for-projects-page';

type Props = FlexProps & {
  taskId: string;
};

export const TasksBoardListItem = memo(function TasksBoardListItem(
  props: Props,
) {
  return (
    <Context {...props}>
      <Component {...props} />
    </Context>
  );
});

const Component = memo(function Component(props: Props) {
  const { isMyTasksPage } = useTasksContext();

  if (isMyTasksPage) return <TasksBoardListItemForMyTasksPage {...props} />;

  return <TasksBoardListItemForProjectsPage {...props} />;
});
