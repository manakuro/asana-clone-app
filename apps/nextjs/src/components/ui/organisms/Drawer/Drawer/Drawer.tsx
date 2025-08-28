import {
  Drawer as ChakraDrawer,
  type DrawerProps as ChakraDrawerProps,
} from '@chakra-ui/react';

type Props = ChakraDrawerProps;
export type DrawerProps = Props;

export function Drawer(props: Props) {
  return <ChakraDrawer {...props} />;
}
