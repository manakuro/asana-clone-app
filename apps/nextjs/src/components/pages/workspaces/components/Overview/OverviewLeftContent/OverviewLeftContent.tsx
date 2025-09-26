import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const OverviewLeftContent = memo(function OverviewLeftContent(
  props: Props,
) {
  return <Flex h="full" px={4} flexDirection="column" {...props} />;
});
