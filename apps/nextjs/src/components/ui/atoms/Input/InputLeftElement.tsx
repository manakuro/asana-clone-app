import {
  InputLeftElement as ChakraInputLeftElement,
  type InputElementProps as ChakraInputLeftElementProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraInputLeftElementProps;
export type InputLeftElementProps = Props;

export const InputLeftElement = forwardRef<HTMLDivElement, Props>(
  function InputLeftElement(props, ref) {
    return <ChakraInputLeftElement {...props} ref={ref} />;
  },
);
