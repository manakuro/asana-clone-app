import { forwardRef } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const InboxRight = forwardRef<HTMLDivElement, Props>(
  function InboxRight(props, ref) {
    return <Flex w="50%" {...props} ref={ref} />;
  },
);
