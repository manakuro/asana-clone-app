import {
  Thead as ChakraThead,
  type TableHeadProps as ChakraTheadProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTheadProps;
export type TheadProps = Props;

export const Thead = forwardRef<HTMLTableSectionElement, Props>(
  function Thead(props, ref) {
    return <ChakraThead {...props} ref={ref} />;
  },
);
