import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useTasksNameContext } from './TasksNameProvider';

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
