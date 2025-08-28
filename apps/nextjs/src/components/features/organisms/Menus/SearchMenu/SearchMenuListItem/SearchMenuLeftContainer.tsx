import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

export const SearchMenuLeftContainer = memo(function SearchMenuLeftContainer(
  props: Props,
) {
  return <Flex alignItems="center" justifyContent="center" w={8} {...props} />;
});
