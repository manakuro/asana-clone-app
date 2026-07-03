import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { TasksListCell } from '@/features/task/components/tasks-list/tasks-list-cell';
import { TasksListRow } from '@/features/task/components/tasks-list/tasks-list-row';
import { useTasksTaskColumnIds } from '@/features/task/hooks';
import { Cell } from '../cell';
import { useTasksListItemRowContext } from '../provider';

type Props = FlexProps & {
  taskId: string;
};

export const TasksListSubtaskItem = memo(function TasksListSubtaskItem(
  props: Props,
) {
  const { selected } = useTasksListItemRowContext();
  const { tasksTaskColumnIds } = useTasksTaskColumnIds();

  return (
    <TasksListRow selected={selected} pr={6}>
      {tasksTaskColumnIds.map((id) => (
        <Cell taskId={props.taskId} tasksTaskColumnId={id} key={id} isSubtask />
      ))}
      <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
    </TasksListRow>
  );
});
