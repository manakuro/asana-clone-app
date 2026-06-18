import {
  Tabs as ChakraTabs,
  type TabsRootProps as ChakraTabsProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabsProps;

export const Tabs = forwardRef<HTMLDivElement, Props>(
  function Tabs(props, ref) {
    return <ChakraTabs.Root size="xs" lazyMount {...props} ref={ref} />;
  },
);
