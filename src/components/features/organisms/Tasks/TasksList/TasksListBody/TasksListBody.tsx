import { type PropsWithChildren, memo } from 'react';
import { Flex } from 'src/components/ui/atoms';
import { useTasksListBody } from './useTasksListBody';

type Props = PropsWithChildren;

export const TasksListBody = memo<Props>(function TasksListBody(props) {
  const { id } = useTasksListBody();
  return (
    <Flex
      id={id}
      flex={1}
      flexDirection="column"
      pb={4}
      position="relative"
      {...props}
    />
  );
});
