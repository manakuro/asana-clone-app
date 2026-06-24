import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const OverviewLeftContent = memo(function OverviewLeftContent(
  props: Props,
) {
  return <Flex h="full" px={4} flexDirection="column" {...props} />;
});
