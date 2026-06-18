import { Tabs, type TabsContentProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = TabsContentProps;

export const TabPanel = forwardRef<HTMLDivElement, Props>(
  function TabPanel(props, ref) {
    return <Tabs.Content p={0} h="full" {...props} ref={ref} />;
  },
);
