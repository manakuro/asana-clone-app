import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

const maxH = 72;
export const OverviewLeftContent = memo(function OverviewLeftContent(
  props: Props,
) {
  return (
    <Flex
      maxH={`calc(100vh - ${maxH}px)`}
      h="full"
      py={12}
      px={8}
      overflowY="scroll"
      flexDirection="column"
      {...props}
    />
  );
});
