import { memo } from 'react';
import { useTasksTaskColumnIds } from '@/components/features/tasks/hooks';
import { TasksListCell } from '@/components/features/tasks/tasks-list/tasks-list-cell';
import { TasksListRow } from '@/components/features/tasks/tasks-list/tasks-list-row';
import type { FlexProps } from '@/components/ui/flex';
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
