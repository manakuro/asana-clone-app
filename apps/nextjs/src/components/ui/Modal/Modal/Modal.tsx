import {
  Modal as ChakraModal,
  type ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

type Props = ChakraModalProps;
export type ModalProps = Props;

export function Modal(props: Props) {
  return <ChakraModal {...props} />;
}
