import { memo } from 'react';
import { useTasksTaskColumnIds } from '@/components/features/tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { Column } from './column';
import { RemainingSpace } from './columns';
import { Provider, useTasksListHeaderContext } from './provider';

export const TasksListHeader = memo(function TasksListHeader() {
  return (
    <Provider>
      <Component />
    </Provider>
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
