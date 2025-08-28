import {
  Menu as ChakraMenu,
  type MenuProps as ChakraMenuProps,
} from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<ChakraMenuProps>;
export type MenuProps = Props;

export function Menu(props: Props) {
  return <ChakraMenu isLazy lazyBehavior="keepMounted" {...props} />;
}
