import { memo } from 'react';
import { TasksListCell } from '@/components/features/tasks/tasks-list/tasks-list-cell';
import { useTasksListHeaderContext } from '../provider';

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
