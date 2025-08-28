import { TasksListCell } from '@/components/features/organisms/Tasks/TasksList/TasksListCell';
import { TasksListRow } from '@/components/features/organisms/Tasks/TasksList/TasksListRow';
import { useTasksTaskColumnIds } from '@/components/features/organisms/Tasks/hooks';
import type { FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
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
    <>
      <TasksListRow selected={selected} pr={6}>
        {tasksTaskColumnIds.map((id) => (
          <Cell
            taskId={props.taskId}
            tasksTaskColumnId={id}
            key={id}
            isSubtask
          />
        ))}
        <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
      </TasksListRow>
    </>
  );
});
