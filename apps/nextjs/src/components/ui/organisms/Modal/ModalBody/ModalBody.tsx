import {
  ModalBody as ChakraModalBody,
  type ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraModalBodyProps & {
  ref?: React.ForwardedRef<any>;
};
export type ModalBodyProps = Props;

export const ModalBody = forwardRef<HTMLDivElement, Props>(
  function ModalBody(props, ref) {
    return <ChakraModalBody {...props} ref={ref} />;
  },
);
