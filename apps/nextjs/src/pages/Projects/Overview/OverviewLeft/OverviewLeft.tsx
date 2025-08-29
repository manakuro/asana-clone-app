import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';

type Props = FlexProps;

export const OverviewLeft = forwardRef<HTMLDivElement, Props>(
  function OverviewLeft(props, ref) {
    return <Flex flex={1} flexDirection="column" {...props} ref={ref} />;
  },
);
