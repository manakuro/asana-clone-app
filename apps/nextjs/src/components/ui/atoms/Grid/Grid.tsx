import {
  Grid as ChakraGrid,
  type GridProps as ChakraGridProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraGridProps;
export type GridProps = Props;

export function Grid(props: Props) {
  return <ChakraGrid {...props} />;
}
