import {
  PopoverBody as ChakraPopoverBody,
  type PopoverBodyProps as ChakraPopoverBodyProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraPopoverBodyProps & {
  ref?: React.MutableRefObject<any>;
};
export type PopoverBodyProps = Props;

export const PopoverBody = forwardRef<HTMLDivElement, Props>(
  function PopoverBody(props, ref) {
    return <ChakraPopoverBody {...props} ref={ref} />;
  },
);
