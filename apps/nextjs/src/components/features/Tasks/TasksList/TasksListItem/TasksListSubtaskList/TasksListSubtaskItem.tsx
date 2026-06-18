import { memo } from 'react';
import { useTasksTaskColumnIds } from '@/components/features/Tasks/hooks';
import { TasksListCell } from '@/components/features/Tasks/TasksList/TasksListCell';
import { TasksListRow } from '@/components/features/Tasks/TasksList/TasksListRow';
import type { FlexProps } from '@/components/ui/flex';
import { Cell } from '../Cell';
import { useTasksListItemRowContext } from '../Provider';

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
