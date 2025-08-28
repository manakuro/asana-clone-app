import {
  Flex as ChakraFlex,
  type FlexProps as ChakraFlexProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'react';

type Props = ChakraFlexProps & {
  ref?: React.ForwardedRef<any>;
};
export type FlexProps = Props;

export const Flex = forwardRef<HTMLDivElement, Props>(
  function Flex(props, ref) {
    return <ChakraFlex {...props} ref={ref} />;
  },
);
