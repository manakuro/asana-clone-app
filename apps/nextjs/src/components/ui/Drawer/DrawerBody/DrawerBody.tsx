import {
  DrawerBody as ChakraDrawerBody,
  type ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react';

type Props = ChakraModalBodyProps;
export type DrawerBodyProps = Props;

export function DrawerBody(props: Props) {
  return <ChakraDrawerBody {...props} />;
}
