import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const OverviewRightContent = memo(function OverviewRightContent(
  props: Props,
) {
  return <Flex h="full" flexDirection="column" {...props} />;
});
