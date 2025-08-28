import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';

type Props = FlexProps;

export const InboxRight = forwardRef<HTMLDivElement, Props>(
  function InboxRight(props, ref) {
    return <Flex w="50%" {...props} ref={ref} />;
  },
);
