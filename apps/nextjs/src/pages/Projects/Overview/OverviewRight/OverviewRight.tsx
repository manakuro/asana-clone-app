import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';

type Props = FlexProps;

export const OverviewRight = forwardRef<HTMLDivElement, Props>(
  function OverviewRight(props, ref) {
    return (
      <Flex
        w="400px"
        maxW="400px"
        flexDirection="column"
        {...props}
        ref={ref}
      />
    );
  },
);
