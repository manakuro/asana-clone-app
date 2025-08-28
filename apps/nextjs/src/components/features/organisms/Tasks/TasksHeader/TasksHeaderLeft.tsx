import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

export const TasksHeaderLeft = memo(function TasksHeaderLeft(props: Props) {
  return <Flex flex={1} {...props} />;
});
