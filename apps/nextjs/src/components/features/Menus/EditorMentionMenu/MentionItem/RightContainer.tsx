import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const RightContainer = memo(function RightContainer(props: Props) {
  return <Flex alignItems="center" flex={1} ml={2} {...props} />;
});
