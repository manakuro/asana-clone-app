import {
  PopoverCloseButton as ChakraPopoverCloseButton,
  type PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
} from '@chakra-ui/react';

type Props = ChakraPopoverCloseButtonProps;
export type PopoverCloseButtonProps = Props;

export function PopoverCloseButton(props: Props) {
  return <ChakraPopoverCloseButton {...props} />;
}
