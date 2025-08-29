import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

const maxH = 72;
export const OverviewRightContent = memo(function OverviewRightContent(
  props: Props,
) {
  return (
    <Flex
      maxH={`calc(100vh - ${maxH}px)`}
      h="full"
      p={6}
      overflowY="scroll"
      flexDirection="column"
      bg="gray.50"
      {...props}
    />
  );
});
