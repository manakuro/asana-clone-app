import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const RightItem = memo(function RightItem(props: Props) {
  return (
    <Flex minW={6} justifyContent="center" alignItems="center" {...props} />
  );
});
