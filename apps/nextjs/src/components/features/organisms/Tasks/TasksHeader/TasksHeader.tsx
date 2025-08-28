import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMainStyle } from '@/hooks';
import { memo } from 'react';

type Props = FlexProps;

export const TasksHeader = memo(function TasksHeader(props: Props) {
  const { paddingX } = useMainStyle();

  return <Flex maxH="60px" px={paddingX} py={4} bg="white" {...props} />;
});
