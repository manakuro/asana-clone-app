import { forwardRef } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const InboxLeft = forwardRef<HTMLDivElement, Props>(
  function InboxLeft(props, ref) {
    return <Flex w="50%" flexDirection="column" {...props} ref={ref} />;
  },
);
