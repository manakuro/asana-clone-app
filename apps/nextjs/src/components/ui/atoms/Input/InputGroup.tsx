import {
  InputGroup as ChakraInputGroup,
  type InputGroupProps as ChakraInputGroupProps,
} from '@chakra-ui/react';

type Props = ChakraInputGroupProps;
export type InputGroupProps = Props;

export function InputGroup(props: Props) {
  return <ChakraInputGroup {...props} />;
}
