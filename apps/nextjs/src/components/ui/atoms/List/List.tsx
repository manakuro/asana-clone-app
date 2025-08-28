import { List as ChakraList } from '@chakra-ui/react';
import type React from 'react';

type Props = React.ComponentProps<typeof ChakraList>;

export function List(props: Props) {
  return <ChakraList {...props} />;
}
