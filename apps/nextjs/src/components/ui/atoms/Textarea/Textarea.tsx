import {
  Textarea as ChakraTextarea,
  type TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraTextareaProps & {
  ref?: React.ForwardedRef<any>;
};
export type TextareaProps = Props;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function Textarea(props, ref) {
    return <ChakraTextarea {...props} focusBorderColor="none" ref={ref} />;
  },
);
