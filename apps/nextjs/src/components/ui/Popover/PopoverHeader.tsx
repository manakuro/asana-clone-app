import {
  PopoverHeader as ChakraPopoverHeader,
  type PopoverHeaderProps as ChakraPopoverHeaderProps,
} from '@chakra-ui/react';

type Props = ChakraPopoverHeaderProps;
export type PopoverHeaderProps = Props;

export function PopoverHeader(props: Props) {
  return <ChakraPopoverHeader {...props} />;
}
