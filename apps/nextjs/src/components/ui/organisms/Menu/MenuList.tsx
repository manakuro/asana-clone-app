import {
  MenuList as ChakraMenuList,
  type MenuListProps as ChakraMenuListProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraMenuListProps & {
  ref?: React.MutableRefObject<any>;
};
export type MenuListProps = Props;

export const MenuList = forwardRef<HTMLDivElement, Props>(
  function MenuList(props, ref) {
    return (
      <ChakraMenuList
        zIndex="popover"
        {...props}
        ref={ref}
        aria-label="menu-list"
      />
    );
  },
);
