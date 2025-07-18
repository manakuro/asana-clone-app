import {
  Modal as ChakraModal,
  type ModalProps as ChakraModalProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraModalProps;
export type ModalProps = Props;

export const Modal: React.FC<Props> = (props) => {
  return <ChakraModal {...props} />;
};
