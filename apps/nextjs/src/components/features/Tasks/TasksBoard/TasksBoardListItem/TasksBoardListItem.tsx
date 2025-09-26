import { useTasksContext } from '@/components/features/Tasks';
import type { FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';
import { Provider } from './Provider';
import { TasksBoardListItemForMyTasksPage } from './TasksBoardListItemForMyTasksPage';
import { TasksBoardListItemForProjectsPage } from './TasksBoardListItemForProjectsPage';

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
