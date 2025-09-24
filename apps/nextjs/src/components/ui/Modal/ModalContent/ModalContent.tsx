import {
  ModalContent as ChakraModalContent,
  type ModalContentProps as ChakraModalContentProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraModalContentProps & {
  ref?: React.ForwardedRef<any>;
};
export type ModalContentProps = Props;

export const ModalContent = forwardRef(function ModalContent(
  props: Props,
  ref,
) {
  return <ChakraModalContent ref={ref} {...props} aria-label="modal-content" />;
});
