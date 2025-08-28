import {
  Table as ChakraTable,
  type TableProps as ChakraTableProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTableProps;
export type TableProps = Props;

export const Table = forwardRef<HTMLTableElement, Props>(
  function Table(props, ref) {
    return <ChakraTable {...props} ref={ref} />;
  },
);
