import {
  Tfoot as ChakraTfoot,
  type TableFooterProps as ChakraTfootProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTfootProps;
export type TfootProps = Props;

export const Tfoot = forwardRef<HTMLTableSectionElement, Props>(
  function Tfoot(props, ref) {
    return <ChakraTfoot {...props} ref={ref} />;
  },
);
