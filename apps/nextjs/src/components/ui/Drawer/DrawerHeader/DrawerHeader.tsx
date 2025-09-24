import {
  DrawerHeader as ChakraDrawerHeader,
  type ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react';

type Props = ChakraModalHeaderProps;
export type DrawerHeaderProps = Props;

export function DrawerHeader(props: Props) {
  return <ChakraDrawerHeader {...props} />;
}
