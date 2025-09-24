import {
  Tabs as ChakraTabs,
  type TabsProps as ChakraTabsProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabsProps;
export type TabsProps = Props;

export const Tabs = forwardRef<HTMLDivElement, Props>(
  function Tabs(props, ref) {
    return (
      <ChakraTabs colorScheme="teal" size="sm" isLazy {...props} ref={ref} />
    );
  },
);
