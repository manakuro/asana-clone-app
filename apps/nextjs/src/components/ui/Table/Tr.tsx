import {
  Tr as ChakraTr,
  type TableRowProps as ChakraTrProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTrProps;
export type TrProps = Props;

export const Tr = forwardRef<HTMLTableRowElement, Props>(
  function Tr(props, ref) {
    return <ChakraTr {...props} ref={ref} />;
  },
);
