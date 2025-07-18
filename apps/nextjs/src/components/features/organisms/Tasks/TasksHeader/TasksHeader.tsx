import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { useMainStyle } from 'src/hooks';

type Props = FlexProps;

export const TasksHeader: React.FC<Props> = memo<Props>((props) => {
  const { paddingX } = useMainStyle();

  return <Flex maxH="60px" px={paddingX} py={4} bg="white" {...props} />;
});
TasksHeader.displayName = 'TasksHeader';
