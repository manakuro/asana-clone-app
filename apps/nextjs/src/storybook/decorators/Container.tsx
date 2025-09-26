import { Flex, type FlexProps } from '@/components/ui/Flex';
import type React from 'react';

type Props = FlexProps;

export const Container: React.FCWithChildren<Props> = (props) => {
  return <Flex p={4} {...props} />;
};
