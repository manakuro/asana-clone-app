import {
  Input as ChakraInput,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'react';

type Props = ChakraInputProps & {
  ref?: React.RefObject<any>;
};
export type InputProps = Props;

export const Input = forwardRef<HTMLInputElement, Props>(
  function Input(props, ref) {
    return (
      <ChakraInput
        css={{
          '--focus-color': 'none',
        }}
        ref={ref}
        {...props}
      />
    );
  },
);
