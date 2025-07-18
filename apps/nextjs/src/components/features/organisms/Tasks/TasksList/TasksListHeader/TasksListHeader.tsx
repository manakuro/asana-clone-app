import { memo } from 'react';
import { useTasksTaskColumnIds } from 'src/components/features/organisms/Tasks/hooks';
import { Flex } from 'src/components/ui/atoms';
import { Column } from './Column';
import { RemainingSpace } from './Columns';
import { Provider, useTasksListHeaderContext } from './Provider';

export const TasksListHeader = memo(function TasksListHeader(props) {
  return (
    <Provider>
      <Component {...props} />
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
