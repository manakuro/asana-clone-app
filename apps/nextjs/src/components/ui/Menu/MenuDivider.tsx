import {
  MenuDivider as ChakraMenuDivider,
  type MenuDividerProps as ChakraMenuDividerProps,
} from '@chakra-ui/react';

type Props = ChakraMenuDividerProps;
export type MenuDividerProps = Props;

export function MenuDivider(props: Props) {
  return <ChakraMenuDivider {...props} />;
}
