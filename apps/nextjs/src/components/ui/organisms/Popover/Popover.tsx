import {
  Popover as ChakraPopover,
  type PopoverProps as ChakraPopoverProps,
} from '@chakra-ui/react';

type Props = ChakraPopoverProps;
export type PopoverProps = Props;

export function Popover(props: Props) {
  return <ChakraPopover {...props} />;
}
