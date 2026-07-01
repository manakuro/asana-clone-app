import { memo } from 'react';
import { TasksListCell } from '@/components/features/tasks/components/tasks-list/tasks-list-cell';
import { useTasksListHeaderContext } from '../context';

export const RemainingSpace = memo(function RemainingSpace() {
  const { sortedStyle } = useTasksListHeaderContext();

  return (
    <TasksListCell
      containerStyle={{ flex: 1 }}
      borderRight="none"
      {...sortedStyle}
    />
  );
});
