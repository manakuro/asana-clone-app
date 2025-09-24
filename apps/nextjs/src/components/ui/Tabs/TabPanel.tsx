import {
  TabPanel as ChakraTabPanel,
  type TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabPanelProps;
export type TabPanelProps = Props;

export const TabPanel = forwardRef<HTMLDivElement, Props>(
  function TabPanel(props, ref) {
    return <ChakraTabPanel p={0} h="full" {...props} ref={ref} />;
  },
);
