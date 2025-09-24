import {
  ModalOverlay as ChakraModalOverlay,
  type ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react';

type Props = ChakraModalOverlayProps;
export type ModalOverlayProps = Props;

export function ModalOverlay(props: Props) {
  return <ChakraModalOverlay {...props} />;
}
