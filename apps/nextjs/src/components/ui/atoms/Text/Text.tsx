import {
  Text as ChakraText,
  type TextProps as ChakraTextProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraTextProps;
export type TextProps = Props;

export function Text(props: Props) {
  return <ChakraText {...props} />;
}
