import {
  DrawerOverlay as ChakraDrawerOverlay,
  type ModalOverlayProps as ChakraModalOverlayProps,
} from '@chakra-ui/react';

type Props = ChakraModalOverlayProps;
export type DrawerOverlayProps = Props;

export function DrawerOverlay(props: Props) {
  return <ChakraDrawerOverlay {...props} />;
}
