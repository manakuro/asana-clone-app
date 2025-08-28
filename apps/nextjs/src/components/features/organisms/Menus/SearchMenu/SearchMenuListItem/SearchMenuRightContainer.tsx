import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';

type Props = FlexProps;

export const SearchMenuRightContainer: React.FC<Props> = memo<Props>(
  (props) => {
    return <Flex alignItems="center" flex={1} ml={2} {...props} />;
  },
);
