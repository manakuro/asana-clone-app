import { Flex, type FlexProps } from '@/components/ui/atoms/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const OverviewRightContent = memo(function OverviewRightContent(
  props: Props,
) {
  return <Flex h="full" flexDirection="column" {...props} />;
});
