import {
  GridItem as ChakraGridItem,
  type GridItemProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = GridItemProps;

export function GridItem(props: Props) {
  return <ChakraGridItem {...props} />;
}
