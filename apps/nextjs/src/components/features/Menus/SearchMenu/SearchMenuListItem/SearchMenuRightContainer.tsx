import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';

type Props = FlexProps;

export const SearchMenuRightContainer = memo(function SearchMenuRightContainer(
  props: Props,
) {
  return <Flex alignItems="center" flex={1} ml={2} {...props} />;
});
