import { Flex, type FlexProps } from '@/components/ui/Flex';
import { forwardRef } from 'react';

type Props = FlexProps;

export const OverviewRight = forwardRef<HTMLDivElement, Props>(
  function OverviewRight(props, ref) {
    return (
      <Flex
        w="672px"
        maxW="672px"
        flexDirection="column"
        {...props}
        ref={ref}
      />
    );
  },
);
