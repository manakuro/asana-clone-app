import {
  Stack as ChakraStack,
  type StackProps as ChakraStackProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraStackProps;
export type StackProps = Props;

export function Stack(props: Props) {
  return <ChakraStack {...props} />;
}
