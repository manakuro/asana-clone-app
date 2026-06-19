import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const SearchMenuLeftContainer = memo(function SearchMenuLeftContainer(
  props: Props,
) {
  return <Flex alignItems="center" justifyContent="center" w={8} {...props} />;
});
