import {
  MenuGroup as ChakraMenuGroup,
  type MenuGroupProps as ChakraMenuGroupProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraMenuGroupProps;
export type MenuGroupProps = Props;

export const MenuGroup: React.FC<Props> = (props) => {
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
};
