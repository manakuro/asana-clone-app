import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  type MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from '@chakra-ui/react';

type Props = ChakraMenuOptionGroupProps;
export type MenuOptionGroupProps = Props;

export function MenuOptionGroup(props: Props) {
  return <ChakraMenuOptionGroup {...props} />;
}
