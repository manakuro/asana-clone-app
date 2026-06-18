import {
  type TabsListProps as ChakraTabListProps,
  Tabs,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabListProps;
export type TabListProps = Props;

export const TabList = forwardRef<HTMLDivElement, Props>(
  function TabList(props, ref) {
    return <Tabs.List borderBottom="none" {...props} ref={ref} />;
  },
);
