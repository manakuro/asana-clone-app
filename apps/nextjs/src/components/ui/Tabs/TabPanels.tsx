import {
  TabPanels as ChakraTabPanels,
  type TabPanelsProps as ChakraTabPanelsProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabPanelsProps;
export type TabPanelsProps = Props;

export const TabPanels = forwardRef<HTMLDivElement, Props>(
  function TabPanels(props, ref) {
    return <ChakraTabPanels {...props} ref={ref} />;
  },
);
