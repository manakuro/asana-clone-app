import {
  WrapItem as ChakraWrapItem,
  type WrapItemProps as ChakraWrapItemProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraWrapItemProps;
export type WrapItemProps = Props;

export function WrapItem(props: Props) {
  return <ChakraWrapItem {...props} />;
}
