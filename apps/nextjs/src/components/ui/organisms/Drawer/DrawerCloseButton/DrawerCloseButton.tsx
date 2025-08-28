import {
  type CloseButtonProps as ChakraCloseButtonProps,
  DrawerCloseButton as ChakraDrawerCloseButton,
} from '@chakra-ui/react';

type Props = ChakraCloseButtonProps;
export type DrawerCloseButtonProps = Props;

export function DrawerCloseButton(props: Props) {
  return <ChakraDrawerCloseButton {...props} />;
}
