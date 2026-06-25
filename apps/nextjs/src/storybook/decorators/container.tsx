import type React from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const Container: React.FCWithChildren<Props> = (props) => {
  return <Flex p={4} {...props} />;
};
