import {
  Tabs as ChakraTabs,
  type TabsRootProps as ChakraTabsProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabsProps;
export type TabsProps = Props;

export const Tabs = forwardRef<HTMLDivElement, Props>(
  function Tabs(props, ref) {
    return <ChakraTabs.Root size="sm" lazyMount {...props} ref={ref} />;
  },
);
