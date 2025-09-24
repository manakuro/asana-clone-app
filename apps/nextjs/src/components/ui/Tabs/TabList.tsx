import {
  TabList as ChakraTabList,
  type TabListProps as ChakraTabListProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = ChakraTabListProps;
export type TabListProps = Props;

export const TabList = forwardRef<HTMLDivElement, Props>(
  function TabList(props, ref) {
    return <ChakraTabList borderBottom="none" {...props} ref={ref} />;
  },
);
