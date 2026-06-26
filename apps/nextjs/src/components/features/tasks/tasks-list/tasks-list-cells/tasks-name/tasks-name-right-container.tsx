import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useTasksNameContext } from './tasks-name-context';

type Props = FlexProps;

export const TasksNameRightContainer = memo(function TasksNameRightContainer(
  props: Props,
) {
  const { showMark } = useTasksNameContext();

  return (
    <Flex
      alignItems="center"
      visibility={showMark ? 'visible' : 'hidden'}
      {...props}
    />
  );
});
