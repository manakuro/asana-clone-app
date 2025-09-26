import {
  Box as ChakraBox,
  type BoxProps as ChakraBoxProps,
} from '@chakra-ui/react';
import type { DraggableProvided } from '@hello-pangea/dnd';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraBoxProps & {
  ref?: React.ForwardedRef<any> | DraggableProvided['innerRef'];
};
export type BoxProps = Props;

export const Box = forwardRef<HTMLDivElement, Props>(function Box(props, ref) {
  return <ChakraBox {...props} ref={ref} />;
});
