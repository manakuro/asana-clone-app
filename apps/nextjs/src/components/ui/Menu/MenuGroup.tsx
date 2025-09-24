import {
  MenuGroup as ChakraMenuGroup,
  type MenuGroupProps as ChakraMenuGroupProps,
} from '@chakra-ui/react';

type Props = ChakraMenuGroupProps;
export type MenuGroupProps = Props;

export function MenuGroup(props: Props) {
  return (
    <ChakraMenuGroup
      fontSize="xs"
      color="text.muted"
      m={0}
      px={3}
      py={1}
      {...props}
    />
  );
}
