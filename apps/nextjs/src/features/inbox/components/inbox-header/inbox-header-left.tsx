import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const InboxHeaderLeft = memo(function InboxHeaderLeft(props: Props) {
  return <Flex flex={1} {...props} />;
});
