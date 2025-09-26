import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const LeftContainer = memo(function LeftContainer(props: Props) {
  return <Flex alignItems="center" justifyContent="center" w={8} {...props} />;
});
