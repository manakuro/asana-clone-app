import { useTasksContext } from '@/components/features/organisms/Tasks';
import type { FlexProps } from '@/components/ui/atoms';
import type React from 'react';
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

const Component: React.FC<Props> = memo<Props>((props) => {
  const { isMyTasksPage } = useTasksContext();

  if (isMyTasksPage) return <TasksBoardListItemForMyTasksPage {...props} />;

  return <TasksBoardListItemForProjectsPage {...props} />;
});
