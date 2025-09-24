import {
  DrawerFooter as ChakraDrawerFooter,
  type ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react';

type Props = ChakraModalFooterProps;
export type DrawerFooterProps = Props;

export function DrawerFooter(props: Props) {
  return <ChakraDrawerFooter {...props} />;
}
