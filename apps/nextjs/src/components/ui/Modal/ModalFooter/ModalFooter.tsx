import {
  ModalFooter as ChakraModalFooter,
  type ModalFooterProps as ChakraModalFooterProps,
} from '@chakra-ui/react';

type Props = ChakraModalFooterProps;
export type ModalFooterProps = Props;

export function ModalFooter(props: Props) {
  return <ChakraModalFooter {...props} />;
}
