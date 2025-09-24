import {
  Tbody as ChakraTbody,
  type TableBodyProps as ChakraTbodyProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTbodyProps;
export type TbodyProps = Props;

export const Tbody = forwardRef<HTMLTableSectionElement, Props>(
  function Tbody(props, ref) {
    return <ChakraTbody {...props} ref={ref} />;
  },
);
