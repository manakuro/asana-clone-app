import {
  Input as ChakraInput,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraInputProps & {
  ref?: React.MutableRefObject<any>;
};
export type InputProps = Props;

export const Input = forwardRef<HTMLInputElement, Props>(
  function Input(props, ref) {
    return <ChakraInput focusBorderColor="none" ref={ref} {...props} />;
  },
);

// NOTE: Need an id to work styling properly
// @see https://github.com/chakra-ui/chakra-ui/issues/2269
