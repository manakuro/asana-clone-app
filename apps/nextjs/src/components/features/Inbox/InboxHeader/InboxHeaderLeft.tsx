import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const InboxHeaderLeft = memo(function InboxHeaderLeft(props: Props) {
  return <Flex flex={1} {...props} />;
});
