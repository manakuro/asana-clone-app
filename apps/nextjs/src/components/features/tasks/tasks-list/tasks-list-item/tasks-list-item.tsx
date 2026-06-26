import { memo } from 'react';
import { useTasksTaskColumnIds } from '@/components/features/tasks/hooks';
import { TasksListCell } from '@/components/features/tasks/tasks-list/tasks-list-cell';
import { TasksListRow } from '@/components/features/tasks/tasks-list/tasks-list-row';
import type { FlexProps } from '@/components/ui/flex';
import { Cell } from './cell';
import { Context, useTasksListItemRowContext } from './provider';
import { TasksListSubtaskList } from './tasks-list-subtask-list';

type Props = FlexProps & {
  taskId: string;
};

export const TasksListItem = memo(function TasksListItem(props: Props) {
  return (
    <Context {...props}>
      <Component {...props} />
    </Context>
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
