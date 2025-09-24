import {
  DrawerContent as ChakraDrawerContent,
  type DrawerContentProps as ChakraDrawerContentProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraDrawerContentProps & {
  ref?: React.MutableRefObject<any>;
};
export type DrawerContentProps = Props;

export const DrawerContent = forwardRef<HTMLDivElement, Props>(
  function DrawerContent(props, ref) {
    return <ChakraDrawerContent {...props} ref={ref} />;
  },
);
