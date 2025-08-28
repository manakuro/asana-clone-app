import {
  MenuItemOption as ChakraMenuItemOption,
  type MenuItemOptionProps as ChakraMenuItemOptionProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraMenuItemOptionProps & {
  ref?: React.ForwardedRef<any>;
};
export type MenuItemOptionProps = Props;

export const MenuItemOption: React.FC<Props> & {
  id?: string;
} = forwardRef((props, ref) => (
  <ChakraMenuItemOption fontSize="sm" {...props} ref={ref} />
));

MenuItemOption.id = 'MenuItemOption';
