import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useTasksTaskColumnIds } from '@/features/tasks/hooks';
import { Column } from './column';
import { RemainingSpace } from './columns';
import { Context, useTasksListHeaderContext } from './context';

export const TasksListHeader = memo(function TasksListHeader() {
  return (
    <Context>
      <Component />
    </Context>
  );
});

const Component = memo(function Component() {
  const { tasksTaskColumnIds } = useTasksTaskColumnIds();
  const { scrollingStyle } = useTasksListHeaderContext();

  return (
    <Flex
      pr={6}
      position="sticky"
      top={0}
      zIndex="dropdown"
      bg="white"
      {...scrollingStyle}
    >
      {tasksTaskColumnIds.map((id) => (
        <Column tasksTaskColumnId={id} key={id} />
      ))}
      <RemainingSpace />
    </Flex>
  );
});
