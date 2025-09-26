import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const RightItem = memo(function RightItem(props: Props) {
  return (
    <Flex minW={6} justifyContent="center" alignItems="center" {...props} />
  );
});
