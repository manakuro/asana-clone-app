import { memo } from 'react';
import { useTasksContext } from '@/components/features/tasks';
import type { FlexProps } from '@/components/ui/flex';
import { Provider } from './provider';
import { TasksBoardListItemForMyTasksPage } from './tasks-board-list-item-for-my-tasks-page';
import { TasksBoardListItemForProjectsPage } from './tasks-board-list-item-for-projects-page';

type Props = FlexProps & {
  taskId: string;
};

export const TasksBoardListItem = memo(function TasksBoardListItem(
  props: Props,
) {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component(props: Props) {
  const { isMyTasksPage } = useTasksContext();

  if (isMyTasksPage) return <TasksBoardListItemForMyTasksPage {...props} />;

  return <TasksBoardListItemForProjectsPage {...props} />;
});
