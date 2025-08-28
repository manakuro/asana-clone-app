import {
  Th as ChakraTh,
  type TableColumnHeaderProps as ChakraThProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraThProps & {
  ref?: React.MutableRefObject<any>;
};
export type ThProps = Props;

export const Th = forwardRef<HTMLTableCellElement, Props>(
  function Th(props, ref) {
    return <ChakraTh {...props} ref={ref} />;
  },
);
