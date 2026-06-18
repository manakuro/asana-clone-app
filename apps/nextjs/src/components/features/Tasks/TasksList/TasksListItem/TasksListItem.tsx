import { memo } from 'react';
import { useTasksTaskColumnIds } from '@/components/features/Tasks/hooks';
import { TasksListCell } from '@/components/features/Tasks/TasksList/TasksListCell';
import { TasksListRow } from '@/components/features/Tasks/TasksList/TasksListRow';
import type { FlexProps } from '@/components/ui/flex';
import { Cell } from './Cell';
import { Provider, useTasksListItemRowContext } from './Provider';
import { TasksListSubtaskList } from './TasksListSubtaskList';

type Props = FlexProps & {
  taskId: string;
};

export const TasksListItem = memo(function TasksListItem(props: Props) {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(function Component(props: Props) {
  const { selected } = useTasksListItemRowContext();
  const { tasksTaskColumnIds } = useTasksTaskColumnIds();

  return (
    <>
      <TasksListRow selected={selected} pr={6}>
        {tasksTaskColumnIds.map((id) => (
          <Cell taskId={props.taskId} tasksTaskColumnId={id} key={id} />
        ))}
        <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
      </TasksListRow>
      <TasksListSubtaskList taskId={props.taskId} />
    </>
  );
});
