import {
  ModalHeader as ChakraModalHeader,
  type ModalHeaderProps as ChakraModalHeaderProps,
} from '@chakra-ui/react';

type Props = ChakraModalHeaderProps;
export type ModalHeaderProps = Props;

export function ModalHeader(props: Props) {
  return <ChakraModalHeader {...props} />;
}
