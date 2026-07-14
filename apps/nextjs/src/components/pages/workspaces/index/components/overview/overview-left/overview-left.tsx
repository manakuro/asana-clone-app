import { forwardRef } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const OverviewLeft = forwardRef<HTMLDivElement, Props>(
  function OverviewLeft(props, ref) {
    return (
      <Flex
        flex={1}
        flexDirection="column"
        w="258px"
        maxW="258px"
        {...props}
        ref={ref}
      />
    );
  },
);
