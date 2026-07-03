import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const TasksHeaderLeft = memo(function TasksHeaderLeft(props: Props) {
  return <Flex flex={1} {...props} />;
});
